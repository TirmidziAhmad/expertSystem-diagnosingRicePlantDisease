//parse float to percentage
export default function parseFloatToPercentage(float: number) {
  if (float === 0) return '0%';
  return float * 100 + ' %';
}
