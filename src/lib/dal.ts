import { EmployeeSchema } from "@/app/actions/employees";
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
    console.log("Errow fetching departments: " + error);

    throw new Error("Failed to get departments");
  }
}

export async function updateEmployee(id: number, employee: EmployeeSchema) {
  try {
    await prisma.employee.update({
      where: {
        id: id,
      },
      data: employee,
    });
  } catch (error) {
    console.log("Error updating employee: " + error);

    throw new Error("Failed to update employee with id: " + id);
  }
}

export async function getEmployee(id: number) {
  try {
    const employee = await prisma.employee.findFirst({
      where: {
        id: id,
      },
    });

    return employee;
  } catch (error) {
    console.log("Error fetching to get employee: " + error);

    throw new Error(`Failed to get employee with id: ${id}`);
  }
}
