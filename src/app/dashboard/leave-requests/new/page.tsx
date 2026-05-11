import { getLeaveTypes } from "@/lib/dal/leave-type";
import CreateLeaveRequestForm from "./_components/create-leave-request-form";

export default async function CreateLeaveRequestPage() {
  const leaveTypes = await getLeaveTypes();

  return <CreateLeaveRequestForm leaveTypes={leaveTypes} />;
}
