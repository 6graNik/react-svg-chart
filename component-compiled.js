"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chart = function (_React$Component) {
  _inherits(Chart, _React$Component);

  function Chart() {
    _classCallCheck(this, Chart);

    return _possibleConstructorReturn(this, (Chart.__proto__ || Object.getPrototypeOf(Chart)).apply(this, arguments));
  }

  _createClass(Chart, [{
    key: "render",
    value: function render() {
      var dots = ["00,120", "20,60", "40,80", "60,20", "80,80", "100,80", "120,60", "140,100", "160,90", "180,80", "200, 110", "220, 10", "240, 70", "260, 100", "280, 100", "300, 40", "320, 0", "340, 100", "360, 100", "380, 120", "400, 60", '420, 70', "440, 80"];

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
        return React.createElement(
          "g",
          { className: "axel x-axel", key: key },
          React.createElement("line", { x1: "0", x2: viewBox.width, y1: item, y2: item })
        );
      });

      return React.createElement(
        "div",
        { className: "chart" },
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
            { className: "axel y-axel" },
            React.createElement("line", { x1: "0", x2: viewBox.width, y1: viewBox.height, y2: viewBox.height })
          ),
          axelsX,
          React.createElement(
            "g",
            { className: "labels x-labels" },
            React.createElement(
              "text",
              { x: "100", y: "400" },
              "2008"
            ),
            React.createElement(
              "text",
              { x: "246", y: "400" },
              "2009"
            ),
            React.createElement(
              "text",
              { x: "392", y: "400" },
              "2010"
            ),
            React.createElement(
              "text",
              { x: "538", y: "400" },
              "2011"
            ),
            React.createElement(
              "text",
              { x: "684", y: "400" },
              "2012"
            ),
            React.createElement(
              "text",
              { x: "400", y: "440", className: "label-title" },
              "Year"
            )
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

ReactDOM.render(React.createElement(Chart, null), document.getElementById('root'));
