import { DepartmentSchema } from "@/app/actions/department";
import { prisma } from "../prisma";

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
