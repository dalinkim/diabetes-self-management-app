webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _ActivityList = __webpack_require__(1);

	var _ActivityList2 = _interopRequireDefault(_ActivityList);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(40);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var contentNode = document.getElementById('contents');
	_reactDom2.default.render(_react2.default.createElement(_ActivityList2.default, null), contentNode);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ActivityAdd = __webpack_require__(2);

	var _ActivityAdd2 = _interopRequireDefault(_ActivityAdd);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	__webpack_require__(39);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	Date.prototype.today = function () {
	    return (this.getMonth() + 1 < 10 ? "0" : "") + (this.getMonth() + 1) + "/" + (this.getDate() < 10 ? "0" : "") + this.getDate() + "/" + this.getFullYear();
	};
	Date.prototype.timeNow = function () {
	    return (this.getHours() < 10 ? "0" : "") + this.getHours() + ":" + (this.getMinutes() < 10 ? "0" : "") + this.getMinutes() + ":" + (this.getSeconds() < 10 ? "0" : "") + this.getSeconds();
	};

	// stateless component rewritten as a function rather than a class
	var ActivityRow = function ActivityRow(props) {
	    return _react2.default.createElement(
	        'tr',
	        null,
	        _react2.default.createElement(
	            'td',
	            null,
	            props.activity._id
	        ),
	        _react2.default.createElement(
	            'td',
	            null,
	            props.activity.date.today() + ' ' + props.activity.date.timeNow()
	        ),
	        _react2.default.createElement(
	            'td',
	            null,
	            props.activity.activity_type
	        ),
	        _react2.default.createElement(
	            'td',
	            null,
	            props.activity.value
	        )
	    );
	};

	// initial rendering of the IssueTable component now uses the array from the state as its source data
	// stateless component rewritten as a function rather than a class
	var ActivityTable = function ActivityTable(props) {
	    var activityRows = props.activities.map(function (activity) {
	        return _react2.default.createElement(ActivityRow, { key: activity._id, activity: activity });
	    });
	    return _react2.default.createElement(
	        'table',
	        { className: 'bordered-table' },
	        _react2.default.createElement(
	            'thead',
	            null,
	            _react2.default.createElement(
	                'tr',
	                null,
	                _react2.default.createElement(
	                    'th',
	                    null,
	                    'Id'
	                ),
	                _react2.default.createElement(
	                    'th',
	                    null,
	                    'Date'
	                ),
	                _react2.default.createElement(
	                    'th',
	                    null,
	                    'Activity Type'
	                ),
	                _react2.default.createElement(
	                    'th',
	                    null,
	                    'Value'
	                )
	            )
	        ),
	        _react2.default.createElement(
	            'tbody',
	            null,
	            activityRows
	        )
	    );
	};

	var ActivityList = function (_React$Component) {
	    _inherits(ActivityList, _React$Component);

	    function ActivityList() {
	        _classCallCheck(this, ActivityList);

	        var _this = _possibleConstructorReturn(this, (ActivityList.__proto__ || Object.getPrototypeOf(ActivityList)).call(this));

	        _this.state = { activities: [] };
	        _this.createNewActivity = _this.createNewActivity.bind(_this);
	        return _this;
	    }

	    // called immediately after a component is mounted. 
	    // setting state here will trigger re-rendering.


	    _createClass(ActivityList, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.loadData();
	        }

	        // fetch() takes in the path of the URL to be fetched 
	        // and returns a promise with the rseponse as the value
	        // the response is parsed using json() which returns a promise with the value as the parsed data
	        // The parsed data reflects what is sent from the server
	        // ---
	        // List API can return a non-successful HTTP status code now using MongoDB
	        // should be handled in the front end as well

	    }, {
	        key: 'loadData',
	        value: function loadData() {
	            var _this2 = this;

	            fetch('/api/activities').then(function (response) {
	                if (response.ok) {
	                    response.json().then(function (data) {
	                        console.log("Total count of records:", data._metadata.total_count);
	                        // forEach loop to do conversion
	                        data.records.forEach(function (activity) {
	                            activity.date = new Date(activity.date);
	                        });
	                        _this2.setState({ activities: data.records });
	                    });
	                } else {
	                    response.json().then(function (error) {
	                        alert("Failed to fetch activities:" + error.message);
	                    });
	                }
	            }).catch(function (err) {
	                console.log(err);
	            });
	        }

	        // setState tirggers rerendering process for the component
	        // and all descendent components where properties get affected because of the state change.
	        // ActivityTable and ActivityRow will be rerendered, and when they are,
	        // their properties will reflect the new state of the parent ActivityList component automatically.
	        // ---
	        // fetch() API for POST methods need an options object in the second parameter,
	        // which include the method, the Content Type header, and the body in JSON representation.
	        // With the JSON representation of the new activity created received back from the server,
	        // the new state is set by appending the new activity to the existing list of activities.

	    }, {
	        key: 'createNewActivity',
	        value: function createNewActivity(newActivity) {
	            var _this3 = this;

	            fetch('/api/activities', {
	                method: 'POST',
	                headers: { 'Content-Type': 'application/json' },
	                body: JSON.stringify(newActivity)
	            }).then(function (response) {
	                // check the response's property response.ok to detect a non-success HTTP status code
	                if (response.ok) {
	                    response.json().then(function (updatedActivity) {
	                        updatedActivity.date = new Date(updatedActivity.date);
	                        var newActivities = _this3.state.activities.concat(updatedActivity);
	                        _this3.setState({ activities: newActivities });
	                    });
	                } else {
	                    response.json().then(function (error) {
	                        alert("Failed to add activity: " + error.message);
	                    });
	                }
	            }).catch(function (err) {
	                alert("Error in sending data to server: " + err.message);
	            });
	        }

	        // passing the data from the state to the IssueTable via properties
	        // replacing the global array with the state data

	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'h1',
	                    null,
	                    'Diabetes Self Managment App'
	                ),
	                _react2.default.createElement('hr', null),
	                _react2.default.createElement(ActivityTable, { activities: this.state.activities }),
	                _react2.default.createElement('hr', null),
	                _react2.default.createElement(_ActivityAdd2.default, { createNewActivity: this.createNewActivity })
	            );
	        }
	    }]);

	    return ActivityList;
	}(_react2.default.Component);

	// ActivityRow.propTypes = {
	//     date: React.PropTypes.instanceOf(Date),
	//     activity_type: React.PropTypes.string,
	//     value: React.PropTypes.string
	// };


	exports.default = ActivityList;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
	        key: 'handleSubmit',
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
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'form',
	                    { name: 'activityAdd', onSubmit: this.handleSubmit },
	                    _react2.default.createElement('input', { type: 'text', name: 'activity_type', placeholder: 'Activity Type' }),
	                    _react2.default.createElement('input', { type: 'text', name: 'value', placeholder: 'Value' }),
	                    _react2.default.createElement(
	                        'button',
	                        null,
	                        'Add'
	                    )
	                )
	            );
	        }
	    }]);

	    return ActivityAdd;
	}(_react2.default.Component);

	exports.default = ActivityAdd;

/***/ })
]);