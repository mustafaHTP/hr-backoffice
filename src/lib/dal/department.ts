import { Department } from "@/generated/prisma/client";
import { prisma } from "../prisma";
import { DepartmentSchema } from "../schemas/department";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  QueryParams,
} from "@/types/query-params";

type GetDepartmentsOptions = {
  queryParams?: QueryParams;
  include?: {
    employees?: boolean;
  };
};

export async function getDepartmentsAsync({
  queryParams,
  include,
}: GetDepartmentsOptions = {}): Promise<Department[]> {
  const page = queryParams?.pageNumber ?? DEFAULT_PAGE_NUMBER;
  const pageSize = queryParams?.pageSize ?? DEFAULT_PAGE_SIZE;
  try {
    return await prisma.department.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      include: {
        employees: include?.employees,
      },
    });
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
}

export async function getDepartmentsCount() {
  try {
    return await prisma.department.count();
  } catch (error) {
    console.error("Error fetching departments count:", error);
    throw error;
  }
}

export async function createDepartmentAsync(
  department: DepartmentSchema,
): Promise<void> {
  try {
    await prisma.department.create({
      data: department,
    });
  } catch (error) {
    console.error("Failed to create department:", error);
    throw error;
  }
}

export async function deleteDepartmentAsync(id: number): Promise<void> {
  try {
    await prisma.department.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("Failed to delete department:", error);
    throw error;
  }
}

export async function getDepartmentAsync(
  id: number,
): Promise<Department | null> {
  try {
    return await prisma.department.findFirst({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("Failed to get department:", error);
    throw error;
  }
}

export async function updateDepartmentAsync(
  id: number,
  deparment: DepartmentSchema,
): Promise<void> {
  try {
    await prisma.department.update({
      where: {
        id: id,
      },
      data: deparment,
    });
  } catch (error) {
    console.error("Failed to update department:", error);
    throw error;
  }
}
