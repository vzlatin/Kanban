import { compare, hash } from "bcrypt";
import { userDto } from "../utils/dtos.ts";
import { User } from "../types/userTypes.ts";
import { ApiError } from "../../errors/apiErrors.ts";
import { DatabaseError } from "../../errors/databaseErrors.ts";
import {
  findAllUsers,
  findUserByEmail,
  findUserById,
  insertUser,
} from "../../database/db.ts";

export async function register(user: User): Promise<User> {
  const candidate = await findUserByEmail(user.email);
  if (candidate.length > 0) {
    throw ApiError.BadRequestError(
      `The user with the email: ${user.email} already exists`,
    );
  }
  const hashedPassword = await hash(user.password);
  user.password = hashedPassword;
  const result = await insertUser(user);
  const insertedUser = result[0] ?? null;
  if (!insertedUser) {
    throw DatabaseError.ConflictError();
  }
  return insertedUser;
}

export async function login(email: string, password: string): Promise<User> {
  const result = await findUserByEmail(email);
  const candidate = result[0] ?? null;
  if (!candidate) {
    throw ApiError.BadRequestError(
      `The password or the email is incorrect`,
    );
  }
  const arePassEqual = await compare(password, candidate.password);
  if (!arePassEqual) {
    throw ApiError.BadRequestError(
      "The password or the email is incorrect",
    );
  }
  return candidate;
}

export async function refresh(id: number): Promise<User> {
  const result = await findUserById(id);
  const user = result[0] ?? null;
  if (!user) throw DatabaseError.ConflictError();
  return user;
}

export async function getAllUsers(): Promise<Partial<User>[]> {
  const users = await findAllUsers();
  if (users.length < 1) throw DatabaseError.ConflictError();
  const usersDto = users.map((user) => userDto(user));
  return usersDto;
}
