import { getDepartments } from "@/lib/dal/department";
import EmployeeForm from "./EmployeeForm";

export default async function EmployeeCreatePage() {
  const departments = await getDepartments();

  return <EmployeeForm departments={departments} />;
}
