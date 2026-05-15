import z from "zod";

export const leaveRequestSchema = z.object({
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  totalDays: z.int(),
  leaveTypeId: z.int(),
  employeeId: z.int(),
});

export type LeaveRequestSchema = z.infer<typeof leaveRequestSchema>;
