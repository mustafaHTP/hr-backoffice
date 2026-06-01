import z from "zod";

export const signInSchema = z.object({
  email: z.email("Invalid email").trim(),
  password: z.string().trim().min(1, "Password is required"),
});

export type SignInSchema = z.infer<typeof signInSchema>;
