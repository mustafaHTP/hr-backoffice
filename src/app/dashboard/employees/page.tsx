import { getEmployeesAsync, getEmployeesCountAsync } from "@/lib/dal/employee";
import Link from "next/link";
import EmployeeRow from "./_components/employee-row";
import Pagination from "./_components/pagination";
import { QueryParams } from "@/types/query-params";
import {
  buildQueryParams,
  getTotalPages,
} from "@/lib/utils/query-params-utils";

export default async function EmployeesPage(props: {
  searchParams?: Promise<{
    pageNumber?: string;
    pageSize?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const queryParams: QueryParams = buildQueryParams(
    searchParams?.pageNumber,
    searchParams?.pageSize,
  );

  const employees = await getEmployeesAsync(queryParams);
  const employeesCount = await getEmployeesCountAsync();
  const totalPages = getTotalPages(queryParams.pageSize, employeesCount);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-950 dark:text-white">
            Employees
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Manage all employees in your organization
          </p>
        </div>

        <Link href="/dashboard/employees/create">
          <button className="flex items-center justify-center rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
            + Add Employee
          </button>
        </Link>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
        {employees.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b  border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Full Name</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Phone</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {employees.map((emp) => (
                  <EmployeeRow key={emp.id} employee={emp} />
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

      <Pagination
        totalPages={totalPages}
        currentPage={queryParams.pageNumber}
        pageSize={queryParams.pageSize}
      />
    </div>
  );
}
