import { Context } from "@oak/oak";

import {
	login,
	register,
	logout,
	refresh,
	getAllUsers,
} from "../services/userService.ts";
import type { User } from "../types/userTypes.ts";
import { ApiError } from "../errors/apiErrors.ts";

export async function registerUser(ctx: Context): Promise<void> {
	const { request, response } = ctx;

	if (!request.hasBody)
		throw ApiError.BadRequestError("Request body is required");

	if (request.body.type() !== "json") throw ApiError.UnsuportedMediaTypeError();

	const user: User = await request.body.json();
	const userData = await register(user);
	ctx.cookies.set("refreshToken", userData.tokens.refreshToken, {
		httpOnly: true,
		secure: true,
		maxAge: 30 * 60 * 60 * 24,
		sameSite: "none",
	});
	response.status = 201;
	response.body = {
		accessToken: userData.tokens.accessToken,
		user: userData.user,
	};
}

export async function loginUser(ctx: Context): Promise<void> {
	const { request, response } = ctx;

	if (!request.hasBody)
		throw ApiError.BadRequestError("Request body is required");

	if (request.body.type() !== "json") throw ApiError.UnsuportedMediaTypeError();

	const { email, password } = await request.body.json();
	const userData = await login(email, password);
	ctx.cookies.set("refreshToken", userData.tokens.refreshToken, {
		httpOnly: true,
		secure: true,
		maxAge: 30 * 60 * 60 * 24,
		sameSite: "none",
	});
	response.status = 201;
	response.body = {
		accessToken: userData.tokens.accessToken,
		user: userData.user,
	};
}

export async function logoutUser(ctx: Context): Promise<void> {
	const { response } = ctx;
	const refreshToken = await ctx.cookies.get("refreshToken");
	if (!refreshToken) throw ApiError.UnauthorizedError();

	const token = await logout(refreshToken);
	ctx.cookies.delete("refreshToken");
	// At this point the token was already deleted from the DB,
	// so it's fine to return it.
	response.body = token;
}

export async function refreshUser(ctx: Context): Promise<void> {
	const { response } = ctx;
	const refreshToken = await ctx.cookies.get("refreshToken");
	if (!refreshToken) throw ApiError.UnauthorizedError();

	const userData = await refresh(refreshToken);
	ctx.cookies.set("refreshToken", userData.tokens.refreshToken, {
		httpOnly: true,
		secure: true,
		maxAge: 30 * 60 * 60 * 24,
		sameSite: "none",
	});
	response.status = 201;
	response.body = {
		accessToken: userData.tokens.accessToken,
		user: userData.user,
	};
}

export async function getUsers(ctx: Context): Promise<void> {
	const { response } = ctx;
	const users = await getAllUsers();
	response.body = users;
}
