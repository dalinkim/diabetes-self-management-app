Date.prototype.today = function () {
    return ((this.getMonth() + 1 < 10) ? "0" : "") + (this.getMonth() + 1) + "/"
        + ((this.getDate() < 10) ? "0" : "") + this.getDate()
        + "/" + this.getFullYear();
}
Date.prototype.timeNow = function () {
    return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":"
        + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":"
        + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
}

const contentNode = document.getElementById('contents');
const activities = [];

// Child does not have access to the parent's method.
// Need to pass callbacks from the parent to the child, which it can call to achieve specific tasks.
// createNewActivity from the parent (ActivityList) is passed to the child (ActivityAdd)
class ActivityAdd extends React.Component {
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

// stateless component rewritten as a function rather than a class
const ActivityRow = (props) => (
    <tr>
        <td>{props.activity.id}</td>
        <td>{`${props.activity.date.today()} ${props.activity.date.timeNow()}`}</td>
        <td>{props.activity.activity_type}</td>
        <td>{props.activity.value}</td>
    </tr>
);

// initial rendering of the IssueTable component now uses the array from the state as its source data
// stateless component rewritten as a function rather than a class
const ActivityTable = (props) => {
    const activityRows = props.activities.map(activity =>
        <ActivityRow key={activity.id} activity={activity} />);
    return (
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Date</th>
                    <th>Activity Type</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>{activityRows}</tbody>
        </table>
    );
}

class ActivityList extends React.Component {
    constructor() {
        super();
        this.state = { activities: [] };
        this.createNewActivity = this.createNewActivity.bind(this);
    }

    // called immediately after a component is mounted. 
    // setting state here will trigger re-rendering.
    componentDidMount() {
        this.loadData();
    }

    // uses the global issues list to set the state
    loadData() {
        setTimeout(() => {
            this.setState({ activities: activities });
        }, 500);
    }

    // setState tirggers rerendering process for the component
    // and all descendent components where properties get affected because of the state change.
    // ActivityTable and ActivityRow will be rerendered, and when they are,
    // their properties will reflect the new state of the parent ActivityList component automatically.
    createNewActivity(newActivity) {
        let newActivities = this.state.activities.slice();
        newActivity.id = this.state.activities.length + 1;
        newActivity.date = new Date();
        newActivities.push(newActivity);
        this.setState({ activities: newActivities });
    }

    // passing the data from the state to the IssueTable via properties
    // replacing the global array with the state data
    render() {
        return (
            <div>
                <h1>Diabetes Self Managment App</h1>
                <hr />
                <ActivityTable activities={this.state.activities} />
                <hr />
                <ActivityAdd createNewActivity={this.createNewActivity} />
            </div>
        );
    }
}

ReactDOM.render(<ActivityList />, contentNode);

ActivityRow.propTypes = {
    date: React.PropTypes.instanceOf(Date),
    activity_type: React.PropTypes.string,
    value: React.PropTypes.string
};