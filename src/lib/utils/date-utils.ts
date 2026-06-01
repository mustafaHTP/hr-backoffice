import { differenceInCalendarDays } from "date-fns";

export function inclusiveDayCount(start: Date, end: Date): number {
  return differenceInCalendarDays(end, start) + 1;
}

export function subtractDates(date1: Date, date2: Date) {
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
  const diffInMilliseconds = date1.getTime() - date2.getTime();

  return Math.round(diffInMilliseconds / oneDay); // Convert milliseconds to days
}
