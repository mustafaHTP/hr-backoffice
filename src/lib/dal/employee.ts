import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { EmployeeSchema } from "../schemas/employee";

export type EmployeeWithDeptTitle = Prisma.EmployeeGetPayload<{
  include: { department: true; title: true };
}>;

export async function getEmployees(): Promise<EmployeeWithDeptTitle[]> {
  try {
    return await prisma.employee.findMany({
      include: {
        department: true,
        title: true,
      },
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
}

export async function createEmployee(employee: EmployeeSchema): Promise<void> {
  try {
    await prisma.employee.create({
      data: employee,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
}

export async function updateEmployee(
  id: number,
  employee: EmployeeSchema,
): Promise<void> {
  try {
    await prisma.employee.update({
      where: {
        id: id,
      },
      data: employee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
}

export async function getEmployee(
  id: number,
): Promise<EmployeeWithDeptTitle | null> {
  try {
    return await prisma.employee.findFirst({
      where: {
        id: id,
      },
      include: {
        department: true,
        title: true,
      },
    });
  } catch (error) {
    console.error("Error fetching employee:", error);
    throw error;
  }
}

export async function deleteEmployee(id: number): Promise<void> {
  try {
    await prisma.employee.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("Failed to delete employee:", error);
    throw error;
  }
}
