import { prisma } from "../prisma";

export async function getLeaveTypes() {
  try {
    const leaveTypes = await prisma.leaveType.findMany();

    return leaveTypes;
  } catch (error) {
    console.log("Error fetching leave types:" + error);

    throw new Error("Failed to get leave types");
  }
}
