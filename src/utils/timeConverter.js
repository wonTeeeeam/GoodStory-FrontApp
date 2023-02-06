export function convertTimeToKorean(rawTime) {
  const inputTime = new Date(rawTime);
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

export function convertTimeToStandardFormat(createdDate) {
  const inputDate = new Date(createdDate);
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    inputDate.getDate() +
    ' ' +
    month[inputDate.getMonth()] +
    ' ' +
    inputDate.getFullYear() +
    ' / ' +
    inputDate.getHours() +
    ':' +
    inputDate.getMinutes()
  );
}
