import { DB } from "sqlite";
import { withTransaction } from "../../storage/orm/helpers.ts";
import { createModel } from "../../storage/orm/orm.ts";
import { Task, taskColumns } from "../types/entities.ts";
import { MessageMap } from "../types/zod/inbound.ts";
import { DatabaseError } from "../../errors/databaseErrors.ts";
import { ApiError } from "../../errors/apiErrors.ts";

export async function createTask(
    payload: MessageMap["CreateTask"],
): Promise<Task> {
    const TaskModel = createModel<Task>("tasks", taskColumns);

    return await withTransaction(async (conn: DB) => {
        const lastInsertedRowId = await TaskModel.insert(payload, conn);
        if (!lastInsertedRowId) throw DatabaseError.ConflictError();

        const task = await TaskModel.findOne(
            { id: lastInsertedRowId },
            undefined,
            conn,
        );
        if (!task) throw DatabaseError.ConflictError();

        return task;
    });
}

export async function updateTask(
    payload: MessageMap["UpdateTask"],
): Promise<Task> {
    const TaskModel = createModel<Task>("tasks", taskColumns);

    return await withTransaction(async (conn: DB) => {
        const candidate = await TaskModel.findOne(
            { id: payload.id },
            undefined,
            conn,
        );
        if (!candidate) {
            throw ApiError.BadRequestError(
                `The task with id: ${payload.id} doesn't exist`,
            );
        }
        const updateData = Object.fromEntries(
            Object.entries(payload).filter(([key]) => key !== "id"),
        );
        const task = await TaskModel.update(
            { id: payload.id },
            updateData,
            undefined,
            conn,
        );
        if (!task) {
            throw ApiError.BadRequestError(
                `The task with id: ${payload.id} doesn't exist`,
            );
        }

        return task;
    });
}

export async function deleteTask(
    payload: MessageMap["DeleteTask"],
): Promise<Task> {
    const TaskModel = createModel<Task>("tasks", taskColumns);

    return await withTransaction(async (conn: DB) => {
        const task = await TaskModel.delete(
            { id: payload.id },
            undefined,
            conn,
        );
        if (!task) {
            throw ApiError.BadRequestError(
                `The task with id: ${payload.id} doesn't exist`,
            );
        }
        return task;
    });
}
