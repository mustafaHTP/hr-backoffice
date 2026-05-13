import { getDepartments } from "@/lib/dal/department";
import EmployeeForm from "./employee-form";
import { getEmployeeTitles } from "@/lib/dal/employee-title";

export default async function EmployeeCreatePage() {
  const [departments, employeeTitles] = await Promise.all([
    getDepartments(),
    getEmployeeTitles(),
  ]);

  return (
    <EmployeeForm departments={departments} employeeTitles={employeeTitles} />
  );
}
