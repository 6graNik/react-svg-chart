class Chart extends React.Component {
  render() {
    const dots = [
      "00,120",
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
      "260, 100",
      "280, 100",
      "300, 40",
      "320, 0",
      "340, 100",
      "360, 100",
      "380, 120",
      "400, 60",
      '420, 70',
      "440, 80"
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


    return(
      <div className="chart">
        <span>lol</span>
        <svg viewBox={`0 0 ${viewBox.width} ${viewBox.height}`} className="chart">
          <g className="axel y-axel">
            <line x1="0" x2="0" y1="0" y2={viewBox.height}></line>
          </g>
          <g className="axel y-axel">
            <line x1="0" x2={viewBox.width} y1={viewBox.height} y2={viewBox.height}></line>
          </g>
          {axelsX}
          <g className="labels x-labels">
            <text x="100" y="400">2008</text>
            <text x="246" y="400">2009</text>
            <text x="392" y="400">2010</text>
            <text x="538" y="400">2011</text>
            <text x="684" y="400">2012</text>
            <text x="400" y="440" className="label-title">Year</text>
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


ReactDOM.render(
  <Chart />,
  document.getElementById('root')
);
