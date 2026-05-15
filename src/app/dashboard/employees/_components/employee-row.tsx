"use client";

import { useActionState } from "react";
import { deleteEmployeeActionAsync } from "@/app/actions/employee";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ActionResponse } from "@/types/action-response";
import type { EmployeeWithDeptTitle } from "@/lib/dal/employee";
import { TrashIcon, Pencil1Icon } from "@radix-ui/react-icons";

export default function EmployeeRow({
  employee,
}: {
  employee: EmployeeWithDeptTitle;
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(
    async (_, formData) => {
      const response = await deleteEmployeeActionAsync(formData);
      router.refresh();

      return response;
    },
    {
      success: false,
      message: "",
    },
  );

  return (
    <tr className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/40 transition">
      <td className="px-6 py-4 font-medium text-zinc-950 dark:text-white">
        <div>
          <Link
            className="underline text-cyan-400"
            href={`/dashboard/employees/${employee.id}/profile`}
          >
            {employee.firstName} {employee.lastName}
          </Link>
        </div>
        <div>{employee.title?.name ?? "Unassigned"}</div>
      </td>

      <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">
        {employee.email}
      </td>

      <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">
        {employee.phone ?? "Unassigned"}
      </td>
      <td>
        <div className="flex space-x-2">
          <Link href={`/dashboard/employees/edit/${employee.id}`}>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center space-x-1 rounded-full bg-amber-600 px-4 py-2 text-sm text-white disabled:bg-gray-400 hover:bg-amber-700 disabled:cursor-not-allowed cursor-pointer"
            >
              <Pencil1Icon />
              <span>Edit</span>
            </button>
          </Link>

          <form action={formAction}>
            <input type="hidden" name="id" value={employee.id} />
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center space-x-1 rounded-full bg-red-600 px-4 py-2 text-sm text-white disabled:bg-gray-400 hover:bg-red-700 disabled:cursor-not-allowed cursor-pointer"
            >
              <TrashIcon />
              <span>{isPending ? "Deleting..." : "Delete"}</span>
            </button>
          </form>
        </div>

        {state?.message && (
          <p className={state.success ? "text-green-500" : "text-red-500"}>
            {state.message}
          </p>
        )}
      </td>
    </tr>
  );
}
