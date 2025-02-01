import { DB } from "sqlite";
import { ApiError } from "../../errors/apiErrors.ts";
import { DatabaseError } from "../../errors/databaseErrors.ts";
import { withTransaction } from "../../storage/orm/helpers.ts";
import { createModel } from "../../storage/orm/orm.ts";
import { Column, columnColumns } from "../types/entities.ts";
import { MessageMap } from "../types/zod/inbound.ts";

export async function createColumn(
    payload: MessageMap["CreateColumn"],
): Promise<Column> {
    const ColumnModel = createModel<Column>("columns", columnColumns);

    return await withTransaction(async (conn: DB) => {
        const lastInsertedRowId = await ColumnModel.insert(payload, conn);
        if (!lastInsertedRowId) throw DatabaseError.ConflictError();

        const column = await ColumnModel.findOne(
            { id: lastInsertedRowId },
            undefined,
            conn,
        );
        if (!column) throw DatabaseError.ConflictError();

        return column;
    });
}

export async function updateColumn(
    payload: MessageMap["UpdateColumn"],
): Promise<Column> {
    const ColumnModel = createModel<Column>("columns", columnColumns);

    return await withTransaction(async (conn: DB) => {
        const candidate = await ColumnModel.findOne(
            { id: payload.id },
            undefined,
            conn,
        );
        if (!candidate) {
            throw ApiError.BadRequestError(
                `The column with id: ${payload.id} doesn't exist`,
            );
        }

        const column = await ColumnModel.update(
            { id: payload.id },
            { title: payload.title },
            undefined,
            conn,
        );
        if (!column) {
            throw ApiError.BadRequestError(
                `The column with id: ${payload.id} doesn't exist`,
            );
        }

        return column;
    });
}

export async function deleteColumn(
    payload: MessageMap["DeleteColumn"],
): Promise<Column> {
    const ColumnModel = createModel<Column>("columns", columnColumns);
    return await withTransaction(async (conn: DB) => {
        const column = await ColumnModel.delete(
            { id: payload.id },
            undefined,
            conn,
        );
        if (!column) {
            throw ApiError.BadRequestError(
                `The column with id: ${payload.id} doesn't exist`,
            );
        }

        return column;
    });
}
