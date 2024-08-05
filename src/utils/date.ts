export const padZero = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};
export const getMonthValue = (month: number) => {
  const adjustedMonth = month + 1;
  return adjustedMonth === 13 ? "01" : padZero(adjustedMonth);
};

export const formatDate = (createDate: string) => {
  const date = new Date(createDate);
  const year = date.getFullYear();
  const month = getMonthValue(date.getMonth());
  const day = padZero(date.getDate());
  const hour = padZero(date.getHours());
  const minute = padZero(date.getMinutes());

  return `${year}-${month}-${day} ${hour}:${minute}
  `;
};
