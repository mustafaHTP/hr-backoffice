"use client";

import { deleteDepartmentAction } from "@/app/actions/department";
import { ActionResponse } from "@/app/actions/employees";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

export default function DepartmentRow({ department }) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(
    async (_, formData) => {
      const result = await deleteDepartmentAction(formData);

      router.refresh();

      return result;
    },
    {
      success: false,
      message: "",
    },
  );

  return (
    <tr
      key={department.id}
      className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/40 transition"
    >
      <td className="px-6 py-4 font-medium text-zinc-950 dark:text-white">
        {department.name}
      </td>

      <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">
        {department.description ?? "No Description"}
      </td>

      <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">
        <form action={formAction}>
          <input type="hidden" name="id" value={department.id} />
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-red-600 px-4 py-2 text-sm text-white disabled:bg-gray-400"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </form>
      </td>
    </tr>
  );
}
