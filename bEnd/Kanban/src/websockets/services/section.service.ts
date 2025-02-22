import { Section } from "../types/entities.ts";
import { MessageMap } from "../types/zod/inbound.ts";
import { DatabaseError } from "../../errors/databaseErrors.ts";
import { ApiError } from "../../errors/apiErrors.ts";
import {
  _deleteSection,
  _insertSection,
  _updateSection,
} from "../../database/db.ts";

export async function createSection(
  payload: MessageMap["CreateSection"],
): Promise<Section> {
  const result = await _insertSection(payload);
  const section = result[0] ?? null;
  if (!section) throw DatabaseError.ConflictError();
  return section;
}

export async function updateSection(
  payload: MessageMap["UpdateSection"],
): Promise<Section> {
  const { id, ...rest } = payload;
  const result = await _updateSection(id, rest);
  const section = result[0] ?? null;
  if (!section) {
    throw ApiError.BadRequestError(
      `Record not found or not updated`,
    );
  }
  return section;
}

export async function deleteSection(
  payload: MessageMap["DeleteSection"],
): Promise<Section> {
  const result = await _deleteSection(payload.id);
  const section = result[0] ?? null;
  if (!section) {
    throw ApiError.BadRequestError(
      `Record not found or not updated`,
    );
  }
  return section;
}
