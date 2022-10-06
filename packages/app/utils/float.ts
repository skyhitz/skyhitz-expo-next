export function convertToString(num: number, fractionDigits = 6): string {
  return parseFloat(num.toFixed(fractionDigits)).toString();
}
