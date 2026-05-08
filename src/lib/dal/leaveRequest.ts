import { prisma } from "../prisma";

export async function getLeaveRequests() {
  try {
    const leaveRequests = await prisma.leaveRequest.findMany({
      include: {
        leaveType: true,
        employee: true,
      },
    });

    return leaveRequests;
  } catch (error) {
    console.log("Error fetching leave requests:" + error);

    throw new Error("Failed to get leave requests");
  }
}

export async function getLeaveRequest(id: number) {
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

    return leaveRequest;
  } catch (error) {
    console.log(`Error fetching leave request with id : ${id}` + error);

    throw new Error(`Failed to get leave request for id: ${id}`);
  }
}
