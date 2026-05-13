import { LeaveType } from "@/generated/prisma/client";
import { DalResponse } from "@/types/dal-response";
import { prisma } from "../prisma";

export async function getLeaveTypes(): Promise<DalResponse<LeaveType[]>> {
  try {
    const leaveTypes = await prisma.leaveType.findMany();

    return DalResponse.success(leaveTypes);
  } catch (error) {
    console.log("Error fetching leave types:" + error);

    return DalResponse.failure();
  }
}
