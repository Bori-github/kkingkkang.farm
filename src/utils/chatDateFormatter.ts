export const chatDateFormatter = (createdAt: string) => {
  const nowDate = new Date();
  const createdDate = new Date(createdAt);
  const hourTimeGap =
    Math.floor(nowDate.getTime() - createdDate.getTime()) / 1000 / 60 / 24;

  const date = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(createdDate);
  const [year, month, day, time] = date.split('. ');

  if (hourTimeGap < 24) {
    return `${time}`;
  }
  if (hourTimeGap < 48) {
    return '어제';
  }
  if (parseInt(year, 10) === createdDate.getFullYear()) {
    return `${month}월 ${day}일`;
  }

  return `${year}.${month}.${day}`;
};
