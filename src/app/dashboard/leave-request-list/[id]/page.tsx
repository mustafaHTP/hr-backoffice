import { getLeaveRequest } from "@/lib/dal/leave-request";
import {
  ArrowLeftIcon,
  CalendarIcon,
  FileTextIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import LeaveStatusBadge from "../../leave-requests/_components/leave-status-badge";

type LeaveRequestPageProps = {
  params: Promise<{ id: string }>;
};

export default async function LeaveRequestPage({
  params,
}: LeaveRequestPageProps) {
  const { id } = await params;
  const leaveRequest = await getLeaveRequest(Number(id));
  if (!leaveRequest) throw new Error("Leave request not found");

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Link
          href="/dashboard/leave-request-list"
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
            Review and manage leave request.
          </p>
        </div>

        <LeaveStatusBadge status={leaveRequest?.status ?? "APPROVED"} />
      </div>

      {/* Main Card */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
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
              label="Submitted At"
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
        <button className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700">
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
