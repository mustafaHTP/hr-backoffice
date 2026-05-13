"use server";

import {
  createDepartment,
  deleteDepartment,
  updateDepartment,
} from "@/lib/dal/department";
import { departmentSchema } from "@/lib/schemas/department";
import { isNumber } from "@/lib/utility";
import { ActionResponse } from "@/types/action-response";

function dalErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

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
  } catch (error) {
    return {
      success: false,
      message: dalErrorMessage(error, "Failed to create department"),
    };
  }

  return {
    success: true,
    message: "Department created successfully",
  };
}

export async function updateDepartmentAction(
  formData: FormData,
): Promise<ActionResponse> {
  const departmentForm = {
    id: formData.get("id") ? Number(formData.get("id")) : null,
    name: formData.get("name"),
    description: formData.get("description"),
  };

  if (!departmentForm.id) {
    return {
      success: false,
      message: "Id is not in form",
    };
  }

  const validationResult = departmentSchema.safeParse(departmentForm);
  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    await updateDepartment(departmentForm.id, validationResult.data);
  } catch (error) {
    return {
      success: false,
      message: dalErrorMessage(error, "Failed to update department"),
    };
  }

  return {
    success: true,
    message: "Department updated successfully",
  };
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
  } catch (error) {
    return {
      success: false,
      message: dalErrorMessage(error, "Failed to delete department"),
    };
  }

  return {
    success: true,
    message: "Department deleted successfully",
  };
}
