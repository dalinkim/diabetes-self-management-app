import React from 'react';

// Child does not have access to the parent's method.
// Need to pass callbacks from the parent to the child, which it can call to achieve specific tasks.
// createNewActivity from the parent (ActivityList) is passed to the child (ActivityAdd)
export default class ActivityAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // prevent default behavior of the form to handle input fields programmatically
    handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.activityAdd;
        this.props.createNewActivity({
            date: new Date(),
            activity_type: form.activity_type.value,
            value: form.value.value,
        });
        // clear the form for the next input
        form.activity_type.value = '';
        form.value.value = '';
    }

    // form with onSubmit instead of onClick
    // to allow users to press Enter to add a new activity in addition to clicking on the Add button
    render() {
        return (
            <div>
                <form name="activityAdd" onSubmit={this.handleSubmit}>
                    <input type="text" name="activity_type" placeholder="Activity Type" />
                    <input type="text" name="value" placeholder="Value" />
                    <button>Add</button>
                </form>
            </div>
        );
    }
}