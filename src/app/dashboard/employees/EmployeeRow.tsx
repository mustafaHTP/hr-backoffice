"use client";

import { useActionState } from "react";
import { deleteEmployee } from "@/app/actions/employees";
import Link from "next/link";

export default function EmployeeRow({ emp }) {
  const [state, formAction, isPending] = useActionState(deleteEmployee, {
    success: false,
    message: "",
  });

  return (
    <tr>
      <td className="px-6 py-4 font-medium text-zinc-950 dark:text-white">
        {emp.firstName} {emp.lastName}
      </td>

      <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">
        {emp.email}
      </td>

      <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">
        {emp.department?.name ?? "Unassigned"}
      </td>
      <td>
        <form action={formAction}>
          <input type="hidden" name="id" value={emp.id} />
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-red-600 px-4 py-2 text-sm text-white disabled:bg-gray-400"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </form>

        <Link href={`/dashboard/employees/edit/${emp.id}`}>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-red-600 px-4 py-2 text-sm text-white disabled:bg-gray-400"
          >
            Edit
          </button>
        </Link>

        {state?.message && (
          <p className={state.success ? "text-green-500" : "text-red-500"}>
            {state.message}
          </p>
        )}
      </td>
    </tr>
  );
}
