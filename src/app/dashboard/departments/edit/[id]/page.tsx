import { getDepartment } from "@/lib/dal/department";
import DepartmentEditForm from "../_components/department-edit-form";
import { notFound } from "next/navigation";

type DepartmentEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DepartmentEditPage({
  params,
}: DepartmentEditPageProps) {
  const { id } = await params;
  const department = await getDepartment(Number(id));
  if (!department) {
    notFound();
  }

  return <DepartmentEditForm department={department} />;
}
