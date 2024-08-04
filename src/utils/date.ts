const padZero = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};
function getMonthValue(month: number) {
  const adjustedMonth = month + 1;
  return adjustedMonth === 13 ? "01" : padZero(adjustedMonth);
}
