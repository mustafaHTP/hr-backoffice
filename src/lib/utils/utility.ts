export function isNumber(number: string) {
  return typeof number === "string" && !isNaN(Number(number));
}

export function getInitials(firstName: string, lastName: string): string {
  if (!firstName || !lastName) return "??";

  const first = firstName.trim();
  const last = lastName.trim();

  const initials = first[0] + last[0];

  return initials.toUpperCase();
}
