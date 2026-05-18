"use client";

import { updateLeaveRequestActionAsync } from "@/app/actions/leave-request";
import { LeaveRequest } from "@/generated/prisma/client";
import { LeaveStatus } from "@/generated/prisma/enums";
import { ToastService } from "@/lib/toast-service";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { MouseEvent } from "react";

type CancelLeaveRequestButtonProps = {
  leaveRequest: LeaveRequest;
};

export default function CancelLeaveRequestButton({
  leaveRequest,
}: CancelLeaveRequestButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  if (leaveRequest.status === LeaveStatus.CANCELLED) return null;

  function handleLeaveRequestCancel(evt: MouseEvent<HTMLButtonElement>) {
    startTransition(async () => {
      const result = await updateLeaveRequestActionAsync(
        leaveRequest.id,
        LeaveStatus.CANCELLED,
      );

      if (result.success) {
        ToastService.success(result.message ?? "No enough info for message");
      } else {
        ToastService.error(result.error ?? "No enough info for message");
      }

      router.refresh();
    });
  }

  return (
    <button
      disabled={isPending}
      onClick={handleLeaveRequestCancel}
      className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
    >
      {isPending ? "Canceling..." : "Cancel Request"}
    </button>
  );
}
