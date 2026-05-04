"use server";

import { createSession, deleteSession, SessionPayload } from "@/lib/auth";
import { getUserByEmail } from "@/lib/dal/user";
import { verifyPassword } from "@/lib/password";
import { signInSchema, SignInSchema } from "@/lib/schemas/auth";
import { ActionResponse } from "@/types/action-response";

export async function signInAction(
  formData: FormData,
): Promise<ActionResponse> {
  try {
    const signInFormData: SignInSchema = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validationResult = signInSchema.safeParse(signInFormData);
    if (!validationResult.success) {
      return {
        success: false,
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const user = await getUserByEmail(signInFormData.email);
    if (!user) {
      return {
        success: false,
        message: "Invalid email or password",
        errors: {
          password: ["Invalid email or password"],
        },
      };
    }

    const isPasswordValid = verifyPassword(
      signInFormData.password,
      user.password,
    );
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid email or password",
        errors: {
          password: ["Invalid email or password"],
        },
      };
    }

    const sessionInput: SessionPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
    await createSession(sessionInput);

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    console.error("Sign in error:", error);
    return {
      success: false,
      message: "An error occurred while signing in",
      error: "Failed to sign in",
    };
  }
}

export async function signOutAction(): Promise<ActionResponse> {
  try {
    await deleteSession();
    return {
      success: true,
      message: "Signed out successfully",
    };
  } catch (error) {
    console.error("Sign out error: ", error);
    return {
      success: false,
      error: "Signed out failed",
    };
  }
}
