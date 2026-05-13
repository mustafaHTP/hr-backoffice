import { getLeaveTypes } from "@/lib/dal/leave-type";
import CreateLeaveRequestForm from "./_components/create-leave-request-form";
import { getSession } from "@/lib/auth";
import { getEmployee } from "@/lib/dal/employee";
import { getCurrentUser } from "@/app/actions/user";

export default async function CreateLeaveRequestPage() {
  const leaveTypes = await getLeaveTypes();

  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Failed to get user");
  }

  if (!user.employeeId) {
    throw new Error("Current user has no associated employee");
  }

  const employee = await getEmployee(user.employeeId);
  if (!employee) {
    throw new Error("Failed to get employee");
  }

  return <CreateLeaveRequestForm leaveTypes={leaveTypes} employee={employee} />;
}
