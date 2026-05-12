import { getDepartments } from "@/lib/dal/department";
import EmployeeForm from "./employee-form";
import { getEmployee } from "@/lib/dal/employee";
import { getEmployeeTitles } from "@/lib/dal/employee-title";
import { notFound } from "next/navigation";

type EmployeeEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EmployeeEditPage({
  params,
}: EmployeeEditPageProps) {
  const { id } = await params;
  const departmentsResult = await getDepartments();
  const employeeTitlesResult = await getEmployeeTitles();
  const employeeResult = await getEmployee(Number(id));

  if (
    !departmentsResult.isSuccess() ||
    !employeeTitlesResult.isSuccess() ||
    !employeeResult.isSuccess()
  ) {
    notFound();
  }

  const departments = departmentsResult.getData() ?? [];
  const employeeTitles = employeeTitlesResult.getData() ?? [];
  const employee = employeeResult.getData();
  if (!employee) {
    notFound();
  }

  return (
    <EmployeeForm
      departments={departments}
      employee={employee}
      employeeTitles={employeeTitles}
    />
  );
}
