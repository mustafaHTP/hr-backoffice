import { prisma } from "@/lib/prisma";

async function main() {
  // Clean existing data (optional but useful in dev)
  await prisma.employee.deleteMany();
  await prisma.department.deleteMany();

  // Departments
  const engineering = await prisma.department.create({
    data: {
      name: "Engineering",
      description: "Software development and technical operations",
    },
  });

  const hr = await prisma.department.create({
    data: {
      name: "Human Resources",
      description: "People management and recruitment",
    },
  });

  const finance = await prisma.department.create({
    data: {
      name: "Finance",
      description: "Budgeting, payroll and financial planning",
    },
  });

  // Employees
  await prisma.employee.createMany({
    data: [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@company.com",
        phone: "+90 555 111 2233",
        departmentId: engineering.id,
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@company.com",
        phone: "+90 555 222 3344",
        departmentId: engineering.id,
      },
      {
        firstName: "Michael",
        lastName: "Brown",
        email: "michael.brown@company.com",
        phone: "+90 555 333 4455",
        departmentId: hr.id,
      },
      {
        firstName: "Emily",
        lastName: "Davis",
        email: "emily.davis@company.com",
        phone: "+90 555 444 5566",
        departmentId: finance.id,
      },
      {
        firstName: "David",
        lastName: "Wilson",
        email: "david.wilson@company.com",
        phone: "+90 555 555 6677",
        departmentId: engineering.id,
      },
    ],
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });