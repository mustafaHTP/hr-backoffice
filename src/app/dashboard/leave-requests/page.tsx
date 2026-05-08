import { getLeaveRequests } from "@/lib/dal/leaveRequest";

export default async function LeaveRequestsPage() {
  const leaveRequests = await getLeaveRequests();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-950 dark:text-white">
            Leave Requests
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            You can manage all leave requests of employees in your organization
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
        {leaveRequests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-200 dark:border-zinc-800">
                <tr className="text-zinc-500 dark:text-zinc-400">
                  <th className="px-6 py-4 font-medium">Full Name</th>
                  <th className="px-6 py-4 font-medium">Leave Type</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Days</th>
                </tr>
              </thead>

              <tbody>
                {leaveRequests.map((lq) => (
                  <tr
                    key={lq.id}
                    className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/40 transition"
                  >
                    <td className="px-6 py-4 font-medium text-zinc-950 dark:text-white">
                      {lq.employee.firstName + " " + lq.employee.lastName}
                    </td>
                    <td className="px-6 py-4 font-medium text-zinc-950 dark:text-white">
                      {lq.leaveType.name}
                    </td>
                    <td className="px-6 py-4 font-medium text-zinc-950 dark:text-white">
                      {lq.status}
                    </td>
                    <td className="px-6 py-4 font-medium text-zinc-950 dark:text-white">
                      {lq.totalDays}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center">
            <p className="text-zinc-600 dark:text-zinc-400">
              No leave requests found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
