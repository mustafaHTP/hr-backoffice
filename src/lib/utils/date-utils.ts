import { differenceInCalendarDays } from "date-fns";

export function inclusiveDayCount(start: Date, end: Date): number {
  return differenceInCalendarDays(end, start) + 1;
}
