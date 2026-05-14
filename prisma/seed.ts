import { hashPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import {
  LeaveStatus,
  LimitScope,
  PeriodType,
  Role,
} from "@/generated/prisma/enums";

async function main() {
  // Clean existing data (optional but useful in dev)
  await prisma.leaveRequest.deleteMany();
  await prisma.leaveType.deleteMany();
  await prisma.user.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.employeeTitle.deleteMany();
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

  // Employee Titles
  const seniorEngineer = await prisma.employeeTitle.create({
    data: { name: "Senior Software Engineer" },
  });

  const engineer = await prisma.employeeTitle.create({
    data: { name: "Software Engineer" },
  });

  const manager = await prisma.employeeTitle.create({
    data: { name: "Manager" },
  });

  const specialist = await prisma.employeeTitle.create({
    data: { name: "Specialist" },
  });

  const recruiter = await prisma.employeeTitle.create({
    data: { name: "Recruiter" },
  });

  const analyst = await prisma.employeeTitle.create({
    data: { name: "Analyst" },
  });

  // Employees
  await prisma.employee.createMany({
    data: [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@company.com",
        phone: "+90 555 111 2233",
        hireDate: new Date("2021-04-12"),
        departmentId: engineering.id,
        titleId: engineer.id,
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@company.com",
        phone: "+90 555 222 3344",
        hireDate: new Date("2018-02-01"),
        departmentId: engineering.id,
        titleId: manager.id,
      },
      {
        firstName: "Michael",
        lastName: "Brown",
        email: "michael.brown@company.com",
        phone: "+90 555 333 4455",
        hireDate: new Date("2017-09-18"),
        departmentId: hr.id,
        titleId: manager.id,
      },
      {
        firstName: "Emily",
        lastName: "Davis",
        email: "emily.davis@company.com",
        phone: "+90 555 444 5566",
        hireDate: new Date("2019-11-04"),
        departmentId: finance.id,
        titleId: manager.id,
      },
      {
        firstName: "David",
        lastName: "Wilson",
        email: "david.wilson@company.com",
        phone: "+90 555 555 6677",
        hireDate: new Date("2020-06-22"),
        departmentId: engineering.id,
        titleId: seniorEngineer.id,
      },
      {
        firstName: "Sarah",
        lastName: "Miller",
        email: "hr.specialist@company.com",
        phone: "+90 555 666 7788",
        hireDate: new Date("2022-01-10"),
        departmentId: hr.id,
        titleId: specialist.id,
      },
      {
        firstName: "Robert",
        lastName: "Taylor",
        email: "hr.recruiter@company.com",
        phone: "+90 555 777 8899",
        hireDate: new Date("2023-03-27"),
        departmentId: hr.id,
        titleId: recruiter.id,
      },
      {
        firstName: "James",
        lastName: "Anderson",
        email: "ops.manager@company.com",
        phone: "+90 555 888 9900",
        hireDate: new Date("2016-05-30"),
        departmentId: engineering.id,
        titleId: manager.id,
      },
      {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@company.com",
        phone: "+90 555 111 0011",
        hireDate: new Date("2022-08-15"),
        departmentId: engineering.id,
        titleId: engineer.id,
      },
      {
        firstName: "Bob",
        lastName: "Martin",
        email: "bob.martin@company.com",
        phone: "+90 555 222 0011",
        hireDate: new Date("2021-12-06"),
        departmentId: finance.id,
        titleId: analyst.id,
      },
      {
        firstName: "Carol",
        lastName: "White",
        email: "carol.white@company.com",
        phone: "+90 555 333 0011",
        hireDate: new Date("2020-02-24"),
        departmentId: hr.id,
        titleId: specialist.id,
      },
      {
        firstName: "Frank",
        lastName: "Thomas",
        email: "frank.thomas@company.com",
        phone: "+90 555 444 0011",
        hireDate: new Date("2023-07-08"),
        departmentId: engineering.id,
        titleId: engineer.id,
      },
      {
        firstName: "Grace",
        lastName: "Anderson",
        email: "grace.anderson@company.com",
        phone: "+90 555 555 0011",
        hireDate: new Date("2024-04-01"),
        departmentId: finance.id,
        titleId: analyst.id,
      },
    ],
  });

  // Fetch created employees to link with users
  const createdEmployees = await prisma.employee.findMany();

  const adminPassword = await hashPassword("admin123");
  const hrPassword = await hashPassword("hr123");
  const managerPassword = await hashPassword("manager123");
  const employeePassword = await hashPassword("employee123");

  // Users
  // Admin user (only 1)
  await prisma.user.create({
    data: {
      email: "admin@company.com",
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  // HR users (multiple)
  await prisma.user.createMany({
    data: [
      {
        email: "hr.manager@company.com",
        password: hrPassword,
        role: Role.HR,
        employeeId: createdEmployees.find(
          (e) => e.email === "michael.brown@company.com",
        )?.id,
      },
      {
        email: "hr.specialist@company.com",
        password: hrPassword,
        role: Role.HR,
        employeeId: createdEmployees.find(
          (e) => e.email === "hr.specialist@company.com",
        )?.id,
      },
      {
        email: "hr.recruiter@company.com",
        password: hrPassword,
        role: Role.HR,
        employeeId: createdEmployees.find(
          (e) => e.email === "hr.recruiter@company.com",
        )?.id,
      },
    ],
  });

  // Manager users (multiple)
  await prisma.user.createMany({
    data: [
      {
        email: "eng.manager@company.com",
        password: managerPassword,
        role: Role.MANAGER,
        employeeId: createdEmployees.find(
          (e) => e.email === "jane.smith@company.com",
        )?.id,
      },
      {
        email: "finance.manager@company.com",
        password: managerPassword,
        role: Role.MANAGER,
        employeeId: createdEmployees.find(
          (e) => e.email === "emily.davis@company.com",
        )?.id,
      },
      {
        email: "ops.manager@company.com",
        password: managerPassword,
        role: Role.MANAGER,
        employeeId: createdEmployees.find(
          (e) => e.email === "ops.manager@company.com",
        )?.id,
      },
    ],
  });

  // Employee users (multiple)
  await prisma.user.createMany({
    data: [
      {
        email: "john.doe@company.com",
        password: employeePassword,
        role: Role.EMPLOYEE,
        employeeId: createdEmployees.find(
          (e) => e.email === "john.doe@company.com",
        )?.id,
      },
      {
        email: "david.wilson@company.com",
        password: employeePassword,
        role: Role.EMPLOYEE,
        employeeId: createdEmployees.find(
          (e) => e.email === "david.wilson@company.com",
        )?.id,
      },
      {
        email: "alice.johnson@company.com",
        password: employeePassword,
        role: Role.EMPLOYEE,
        employeeId: createdEmployees.find(
          (e) => e.email === "alice.johnson@company.com",
        )?.id,
      },
      {
        email: "bob.martin@company.com",
        password: employeePassword,
        role: Role.EMPLOYEE,
        employeeId: createdEmployees.find(
          (e) => e.email === "bob.martin@company.com",
        )?.id,
      },
      {
        email: "carol.white@company.com",
        password: employeePassword,
        role: Role.EMPLOYEE,
        employeeId: createdEmployees.find(
          (e) => e.email === "carol.white@company.com",
        )?.id,
      },
      {
        email: "frank.thomas@company.com",
        password: employeePassword,
        role: Role.EMPLOYEE,
        employeeId: createdEmployees.find(
          (e) => e.email === "frank.thomas@company.com",
        )?.id,
      },
      {
        email: "grace.anderson@company.com",
        password: employeePassword,
        role: Role.EMPLOYEE,
        employeeId: createdEmployees.find(
          (e) => e.email === "grace.anderson@company.com",
        )?.id,
      },
    ],
  });

  // ── Leave Types ──────────────────────────────────────────────
  const annualLeave = await prisma.leaveType.create({
    data: {
      name: "Annual Leave",
      isPaid: true,
      limitScope: LimitScope.PER_PERIOD,
      periodType: PeriodType.YEARLY,
      periodQuantity: 1,
      periodMaxDays: 20,
    },
  });

  const sickLeave = await prisma.leaveType.create({
    data: {
      name: "Sick Leave",
      isPaid: true,
      limitScope: LimitScope.PER_PERIOD,
      periodType: PeriodType.YEARLY,
      periodQuantity: 1,
      periodMaxDays: 10,
    },
  });

  const unpaidLeave = await prisma.leaveType.create({
    data: {
      name: "Unpaid Leave",
      isPaid: false,
      limitScope: LimitScope.NONE,
    },
  });

  const maternityLeave = await prisma.leaveType.create({
    data: {
      name: "Maternity Leave",
      isPaid: true,
      limitScope: LimitScope.PER_REQUEST,
      perRequestMaxDays: 90,
    },
  });

  const bereavementLeave = await prisma.leaveType.create({
    data: {
      name: "Bereavement Leave",
      isPaid: true,
      limitScope: LimitScope.PER_REQUEST,
      perRequestMaxDays: 5,
    },
  });

  await prisma.leaveType.create({
    data: {
      name: "Work from home",
      isPaid: true,
      limitScope: LimitScope.PER_PERIOD,
      periodType: PeriodType.MONTHLY,
      periodQuantity: 1,
      periodMaxDays: 3,
    },
  });

  await prisma.leaveType.create({
    data: {
      name: "Volunteer time",
      isPaid: true,
      limitScope: LimitScope.PER_PERIOD,
      periodType: PeriodType.WEEKLY,
      periodQuantity: 1,
      periodMaxDays: 1,
    },
  });

  // ── Leave Requests ────────────────────────────────────────────
  const allEmployees = await prisma.employee.findMany();
  const find = (email: string) => allEmployees.find((e) => e.email === email)!;

  await prisma.leaveRequest.createMany({
    data: [
      // PENDING
      {
        employeeId: find("john.doe@company.com").id,
        leaveTypeId: annualLeave.id,
        startDate: new Date("2026-06-02"),
        endDate: new Date("2026-06-06"),
        totalDays: 5,
        status: LeaveStatus.PENDING,
        description: "Family vacation planned in advance.",
      },
      {
        employeeId: find("frank.thomas@company.com").id,
        leaveTypeId: sickLeave.id,
        startDate: new Date("2026-05-26"),
        endDate: new Date("2026-05-27"),
        totalDays: 2,
        status: LeaveStatus.PENDING,
        description: "Feeling unwell, doctor's appointment scheduled.",
      },
      // APPROVED
      {
        employeeId: find("alice.johnson@company.com").id,
        leaveTypeId: sickLeave.id,
        startDate: new Date("2026-05-19"),
        endDate: new Date("2026-05-20"),
        totalDays: 2,
        status: LeaveStatus.APPROVED,
        description: "Flu symptoms.",
      },
      {
        employeeId: find("david.wilson@company.com").id,
        leaveTypeId: annualLeave.id,
        startDate: new Date("2026-07-14"),
        endDate: new Date("2026-07-25"),
        totalDays: 10,
        status: LeaveStatus.APPROVED,
        description: "Summer holiday.",
      },
      {
        employeeId: find("grace.anderson@company.com").id,
        leaveTypeId: bereavementLeave.id,
        startDate: new Date("2026-05-12"),
        endDate: new Date("2026-05-14"),
        totalDays: 3,
        status: LeaveStatus.APPROVED,
        description: "Attending a family funeral.",
      },
      // REJECTED
      {
        employeeId: find("bob.martin@company.com").id,
        leaveTypeId: unpaidLeave.id,
        startDate: new Date("2026-08-04"),
        endDate: new Date("2026-08-08"),
        totalDays: 5,
        status: LeaveStatus.REJECTED,
        description: "Personal errands.",
      },
      // CANCELLED
      {
        employeeId: find("carol.white@company.com").id,
        leaveTypeId: annualLeave.id,
        startDate: new Date("2026-06-16"),
        endDate: new Date("2026-06-20"),
        totalDays: 5,
        status: LeaveStatus.CANCELLED,
        description: "Annual leave — cancelled due to change of plans.",
      },
      {
        employeeId: find("jane.smith@company.com").id,
        leaveTypeId: maternityLeave.id,
        startDate: new Date("2026-09-01"),
        endDate: new Date("2026-11-29"),
        totalDays: 90,
        status: LeaveStatus.APPROVED,
        description: "Maternity leave.",
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
