import type { Middleware } from "@oak/oak";
import { isCustomError } from "../errors/helpers.ts";

export const errorHandler: Middleware = async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        console.error("Error caught by the global error handler:", e);
        if (isCustomError(e)) {
            ctx.response.status = e.status;
            ctx.response.body = {
                success: false,
                name: e.name,
                message: e.message,
            };
        } else {
            ctx.response.status = 500;
            ctx.response.body = {
                success: false,
                name: "Uknown Error",
                message: "And unkown error has occured",
            };
        }
    }
};
