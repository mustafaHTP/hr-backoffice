import z from "zod";

export const employeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  departmentId: z.number().optional().nullable(),
  titleId: z.number().optional().nullable(),
});

export type EmployeeSchema = z.infer<typeof employeeSchema>;
