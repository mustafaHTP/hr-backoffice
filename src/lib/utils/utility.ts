import { LeaveType, LimitScope } from "@/generated/prisma/client";
import { DAYS_PER_LEAVE_PERIOD_TYPE } from "@/types/leave-request";

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

export function getPeriodDays(leaveType: LeaveType) {
  if (leaveType.limitScope !== LimitScope.PER_PERIOD) return null;

  const { periodType, periodQuantity } = leaveType;
  if (!periodType) return null;
  if (!periodQuantity) return null;

  return DAYS_PER_LEAVE_PERIOD_TYPE[periodType] * periodQuantity;
}

export function subtractDates(date1: Date, date2: Date) {
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
  const diffInMilliseconds = date1.getTime() - date2.getTime();

  return Math.round(diffInMilliseconds / oneDay); // Convert milliseconds to days
}
