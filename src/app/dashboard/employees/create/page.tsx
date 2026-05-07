import { getDepartments } from "@/lib/dal/department";
import EmployeeForm from "./EmployeeForm";
import { getEmployeeTitles } from "@/lib/dal/employee-title";

export default async function EmployeeCreatePage() {
  const departments = await getDepartments();
  const employeeTitles = await getEmployeeTitles();

  return (
    <EmployeeForm departments={departments} employeeTitles={employeeTitles} />
  );
}
