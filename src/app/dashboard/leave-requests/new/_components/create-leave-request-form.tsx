"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type LeaveType = {
  id: number;
  name: string;
};

type CreateLeaveRequestFormProps = {
  leaveTypes: LeaveType[];
};

export default function CreateLeaveRequestForm({
  leaveTypes,
}: CreateLeaveRequestFormProps) {
  const router = useRouter();
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-zinc-950 dark:text-white">
          Create Leave Request
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          You can make leave request here
        </p>
      </div>

      {/* Card */}
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <form className="space-y-4">
          {/* <input type="hidden" name="id" value={employee.id} /> */}

          {/* Leave Types */}
          <div>
            <select
              name="leaveTypeId"
              className="w-full rounded-xl border border-zinc-200 px-4 py-2 bg-white dark:border-zinc-800 dark:bg-zinc-900"
            >
              <option value="" disabled>
                Select Leave Type
              </option>
              {leaveTypes.map((lt) => (
                <option key={lt.id} value={lt.id}>
                  {lt.name}
                </option>
              ))}
            </select>
          </div>

          {/* Leave period */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="date"
                name="startDate"
                className="w-full rounded-xl border border-zinc-200 px-4 py-2 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                value={startDate.toDateString()}
                onChange={(e) => console.log("Start date changed")}
              />
            </div>

            <div>
              <input
                type="date"
                name="endDate"
                className="w-full rounded-xl border border-zinc-200 px-4 py-2 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                value={endDate.toDateString()}
                onChange={(e) => console.log("sadsa")}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <textarea
              name="description"
              placeholder="Description (optional)"
              rows={4}
              className="w-full rounded-xl border border-zinc-200 px-4 py-2 bg-white dark:border-zinc-800 dark:bg-zinc-900"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-full px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-full bg-violet-950 px-6 py-2 text-sm font-semibold text-white hover:bg-violet-800 transition"
            >
              Create Leave Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
