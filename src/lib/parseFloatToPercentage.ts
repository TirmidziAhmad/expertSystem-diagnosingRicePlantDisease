//parse float to percentage
export default function parseFloatToPercentage(float: number) {
  if (float === 0) return '0%';
  //2 digit float
  const percentage = (float * 100).toFixed(2);
  return `${percentage}%`;
}
