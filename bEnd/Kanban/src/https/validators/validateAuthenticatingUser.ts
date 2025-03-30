import type { Middleware } from "@oak/oak";
import { z } from "zod";
import { ApiError } from "../../errors/apiErrors.ts";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(18),
});

export const validateAuthenticatingUser: Middleware = async (ctx, next) => {
  const { request } = ctx;

  if (!request.hasBody) {
    throw ApiError.BadRequestError("Request body is required");
  }

  if (request.body.type() !== "json") {
    throw ApiError.UnsuportedMediaTypeError();
  }

  const body = await request.body.json();
  const parsedBody = userSchema.safeParse(body);

  if (!parsedBody.success) {
    const errors = parsedBody.error.errors.map((e) => ({
      path: e.path,
      message: e.message,
    }));

    throw ApiError.BadRequestError(
      "Could not validate user payload",
      errors,
    );
  }

  await next();
};
