export const dateFormatter = (createdAt: string) => {
  const nowDate = new Date();
  const createdDate = new Date(createdAt);
  const minTimeGap =
    Math.floor(nowDate.getTime() - createdDate.getTime()) / 1000 / 60;

  const date = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(createdAt));
  const [day, month, year] = date.split('/');

  if (minTimeGap < 1) {
    return '방금 전';
  }
  if (minTimeGap < 60) {
    return `${Math.floor(minTimeGap)}분 전`;
  }
  if (minTimeGap / 24 < 24) {
    return `${Math.floor(minTimeGap / 24)}시간 전`;
  }

  return `${year}년 ${month}월 ${day}일`;
};
