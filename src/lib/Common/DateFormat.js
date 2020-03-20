// 현재는 'YYYY.MM.DD'와 'YYYY-MM-DD'만을 지원합니다.

const DateFormat = (initalDate, format) => {
  let date = null;

  if (initalDate !== '') {
    date = new Date(initalDate);
  } else {
    date = new Date();
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().length === 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate();

  if (format === 'YYYY-MM-DD') {
    return `${year}-${month}-${day}`;
  } else {
    return `${year}.${month}.${day}`;
  }
};

export default DateFormat;
