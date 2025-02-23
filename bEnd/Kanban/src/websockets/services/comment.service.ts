import { Comment } from "../../types/entities.ts";
import { ApiError } from "../../errors/apiErrors.ts";
import { MessageMap } from "../../types/validation.ts";
import { DatabaseError } from "../../errors/databaseErrors.ts";
import { _deleteComment, _insertComment } from "../../database/db.ts";

export async function createComment(
  payload: MessageMap["CreateComment"],
): Promise<Comment> {
  const result = await _insertComment(payload);
  const comment = result[0] ?? null;
  if (!comment) throw DatabaseError.ConflictError();
  return comment;
}

export async function deleteComment(
  payload: MessageMap["DeleteComment"],
): Promise<Comment> {
  const result = await _deleteComment(payload.id);
  const comment = result[0] ?? null;
  if (!comment) {
    throw ApiError.BadRequestError(
      `Record not found or not updated`,
    );
  }
  return comment;
}
