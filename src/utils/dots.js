export function getMaxCoordinats(dots) {
  const y = dots.map( coordinat => +coordinat.split(',')[1]).sort((a,b) => {
    if (a > b) return 1;
    if (a < b) return -1;
  })[dots.length - 1];

  const x = dots.map( coordinat => +coordinat.split(',')[0]).sort((a,b) => {
    if (a > b) return 1;
    if (a < b) return -1;
  })[dots.length - 1];

  return {x, y};
}
