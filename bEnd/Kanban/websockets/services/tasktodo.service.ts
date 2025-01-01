import { DB } from "sqlite";
import { withTransaction } from "../../storage/orm/helpers.ts";
import { createModel } from "../../storage/orm/orm.ts";
import { TaskToDo, taskTodoColumns } from "../types/entities.ts";
import { MessageMap } from "../types/zod/inbound.ts";
import { DatabaseError } from "../../errors/databaseErrors.ts";
import { ApiError } from "../../errors/apiErrors.ts";

export async function createTaskToDo(
	payload: MessageMap["CreateTaskToDo"]
): Promise<TaskToDo> {
	const TaskToDoModel = createModel<TaskToDo>("tasktodos", taskTodoColumns);

	return await withTransaction(async (conn: DB) => {
		const lastInsertedRowId = await TaskToDoModel.insert(payload, conn);
		if (!lastInsertedRowId) throw DatabaseError.ConflictError();

		const tasktodo = await TaskToDoModel.findOne(
			{ id: lastInsertedRowId },
			undefined,
			conn
		);
		if (!tasktodo) throw DatabaseError.ConflictError();

		return tasktodo;
	});
}

export async function updateTaskToDo(
	payload: MessageMap["UpdateTaskToDo"]
): Promise<TaskToDo> {
	const TaskToDoModel = createModel<TaskToDo>("tasktodos", taskTodoColumns);

	return await withTransaction(async (conn: DB) => {
		const candidate = await TaskToDoModel.findOne(
			{ id: payload.id },
			undefined,
			conn
		);
		if (!candidate)
			throw ApiError.BadRequestError(
				`The tasktodo with id: ${payload.id} doesn't exist`
			);
		const updateData = Object.fromEntries(
			Object.entries(payload).filter(([key]) => key !== "id")
		);
		const tasktodo = await TaskToDoModel.update(
			{ id: payload.id },
			updateData,
			undefined,
			conn
		);
		if (!tasktodo)
			throw ApiError.BadRequestError(
				`The tasktodo with id: ${payload.id} doesn't exist`
			);

		return tasktodo;
	});
}

export async function deleteTaskToDo(
	payload: MessageMap["DeleteTaskToDo"]
): Promise<TaskToDo> {
	const TaskToDoModel = createModel<TaskToDo>("tasktodos", taskTodoColumns);

	return await withTransaction(async (conn: DB) => {
		const tasktodo = await TaskToDoModel.delete(
			{ id: payload.id },
			undefined,
			conn
		);
		if (!tasktodo)
			throw ApiError.BadRequestError(
				`The tasktodo with id: ${payload.id} doesn't exist`
			);
		return tasktodo;
	});
}
