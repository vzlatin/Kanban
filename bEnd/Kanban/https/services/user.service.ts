import { compare, hash } from "bcrypt";

import { createModel } from "../../storage/orm/orm.ts";
import { ApiError } from "../../errors/apiErrors.ts";
import { User, userColumns } from "../types/userTypes.ts";
import { DatabaseError } from "../../errors/databaseErrors.ts";
import {
  generateTokens,
  removeToken,
  saveToken,
  validateToken,
} from "../../shared/services/token.service.ts";
import { userDto } from "../utils/dtos.ts";

export async function register(user: User): Promise<{
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: Omit<User, "password">;
}> {
  const UserModel = createModel<User>("users", userColumns);
  const candidate = UserModel.findOne({ email: user.email });
  if (candidate) {
    throw ApiError.BadRequestError(
      `The user with the email: ${user.email} already exists`,
    );
  }
  const hashedPassword = await hash(user.password);
  user.password = hashedPassword;
  const lastInsertedRowId = UserModel.insert(user);
  if (!lastInsertedRowId) throw DatabaseError.ConflictError();
  /** If we reach this, the previous insert has succeded. We can guarantee lastInsertedRowId exists */
  const insertedUser = UserModel.findOne({ id: lastInsertedRowId });
  if (!insertedUser) throw DatabaseError.ConflictError();
  const tokens = await generateTokens(insertedUser);
  const { refreshToken } = tokens;
  saveToken({ userId: insertedUser.id!, refreshToken });
  return {
    tokens,
    user: userDto(insertedUser),
  };
}

export async function login(email: string, password: string) {
  const UserModel = createModel<User>("users", userColumns);
  const candidate = UserModel.findOne({ email: email });
  if (!candidate) {
    throw ApiError.BadRequestError(
      "The password or the email is incorrect",
    );
  }
  const arePassEqual = await compare(password, candidate.password);
  if (!arePassEqual) {
    throw ApiError.BadRequestError(
      "The password or the email is incorrect",
    );
  }
  const tokens = await generateTokens(candidate);
  const { refreshToken } = tokens;
  saveToken({ userId: candidate.id!, refreshToken });
  return {
    tokens,
    user: userDto(candidate),
  };
}

export function logout(token: string): string {
  return removeToken(token);
}

export async function refresh(token: string) {
  const userData = await validateToken(token, "refresh");
  const UserModel = createModel<User>("users", userColumns);
  const user = UserModel.findOne({ id: userData.id });
  if (!user) throw DatabaseError.ConflictError();
  const tokens = await generateTokens(user!);
  const { refreshToken } = tokens;
  saveToken({ userId: user!.id!, refreshToken });
  return {
    tokens,
    user: userDto(user),
  };
}

export function getAllUsers(): Partial<User>[] {
  const UserModel = createModel<User>("users", userColumns);
  const users = UserModel.findAll();
  if (!users) throw DatabaseError.ConflictError();
  const usersDto = users.map((user) => userDto(user));
  return usersDto;
}
