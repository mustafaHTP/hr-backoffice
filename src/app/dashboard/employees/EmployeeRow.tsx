"use client";

import { useActionState } from "react";
import { deleteEmployeeAction } from "@/app/actions/employee";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ActionResponse } from "@/types/action-response";
import { TrashIcon, Pencil1Icon } from "@radix-ui/react-icons";

export default function EmployeeRow({ employee }) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(
    async (_, formData) => {
      const response = await deleteEmployeeAction(formData);
      router.refresh();

      return response;
    },
    {
      success: false,
      message: "",
    },
  );

  return (
    <tr>
      <td className="px-6 py-4 font-medium text-zinc-950 dark:text-white">
        {employee.firstName} {employee.lastName}
      </td>

      <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">
        {employee.email}
      </td>

      <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">
        {employee.department?.name ?? "Unassigned"}
      </td>
      <td>
        <div className="flex space-x-2">
          <Link href={`/dashboard/employees/edit/${employee.id}`}>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center space-x-1 rounded-full bg-amber-600 px-4 py-2 text-sm text-white disabled:bg-gray-400"
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
              className="flex items-center space-x-1 rounded-full bg-red-600 px-4 py-2 text-sm text-white disabled:bg-gray-400"
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
