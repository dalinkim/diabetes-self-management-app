"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Date.prototype.today = function () {
    return (this.getMonth() + 1 < 10 ? "0" : "") + (this.getMonth() + 1) + "/" + (this.getDate() < 10 ? "0" : "") + this.getDate() + "/" + this.getFullYear();
};
Date.prototype.timeNow = function () {
    return (this.getHours() < 10 ? "0" : "") + this.getHours() + ":" + (this.getMinutes() < 10 ? "0" : "") + this.getMinutes() + ":" + (this.getSeconds() < 10 ? "0" : "") + this.getSeconds();
};

var contentNode = document.getElementById('contents');
var activities = [];

// Child does not have access to the parent's method.
// Need to pass callbacks from the parent to the child, which it can call to achieve specific tasks.
// createNewActivity from the parent (ActivityList) is passed to the child (ActivityAdd)

var ActivityAdd = function (_React$Component) {
    _inherits(ActivityAdd, _React$Component);

    function ActivityAdd() {
        _classCallCheck(this, ActivityAdd);

        var _this = _possibleConstructorReturn(this, (ActivityAdd.__proto__ || Object.getPrototypeOf(ActivityAdd)).call(this));

        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    // prevent default behavior of the form to handle input fields programmatically


    _createClass(ActivityAdd, [{
        key: "handleSubmit",
        value: function handleSubmit(e) {
            e.preventDefault();
            var form = document.forms.activityAdd;
            this.props.createNewActivity({
                date: new Date(),
                activity_type: form.activity_type.value,
                value: form.value.value
            });
            // clear the form for the next input
            form.activity_type.value = '';
            form.value.value = '';
        }

        // form with onSubmit instead of onClick
        // to allow users to press Enter to add a new activity in addition to clicking on the Add button

    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "form",
                    { name: "activityAdd", onSubmit: this.handleSubmit },
                    React.createElement("input", { type: "text", name: "activity_type", placeholder: "Activity Type" }),
                    React.createElement("input", { type: "text", name: "value", placeholder: "Value" }),
                    React.createElement(
                        "button",
                        null,
                        "Add"
                    )
                )
            );
        }
    }]);

    return ActivityAdd;
}(React.Component);

// stateless component rewritten as a function rather than a class


var ActivityRow = function ActivityRow(props) {
    return React.createElement(
        "tr",
        null,
        React.createElement(
            "td",
            null,
            props.activity.id
        ),
        React.createElement(
            "td",
            null,
            props.activity.date.today() + " " + props.activity.date.timeNow()
        ),
        React.createElement(
            "td",
            null,
            props.activity.activity_type
        ),
        React.createElement(
            "td",
            null,
            props.activity.value
        )
    );
};

// initial rendering of the IssueTable component now uses the array from the state as its source data
// stateless component rewritten as a function rather than a class
var ActivityTable = function ActivityTable(props) {
    var activityRows = props.activities.map(function (activity) {
        return React.createElement(ActivityRow, { key: activity.id, activity: activity });
    });
    return React.createElement(
        "table",
        { className: "bordered-table" },
        React.createElement(
            "thead",
            null,
            React.createElement(
                "tr",
                null,
                React.createElement(
                    "th",
                    null,
                    "Id"
                ),
                React.createElement(
                    "th",
                    null,
                    "Date"
                ),
                React.createElement(
                    "th",
                    null,
                    "Activity Type"
                ),
                React.createElement(
                    "th",
                    null,
                    "Value"
                )
            )
        ),
        React.createElement(
            "tbody",
            null,
            activityRows
        )
    );
};

var ActivityList = function (_React$Component2) {
    _inherits(ActivityList, _React$Component2);

    function ActivityList() {
        _classCallCheck(this, ActivityList);

        var _this2 = _possibleConstructorReturn(this, (ActivityList.__proto__ || Object.getPrototypeOf(ActivityList)).call(this));

        _this2.state = { activities: [] };
        _this2.createNewActivity = _this2.createNewActivity.bind(_this2);
        return _this2;
    }

    // called immediately after a component is mounted. 
    // setting state here will trigger re-rendering.


    _createClass(ActivityList, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.loadData();
        }

        // uses the global issues list to set the state

    }, {
        key: "loadData",
        value: function loadData() {
            var _this3 = this;

            setTimeout(function () {
                _this3.setState({ activities: activities });
            }, 500);
        }

        // setState tirggers rerendering process for the component
        // and all descendent components where properties get affected because of the state change.
        // ActivityTable and ActivityRow will be rerendered, and when they are,
        // their properties will reflect the new state of the parent ActivityList component automatically.

    }, {
        key: "createNewActivity",
        value: function createNewActivity(newActivity) {
            var newActivities = this.state.activities.slice();
            newActivity.id = this.state.activities.length + 1;
            newActivity.date = new Date();
            newActivities.push(newActivity);
            this.setState({ activities: newActivities });
        }

        // passing the data from the state to the IssueTable via properties
        // replacing the global array with the state data

    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h1",
                    null,
                    "Diabetes Self Managment App"
                ),
                React.createElement("hr", null),
                React.createElement(ActivityTable, { activities: this.state.activities }),
                React.createElement("hr", null),
                React.createElement(ActivityAdd, { createNewActivity: this.createNewActivity })
            );
        }
    }]);

    return ActivityList;
}(React.Component);

ReactDOM.render(React.createElement(ActivityList, null), contentNode);

ActivityRow.propTypes = {
    date: React.PropTypes.instanceOf(Date),
    activity_type: React.PropTypes.string,
    value: React.PropTypes.string
};