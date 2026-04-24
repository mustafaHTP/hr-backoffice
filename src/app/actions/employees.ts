"use server";

import { prisma } from "@/lib/prisma";
import z, { number, success } from "zod";
import { isNumber } from "@/lib/utils";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";

// ? Move somewhere else
const employeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  departmentId: z.number().optional().nullable(),
});

export type ActionResponse = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function createEmployee(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  departmentId?: number | null;
}): Promise<ActionResponse> {
  const parsed = employeeSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.employee.create({
      data: parsed.data,
    });

    return {
      success: true,
      message: "Employee created successfully",
    };
  } catch (err) {
    console.log("Error occured on create employee: " + err);

    return {
      success: false,
      message: "Failed to create employee",
    };
  }
}

export async function deleteEmployee(_: ActionResponse, formData: FormData) {
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
    await prisma.employee.delete({
      where: {
        id: id,
      },
    });

    // refresh page
    revalidatePath("/dashboard/employees");

    return {
      success: true,
      message: "Employee deleted successfully",
    };
  } catch (error) {
    console.log("Failed to delete employee: " + error);

    return {
      success: false,
      message: "Failed to delete employee",
    };
  }
}
