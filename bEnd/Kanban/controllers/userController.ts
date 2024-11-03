import { Context } from "@oak/oak";

import { register } from "../services/userService.ts";
import type { User } from "../types/userTypes.ts";

export async function registerUser(ctx: Context) {
    const { request, response } = ctx;
    if (request.hasBody && request.body.type() === "json") {
        const user: User = await request.body.json();
        const userData = await register(user);
        ctx.cookies.set("refreshToken", userData.tokens.refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 30 * 60 * 60 * 24,
        });
        response.status = 201;
        response.body = userData;
    }
}
