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

  const candidate = await UserModel.findOne({ email: user.email });
  if (candidate) {
    throw ApiError.BadRequestError(
      `The user with the email: ${user.email} already exists`,
    );
  }

  const hashedPassword = await hash(user.password);
  user.password = hashedPassword;

  const lastInsertedRowId = await UserModel.insert(user);
  if (!lastInsertedRowId) throw DatabaseError.ConflictError();

  /** If we reach this, the previous insert has succeded. We can guarantee lastInsertedRowId exists */
  const insertedUser = await UserModel.findOne({ id: lastInsertedRowId });
  if (!insertedUser) throw DatabaseError.ConflictError();

  const tokens = await generateTokens(insertedUser);
  const { refreshToken } = tokens;
  await saveToken({ userId: insertedUser.id!, refreshToken });

  return {
    tokens,
    user: userDto(insertedUser),
  };
}

export async function login(email: string, password: string) {
  const UserModel = createModel<User>("users", userColumns);

  const candidate = await UserModel.findOne({ email: email });
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
  await saveToken({ userId: candidate.id!, refreshToken });

  return {
    tokens,
    user: userDto(candidate),
  };
}

export async function logout(token: string): Promise<string> {
  return await removeToken(token);
}

export async function refresh(token: string) {
  const userData = await validateToken(token, "refresh");

  const UserModel = createModel<User>("users", userColumns);
  const user = await UserModel.findOne({ id: userData.id });
  if (!user) throw DatabaseError.ConflictError();

  const tokens = await generateTokens(user!);
  const { refreshToken } = tokens;
  await saveToken({ userId: user!.id!, refreshToken });

  return {
    tokens,
    user: userDto(user),
  };
}

export async function getAllUsers(): Promise<Partial<User>[]> {
  const UserModel = createModel<User>("users", userColumns);
  const users = await UserModel.findAll();
  if (!users) throw DatabaseError.ConflictError();
  const usersDto = users.map((user) => userDto(user));
  return usersDto;
}
