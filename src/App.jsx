Date.prototype.today = function () {
    return ((this.getMonth() < 10) ? "0" : "") + (this.getMonth() + 1) + "/" 
            + (((this.getDate() + 1) < 10) ? "0" : "") + this.getDate() 
            + "/" + this.getFullYear();
}
Date.prototype.timeNow = function () {
    return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" 
            + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" 
            + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
}

const contentNode = document.getElementById('contents');

const activities = [
    {
        id: 1,
        date: new Date('2018-12-30'),
        activity_type: 'Fasting BGL',
        value: '100'
    },
    {
        id: 2,
        date: new Date('2018-12-31'),
        activity_type: 'BGL After Lunch',
        value: '120'
    },
    {
        id: 3,
        date: new Date(2019, 0, 1, 11, 11, 11),
        activity_type: 'Jogging',
        value: '30 minutes'
    },
    {
        id: 4,
        date: new Date(),
        activity_type: 'Usual Dinner',
        value: 'Ramen'
    }
];

class ActivityRow extends React.Component {
    render() {
        const activity = this.props.activity;
        let date = `${activity.date.today()} ${activity.date.timeNow()}`;
        
        return (
            <tr>
                <td>{activity.id}</td>
                <td>{date}</td>
                <td>{activity.activity_type}</td>
                <td>{activity.value}</td>
            </tr>
        );
    }
}
class ActivityTable extends React.Component {
    render() {
        const activityRows = this.props.activities.map(activity =>
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
}

class ActivityList extends React.Component {
    render() {
        return (
            <div>
                <h1>Diabetes Self Managment App</h1>
                <hr />
                <ActivityTable activities={activities} />
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