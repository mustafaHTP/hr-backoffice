import { getLeaveRequest } from "@/lib/dal/leaveRequest";
import {
  PersonIcon,
  FileTextIcon,
  CalendarIcon,
  ArrowLeftIcon,
} from "@radix-ui/react-icons";
import LeaveStatusBadge from "../_components/leave-status-badge";
import Link from "next/link";

export default async function LeaveRequestPage({ params }) {
  const { id } = await params;
  const leaveRequest = await getLeaveRequest(Number(id));
  if (!leaveRequest) throw new Error("Leave request not found");

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Link
          href="/dashboard/leave-requests"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to requests
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Leave Request
          </h1>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Review and manage employee leave request.
          </p>
        </div>

        <LeaveStatusBadge status={leaveRequest?.status ?? "APPROVED"} />
      </div>

      {/* Main Card */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {/* Employee Section */}
        <div className="border-b border-zinc-200 p-6 dark:border-zinc-800">
          <div className="mb-6 flex items-center gap-2">
            <PersonIcon className="h-5 w-5 text-zinc-500" />

            <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
              Employee Information
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <InfoItem
              label="Full Name"
              value={`${leaveRequest.employee.firstName} ${leaveRequest.employee.lastName}`}
            />

            <InfoItem label="Email" value={leaveRequest.employee.email} />

            <InfoItem
              label="Department"
              value={leaveRequest.employee.department?.name ?? "-"}
            />

            <InfoItem
              label="Title"
              value={leaveRequest.employee.title?.name ?? "-"}
            />
          </div>
        </div>

        {/* Leave Details */}
        <div className="border-b border-zinc-200 p-6 dark:border-zinc-800">
          <div className="mb-6 flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-zinc-500" />

            <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
              Leave Details
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <InfoItem label="Leave Type" value={leaveRequest.leaveType.name} />

            <InfoItem
              label="Total Days"
              value={`${leaveRequest.totalDays ?? 0} days`}
            />

            <InfoItem
              label="Start Date"
              value={new Date(leaveRequest.startDate).toLocaleDateString()}
            />

            <InfoItem
              label="End Date"
              value={new Date(leaveRequest.endDate).toLocaleDateString()}
            />

            <InfoItem
              label="Created At"
              value={new Date(leaveRequest.createdAt).toLocaleDateString()}
            />
          </div>
        </div>

        {/* Description */}
        <div className="p-6">
          <div className="mb-6 flex items-center gap-2">
            <FileTextIcon className="h-5 w-5 text-zinc-500" />

            <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
              Description
            </h2>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-300">
            {leaveRequest.description || "No description provided."}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button className="rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700">
          Approve Request
        </button>

        <button className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700">
          Reject Request
        </button>

        <button className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">
          Cancel Request
        </button>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>

      <p className="font-medium text-zinc-950 dark:text-white">{value}</p>
    </div>
  );
}
