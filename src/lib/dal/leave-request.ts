import { Prisma } from "@/generated/prisma/client";
import { LeaveRequestSchema } from "../schemas/leave-request";
import { prisma } from "../prisma";

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

export async function createLeaveRequest(
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

export async function getLeaveRequests(): Promise<
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

export async function getLeaveRequest(
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

export async function getLeaveRequestsByEmployeeId(
  employeeId: number,
): Promise<LeaveRequestWithLeaveType[]> {
  try {
    return await prisma.leaveRequest.findMany({
      where: {
        employeeId: employeeId,
      },
      include: {
        leaveType: true,
      },
    });
  } catch (error) {
    console.error(
      `Error fetching leave requests for employee id ${employeeId}:`,
      error,
    );
    throw error;
  }
}

export async function getLeaveRequestsByEmployeeIdAndDate(
  employeeId: number,
  startDate: Date,
  endDate: Date,
) {
  try {
    const leaveRequests = await prisma.leaveRequest.findMany({
      where: {
        employeeId,
        // Overlap condition:
        // existing.startDate <= requested.endDate
        // AND
        // existing.endDate >= requested.startDate
        AND: [
          {
            startDate: {
              lte: endDate,
            },
          },
          {
            endDate: {
              gte: startDate,
            },
          },
        ],
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
