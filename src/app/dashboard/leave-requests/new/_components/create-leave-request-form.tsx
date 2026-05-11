"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LeaveType } from "@/generated/prisma/client";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns/format";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

  function handleStartDateSelection(selectedDate: Date) {
    // if start date is later than end date, update end date
    if (selectedDate > endDate) {
      setEndDate(selectedDate);
    }

    setStartDate(selectedDate);
  }

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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!startDate}
                    className="w-[280px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                  >
                    <CalendarIcon />
                    {startDate ? (
                      format(startDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    defaultMonth={startDate}
                    disabled={{ before: today }}
                    required
                    mode="single"
                    selected={startDate}
                    onSelect={handleStartDateSelection}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!endDate}
                    className="w-[280px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                  >
                    <CalendarIcon />
                    {endDate ? (
                      format(endDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    defaultMonth={endDate}
                    disabled={{ before: today }}
                    required
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                  />
                </PopoverContent>
              </Popover>
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
