import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { EmployeeSchema } from "../schemas/employee";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  QueryParams,
} from "@/types/query-params";

export type EmployeeWithDeptTitle = Prisma.EmployeeGetPayload<{
  include: { department: true; title: true };
}>;

export async function getEmployeesCountAsync() {
  try {
    return await prisma.employee.count();
  } catch (error) {
    console.error("Error fetching employees count:", error);
    throw error;
  }
}

export async function getEmployeesAsync(
  queryParams: QueryParams | undefined,
): Promise<EmployeeWithDeptTitle[]> {
  try {
    const page = queryParams?.pageNumber ?? DEFAULT_PAGE_NUMBER;
    const pageSize = queryParams?.pageSize ?? DEFAULT_PAGE_SIZE;

    const employees = await prisma.employee.findMany({
      include: {
        department: true,
        title: true,
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return employees;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
}

export async function createEmployeeAsync(
  employee: EmployeeSchema,
): Promise<void> {
  try {
    await prisma.employee.create({
      data: employee,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
}

export async function updateEmployeeAsync(
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

export async function getEmployeeAsync(
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

export async function deleteEmployeeAsync(id: number): Promise<void> {
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
