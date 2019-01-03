'use restrict';
// to let Node.js accept const declarations
// without it, the behavior of const and let are different in Node.js v4.5

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

module.exports = {
    validateActivity: validateActivity
};