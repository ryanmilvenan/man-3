module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = configureStore;

var _redux = __webpack_require__(3);

var _index = __webpack_require__(10);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureStore(preloadedState) {
  var store = (0, _redux.createStore)(_index2.default, preloadedState);

  return store;
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(configureStore, 'configureStore', '/Users/wind/Development/mangrove/man-3/common/store/configureStore.js');
}();

;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _configureStore = __webpack_require__(2);

var _configureStore2 = _interopRequireDefault(_configureStore);

var _NewsStand = __webpack_require__(9);

var _NewsStand2 = _interopRequireDefault(_NewsStand);

var _AddNewsContainer = __webpack_require__(7);

var _AddNewsContainer2 = _interopRequireDefault(_AddNewsContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Root = function Root(_ref) {
  var store = _ref.store;
  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_AddNewsContainer2.default, null),
      _react2.default.createElement(_NewsStand2.default, null)
    )
  );
};

Root.propTypes = {
  store: _react.PropTypes.object
};

var _default = Root;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Root, 'Root', '/Users/wind/Development/mangrove/man-3/common/components/Root.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/wind/Development/mangrove/man-3/common/components/Root.js');
}();

;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var nextNewsContainerId = 0;
var addNewsContainer = exports.addNewsContainer = function addNewsContainer(url) {
  return {
    type: 'ADD_NEWS_CONTAINER',
    id: nextNewsContainerId++,
    url: url
  };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(nextNewsContainerId, 'nextNewsContainerId', '/Users/wind/Development/mangrove/man-3/common/actions/index.js');

  __REACT_HOT_LOADER__.register(addNewsContainer, 'addNewsContainer', '/Users/wind/Development/mangrove/man-3/common/actions/index.js');
}();

;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _actions = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddNewsContainer = function AddNewsContainer(_ref) {
  var dispatch = _ref.dispatch;

  var input = void 0;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'form',
      { onSubmit: function onSubmit(e) {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch((0, _actions.addNewsContainer)(input.value));
          input.value = '';
        } },
      _react2.default.createElement('input', { ref: function ref(node) {
          input = node;
        } }),
      _react2.default.createElement(
        'button',
        { type: 'submit' },
        'Add News Container'
      )
    )
  );
};
AddNewsContainer = (0, _reactRedux.connect)()(AddNewsContainer);

var _default = AddNewsContainer;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(AddNewsContainer, 'AddNewsContainer', '/Users/wind/Development/mangrove/man-3/common/containers/AddNewsContainer.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/wind/Development/mangrove/man-3/common/containers/AddNewsContainer.js');
}();

;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NewsContainer = function NewsContainer() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'p',
      null,
      'News Container'
    )
  );
};

var _default = NewsContainer;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(NewsContainer, 'NewsContainer', '/Users/wind/Development/mangrove/man-3/common/containers/NewsContainer.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/wind/Development/mangrove/man-3/common/containers/NewsContainer.js');
}();

;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _NewsContainer = __webpack_require__(8);

var _NewsContainer2 = _interopRequireDefault(_NewsContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NewsStand = function NewsStand(_ref) {
  var newsContainers = _ref.newsContainers;
  return _react2.default.createElement(
    'div',
    null,
    newsContainers.map(function (newsContainer) {
      return _react2.default.createElement(_NewsContainer2.default, _extends({
        key: newsContainer.id
      }, newsContainer));
    })
  );
};

NewsStand.propTypes = {
  newsContainers: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    id: _react.PropTypes.number.isRequired,
    url: _react.PropTypes.string.isRequired,
    timeout: _react.PropTypes.number.isRequired
  }).isRequired).isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    newsContainers: state.newsContainers
  };
};

NewsStand = (0, _reactRedux.connect)(mapStateToProps)(NewsStand);

var _default = NewsStand;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(NewsStand, 'NewsStand', '/Users/wind/Development/mangrove/man-3/common/containers/NewsStand.js');

  __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/Users/wind/Development/mangrove/man-3/common/containers/NewsStand.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/wind/Development/mangrove/man-3/common/containers/NewsStand.js');
}();

;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _redux = __webpack_require__(3);

var _news_container_reducer = __webpack_require__(11);

var _news_container_reducer2 = _interopRequireDefault(_news_container_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
  newsContainers: _news_container_reducer2.default
});

var _default = rootReducer;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(rootReducer, 'rootReducer', '/Users/wind/Development/mangrove/man-3/common/reducers/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/wind/Development/mangrove/man-3/common/reducers/index.js');
}();

;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var newsContainer = function newsContainer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case 'ADD_NEWS_CONTAINER':
      return {
        id: action.id,
        url: action.url,
        timeout: 1000 * 60 * 10
      };
    default:
      return state;
  }
};

var newsContainers = function newsContainers() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case 'ADD_NEWS_CONTAINER':
      return [].concat(state, [newsContainer(undefined, action)]);
    default:
      return state;
  }
};

var _default = newsContainers;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(newsContainer, 'newsContainer', '/Users/wind/Development/mangrove/man-3/common/reducers/news_container_reducer.js');

  __REACT_HOT_LOADER__.register(newsContainers, 'newsContainers', '/Users/wind/Development/mangrove/man-3/common/reducers/news_container_reducer.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/wind/Development/mangrove/man-3/common/reducers/news_container_reducer.js');
}();

;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = handleRender;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(5);

var _reactRedux = __webpack_require__(1);

var _configureStore = __webpack_require__(2);

var _configureStore2 = _interopRequireDefault(_configureStore);

var _Root = __webpack_require__(4);

var _Root2 = _interopRequireDefault(_Root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleRender(req, res) {
  var store = (0, _configureStore2.default)();
  var preloadedState = store.getState();

  var html = (0, _server.renderToString)(_react2.default.createElement(_Root2.default, { store: store }));
  res.send(renderFullPage(html, preloadedState));
}

function renderFullPage(html, preloadedState) {
  return '\n    <!doctype html>\n    <html>\n      <head>\n        <title>Carnival In Paradise</title>\n      </head>\n      <body>\n        <div id="root">' + html + '</div>\n        <script>\n          window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState).replace(/</g, '\\x3c') + '\n        </script>\n        <script src="/client.bundle.js"></script>\n      </body>\n    </html>\n    ';
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(handleRender, 'handleRender', '/Users/wind/Development/mangrove/man-3/svr/entry.js');

  __REACT_HOT_LOADER__.register(renderFullPage, 'renderFullPage', '/Users/wind/Development/mangrove/man-3/svr/entry.js');
}();

;

/***/ })
/******/ ]);