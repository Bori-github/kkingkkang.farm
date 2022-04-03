export const dateFormatter = (createdAt: string) => {
  const date = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(createdAt));

  const [day, month, year] = date.split('/');
  return `${year}년 ${month}월 ${day}일`;
};
