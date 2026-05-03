import { Role } from "@/generated/prisma/enums";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "auth_token";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const JWT_SECRET = process.env.JWT_SECRET ?? "change-me-to-a-secure-secret";

export type JWTPayload = {
  userId: number;
  email: string;
  role: Role;
};

export type SessionInput = {
  userId: number;
  email: string;
  role: Role;
};

export function generateJWT(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: SESSION_MAX_AGE,
  });
}

export function verifyJWT(token: string): JWTPayload | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return payload;
  } catch (error) {
    console.error("JWT verification failed: ", error);

    return null;
  }
}

export async function createSession(sessionInput: SessionInput) {
  try {
    const jwtPayload: JWTPayload = {
      userId: sessionInput.userId,
      role: sessionInput.role,
      email: sessionInput.email,
    };
    const token = generateJWT(jwtPayload);
    const cookieStore = await cookies();
    cookieStore.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: SESSION_MAX_AGE,
      path: "/",
      sameSite: "lax",
    });

    return true;
  } catch (error) {
    console.error("Error creating session: ", error);

    return false;
  }
}

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) return null;
    const payload = verifyJWT(token);

    return payload ? { userId: payload.userId } : null;
  } catch (error) {
    console.error("Error getting session: ", error);
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export function verifyPassword(password: string, realPassword: string) {
  return realPassword === password;
}
