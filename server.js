const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

// adding get route to the application
// which sends out the global array of activities as a JSON using res.json()
// sets up a route so that any request to the specified URI is handled by the given handler
// JSON string representation of the object is sent out.
app.get('/api/activities', (req, res) => {
    const metadata = { total_count: activities.length };
    res.json({ _metadata: metadata, records: activities });
});

// adding server-side validation
// kind of schema definition to indicate what is a valid Issue object
const activityFieldType = {
    id: 'required',
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
    newActivity.id = activities.length + 1;
    newActivity.date = new Date();

    const err = validateActivity(newActivity);
    if (err) {
        res.status(422).json({ message: `Invalid request: ${err}` });
        return;
    }

    activities.push(newActivity);
    res.json(newActivity);
});

app.listen(3000, function () {
    console.log('App started on port 3000');
});

const activities = [];