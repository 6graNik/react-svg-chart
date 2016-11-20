const dots = [
  "1,120",
  "20,60",
  "40,80",
  "60,20",
  "80,80",
  "100,80",
  "120,60",
  "140,100",
  "160,90",
  "180,80",
  "200, 110",
  "220, 10",
  "240, 70",
  "365, 100"
];

const viewBox = {
  width: 864,
  height: 280
};

const maxYValue = dots.map( coordinat => +coordinat.split(',')[1]).sort((a,b) => {
  if (a > b) return 1;
  if (a < b) return -1;
})[dots.length - 1];

const maxXValue = dots.map( coordinat => +coordinat.split(',')[0]).sort((a,b) => {
  if (a > b) return 1;
  if (a < b) return -1;
})[dots.length - 1];

const heightProportion = viewBox.height / maxYValue;
const widthProportion = viewBox.width / maxXValue;


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
    console.log(">>>> ", offsetX, offsetY);

    const valueX = Math.round(offsetX / widthProportion);
    const valueY = Math.round((viewBox.height - offsetY) / heightProportion);

    const dayNum = (offsetX * 365) / viewBox.width
    let day = Math.round((offsetX * 365) / viewBox.width);
    const month = Math.ceil(day / 30);
    const year = 2016;
    day = day <= 31 ? day : day - Math.floor(day / 30) * 30;

    this.setState({
      popup: {
        visible: true,
        position: {
          left: offsetX,
          top: offsetY,
        },
        value: valueY,
        date: `${day}.${month}.${year}`
      }
    });
  }

  render() {
    const {visible, position} = this.state.popup;

    const editedDots = dots.map( item => {
      const x = +item.split(',')[0];
      const y = +item.split(',')[1];

      return `${x * widthProportion},${y * heightProportion}`;
    });
    // шаг 20,
    const axelPointsCount = maxYValue / 30; // кол во точек
    const heightBetweenDots = Math.round(viewBox.height / axelPointsCount); // высота одной точки
    const axelPoints = [];
    for (let i = 0; i < axelPointsCount; i++) {
        axelPoints[i] = i * heightBetweenDots;
    }


    const axelsX = axelPoints.map( (item, key) =>
      <g className="axel x-axel" key={key}>
        <line x1="0" x2={viewBox.width} y1={item} y2={item}></line>
      </g>
    );

    const labelsY = axelPoints.map((item, key) =>
      <text x="0" y={item}>{Math.round(item / heightProportion)}</text>
    );


    return(
      <div className="chart">
        {visible && <ChartPopup {...this.state.popup}/>}
        {visible && <ChartDot {...position} />}
        <span>lol</span>
        <svg viewBox={`0 0 ${viewBox.width} ${viewBox.height}`} className="chart">
          <g className="axel y-axel">
            <line x1="0" x2="0" y1="0" y2={viewBox.height}></line>
          </g>
          {axelsX}
          <g className="label y-label">
            {labelsY}
          </g>
          <g transform="translate(-100, 0)" className="labels y-labels">
            <text x="80" y="15">15</text>
            <text x="80" y="131">10</text>
            <text x="80" y="248">5</text>
            <text x="80" y="373">0</text>
            <text x="50" y="200" className="label-title">Price</text>
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
    </div>
    );
  }
}

function ChartPopup(props) {
  const {date, value, position} = props;
  const visibleOffset = 50;

  const top = position.top > viewBox.height / 2 ? position.top - visibleOffset : position.top + visibleOffset;

  return(
    <div className="chartPopup" style={{top: top + 'px', left: position.left + 'px'}}>
      <div className="chartPopup__date">{date}</div>
      <div className="chartPopup__content">
          <span className="chartPopup__value">{value}</span>
          {/* <span className="chartPopup__value">{diff}</span> */}
      </div>
    </div>
  );
}

function ChartDot(props) {
  const {top, left} = props;

  return(
    <span className="chartDot" style={{top: top + 11 + 'px', left: left + 'px'}}></span>
  );

}


ReactDOM.render(
  <Chart />,
  document.getElementById('root')
);
