import { Task } from "../../types/entities.ts";
import { ApiError } from "../../errors/apiErrors.ts";
import { MessageMap } from "../../types/validation.ts";
import { DatabaseError } from "../../errors/databaseErrors.ts";
import { _deleteTask, _insertTask, _updateTask } from "../../database/db.ts";

export async function createTask(
  payload: MessageMap["CreateTask"],
): Promise<Task> {
  const result = await _insertTask(payload);
  const task = result[0] ?? null;
  if (!task) throw DatabaseError.ConflictError();
  return task;
}

export async function updateTask(
  payload: MessageMap["UpdateTask"],
): Promise<Task> {
  const { id, ...rest } = payload;
  const result = await _updateTask(id, rest);
  const task = result[0] ?? null;
  if (!task) {
    throw ApiError.BadRequestError(
      `Record not found or not updated`,
    );
  }
  return task;
}

export async function deleteTask(
  payload: MessageMap["DeleteTask"],
): Promise<Task> {
  const result = await _deleteTask(payload.id);
  const task = result[0] ?? null;
  if (!task) {
    throw ApiError.BadRequestError(
      `Record not found or not updated`,
    );
  }
  return task;
}
