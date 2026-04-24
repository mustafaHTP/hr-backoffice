export function isNumber(number: string) {
  return typeof number === "string" && !isNaN(Number(number));
}
