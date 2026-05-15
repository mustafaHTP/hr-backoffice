import { getDepartmentsAsync } from "@/lib/dal/department";
import EmployeeForm from "./employee-form";
import { getEmployeeAsync } from "@/lib/dal/employee";
import { getEmployeeTitlesAsync } from "@/lib/dal/employee-title";
import { notFound } from "next/navigation";

type EmployeeEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EmployeeEditPage({
  params,
}: EmployeeEditPageProps) {
  const { id } = await params;
  const [departments, employeeTitles, employee] = await Promise.all([
    getDepartmentsAsync(),
    getEmployeeTitlesAsync(),
    getEmployeeAsync(Number(id)),
  ]);

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
