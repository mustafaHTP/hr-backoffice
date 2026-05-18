"use client";

import { updateLeaveRequestActionAsync } from "@/app/actions/leave-request";
import { LeaveStatus } from "@/generated/prisma/enums";
import { ToastService } from "@/lib/toast-service";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

type LeaveRequestActionsProps = {
  leaveRequestId: number;
};

export default function LeaveRequestActions({
  leaveRequestId,
}: LeaveRequestActionsProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleLeaveRequestStatusUpdate(leaveStatus: LeaveStatus) {
    startTransition(async () => {
      const result = await updateLeaveRequestActionAsync(
        leaveRequestId,
        leaveStatus,
      );
      if (result.success) {
        ToastService.success(result.message ?? "Not enough info for success");
      } else {
        ToastService.error(result.error ?? "Not enough info for error");
      }

      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        disabled={isPending}
        onClick={() => handleLeaveRequestStatusUpdate(LeaveStatus.APPROVED)}
        className="rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
      >
        Approve Request
      </button>

      <button
        disabled={isPending}
        onClick={() => handleLeaveRequestStatusUpdate(LeaveStatus.REJECTED)}
        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
      >
        Reject Request
      </button>

      <button
        disabled={isPending}
        onClick={() => handleLeaveRequestStatusUpdate(LeaveStatus.CANCELLED)}
        className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        Cancel Request
      </button>
    </div>
  );
}
