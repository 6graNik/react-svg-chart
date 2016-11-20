function ChartDot(props) {
  const {top, left} = props;
  const itemOffset = {top: -6, left: 6};

  return(
    <span className="chartDot" style={{top: top + itemOffset.top + 'px', left: left - itemOffset.left + 'px'}}></span>
  );
}

export default ChartDot;
