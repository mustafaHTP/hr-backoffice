import { getDepartments } from "@/lib/dal/department";
import EmployeeForm from "./EmployeeForm";
import { getEmployee } from "@/lib/dal/employee";

export default async function EmployeeEditPage({ params }) {
  const departments = await getDepartments();
  const { id } = await params;
  const employee = await getEmployee(Number(id));

  return <EmployeeForm departments={departments} employee={employee} />;
}
