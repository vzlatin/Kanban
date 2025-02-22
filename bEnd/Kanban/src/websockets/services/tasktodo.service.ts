import { TaskToDo } from "../types/entities.ts";
import { MessageMap } from "../types/zod/inbound.ts";
import { ApiError } from "../../errors/apiErrors.ts";
import { DatabaseError } from "../../errors/databaseErrors.ts";
import {
  _deleteTaskToDo,
  _insertTaskToDo,
  _updateTaskToDo,
} from "../../database/db.ts";

export async function createTaskToDo(
  payload: MessageMap["CreateTaskToDo"],
): Promise<TaskToDo> {
  const result = await _insertTaskToDo(payload);
  const tasktodo = result[0] ?? null;
  if (!tasktodo) throw DatabaseError.ConflictError();
  return tasktodo;
}

export async function updateTaskToDo(
  payload: MessageMap["UpdateTaskToDo"],
): Promise<TaskToDo> {
  const { id, ...rest } = payload;
  const result = await _updateTaskToDo(id, rest);
  const tasktodo = result[0] ?? null;
  if (!tasktodo) {
    throw ApiError.BadRequestError(
      `Record not found or not updated`,
    );
  }
  return tasktodo;
}

export async function deleteTaskToDo(
  payload: MessageMap["DeleteTaskToDo"],
): Promise<TaskToDo> {
  const result = await _deleteTaskToDo(payload.id);
  const tasktodo = result[0] ?? null;
  if (!tasktodo) {
    throw ApiError.BadRequestError(
      `Record not found or not updated`,
    );
  }
  return tasktodo;
}
