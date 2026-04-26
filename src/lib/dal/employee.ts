import { prisma } from "@/lib/prisma";
import { EmployeeSchema } from "../schemas/employee";

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

export async function createEmployee(employee: EmployeeSchema) {
  try {
    await prisma.employee.create({
      data: employee,
    });
  } catch (error) {
    console.log("Error creating employee: " + error);

    throw new Error("Failed to create employee");
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

export async function deleteEmployee(id: number) {
  try {
    await prisma.employee.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log("Failed to delete employee: " + error);

    throw new Error("Failed to delete employee with id: " + id);
  }
}
