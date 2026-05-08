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
