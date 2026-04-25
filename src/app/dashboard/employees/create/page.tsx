import { getDepartments } from "@/lib/dal/employee";
import EmployeeForm from "./EmployeeForm";

export default async function EmployeeCreatePage() {
  const departments = await getDepartments();

  return <EmployeeForm departments={departments} />;
}
