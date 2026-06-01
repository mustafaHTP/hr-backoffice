import { Role } from "@/generated/prisma/enums";
import { getSessionAsync, SessionPayload } from "./auth";
import { getUserAsync } from "./dal/user";
import { getEmployeeAsync } from "./dal/employee";

export async function getUsername(
  session: SessionPayload | null,
): Promise<string | null> {
  if (!session) {
    return null;
  }

  const user = await getUserAsync(session.userId);
  if (!user) {
    return null;
  }

  // It is admin, so display admin directly because admin user has no associate employee
  if (user.role === Role.ADMIN) return "Admin";

  // Current user has no associate with employee
  if (!user.employeeId) return null;

  const employee = await getEmployeeAsync(user.employeeId);
  if (!employee) return null;

  const fullName = `${employee.firstName} ${employee.lastName}`;

  return fullName;
}

export async function getCurrentUserAsync() {
  const session = await getSessionAsync();
  if (!session) return null;

  const user = await getUserAsync(session.userId);
  if (!user) return null;

  return user;
}
