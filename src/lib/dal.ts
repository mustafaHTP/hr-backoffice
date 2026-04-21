import { prisma } from "@/lib/prisma";

export async function getEmployees() {
    try {
        const employees = await prisma.employee.findMany({
            include: {
                department: true,
            }
        });
        
        return employees
    } catch (error) {
        console.log("Error fetching issues:" + error);
        
        throw new Error("Failed to get employees");
    }
}