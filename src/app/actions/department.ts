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

  const createResult = await createDepartment(validationResult.data);
  if (!createResult.isSuccess()) {
    return {
      success: false,
      message: createResult.getError() ?? "Failed to create department",
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

  const updateResult = await updateDepartment(
    departmentForm.id,
    validationResult.data,
  );
  if (!updateResult.isSuccess()) {
    return {
      success: false,
      message: updateResult.getError() ?? "Failed to update department",
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

  const deleteResult = await deleteDepartment(id);
  if (!deleteResult.isSuccess()) {
    return {
      success: false,
      message: deleteResult.getError() ?? "Failed to delete department",
    };
  }

  return {
    success: true,
    message: "Department deleted successfully",
  };
}
