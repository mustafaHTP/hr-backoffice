"use server";

import z from "zod";
import { ActionResponse } from "./employees";
import { createDepartment, deleteDepartment } from "@/lib/dal/department";
import { isNumber } from "@/lib/utils";
import { revalidatePath } from "next/cache";

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

export async function deleteDepartmentAction(
  formData: FormData,
): Promise<ActionResponse> {
  const idFromForm = formData.get("id");
  if (!idFromForm) {
    return {
      success: false,
      message: "Id data is not in form",
    };
  }

  if (!isNumber(idFromForm.toString())) {
    return {
      success: false,
      message: "Id data is NaN",
    };
  }

  const id = Number(idFromForm);

  try {
    await deleteDepartment(id);

    return {
      success: true,
      message: "Department deleted successfully",
    };
  } catch (error) {
    console.log("Failed to delete department: " + error);

    return {
      success: false,
      message: "Failed to delete department",
    };
  }
}
