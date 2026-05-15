import { LeaveType, LimitScope } from "@/generated/prisma/client";
import { DAYS_PER_LEAVE_PERIOD_TYPE } from "@/types/leave-request";

export function getPeriodDays(leaveType: LeaveType) {
  if (leaveType.limitScope !== LimitScope.PER_PERIOD) return null;

  const { periodType, periodQuantity } = leaveType;
  if (!periodType) return null;
  if (!periodQuantity) return null;

  return DAYS_PER_LEAVE_PERIOD_TYPE[periodType] * periodQuantity;
}
