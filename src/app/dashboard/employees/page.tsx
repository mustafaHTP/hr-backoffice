import { getEmployees } from "@/lib/dal";

export default async function EmployeesPage() {
  const employees = await getEmployees();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-950 dark:text-white">
            Employees
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Manage all employees in your organization
          </p>
        </div>

        <button className="rounded-full bg-violet-950 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-800 transition">
          + Add Employee
        </button>
      </div>

      {/* Card */}
      <div className="rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
        {employees.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-200 dark:border-zinc-800">
                <tr className="text-zinc-500 dark:text-zinc-400">
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Department</th>
                  <th className="px-6 py-4 font-medium">Hire Date</th>
                </tr>
              </thead>

              <tbody>
                {employees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/40 transition"
                  >
                    <td className="px-6 py-4 font-medium text-zinc-950 dark:text-white">
                      {emp.firstName} {emp.lastName}
                    </td>

                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">
                      {emp.email}
                    </td>

                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">
                      {emp.department?.name ?? "Unassigned"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center">
            <p className="text-zinc-600 dark:text-zinc-400">
              No employees found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
