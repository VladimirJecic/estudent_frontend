function formatNumberToTwoDecimalPlaces(number) {
  const roundedNumber = Math.round(number * 100) / 100;
  const formattedNumber = roundedNumber.toFixed(2);
  return formattedNumber;
}
export { formatNumberToTwoDecimalPlaces };
