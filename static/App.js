'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById('contents');

var activities = [{
    id: 1,
    date: new Date('2018-12-30'),
    activity_type: 'Fasting BGL',
    value: '100'
}, {
    id: 2,
    date: new Date('2018-12-31'),
    activity_type: 'BGL After Lunch',
    value: '120'
}, {
    id: 3,
    date: new Date(2019, 0, 1, 11, 11, 11),
    activity_type: 'Jogging',
    value: '30 minutes'
}, {
    id: 4,
    date: new Date(),
    activity_type: 'Usual Dinner',
    value: 'Ramen'
}];

var ActivityRow = function (_React$Component) {
    _inherits(ActivityRow, _React$Component);

    function ActivityRow() {
        _classCallCheck(this, ActivityRow);

        return _possibleConstructorReturn(this, (ActivityRow.__proto__ || Object.getPrototypeOf(ActivityRow)).apply(this, arguments));
    }

    _createClass(ActivityRow, [{
        key: 'render',
        value: function render() {
            var activity = this.props.activity;
            var date = activity.date.today() + ' ' + activity.date.timeNow();

            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    null,
                    activity.id
                ),
                React.createElement(
                    'td',
                    null,
                    date
                ),
                React.createElement(
                    'td',
                    null,
                    activity.activity_type
                ),
                React.createElement(
                    'td',
                    null,
                    activity.value
                )
            );
        }
    }]);

    return ActivityRow;
}(React.Component);

var ActivityTable = function (_React$Component2) {
    _inherits(ActivityTable, _React$Component2);

    function ActivityTable() {
        _classCallCheck(this, ActivityTable);

        return _possibleConstructorReturn(this, (ActivityTable.__proto__ || Object.getPrototypeOf(ActivityTable)).apply(this, arguments));
    }

    _createClass(ActivityTable, [{
        key: 'render',
        value: function render() {
            var activityRows = this.props.activities.map(function (activity) {
                return React.createElement(ActivityRow, { key: activity.id, activity: activity });
            });
            return React.createElement(
                'table',
                { className: 'bordered-table' },
                React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'th',
                            null,
                            'Id'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Date'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Activity Type'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Value'
                        )
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    activityRows
                )
            );
        }
    }]);

    return ActivityTable;
}(React.Component);

var ActivityList = function (_React$Component3) {
    _inherits(ActivityList, _React$Component3);

    function ActivityList() {
        _classCallCheck(this, ActivityList);

        return _possibleConstructorReturn(this, (ActivityList.__proto__ || Object.getPrototypeOf(ActivityList)).apply(this, arguments));
    }

    _createClass(ActivityList, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    'Diabetes Self Managment App'
                ),
                React.createElement('hr', null),
                React.createElement(ActivityTable, { activities: activities })
            );
        }
    }]);

    return ActivityList;
}(React.Component);

ReactDOM.render(React.createElement(ActivityList, null), contentNode);

// ActivityRow.propTypes = {
//     date: React.PropTypes.instanceOf(Date),
//     activity_type: React.PropTypes.string,
//     value: React.PropTypes.string
// };

Date.prototype.today = function () {
    return (this.getMonth() < 10 ? "0" : "") + (this.getMonth() + 1) + "/" + (this.getDate() + 1 < 10 ? "0" : "") + this.getDate() + "/" + this.getFullYear();
};
Date.prototype.timeNow = function () {
    return (this.getHours() < 10 ? "0" : "") + this.getHours() + ":" + (this.getMinutes() < 10 ? "0" : "") + this.getMinutes() + ":" + (this.getSeconds() < 10 ? "0" : "") + this.getSeconds();
};