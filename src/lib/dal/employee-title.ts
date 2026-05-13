import { EmployeeTitle } from "@/generated/prisma/client";
import { prisma } from "../prisma";

export async function getEmployeeTitles(): Promise<EmployeeTitle[]> {
  try {
    return await prisma.employeeTitle.findMany();
  } catch (error) {
    console.error("Error fetching employee titles:", error);
    throw error;
  }
}
