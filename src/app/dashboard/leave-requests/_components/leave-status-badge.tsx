import { LeaveStatus } from "@/generated/prisma/enums";

const styles: Record<LeaveStatus, string> = {
  APPROVED:
    "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",

  PENDING:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",

  REJECTED: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",

  CANCELLED: "bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300",
};

export default function LeaveStatusBadge({ status }: { status: LeaveStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
