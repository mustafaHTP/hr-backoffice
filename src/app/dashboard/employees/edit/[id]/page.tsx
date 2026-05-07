import { getDepartments } from "@/lib/dal/department";
import EmployeeForm from "./employee-form";
import { getEmployee } from "@/lib/dal/employee";
import { getEmployeeTitles } from "@/lib/dal/employee-title";

export default async function EmployeeEditPage({ params }) {
  const departments = await getDepartments();
  const employeeTitles = await getEmployeeTitles();
  const { id } = await params;
  const employee = await getEmployee(Number(id));

  return (
    <EmployeeForm
      departments={departments}
      employee={employee}
      employeeTitles={employeeTitles}
    />
  );
}
