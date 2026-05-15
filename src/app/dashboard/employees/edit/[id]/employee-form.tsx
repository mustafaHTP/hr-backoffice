"use client";

import { updateEmployeeActionAsync } from "@/app/actions/employee";
import type { EmployeeWithDeptTitle } from "@/lib/dal/employee";
import { Department, EmployeeTitle } from "@/generated/prisma/client";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

export default function EmployeeForm({
  employee,
  departments,
  employeeTitles,
}: {
  employee: EmployeeWithDeptTitle;
  departments: Department[];
  employeeTitles: EmployeeTitle[];
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    updateEmployeeActionAsync,
    {
      success: false,
      message: "",
    },
  );

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-zinc-950 dark:text-white">
          Edit Employee
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Edit the details of an existing employee in your organization
        </p>
      </div>

      {/* Card */}
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <form action={formAction} className="space-y-4">
          {state?.message && (
            <p
              className={`text-sm ${
                state.success ? "text-green-600" : "text-red-500"
              }`}
            >
              {state.message}
            </p>
          )}

          <input type="hidden" name="id" value={employee.id} />

          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                name="firstName"
                placeholder="First name"
                disabled={isPending}
                className={`w-full rounded-xl border px-4 py-2 bg-white dark:bg-zinc-900
                ${state?.errors?.firstName ? "border-red-500" : "border-zinc-200 dark:border-zinc-800"}`}
                defaultValue={employee.firstName}
              />
              {state?.errors?.firstName && (
                <p className="mt-1 text-sm text-red-500">
                  {state.errors.firstName[0]}
                </p>
              )}
            </div>

            <div>
              <input
                name="lastName"
                placeholder="Last name"
                disabled={isPending}
                className={`w-full rounded-xl border px-4 py-2 bg-white dark:bg-zinc-900
                ${state?.errors?.lastName ? "border-red-500" : "border-zinc-200 dark:border-zinc-800"}`}
                defaultValue={employee.lastName}
              />
              {state?.errors?.lastName && (
                <p className="mt-1 text-sm text-red-500">
                  {state.errors.lastName[0]}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <input
              name="email"
              placeholder="Email"
              disabled={isPending}
              className={`w-full rounded-xl border px-4 py-2 bg-white dark:bg-zinc-900
              ${state?.errors?.email ? "border-red-500" : "border-zinc-200 dark:border-zinc-800"}`}
              defaultValue={employee.email}
            />
            {state?.errors?.email && (
              <p className="mt-1 text-sm text-red-500">
                {state.errors.email[0]}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              name="phone"
              placeholder="Phone (optional)"
              disabled={isPending}
              className={`w-full rounded-xl border px-4 py-2 bg-white dark:bg-zinc-900
              ${
                state?.errors?.phone
                  ? "border-red-500"
                  : "border-zinc-200 dark:border-zinc-800"
              }`}
              defaultValue={employee.phone ?? ""}
            />
            {state?.errors?.phone && (
              <p className="mt-1 text-sm text-red-500">
                {state.errors.phone[0]}
              </p>
            )}
          </div>

          {/* Department */}
          <div>
            <select
              name="departmentId"
              disabled={isPending}
              className="w-full rounded-xl border border-zinc-200 px-4 py-2 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              defaultValue={employee.departmentId ?? ""}
            >
              <option value="">Select Department</option>
              {departments.map((dept: Department) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <select
              name="titleId"
              disabled={isPending}
              className="w-full rounded-xl border border-zinc-200 px-4 py-2 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              defaultValue={employee.titleId ?? ""}
            >
              <option value="">Select Title</option>
              {employeeTitles.map((et: EmployeeTitle) => (
                <option key={et.id} value={et.id}>
                  {et.name}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-full px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              disabled={isPending}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="rounded-full bg-violet-950 px-6 py-2 text-sm font-semibold text-white hover:bg-violet-800 transition"
            >
              {isPending ? "Updating..." : "Update Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
