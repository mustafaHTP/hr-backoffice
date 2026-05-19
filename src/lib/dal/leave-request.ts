import { LeaveStatus, Prisma } from "@/generated/prisma/client";
import { prisma } from "../prisma";
import { LeavePeriod } from "@/types/leave-request";
import { LeaveRequestSchema } from "../schemas/leave-request";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  QueryParams,
} from "@/types/query-params";

export type LeaveRequestWithEmployeeAndLeaveType =
  Prisma.LeaveRequestGetPayload<{
    include: { leaveType: true; employee: true };
  }>;

export type LeaveRequestDetail = Prisma.LeaveRequestGetPayload<{
  include: {
    employee: { include: { department: true; title: true } };
    leaveType: true;
  };
}>;

export type LeaveRequestWithLeaveType = Prisma.LeaveRequestGetPayload<{
  include: { leaveType: true };
}>;

export async function createLeaveRequestAsync(
  leaveRequest: LeaveRequestSchema,
): Promise<void> {
  try {
    await prisma.leaveRequest.create({
      data: leaveRequest,
    });
  } catch (error) {
    console.error("Error creating leave request:", error);
    throw error;
  }
}

export async function getLeaveRequestsAsync(): Promise<
  LeaveRequestWithEmployeeAndLeaveType[]
> {
  try {
    return await prisma.leaveRequest.findMany({
      include: {
        leaveType: true,
        employee: true,
      },
    });
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    throw error;
  }
}

export async function getLeaveRequestAsync(
  id: number,
): Promise<LeaveRequestDetail | null> {
  try {
    return await prisma.leaveRequest.findUnique({
      where: {
        id: id,
      },
      include: {
        employee: {
          include: {
            department: true,
            title: true,
          },
        },
        leaveType: true,
      },
    });
  } catch (error) {
    console.error(`Error fetching leave request with id ${id}:`, error);
    throw error;
  }
}

export async function getLeaveRequestsByEmployeeIdAsync(
  employeeId: number,
  queryParams?: QueryParams,
): Promise<LeaveRequestWithLeaveType[]> {
  try {
    const page = queryParams?.pageNumber ?? DEFAULT_PAGE_NUMBER;
    const pageSize = queryParams?.pageSize ?? DEFAULT_PAGE_SIZE;

    return await prisma.leaveRequest.findMany({
      where: {
        employeeId: employeeId,
      },
      include: {
        leaveType: true,
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
  } catch (error) {
    console.error(
      `Error fetching leave requests for employee id ${employeeId}:`,
      error,
    );
    throw error;
  }
}

export async function getLeaveRequestCountByEmployeeIdAsync(
  employeeId: number,
) {
  try {
    return await prisma.leaveRequest.count({
      where: {
        employeeId: employeeId,
      },
    });
  } catch (error) {
    console.error(
      `Error fetching leave requests count for employee id ${employeeId}:`,
      error,
    );
    throw error;
  }
}

export async function getLeaveRequestsByEmployeeIdAndDateAsync(
  employeeId: number,
  startDate: Date,
  endDate: Date,
) {
  try {
    const leaveRequests = await prisma.leaveRequest.findMany({
      where: {
        employeeId: employeeId,
        startDate: {
          lte: endDate,
        },
        endDate: {
          gte: startDate,
        },
      },
    });

    return leaveRequests;
  } catch (error) {
    console.error(
      `Error fetching leave requests for employee id ${employeeId}:`,
      error,
    );
    throw error;
  }
}

export async function getLeaveRequestsEmployeeUsedInPeriodAsync(
  employeeId: number,
  leaveTypeId: number,
  leavePeriod: LeavePeriod,
) {
  try {
    const leaveRequests = await prisma.leaveRequest.findMany({
      where: {
        employeeId: employeeId,
        leaveTypeId: leaveTypeId,
        startDate: {
          lte: leavePeriod.endDate,
        },
        endDate: {
          gte: leavePeriod.startDate,
        },
      },
    });

    return leaveRequests;
  } catch (error) {
    console.error(
      `Error fetching leave requests for employee id ${employeeId}:`,
      error,
    );
    throw error;
  }
}

export async function updateLeaveRequestStatusAsync(
  leaveRequestId: number,
  leaveStatus: LeaveStatus,
) {
  try {
    await prisma.leaveRequest.update({
      where: {
        id: leaveRequestId,
      },
      data: {
        status: leaveStatus,
      },
    });
  } catch (error) {
    console.error(
      `Error updating leave request status for id ${leaveRequestId}:`,
      error,
    );
    throw error;
  }
}
