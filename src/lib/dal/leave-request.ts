import { LeaveRequest, Prisma } from "@/generated/prisma/client";
import { DalResponse } from "@/types/dal-response";
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
): Promise<DalResponse<LeaveRequest>> {
  try {
    await prisma.leaveRequest.create({
      data: leaveRequest,
    });

    return DalResponse.Success();
  } catch (error) {
    console.log("Error creating leave request:" + error);

    return DalResponse.Failure();
  }
}

export async function getLeaveRequests(): Promise<
  DalResponse<LeaveRequestWithEmployeeAndLeaveType[]>
> {
  try {
    const leaveRequests = await prisma.leaveRequest.findMany({
      include: {
        leaveType: true,
        employee: true,
      },
    });

    return DalResponse.Success(leaveRequests);
  } catch (error) {
    console.log("Error fetching leave requests:" + error);

    return DalResponse.Failure();
  }
}

export async function getLeaveRequest(
  id: number,
): Promise<DalResponse<LeaveRequestDetail | null>> {
  try {
    const leaveRequest = await prisma.leaveRequest.findUnique({
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

    return DalResponse.Success(leaveRequest);
  } catch (error) {
    console.log(`Error fetching leave request with id : ${id}` + error);

    return DalResponse.Failure();
  }
}

export async function getLeaveRequestsByEmployeeId(
  employeeId: number,
): Promise<DalResponse<LeaveRequestWithLeaveType[]>> {
  try {
    const leaveRequests = await prisma.leaveRequest.findMany({
      where: {
        employeeId: employeeId,
      },
      include: {
        leaveType: true,
      },
    });

    return DalResponse.Success(leaveRequests);
  } catch (error) {
    console.log(
      `Error fetching leave requests for employee id : ${employeeId}` + error,
    );

    return DalResponse.Failure();
  }
}
