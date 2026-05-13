import { LeaveType } from "@/generated/prisma/client";
import { prisma } from "../prisma";

export async function getLeaveTypes(): Promise<LeaveType[]> {
  try {
    return await prisma.leaveType.findMany();
  } catch (error) {
    console.error("Error fetching leave types:", error);
    throw error;
  }
}
