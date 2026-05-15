import { LeaveType } from "@/generated/prisma/client";
import { prisma } from "../prisma";

export async function getLeaveTypesAsync(): Promise<LeaveType[]> {
  try {
    return await prisma.leaveType.findMany();
  } catch (error) {
    console.error("Error fetching leave types:", error);
    throw error;
  }
}

export async function getLeaveTypeAsync(id: number): Promise<LeaveType | null> {
  try {
    return await prisma.leaveType.findUnique({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error(`Error fetching leave type with id: id, `, error);
    throw error;
  }
}
