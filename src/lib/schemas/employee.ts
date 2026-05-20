import z from "zod";

export const employeeSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.email("Invalid email").trim(),
  phone: z
    .string()
    .trim()
    .regex(/^\d+$/, {
      message: "Phone number must contain only digits",
    })
    .nullable(),
  departmentId: z.number().nullable(),
  titleId: z.number().nullable(),
});

export type EmployeeSchema = z.infer<typeof employeeSchema>;
