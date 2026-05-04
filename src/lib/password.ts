import bcrypt, { compare, hash } from "bcryptjs";

/**
 * Cost factor of hashing
 */
const PASSWORD_HASH_ROUNDS = 10;

export async function verifyPassword(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword);
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(PASSWORD_HASH_ROUNDS);
  return await hash(password, salt);
}
