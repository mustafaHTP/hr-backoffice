import { Department } from "@/generated/prisma/client";
import { DalResponse } from "@/types/dal-response";
import { prisma } from "../prisma";
import { DepartmentSchema } from "../schemas/department";

export async function getDepartments(): Promise<DalResponse<Department[]>> {
  try {
    const departments = await prisma.department.findMany();

    return DalResponse.Success(departments);
  } catch (error) {
    console.log("Errow fetching departments: " + error);

    return DalResponse.Failure();
  }
}

export async function createDepartment(
  department: DepartmentSchema,
): Promise<DalResponse<Department>> {
  try {
    await prisma.department.create({
      data: department,
    });

    return DalResponse.Success();
  } catch (error) {
    console.log("Failed to create department: " + error);

    return DalResponse.Failure();
  }
}

export async function deleteDepartment(
  id: number,
): Promise<DalResponse<Department>> {
  try {
    await prisma.department.delete({
      where: {
        id: id,
      },
    });

    return DalResponse.Success();
  } catch (error) {
    console.log("Failed to delete department: " + error);

    return DalResponse.Failure();
  }
}

export async function getDepartment(
  id: number,
): Promise<DalResponse<Department>> {
  try {
    const department = await prisma.department.findFirst({
      where: {
        id: id,
      },
    });

    return DalResponse.Success(department);
  } catch (error) {
    console.log("Failed to get department" + error);

    return DalResponse.Failure();
  }
}

export async function updateDepartment(
  id: number,
  deparment: DepartmentSchema,
): Promise<DalResponse<Department>> {
  try {
    await prisma.department.update({
      where: {
        id: id,
      },
      data: deparment,
    });

    return DalResponse.Success();
  } catch (error) {
    console.log("Failed to update department" + error);

    return DalResponse.Failure();
  }
}
