const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

// const activities = [];

// adding get route to the application
// which sends out the global array of activities as a JSON using res.json()
// sets up a route so that any request to the specified URI is handled by the given handler
// JSON string representation of the object is sent out.
// ---
// 07-endpoint handler is modified to read from the database.
// call find() on the activities collection, convert it to an array, and return the documents
app.get('/api/activities', (req, res) => {
    db.collection('activities').find().toArray()
    .then(activities => {
        const metadata = { total_count: activities.length };
        res.json({ _metadata: metadata, records: activities });
    // skipping catch block results in any runtime error within any of the blocks to not be caught
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

// adding server-side validation
// kind of schema definition to indicate what is a valid Issue object
const activityFieldType = {
    date: 'required',
    activity_type: 'required',
    value: 'required',
};

// checks against the above specification and returns an error if validation fails.
function validateActivity(activity) {
    for (const field in activityFieldType) {
        const type = activityFieldType[field];
        if (!type) { 
            // deletes any fields that do not belong, simply ignoring them.
            delete activity[field];
        } else if (type === 'required' && !activity[field]) {
            return `${field} is required.`;
        }
    }
    return null;
}

// adding route for POST to the endpoint
// return newly created activity as the result of the operation.
app.post('/api/activities', (req, res) => {
    const newActivity = req.body;
    newActivity.date = new Date();

    const err = validateActivity(newActivity);
    if (err) {
        res.status(422).json({ message: `Invalid request: ${err}` });
        return;
    }

    // writing to MongoDB
    db.collection('activities').insertOne(newActivity).then(result => 
        db.collection('activities').find({ _id: result.insertedId }).limit(1).next()
    ).then(newActivity => {
        res.json(newActivity);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});


let db;
MongoClient.connect('mongodb://localhost/diabetesSelfManagement')
.then(connection => {
    db = connection;
    app.listen(3000, function () {
        console.log('App started on port 3000');
    });
}).catch(error => {
    console.log('ERROR:', error);
});