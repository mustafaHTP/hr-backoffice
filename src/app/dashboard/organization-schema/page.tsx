import { getDepartmentsAsync } from "@/lib/dal/department";
import OrganizationSchemaFlow from "./_components/organization-schema-flow";

export default async function OrganizationSchemaPage() {
  const departments = await getDepartmentsAsync({
    include: {
      children: true,
      parent: true,
    },
  });

  return (
    <OrganizationSchemaFlow departments={departments}></OrganizationSchemaFlow>
  );
}
