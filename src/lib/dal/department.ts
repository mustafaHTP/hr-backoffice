import { Department } from "@/generated/prisma/client";
import { prisma } from "../prisma";
import { DepartmentSchema } from "../schemas/department";

export async function getDepartments(): Promise<Department[]> {
  try {
    return await prisma.department.findMany();
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
}

export async function createDepartment(
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

export async function deleteDepartment(id: number): Promise<void> {
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

export async function getDepartment(
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

export async function updateDepartment(
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
