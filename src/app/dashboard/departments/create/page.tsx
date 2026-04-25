"use client";

import { createDepartmentAction } from "@/app/actions/department";
import { ActionResponse } from "@/app/actions/employees";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

export default function DepartmentCreatePage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(
    async (_, formData) => {
      const result = await createDepartmentAction(formData);

      if (result.success) {
        router.refresh();
        router.push("/dashboard/departments");
      }

      return result;
    },
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
          Create Department
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Add a department to your organization
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

          {/* Name */}
          <div>
            <input
              name="name"
              placeholder="Name"
              disabled={isPending}
              className={`w-full rounded-xl border px-4 py-2 bg-white dark:bg-zinc-900
                ${state?.errors?.name ? "border-red-500" : "border-zinc-200 dark:border-zinc-800"}`}
            />
            {state?.errors?.name && (
              <p className="mt-1 text-sm text-red-500">
                {state.errors.name[0]}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <input
              name="description"
              placeholder="Description"
              disabled={isPending}
              className={`w-full rounded-xl border px-4 py-2 bg-white dark:bg-zinc-900
              ${state?.errors?.description ? "border-red-500" : "border-zinc-200 dark:border-zinc-800"}`}
            />
            {state?.errors?.description && (
              <p className="mt-1 text-sm text-red-500">
                {state.errors.description[0]}
              </p>
            )}
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
              {isPending ? "Creating..." : "Create Department"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
