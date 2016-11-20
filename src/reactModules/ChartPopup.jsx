function ChartPopup(props) {
  const {date, value, position, viewBox} = props;
  const visibleOffset = 20;

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

export default ChartPopup;
