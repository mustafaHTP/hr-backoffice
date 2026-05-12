import { LeaveStatus } from "@/generated/prisma/enums";
import z from "zod";

export const leaveRequestSchema = z.object({
  description: z
    .string()
    .min(10, "Desription must be longer than 10 characters")
    .optional(),
  startDate: z.date(),
  endDate: z.date(),
  totalDays: z.int().gt(0, "Leave days must be bigger than 0"),
  leaveTypeId: z.int(),
  employeeId: z.int(),
});

export type LeaveRequestSchema = z.infer<typeof leaveRequestSchema>;
