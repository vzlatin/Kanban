import { Context } from "@oak/oak";
import { userDto } from "../utils/dtos.ts";
import type { User } from "../types/userTypes.ts";
import { ApiError } from "../../errors/apiErrors.ts";
import {
  getAllUsers,
  login,
  refresh,
  register,
} from "../services/user.service.ts";
import {
  generateTokens,
  removeRefreshToken,
  saveToken,
  validateToken,
} from "../../shared/services/token.service.ts";

export async function registerUser(ctx: Context): Promise<void> {
  const { request, response } = ctx;
  if (!request.hasBody) {
    throw ApiError.BadRequestError("Request body is required");
  }
  if (request.body.type() !== "json") {
    throw ApiError.UnsuportedMediaTypeError();
  }
  const user: User = await request.body.json();
  const insertedUser = await register(user);
  const tokens = await generateTokens(insertedUser);
  const { refreshToken } = tokens;
  await saveToken({ userId: insertedUser.id!, refreshToken });
  ctx.cookies.set("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 30 * 60 * 60 * 24,
    sameSite: "none",
  });
  response.status = 201;
  response.body = {
    accessToken: tokens.accessToken,
    user: userDto(user),
  };
}

export async function loginUser(ctx: Context): Promise<void> {
  const { request, response } = ctx;
  if (!request.hasBody) {
    throw ApiError.BadRequestError("Request body is required");
  }
  if (request.body.type() !== "json") {
    throw ApiError.UnsuportedMediaTypeError();
  }
  const { email, password } = await request.body.json();
  const user = await login(email, password);
  const tokens = await generateTokens(user);
  const { refreshToken } = tokens;
  await saveToken({ userId: user.id!, refreshToken });
  ctx.cookies.set("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 30 * 60 * 60 * 24,
    sameSite: "none",
  });
  response.status = 201;
  response.body = {
    accessToken: tokens.accessToken,
    user: userDto(user),
  };
}

export async function logoutUser(ctx: Context): Promise<void> {
  const { response } = ctx;
  const refreshToken = await ctx.cookies.get("refreshToken");
  if (!refreshToken) throw ApiError.UnauthorizedError();
  const token = await removeRefreshToken(refreshToken);
  ctx.cookies.delete("refreshToken");
  // At this point the token was already deleted from the DB,
  // so it's fine to return it.
  response.body = token;
}

export async function refreshUser(ctx: Context): Promise<void> {
  const { response } = ctx;
  const receivedRefreshToken = await ctx.cookies.get("refreshToken");
  if (!receivedRefreshToken) throw ApiError.UnauthorizedError();
  const userData = await validateToken(receivedRefreshToken, "refresh");
  const user = await refresh(userData.id);
  const tokens = await generateTokens(user!);
  const { refreshToken } = tokens;
  saveToken({ userId: user!.id!, refreshToken });
  ctx.cookies.set("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 30 * 60 * 60 * 24,
    sameSite: "none",
  });
  response.status = 201;
  response.body = {
    accessToken: tokens.accessToken,
    user: userDto(user),
  };
}

export function getUsers(ctx: Context): void {
  const { response } = ctx;
  const users = getAllUsers();
  response.body = users;
}
