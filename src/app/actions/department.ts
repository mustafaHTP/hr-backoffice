"use server";

import z from "zod";
import { ActionResponse } from "./employees";
import { createDepartment } from "@/lib/dal/department";

const departmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export type DepartmentSchema = z.infer<typeof departmentSchema>;

export async function createDepartmentAction(
  formData: FormData,
): Promise<ActionResponse> {
  const departmentFormData = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
  };

  const validationResult = departmentSchema.safeParse(departmentFormData);
  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    await createDepartment(validationResult.data);
    return {
      success: true,
      message: "Department created successfully",
    };
  } catch (error) {
    console.log("Error occured on create department: " + error);

    return {
      success: false,
      message: "Failed to create department",
    };
  }
}
