import { prisma } from "../prisma";

export async function getEmployeeTitles() {
  try {
    const employeeTitles = await prisma.employeeTitle.findMany();

    return employeeTitles;
  } catch (error) {
    console.log("Errow fetching employee titles: " + error);

    throw new Error("Failed to get employee titles");
  }
}
