"use client";

import { createLeaveRequestAction } from "@/app/actions/leave-request";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Employee, LeaveType } from "@/generated/prisma/client";
import { NotificationService } from "@/lib/toast-service";
import { CalendarIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { format } from "date-fns/format";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { LeaveRequestSchema } from "@/lib/schemas/leave-request";
import { inclusiveDayCount } from "@/lib/utils/date-utils";

type CreateLeaveRequestFormProps = {
  leaveTypes: LeaveType[];
  employee: Employee;
};

export default function CreateLeaveRequestForm({
  leaveTypes,
  employee,
}: CreateLeaveRequestFormProps) {
  const router = useRouter();
  const today = new Date();

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [leaveTypeId, setLeaveTypeId] = useState("");
  const [description, setDescription] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function handleStartDateSelection(selectedDate: Date | undefined) {
    if (!selectedDate) return;
    if (selectedDate > endDate) setEndDate(selectedDate);
    setStartDate(selectedDate);
  }

  function handleEndDateSelection(selectedDate: Date | undefined) {
    if (!selectedDate) return;
    if (selectedDate < startDate) setStartDate(selectedDate);
    setEndDate(selectedDate);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const leaveRequest: LeaveRequestSchema = {
      employeeId: employee.id,
      startDate: startDate,
      endDate: endDate,
      leaveTypeId: Number(leaveTypeId),
      description: description,
      totalDays: inclusiveDayCount(startDate, endDate),
    };
    const result = await createLeaveRequestAction(leaveRequest);
    if (result.success) {
      NotificationService.success("Leave request created successfully");
      router.push("/dashboard/leave-request-list");
    } else {
      NotificationService.error(
        result.error ?? "Not enough info for an occurred error",
      );
    }
  }

  const selectedLeaveType = leaveTypes.find(
    (lt) => String(lt.id) === leaveTypeId,
  );

  return (
    <TooltipProvider delayDuration={100}>
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Custom Leave Types Dropdown */}
            <div className="relative w-full">
              <input type="hidden" name="leaveTypeId" value={leaveTypeId} />

              <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={dropdownOpen}
                    className="w-full justify-between rounded-xl border border-zinc-200 px-4 py-2 bg-white text-left font-normal h-11 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    {selectedLeaveType
                      ? selectedLeaveType.name
                      : "Select Leave Type"}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-(--radix-popover-trigger-width) p-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-md max-h-60 overflow-y-auto">
                  <div className="flex flex-col gap-0.5">
                    {leaveTypes.map((lt) => (
                      <div
                        key={lt.id}
                        onClick={() => {
                          setLeaveTypeId(String(lt.id));
                          setDropdownOpen(false);
                        }}
                        className={cn(
                          "flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800",
                          leaveTypeId === String(lt.id) &&
                            "bg-zinc-50 dark:bg-zinc-900 font-medium",
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <CheckIcon
                            className={cn(
                              "h-4 w-4 text-violet-950 dark:text-violet-400",
                              leaveTypeId === String(lt.id)
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          <span>{lt.name}</span>
                        </div>

                        {/* Info Button + Hover Tooltip */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-md transition-colors"
                            >
                              <InfoCircledIcon className="h-4 w-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent
                            side="right"
                            align="center"
                            sideOffset={10}
                            className="w-64 p-3 bg-zinc-900 text-zinc-100 text-xs rounded-lg shadow-xl border border-zinc-800 z-50"
                          >
                            <div className="space-y-1.5">
                              <p className="font-semibold text-zinc-200 border-b border-zinc-800 pb-1 mb-1">
                                {lt.name} Details
                              </p>
                              <p>
                                <span className="text-zinc-400">Type:</span>{" "}
                                {lt.isPaid ? "Paid Leave" : "Unpaid Leave"}
                              </p>
                              <p>
                                <span className="text-zinc-400">Limit:</span>{" "}
                                {lt.limitScope === "NONE" && "Limitless"}
                                {lt.limitScope === "PER_REQUEST" &&
                                  `${lt.perRequestMaxDays} days per request`}
                                {lt.limitScope === "PER_PERIOD" &&
                                  `${lt.periodMaxDays} days per ${lt.periodType?.toLowerCase().replace("ly", "")}`}
                              </p>
                              {lt.description && (
                                <p className="text-zinc-400 italic pt-1 border-t border-zinc-800 mt-1">
                                  {lt.description}
                                </p>
                              )}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Leave period */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!startDate}
                      className="w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
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
                      className="w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
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
                      disabled={{ before: startDate }}
                      required
                      mode="single"
                      selected={endDate}
                      onSelect={handleEndDateSelection}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Description */}
            <div>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                disabled={isPending}
                className="rounded-full bg-violet-950 px-6 py-2 text-sm font-semibold text-white hover:bg-violet-800 transition disabled:opacity-50"
              >
                Create Leave Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </TooltipProvider>
  );
}
