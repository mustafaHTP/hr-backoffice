import Link from "next/link";
import DepartmentRow from "./_components/DepartmentRow";
import { getDepartments } from "@/lib/dal/department";

export default async function DeparmentsPage() {
  const departments = await getDepartments();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-950 dark:text-white">
            Departments
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Manage all departmens in your organization
          </p>
        </div>

        <Link href="/dashboard/departments/create">
          <button className="flex items-center space-x-1 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 cursor-pointer transition">
            <span>+ Add Department</span>
          </button>
        </Link>
      </div>

      {/* Card */}
      <div className="rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
        {departments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-200 dark:border-zinc-800">
                <tr className="text-zinc-500 dark:text-zinc-400">
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Description</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {departments.map((dpt) => (
                  <DepartmentRow key={dpt.id} department={dpt} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center">
            <p className="text-zinc-600 dark:text-zinc-400">
              No departments found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
