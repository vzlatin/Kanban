import { DatabaseError } from "../../errors/databaseErrors.ts";
import { Board } from "../types/entities.ts";
import { MessageMap } from "../types/zod/inbound.ts";
import { ApiError } from "../../errors/apiErrors.ts";
import { _deleteBoard, _insertBoard, _updateBoard } from "../../database/db.ts";

export async function createBoard(
  payload: MessageMap["CreateBoard"],
): Promise<Board> {
  const result = await _insertBoard(payload);
  const board = result[0] ?? null;
  if (!board) throw DatabaseError.ConflictError();
  return board;
}

export async function updateBoard(
  payload: MessageMap["UpdateBoard"],
): Promise<Board> {
  const { id, ...rest } = payload;
  const result = await _updateBoard(id, rest);
  const board = result[0] ?? null;
  if (!board) {
    throw ApiError.BadRequestError(
      `Record not found or not updated`,
    );
  }
  return board;
}

export async function deleteBoard(
  payload: MessageMap["DeleteBoard"],
): Promise<Board> {
  const result = await _deleteBoard(payload.id);
  const board = result[0] ?? null;
  if (!board) {
    throw ApiError.BadRequestError(
      `Record not found or not deleted`,
    );
  }
  return board;
}
