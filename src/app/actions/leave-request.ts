"use server";

import { LimitScope } from "@/generated/prisma/enums";
import { getEmployee } from "@/lib/dal/employee";
import {
  createLeaveRequest,
  getLeaveRequestsByEmployeeIdAndDate,
  getLeaveRequestsEmployeeUsedInPeriod,
} from "@/lib/dal/leave-request";
import { getLeaveType } from "@/lib/dal/leave-type";
import {
  LeaveRequestSchema,
  leaveRequestSchema,
} from "@/lib/schemas/leave-request";
import { inclusiveDayCount } from "@/lib/utils/date-utils";
import { getPeriodDays, subtractDates } from "@/lib/utils/utility";
import { ActionResponse } from "@/types/action-response";
import {
  LeavePeriod,
  LeaveRequestValidationResponse,
  MAX_DAYS_PER_LEAVE_REQUEST,
  MIN_DAYS_PER_LEAVE_REQUEST,
} from "@/types/leave-request";

export async function createLeaveRequestAction(
  leaveRequest: LeaveRequestSchema,
): Promise<ActionResponse> {
  if (!leaveRequest.leaveTypeId) {
    return {
      success: false,
      error: "Please select a leave type.",
    };
  }

  const zodValidationResult = leaveRequestSchema.safeParse(leaveRequest);
  if (!zodValidationResult.success) {
    console.log(zodValidationResult.error);
    return {
      success: false,
      errors: zodValidationResult.error.flatten().fieldErrors,
      error: "Check related field(s) for an error",
    };
  }

  const leaveRequestValidationResult = await validateLeaveRequest(
    leaveRequest.startDate,
    leaveRequest.endDate,
    Number(leaveRequest.leaveTypeId),
    leaveRequest.employeeId,
  );
  if (!leaveRequestValidationResult.success) {
    return {
      success: false,
      error: leaveRequestValidationResult.error,
    };
  }

  await createLeaveRequest(zodValidationResult.data);

  return {
    success: true,
    message: "Leave Request created successfully",
  };
}

export async function validateLeaveRequest(
  startDate: Date,
  endDate: Date,
  leaveTypeId: number,
  employeeId: number,
): Promise<LeaveRequestValidationResponse> {
  const requestedDays = inclusiveDayCount(startDate, endDate);

  // 1. requested days must be bigger than MIN_DAYS_PER_LEAVE_REQUEST
  if (requestedDays <= MIN_DAYS_PER_LEAVE_REQUEST) {
    return {
      success: false,
      error: `Requested days must be bigger than ${MIN_DAYS_PER_LEAVE_REQUEST} day(s)`,
    };
  }

  // 2. requested days must be less than MAX_DAYS_PER_LEAVE_REQUEST
  if (requestedDays >= MAX_DAYS_PER_LEAVE_REQUEST) {
    return {
      success: false,
      error: `Requested days must be less than ${MAX_DAYS_PER_LEAVE_REQUEST} day(s)`,
    };
  }

  // 3. check is there any overlapped leave requests
  const leaveType = await getLeaveType(leaveTypeId);
  if (!leaveType) {
    return {
      success: false,
      error: "Selected leave type not found",
    };
  }

  const overlappedLeaveRequests = await getLeaveRequestsByEmployeeIdAndDate(
    employeeId,
    startDate,
    endDate,
  );

  if (overlappedLeaveRequests.length > 0) {
    return {
      success: false,
      error: "There is overlapping leave requests",
    };
  }

  if (leaveType.limitScope === LimitScope.PER_REQUEST) {
    // Check day limit for leave type
    if (!leaveType.perRequestMaxDays) {
      return {
        success: false,
        error: `Inconsistency in db for selected leave type ${leaveType.name}`,
      };
    }

    if (requestedDays > leaveType.perRequestMaxDays) {
      return {
        success: false,
        error: "You exceed day limit",
      };
    }
  } else if (leaveType.limitScope === LimitScope.PER_PERIOD) {
    // Get used days that employee used in current period
    if (!leaveType.periodQuantity) {
      return {
        success: false,
        error: `Inconsistency in db for selected leave type ${leaveType.name}`,
      };
    }

    if (!leaveType.periodType) {
      return {
        success: false,
        error: `Inconsistency in db for selected leave type ${leaveType.name}`,
      };
    }

    if (!leaveType.periodMaxDays) {
      return {
        success: false,
        error: `Inconsistency in db for selected leave type ${leaveType.name}`,
      };
    }

    const periodDays = getPeriodDays(leaveType);
    if (!periodDays) {
      return {
        success: false,
        error: `Period days could not be calculated for ${leaveType.name}`,
      };
    }
    const currentPeriod = await getCurrentPeriodForEmployee(
      employeeId,
      periodDays,
    );

    if (!currentPeriod) {
      return {
        success: false,
        error: "Current period could not calculated for employee",
      };
    }

    const usedDays = await getUsedDaysForEmployee(
      employeeId,
      leaveTypeId,
      currentPeriod,
    );

    const leftDays = leaveType.periodMaxDays - usedDays;
    if (leftDays <= 0) {
      return {
        success: false,
        error: "Not enough days to make leave request",
      };
    }

    if (leftDays < requestedDays) {
      return {
        success: false,
        error: "You exceed day limit determined by your manager",
      };
    }
  }

  // for Limit scope === NONE, no check
  return {
    success: true,
  };
}

async function getCurrentPeriodForEmployee(
  employeeId: number,
  periodDays: number,
): Promise<LeavePeriod | null> {
  const employee = await getEmployee(employeeId);
  if (!employee || !employee.hireDate) {
    return null;
  }

  const today = new Date();
  const daysSinceHire = subtractDates(today, employee.hireDate);

  // 1. Determine how many full periods have passed
  const periodsElapsed = Math.floor(daysSinceHire / periodDays);

  // 2. Calculate the start date of the current period
  // We add (periodsElapsed * periodDays) to the hire date
  const currentPeriodStart = new Date(employee.hireDate);
  currentPeriodStart.setDate(
    currentPeriodStart.getDate() + periodsElapsed * periodDays,
  );

  // 3. Calculate the end date (one period length after the start)
  const currentPeriodEnd = new Date(currentPeriodStart);
  currentPeriodEnd.setDate(currentPeriodEnd.getDate() + periodDays);

  return {
    startDate: currentPeriodStart,
    endDate: currentPeriodEnd,
  };
}

async function getUsedDaysForEmployee(
  employeeId: number,
  leaveTypeId: number,
  leavePeriod: LeavePeriod,
) {
  const leaveRequets = await getLeaveRequestsEmployeeUsedInPeriod(
    employeeId,
    leaveTypeId,
    leavePeriod,
  );

  let usedDays = 0;
  if (leaveRequets.length > 0) {
    for (let i = 0; i < leaveRequets.length; i++) {
      usedDays += leaveRequets[i].totalDays;
    }
  }

  return usedDays;
}
