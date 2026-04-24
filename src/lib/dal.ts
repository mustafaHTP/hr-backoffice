import { prisma } from "@/lib/prisma";

export async function getEmployees() {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        department: true,
      },
    });

    return employees;
  } catch (error) {
    console.log("Error fetching employees:" + error);

    throw new Error("Failed to get employees");
  }
}

export async function getDepartments() {
  try {
    const departments = await prisma.department.findMany();

    return departments;
  } catch (error) {
    console.log("Errow fethching departments: " + error);

    throw new Error("Failed to get departments");
  }
}
