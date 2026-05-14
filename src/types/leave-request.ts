import { LimitScope, PeriodType } from "@/generated/prisma/enums";

export const MIN_DAYS_PER_LEAVE_REQUEST = 0;
export const MAX_DAYS_PER_LEAVE_REQUEST = 360;

export interface LeaveRequestValidationResponse {
  success: boolean;
  error?: string;
}

export const DAYS_PER_LEAVE_PERIOD_TYPE: Record<PeriodType, number> = {
  WEEKLY: 7,
  MONTHLY: 30,
  YEARLY: 360,
};

export interface LeavePeriod {
  startDate: Date;
  endDate: Date;
}
