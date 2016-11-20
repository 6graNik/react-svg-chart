"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dots = ["1,120", "20,60", "40,80", "60,20", "80,80", "100,80", "120,60", "140,100", "160,90", "180,80", "200, 110", "220, 10", "240, 70", "365, 100"];

var viewBox = {
  width: 864,
  height: 280
};

var maxYValue = dots.map(function (coordinat) {
  return +coordinat.split(',')[1];
}).sort(function (a, b) {
  if (a > b) return 1;
  if (a < b) return -1;
})[dots.length - 1];

var maxXValue = dots.map(function (coordinat) {
  return +coordinat.split(',')[0];
}).sort(function (a, b) {
  if (a > b) return 1;
  if (a < b) return -1;
})[dots.length - 1];

var heightProportion = viewBox.height / maxYValue;
var widthProportion = viewBox.width / maxXValue;

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
    key: "handleChartClick",
    value: function handleChartClick(e) {
      var obj = e;
      var _e$nativeEvent = e.nativeEvent,
          offsetX = _e$nativeEvent.offsetX,
          offsetY = _e$nativeEvent.offsetY;


      var valueX = Math.round(offsetX / widthProportion);
      var valueY = Math.round((viewBox.height - offsetY) / heightProportion);

      var dayNum = offsetX * 365 / viewBox.width;
      var day = Math.round(offsetX * 365 / viewBox.width);
      var month = Math.ceil(day / 30);
      var year = 2016;
      day = day <= 31 ? day : day - Math.floor(day / 30) * 30;

      this.setState({
        popup: {
          visible: true,
          position: {
            left: offsetX,
            top: offsetY
          },
          value: valueY,
          date: day + "." + month + "." + year
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _state$popup = this.state.popup,
          visible = _state$popup.visible,
          position = _state$popup.position;


      var editedDots = dots.map(function (item) {
        var x = +item.split(',')[0];
        var y = +item.split(',')[1];

        return x * widthProportion + "," + y * heightProportion;
      });
      // шаг 20,
      var axelPointsCount = maxYValue / 30; // кол во точек
      var heightBetweenDots = Math.round(viewBox.height / axelPointsCount); // высота одной точки
      var axelPoints = [];
      for (var i = 0; i < axelPointsCount; i++) {
        axelPoints[i] = i * heightBetweenDots;
      }

      var axelsX = axelPoints.map(function (item, key) {
        return key !== 0 ? React.createElement(
          "g",
          { className: "axel x-axel", key: key },
          React.createElement("line", { x1: "0", x2: viewBox.width, y1: item, y2: item })
        ) : '';
      });

      var labelsY = axelPoints.map(function (item, key) {
        return React.createElement(
          "text",
          { key: key, x: "0", y: item },
          Math.round(item / heightProportion)
        );
      });

      return React.createElement(
        "div",
        { className: "chart" },
        visible && React.createElement(ChartPopup, this.state.popup),
        visible && React.createElement(ChartDot, position),
        React.createElement(
          "span",
          null,
          "lol"
        ),
        React.createElement(
          "svg",
          { viewBox: "0 0 " + viewBox.width + " " + viewBox.height, className: "chart" },
          React.createElement(
            "g",
            { className: "axel y-axel" },
            React.createElement("line", { x1: "0", x2: "0", y1: "0", y2: viewBox.height })
          ),
          React.createElement(
            "g",
            { className: "axel x-axel" },
            React.createElement("line", { x1: "0", x2: viewBox.width, y1: viewBox.height, y2: viewBox.height })
          ),
          axelsX,
          React.createElement(
            "g",
            { className: "label y-label" },
            labelsY
          ),
          React.createElement(
            "g",
            { transform: "translate(-100, 0)", className: "labels y-labels" },
            React.createElement(
              "text",
              { x: "80", y: "15" },
              "15"
            ),
            React.createElement(
              "text",
              { x: "80", y: "131" },
              "10"
            ),
            React.createElement(
              "text",
              { x: "80", y: "248" },
              "5"
            ),
            React.createElement(
              "text",
              { x: "80", y: "373" },
              "0"
            ),
            React.createElement(
              "text",
              { x: "50", y: "200", className: "label-title" },
              "Price"
            )
          ),
          React.createElement(
            "g",
            { className: "stroke-container" },
            React.createElement("polyline", {
              ref: "chart",
              onClick: this.handleChartClick,
              className: "stroke",
              fill: "none",
              strokeWidth: "3",
              points: editedDots.join(' ') })
          )
        )
      );
    }
  }]);

  return Chart;
}(React.Component);

function ChartPopup(props) {
  var date = props.date,
      value = props.value,
      position = props.position;

  var visibleOffset = 50;

  var top = position.top > viewBox.height / 2 ? position.top - visibleOffset : position.top + visibleOffset;

  return React.createElement(
    "div",
    { className: "chartPopup", style: { top: top + 'px', left: position.left + 'px' } },
    React.createElement(
      "div",
      { className: "chartPopup__date" },
      date
    ),
    React.createElement(
      "div",
      { className: "chartPopup__content" },
      React.createElement(
        "span",
        { className: "chartPopup__value" },
        value
      )
    )
  );
}

function ChartDot(props) {
  var top = props.top,
      left = props.left;

  var itemOffset = { top: 11, left: 6 };

  return React.createElement("span", { className: "chartDot", style: { top: top + itemOffset.top + 'px', left: left - itemOffset.left + 'px' } });
}

ReactDOM.render(React.createElement(Chart, null), document.getElementById('root'));
