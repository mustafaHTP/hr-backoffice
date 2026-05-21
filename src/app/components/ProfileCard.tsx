import { getSessionAsync } from "@/lib/auth";
import { getUserAsync } from "@/lib/dal/user";
import { AppCard } from "./AppCard";
import { getEmployeeAsync } from "@/lib/dal/employee";

export default async function ProfileCard() {
  const session = await getSessionAsync();
  if (!session) return null;

  const user = await getUserAsync(session.userId);
  if (!user?.employeeId) return null;
  const employee = await getEmployeeAsync(user.employeeId);
  if (!employee) return null;

  return (
    <AppCard>
      <AppCard.Header>
        <div>
          <div>{employee.firstName + " " + employee.lastName}</div>
          <div>{employee.title?.name ?? "Unassigned"}</div>
          <div>{employee.department?.name ?? "Unassigned"}</div>
        </div>
      </AppCard.Header>
      <AppCard.Body>
        <div>
          <div>{employee.hireDate?.toDateString() ?? "Not found"}</div>
        </div>
      </AppCard.Body>
    </AppCard>
  );
}
