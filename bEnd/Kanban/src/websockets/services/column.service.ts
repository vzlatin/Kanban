import { Column } from "../../types/entities.ts";
import { ApiError } from "../../errors/apiErrors.ts";
import { MessageMap } from "../../types/validation.ts";
import { DatabaseError } from "../../errors/databaseErrors.ts";
import {
  _deleteColumn,
  _insertColumn,
  _updateColumn,
  _updateColumnsOrder,
} from "../../database/db.ts";

export async function createColumn(
  payload: MessageMap["CreateColumn"],
): Promise<Column> {
  const result = await _insertColumn(payload);
  const column = result[0] ?? null;
  if (!column) throw DatabaseError.ConflictError();
  return column;
}

export async function updateColumn(
  payload: MessageMap["UpdateColumn"],
): Promise<Column> {
  const { id, ...rest } = payload;
  const result = await _updateColumn(id, rest);
  const column = result[0] ?? null;
  if (!column) {
    throw ApiError.BadRequestError(
      `Record not found or not updated`,
    );
  }
  return column;
}

export async function updateColumnsOrder(
  payload: MessageMap["UpdateColumnsOrder"],
): Promise<Column[]> {
  return await _updateColumnsOrder(payload);
}

export async function deleteColumn(
  payload: MessageMap["DeleteColumn"],
): Promise<Column> {
  const result = await _deleteColumn(payload.id);
  const column = result[0] ?? null;
  if (!column) {
    throw ApiError.BadRequestError(
      `Record not found or not updated`,
    );
  }
  return column;
}
