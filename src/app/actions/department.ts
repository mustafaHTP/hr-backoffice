"use server";

import {
  createDepartment,
  deleteDepartment,
  updateDepartment,
} from "@/lib/dal/department";
import { departmentSchema } from "@/lib/schemas/department";
import { isNumber } from "@/lib/utility";
import { ActionResponse } from "@/types/action-response";

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

    return {
      success: true,
      message: "Department updated successfully",
    };
  } catch (error) {
    console.log("Failed to updaate department: " + error);

    return {
      success: false,
      message: "Failed to update employee",
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
