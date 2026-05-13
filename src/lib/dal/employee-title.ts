import { EmployeeTitle } from "@/generated/prisma/client";
import { DalResponse } from "@/types/dal-response";
import { prisma } from "../prisma";

export async function getEmployeeTitles(): Promise<
  DalResponse<EmployeeTitle[]>
> {
  try {
    const employeeTitles = await prisma.employeeTitle.findMany();

    return DalResponse.success(employeeTitles);
  } catch (error) {
    console.log("Errow fetching employee titles: " + error);

    return DalResponse.failure();
  }
}
