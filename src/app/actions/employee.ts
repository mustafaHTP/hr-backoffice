"use server";

import { isNumber } from "@/lib/utility";
import {
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "@/lib/dal/employee";
import { revalidatePath } from "next/cache";
import { employeeSchema } from "@/lib/schemas/employee";
import { ActionResponse } from "@/types/action-response";

export async function createEmployeeAction(
  formData: FormData,
): Promise<ActionResponse> {
  const employeeData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    departmentId: formData.get("departmentId")
      ? Number(formData.get("departmentId"))
      : null,
    titleId: (formData.get("titleId") as string)
      ? Number(formData.get("titleId"))
      : null,
  };

  const validationResult = employeeSchema.safeParse(employeeData);

  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const createResult = await createEmployee(validationResult.data);
  if (!createResult.isSuccess()) {
    return {
      success: false,
      message: createResult.getError() ?? "Failed to create employee",
    };
  }

  return {
    success: true,
    message: "Employee created successfully",
  };
}

export async function updateEmployeeAction(
  _: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> {
  const formEmployee = {
    id: Number(formData.get("id")),
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    departmentId: formData.get("departmentId")
      ? Number(formData.get("departmentId"))
      : null,
    titleId: (formData.get("titleId") as string)
      ? Number(formData.get("titleId"))
      : null,
  };

  const validationResult = employeeSchema.safeParse(formEmployee);
  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const updateResult = await updateEmployee(
    formEmployee.id,
    validationResult.data,
  );
  if (!updateResult.isSuccess()) {
    return {
      success: false,
      message: updateResult.getError() ?? "Failed to update employee",
    };
  }

  revalidatePath(`/dashboard/employees/edit/${formEmployee.id}`);

  return {
    success: true,
    message: "Employee updated successfully",
  };
}

export async function deleteEmployeeAction(formData: FormData) {
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
      message: "Id data is not an number",
    };
  }

  const id = Number(idFromForm);

  const deleteResult = await deleteEmployee(id);
  if (!deleteResult.isSuccess()) {
    return {
      success: false,
      message: deleteResult.getError() ?? "Failed to delete employee",
    };
  }

  return {
    success: true,
    message: "Employee deleted successfully",
  };
}
