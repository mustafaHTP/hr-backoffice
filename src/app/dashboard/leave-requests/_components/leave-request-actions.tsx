"use client";

import { updateLeaveRequestActionAsync } from "@/app/actions/leave-request";
import { LeaveStatus } from "@/generated/prisma/enums";
import { ToastService } from "@/lib/toast-service";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

type LeaveRequestActionsProps = {
  leaveRequestId: number;
  leaveStatus: LeaveStatus;
};

export default function LeaveRequestActions({
  leaveRequestId,
  leaveStatus,
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
        ToastService.success(result.message);
      } else {
        ToastService.error(result.error);
      }

      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap gap-3">
      {leaveStatus !== LeaveStatus.APPROVED && (
        <button
          disabled={isPending}
          onClick={() => handleLeaveRequestStatusUpdate(LeaveStatus.APPROVED)}
          className="rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
        >
          Approve Request
        </button>
      )}

      {leaveStatus !== LeaveStatus.REJECTED && (
        <button
          disabled={isPending}
          onClick={() => handleLeaveRequestStatusUpdate(LeaveStatus.REJECTED)}
          className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          Reject Request
        </button>
      )}
    </div>
  );
}
