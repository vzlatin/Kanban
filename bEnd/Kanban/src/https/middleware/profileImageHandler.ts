import { Middleware } from "@oak/oak";
import { FileUploadResult } from "../../types/files.ts";
import { ApiError } from "../../errors/apiErrors.ts";
import { updateUser } from "../../database/db.ts";
import { Payload } from "jwt";

export const profileImageHandler: Middleware = async (ctx, _next) => {
  const user: Payload & {
    id: number;
    email: string;
    fName: string;
    lName: string;
  } = ctx.state.user;
  const uploadedFiles: FileUploadResult = ctx.state.uploadedFiles;
  if (!uploadedFiles) {
    throw ApiError.BadRequestError("File upload result is invalid");
  }
  if (uploadedFiles.data.length > 1) {
    throw ApiError.BadRequestError("Invalid payload");
  }
  const profileImageFile = Object.values(uploadedFiles.data[0])[0];
  const updatedUser = await updateUser(user.id, {
    profileImageUrl: profileImageFile.url,
  });
  ctx.response.body = updatedUser;
};
