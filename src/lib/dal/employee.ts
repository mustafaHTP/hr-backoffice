import { Employee, Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { DalResponse } from "@/types/dal-response";
import { EmployeeSchema } from "../schemas/employee";

export type EmployeeWithDeptTitle = Prisma.EmployeeGetPayload<{
  include: { department: true; title: true };
}>;

export async function getEmployees(): Promise<
  DalResponse<EmployeeWithDeptTitle[]>
> {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        department: true,
        title: true,
      },
    });

    return DalResponse.Success(employees);
  } catch (error) {
    console.log("Error fetching employees:" + error);

    return DalResponse.Failure();
  }
}

export async function createEmployee(
  employee: EmployeeSchema,
): Promise<DalResponse<Employee>> {
  try {
    await prisma.employee.create({
      data: employee,
    });

    return DalResponse.Success();
  } catch (error) {
    console.log("Error creating employee: " + error);

    return DalResponse.Failure();
  }
}

export async function updateEmployee(
  id: number,
  employee: EmployeeSchema,
): Promise<DalResponse<Employee>> {
  try {
    await prisma.employee.update({
      where: {
        id: id,
      },
      data: employee,
    });

    return DalResponse.Success();
  } catch (error) {
    console.log("Error updating employee: " + error);

    return DalResponse.Failure();
  }
}

export async function getEmployee(
  id: number,
): Promise<DalResponse<EmployeeWithDeptTitle>> {
  try {
    const employee = await prisma.employee.findFirst({
      where: {
        id: id,
      },
      include: {
        department: true,
        title: true,
      },
    });

    return DalResponse.Success(employee);
  } catch (error) {
    console.log("Error fetching to get employee: " + error);

    return DalResponse.Failure();
  }
}

export async function deleteEmployee(
  id: number,
): Promise<DalResponse<Employee>> {
  try {
    await prisma.employee.delete({
      where: {
        id: id,
      },
    });

    return DalResponse.Success();
  } catch (error) {
    console.log("Failed to delete employee: " + error);

    return DalResponse.Failure();
  }
}
