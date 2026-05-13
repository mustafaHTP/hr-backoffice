"use server";

import { createLeaveRequest } from "@/lib/dal/leave-request";
import {
  leaveRequestSchema,
  LeaveRequestSchema,
} from "@/lib/schemas/leave-request";
import { ActionResponse } from "@/types/action-response";

export default async function createLeaveRequestAction(
  formData: FormData,
): Promise<ActionResponse> {
  if (!formData)
    return {
      success: false,
      error: "Form data is null",
    };

  const leaveRequestFormData: LeaveRequestSchema = {
    description: formData.get("description") as string,
    employeeId: Number(formData.get("employeeId")),
    leaveTypeId: Number(formData.get("leaveTypeId")),
    startDate: new Date(formData.get("startDate") as string),
    endDate: new Date(formData.get("endDate") as string),
    totalDays: Number(formData.get("totalDays")),
  };

  console.log(leaveRequestFormData);
  const validationResult = leaveRequestSchema.safeParse(leaveRequestFormData);
  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    await createLeaveRequest(validationResult.data);
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Error occurred on creating leave request",
    };
  }

  console.log("created successfully");

  return {
    success: true,
    message: "Leave Request created successfully",
  };
}
