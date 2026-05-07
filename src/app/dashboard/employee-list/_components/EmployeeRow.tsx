"use client";

export default function EmployeeRow({ employee }) {
  return (
    <tr className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/40 transition">
      <td className="px-6 py-4 font-medium text-zinc-950 dark:text-white">
        <div>
          {employee.firstName} {employee.lastName}
        </div>
        <div>{employee.title?.name ?? "Unassigned"}</div>
      </td>

      <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">
        {employee.email}
      </td>

      <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">
        {employee.phone ?? "Unassigned"}
      </td>
    </tr>
  );
}
