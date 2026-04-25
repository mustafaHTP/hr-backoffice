import { DepartmentSchema } from "@/app/actions/department";
import { prisma } from "../prisma";

export async function getDepartments() {
  try {
    const departments = await prisma.department.findMany();

    return departments;
  } catch (error) {
    console.log("Errow fetching departments: " + error);

    throw new Error("Failed to get departments");
  }
}

export async function createDepartment(department: DepartmentSchema) {
  try {
    await prisma.department.create({
      data: department,
    });
  } catch (error) {
    console.log("Failed to create department: " + error);

    throw new Error("Failed to create department");
  }
}

export async function deleteDepartment(id: number) {
  try {
    await prisma.department.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log("Failed to delete department: " + error);

    throw new Error("Failed to delete department");
  }
}

export async function getDepartment(id: number) {
  try {
    const department = await prisma.department.findFirst({
      where: {
        id: id,
      },
    });

    return department;
  } catch (error) {
    console.log("Failed to get department" + error);

    throw new Error(`Failed to get department with id: ${id}`);
  }
}

export async function updateDepartment(
  id: number,
  deparment: DepartmentSchema,
) {
  try {
    await prisma.department.update({
      where: {
        id: id,
      },
      data: deparment,
    });
  } catch (error) {
    console.log("Failed to update department" + error);

    throw new Error(`Failed to update department with id: ${id}`);
  }
}
