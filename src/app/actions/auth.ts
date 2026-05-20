"use server";

import {
  createSessionAsync,
  deleteSessionAsync,
  SessionPayload,
} from "@/lib/auth";
import { getUserByEmailAsync } from "@/lib/dal/user";
import { verifyPasswordAsync } from "@/lib/password";
import { signInSchema, SignInSchema } from "@/lib/schemas/auth";
import { ActionResponse } from "@/types/action-response";

export async function signInActionAsync(
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

    const user = await getUserByEmailAsync(signInFormData.email);
    if (!user) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    const isPasswordValid = verifyPasswordAsync(
      signInFormData.password,
      user.password,
    );
    if (!isPasswordValid) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    const sessionInput: SessionPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
    await createSessionAsync(sessionInput);

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch {
    return {
      success: false,
      error: "Failed to sign in",
    };
  }
}

export async function signOutActionAsync(): Promise<ActionResponse> {
  try {
    await deleteSessionAsync();
    return {
      success: true,
      message: "Signed out successfully",
    };
  } catch {
    return {
      success: false,
      error: "Signed out failed",
    };
  }
}
