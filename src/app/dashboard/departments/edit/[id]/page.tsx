import { getDepartment } from "@/lib/dal/department";
import DepartmentEditForm from "../_components/department-edit-form";

export default async function DepartmentEditPage({ params }) {
  const { id } = await params;
  const department = await getDepartment(Number(id));

  return <DepartmentEditForm department={department} />;
}
