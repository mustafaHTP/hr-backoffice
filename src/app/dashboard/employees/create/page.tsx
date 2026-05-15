import { getDepartmentsAsync } from "@/lib/dal/department";
import EmployeeForm from "./employee-form";
import { getEmployeeTitlesAsync } from "@/lib/dal/employee-title";

export default async function EmployeeCreatePage() {
  const [departments, employeeTitles] = await Promise.all([
    getDepartmentsAsync(),
    getEmployeeTitlesAsync(),
  ]);

  return (
    <EmployeeForm departments={departments} employeeTitles={employeeTitles} />
  );
}
