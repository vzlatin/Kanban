import type { Middleware } from "@oak/oak";
import { ApiError } from "../../errors/apiErrors.ts";
import { validateToken } from "../../shared/services/token.service.ts";

export const authHandler: Middleware = async (ctx, next) => {
  const { request } = ctx;
  const authorizationHeader = request.headers.get("Authorization");
  if (!authorizationHeader) throw ApiError.UnauthorizedError();

  const accessToken = authorizationHeader.split(" ")[1];
  if (!accessToken) throw ApiError.UnauthorizedError();
  try {
    const userData = await validateToken(accessToken, "access");
    ctx.state.user = userData;
    await next();
  } catch (_e) {
    throw ApiError.UnauthorizedError();
  }
};
