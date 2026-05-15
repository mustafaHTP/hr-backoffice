"use server";

import { isNumber } from "@/lib/utils/utility";
import {
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "@/lib/dal/employee";
import { revalidatePath } from "next/cache";
import { employeeSchema } from "@/lib/schemas/employee";
import { ActionResponse } from "@/types/action-response";

function dalErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

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

  try {
    await createEmployee(validationResult.data);
  } catch (error) {
    return {
      success: false,
      message: dalErrorMessage(error, "Failed to create employee"),
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

  try {
    await updateEmployee(formEmployee.id, validationResult.data);
  } catch (error) {
    return {
      success: false,
      message: dalErrorMessage(error, "Failed to update employee"),
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

  try {
    await deleteEmployee(id);
  } catch (error) {
    return {
      success: false,
      message: dalErrorMessage(error, "Failed to delete employee"),
    };
  }

  return {
    success: true,
    message: "Employee deleted successfully",
  };
}
