'use restrict';

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const Activity = require('./activity.js');

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

// adding route for POST to the endpoint
// return newly created activity as the result of the operation.
app.post('/api/activities', (req, res) => {
    const newActivity = req.body;
    newActivity.date = new Date();

    const err = Activity.validateActivity(newActivity);
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