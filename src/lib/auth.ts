import { Role } from "@/generated/prisma/enums";
import bcrypt, { compare, compareSync, hash } from "bcryptjs";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

/**
 * Cost factor of hashing
 */
const PASSWORD_HASH_ROUNDS = 10;
const SESSION_COOKIE_NAME = "session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const SESSION_ALG = "HS256";
const secretKey = process.env.SESSION_SECRET || "fallback-secret-for-dev-only";
const encodedKey = new TextEncoder().encode(secretKey);

export interface SessionPayload extends JWTPayload {
  userId: number;
  email: string;
  role: Role;
}

/**
 * Encrypts payload into a JWT
 */
async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: SESSION_ALG })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(encodedKey);
}

/**
 * Decrypts and validates the JWT.
 * Returns null instead of throwing to keep flow control clean.
 */
async function decrypt(
  token: string | undefined,
): Promise<SessionPayload | null> {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: [SESSION_ALG],
    });
    return payload as SessionPayload;
  } catch {
    // Silently fail on expired or malformed tokens
    return null;
  }
}

/**
 * Creates a session and sets the cookie
 */
export async function createSession(payload: SessionPayload): Promise<void> {
  const session = await encrypt(payload);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE,
    path: "/",
    sameSite: "lax",
  });
}

/**
 * Retrieves and verifies the session.
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return await decrypt(token);
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword);
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(PASSWORD_HASH_ROUNDS);
  await hash(password, salt);
}
