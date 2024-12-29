import type { Middleware } from "@oak/oak";
import { ApiError } from "../../errors/apiErrors.ts";
import { DatabaseError } from "../../errors/databaseErrors.ts";

export const errorHandler: Middleware = async (ctx, next) => {
	try {
		await next();
	} catch (e) {
		console.error("Error caught by the global error handler:", e);
		if (e instanceof ApiError || e instanceof DatabaseError) {
			ctx.response.status = e.status;
			ctx.response.body = {
				success: false,
				name: e.errorName,
				message: e.message,
				errors: e.errors,
			};
		} else {
			ctx.response.status = 500;
			ctx.response.body = {
				success: false,
				name: "Uknown Error",
				message: "An unkown error has occured",
			};
		}
	}
};
