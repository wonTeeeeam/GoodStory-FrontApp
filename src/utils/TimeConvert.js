export default function timeConvert(rawTime) {
  const inputTime = rawTime.getTime();
  const presentTime = Date.now();

  const gap = presentTime - inputTime;

  //   1분 미만
  if (gap <= 59000) {
    return '방금';
    // 60분 미만
  } else if (gap < 3600000) {
    return `${parseInt(gap / 60000, 10)}분`;
    // 24시간 미만
  } else if (gap < 86400000) {
    return `${parseInt(gap / 3600000, 10)}시간`;
  } else {
    return '1일 이상';
  }
}
