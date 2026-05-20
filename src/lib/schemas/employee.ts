import { z } from "zod";

const lettersOnlyRegex: RegExp = /^[A-Za-zÀ-ÖØ-öø-ÿĀ-ž\s'-]+$/u;

export const employeeSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .regex(lettersOnlyRegex, {
      message: "First name must contain only letters",
    }),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .regex(lettersOnlyRegex, {
      message: "Last name must contain only letters",
    }),

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
