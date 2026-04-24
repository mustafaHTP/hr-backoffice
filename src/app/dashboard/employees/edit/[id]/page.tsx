import EmployeeForm from "./EmployeeForm";
import { getDepartments, getEmployee } from "@/lib/dal";

export default async function EmployeeEditPage({ params }) {
  const departments = await getDepartments();
  const { id } = await params;
  const employee = await getEmployee(Number(id));

  return <EmployeeForm departments={departments} employee={employee} />;
}
