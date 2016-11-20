import {getMaxCoordinats} from '../utils/dots.js';
import {VIEW_BOX, DOTS, MONTHS} from '../config/config.js';

import ChartDot from '../../src/reactModules/ChartDot.jsx';
import ChartPopup from '../../src/reactModules/ChartPopup.jsx';

const maxYValue = getMaxCoordinats(DOTS).y;
const maxXValue = getMaxCoordinats(DOTS).x;

const heightProportion = VIEW_BOX.height / maxYValue;
const widthProportion = VIEW_BOX.width / maxXValue;


class Chart extends React.Component {
  constructor() {
    super();

    this.handleChartClick = this.handleChartClick.bind(this);
    this.state = {
      popup: {}
    };
  }

  handleChartClick(e) {
    const obj = e;
    const {offsetX, offsetY} = e.nativeEvent;

    const valueX = Math.round(offsetX / widthProportion);
    const valueY = Math.round((VIEW_BOX.height - offsetY) / heightProportion);

    // костыли дл полуения даты, из-за губых округлений даты не точные, для точных дат нужно заводить данные про месяцы
    const dayNum = (offsetX * 365) / VIEW_BOX.width
    let day = Math.round((offsetX * 365) / VIEW_BOX.width);
    const month = Math.ceil(day / 30);
    const year = 2016;
    day = day <= 31 ? day : day - Math.floor(day / 30) * 30;

    this.setState({
      popup: {
        visible: true,
        position: {
          left: offsetX + VIEW_BOX.paddingLeft,
          top: offsetY,
        },
        value: valueY,
        date: `${day}.${month}.${year}`
      }
    });
  }

  render() {
    const {visible, position} = this.state.popup;

    const editedDots = DOTS.map( item => {
      const x = +item.split(',')[0];
      const y = +item.split(',')[1];

      return `${x * widthProportion},${y * heightProportion}`;
    });

    const months = MONTHS.map( (item, key) => <div key={key} className="x-label__item">{item}</div>);

    // шаг 20,
    const axelPointsCount = maxYValue / 30; // кол во точек
    const heightBetweenDots = Math.round(VIEW_BOX.height / axelPointsCount); // высота одной точки
    const axelPoints = [];
    for (let i = 0; i < axelPointsCount; i++) {
        axelPoints[i] = i * heightBetweenDots;
    }

    const axelsX = axelPoints.map( (item, key) => {
      return key !== 0 ? (<g className="axel x-axel" key={key}>
              <line x1="0" x2={VIEW_BOX.width} y1={item} y2={item}></line>
            </g>) : '';
    });

    const axelPointsReversed = [...axelPoints].reverse();
    const labelsY = axelPoints.map((item, key) =>
      <text key={key} x="0" y={item}>{Math.round(axelPointsReversed[key - 1] / heightProportion)}</text>
    );


    return(
      <div className="chart">
        {visible && <ChartPopup {...this.state.popup} viewBox={VIEW_BOX} />}
        {visible && <ChartDot {...position} />}

        <svg viewBox={`0 0 ${VIEW_BOX.width} ${VIEW_BOX.height}`} className="chart">
          <g className="axel y-axel">
            <line x1="0" x2="0" y1="0" y2={VIEW_BOX.height}></line>
          </g>
          <g className="axel x-axel">
            <line x1="0" x2={VIEW_BOX.width} y1={VIEW_BOX.height} y2={VIEW_BOX.height}></line>
          </g>
          {axelsX}
          <g className="label y-label">
            {labelsY}
          </g>
          <g className="stroke-container">
            <polyline
              ref="chart"
              onClick={this.handleChartClick}
              className="stroke"
              fill="none"
              strokeWidth="3"
              points={editedDots.join( ' ' )} />
          </g>
        </svg>
        <div className="x-label">
          {months}
        </div>
    </div>
    );
  }
}

export default Chart;
