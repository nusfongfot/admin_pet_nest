export const numberWithComma = (number: number) => {
  return Number(number)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
