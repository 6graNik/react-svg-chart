(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Chart = require('./src/reactModules/Chart.jsx');

var _Chart2 = _interopRequireDefault(_Chart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

ReactDOM.render(React.createElement(_Chart2.default, null), document.getElementById('root'));

},{"./src/reactModules/Chart.jsx":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DOTS = exports.DOTS = ["1,120", "20,60", "40,80", "60,20", "80,80", "100,80", "120,60", "140,100", "160,90", "180,80", "200, 110", "220, 10", "240, 70", "365, 100"];

var VIEW_BOX = exports.VIEW_BOX = {
  width: 864,
  height: 280,
  paddingLeft: 30
};

var MONTHS = exports.MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dots = require('../utils/dots.js');

var _config = require('../config/config.js');

var _ChartDot = require('../../src/reactModules/ChartDot.jsx');

var _ChartDot2 = _interopRequireDefault(_ChartDot);

var _ChartPopup = require('../../src/reactModules/ChartPopup.jsx');

var _ChartPopup2 = _interopRequireDefault(_ChartPopup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var maxYValue = (0, _dots.getMaxCoordinats)(_config.DOTS).y;
var maxXValue = (0, _dots.getMaxCoordinats)(_config.DOTS).x;

var heightProportion = _config.VIEW_BOX.height / maxYValue;
var widthProportion = _config.VIEW_BOX.width / maxXValue;

var Chart = function (_React$Component) {
  _inherits(Chart, _React$Component);

  function Chart() {
    _classCallCheck(this, Chart);

    var _this = _possibleConstructorReturn(this, (Chart.__proto__ || Object.getPrototypeOf(Chart)).call(this));

    _this.handleChartClick = _this.handleChartClick.bind(_this);
    _this.state = {
      popup: {}
    };
    return _this;
  }

  _createClass(Chart, [{
    key: 'handleChartClick',
    value: function handleChartClick(e) {
      var obj = e;
      var _e$nativeEvent = e.nativeEvent,
          offsetX = _e$nativeEvent.offsetX,
          offsetY = _e$nativeEvent.offsetY;


      var valueX = Math.round(offsetX / widthProportion);
      var valueY = Math.round((_config.VIEW_BOX.height - offsetY) / heightProportion);

      // костыли дл полуения даты, из-за губых округлений даты не точные, для точных дат нужно заводить данные про месяцы
      var dayNum = offsetX * 365 / _config.VIEW_BOX.width;
      var day = Math.round(offsetX * 365 / _config.VIEW_BOX.width);
      var month = Math.ceil(day / 30);
      var year = 2016;
      day = day <= 31 ? day : day - Math.floor(day / 30) * 30;

      this.setState({
        popup: {
          visible: true,
          position: {
            left: offsetX + _config.VIEW_BOX.paddingLeft,
            top: offsetY
          },
          value: valueY,
          date: day + '.' + month + '.' + year
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state$popup = this.state.popup,
          visible = _state$popup.visible,
          position = _state$popup.position;


      var editedDots = _config.DOTS.map(function (item) {
        var x = +item.split(',')[0];
        var y = +item.split(',')[1];

        return x * widthProportion + ',' + y * heightProportion;
      });

      var months = _config.MONTHS.map(function (item, key) {
        return React.createElement(
          'div',
          { key: key, className: 'x-label__item' },
          item
        );
      });

      // шаг 20,
      var axelPointsCount = maxYValue / 30; // кол во точек
      var heightBetweenDots = Math.round(_config.VIEW_BOX.height / axelPointsCount); // высота одной точки
      var axelPoints = [];
      for (var i = 0; i < axelPointsCount; i++) {
        axelPoints[i] = i * heightBetweenDots;
      }

      var axelsX = axelPoints.map(function (item, key) {
        return key !== 0 ? React.createElement(
          'g',
          { className: 'axel x-axel', key: key },
          React.createElement('line', { x1: '0', x2: _config.VIEW_BOX.width, y1: item, y2: item })
        ) : '';
      });

      var axelPointsReversed = [].concat(axelPoints).reverse();
      var labelsY = axelPoints.map(function (item, key) {
        return React.createElement(
          'text',
          { key: key, x: '0', y: item },
          Math.round(axelPointsReversed[key - 1] / heightProportion)
        );
      });

      return React.createElement(
        'div',
        { className: 'chart' },
        visible && React.createElement(_ChartPopup2.default, _extends({}, this.state.popup, { viewBox: _config.VIEW_BOX })),
        visible && React.createElement(_ChartDot2.default, position),
        React.createElement(
          'svg',
          { viewBox: '0 0 ' + _config.VIEW_BOX.width + ' ' + _config.VIEW_BOX.height, className: 'chart' },
          React.createElement(
            'g',
            { className: 'axel y-axel' },
            React.createElement('line', { x1: '0', x2: '0', y1: '0', y2: _config.VIEW_BOX.height })
          ),
          React.createElement(
            'g',
            { className: 'axel x-axel' },
            React.createElement('line', { x1: '0', x2: _config.VIEW_BOX.width, y1: _config.VIEW_BOX.height, y2: _config.VIEW_BOX.height })
          ),
          axelsX,
          React.createElement(
            'g',
            { className: 'label y-label' },
            labelsY
          ),
          React.createElement(
            'g',
            { className: 'stroke-container' },
            React.createElement('polyline', {
              ref: 'chart',
              onClick: this.handleChartClick,
              className: 'stroke',
              fill: 'none',
              strokeWidth: '3',
              points: editedDots.join(' ') })
          )
        ),
        React.createElement(
          'div',
          { className: 'x-label' },
          months
        )
      );
    }
  }]);

  return Chart;
}(React.Component);

exports.default = Chart;

},{"../../src/reactModules/ChartDot.jsx":4,"../../src/reactModules/ChartPopup.jsx":5,"../config/config.js":2,"../utils/dots.js":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function ChartDot(props) {
  var top = props.top,
      left = props.left;

  var itemOffset = { top: -6, left: 6 };

  return React.createElement('span', { className: 'chartDot', style: { top: top + itemOffset.top + 'px', left: left - itemOffset.left + 'px' } });
}

exports.default = ChartDot;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function ChartPopup(props) {
  var date = props.date,
      value = props.value,
      position = props.position,
      viewBox = props.viewBox;

  var visibleOffset = 20;

  var top = position.top > viewBox.height / 2 ? position.top - visibleOffset : position.top + visibleOffset;

  return React.createElement(
    'div',
    { className: 'chartPopup', style: { top: top + 'px', left: position.left + 'px' } },
    React.createElement(
      'div',
      { className: 'chartPopup__date' },
      date
    ),
    React.createElement(
      'div',
      { className: 'chartPopup__content' },
      React.createElement(
        'span',
        { className: 'chartPopup__value' },
        value
      )
    )
  );
}

exports.default = ChartPopup;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMaxCoordinats = getMaxCoordinats;
function getMaxCoordinats(dots) {
  var y = dots.map(function (coordinat) {
    return +coordinat.split(',')[1];
  }).sort(function (a, b) {
    if (a > b) return 1;
    if (a < b) return -1;
  })[dots.length - 1];

  var x = dots.map(function (coordinat) {
    return +coordinat.split(',')[0];
  }).sort(function (a, b) {
    if (a > b) return 1;
    if (a < b) return -1;
  })[dots.length - 1];

  return { x: x, y: y };
}

},{}]},{},[1]);
