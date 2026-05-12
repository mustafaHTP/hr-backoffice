import { getDepartments } from "@/lib/dal/department";
import EmployeeForm from "./employee-form";
import { getEmployeeTitles } from "@/lib/dal/employee-title";
import { notFound } from "next/navigation";

export default async function EmployeeCreatePage() {
  const departmentsResult = await getDepartments();
  const employeeTitlesResult = await getEmployeeTitles();
  if (!departmentsResult.isSuccess() || !employeeTitlesResult.isSuccess()) {
    notFound();
  }
  const departments = departmentsResult.getData() ?? [];
  const employeeTitles = employeeTitlesResult.getData() ?? [];

  return (
    <EmployeeForm departments={departments} employeeTitles={employeeTitles} />
  );
}
