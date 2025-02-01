import { DB } from "sqlite";
import { DatabaseError } from "../../errors/databaseErrors.ts";
import { withTransaction } from "../../storage/orm/helpers.ts";
import { createModel } from "../../storage/orm/orm.ts";
import { Board, boardColumns } from "../types/entities.ts";
import { MessageMap } from "../types/zod/inbound.ts";
import { ApiError } from "../../errors/apiErrors.ts";

export async function createBoard(
    payload: MessageMap["CreateBoard"],
): Promise<Board> {
    const BoardModel = createModel<Board>("boards", boardColumns);
    return await withTransaction(async (conn: DB) => {
        const lastInsertedRowId = await BoardModel.insert(payload, conn);
        if (!lastInsertedRowId) throw DatabaseError.ConflictError();

        const board = await BoardModel.findOne({ id: lastInsertedRowId });
        if (!board) throw DatabaseError.ConflictError();

        return board;
    });
}

export async function updateBoard(
    payload: MessageMap["UpdateBoard"],
): Promise<Board> {
    const BoardModel = createModel<Board>("boards", boardColumns);
    return await withTransaction(async (conn: DB) => {
        const candidate = await BoardModel.findOne(
            { id: payload.id },
            undefined,
            conn,
        );
        if (!candidate) {
            throw ApiError.BadRequestError(
                `A board with id: ${payload.id} doesn't exist`,
            );
        }

        const board = await BoardModel.update(
            { id: payload.id },
            { title: payload.title },
            undefined,
            conn,
        );
        if (!board) {
            throw ApiError.BadRequestError(
                `A board with id: ${payload.id} doesn't exist`,
            );
        }
        return board;
    });
}

export async function deleteBoard(
    payload: MessageMap["DeleteBoard"],
): Promise<Board> {
    const BoardModel = createModel<Board>("boards", boardColumns);
    return await withTransaction(async (conn: DB) => {
        const board = await BoardModel.delete(
            { id: payload.id },
            undefined,
            conn,
        );
        if (!board) {
            throw ApiError.BadRequestError(
                `A board with id: ${payload.id} doesn't exist`,
            );
        }
        return board;
    });
}
