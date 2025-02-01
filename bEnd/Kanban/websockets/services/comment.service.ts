import { DB } from "sqlite";
import { withTransaction } from "../../storage/orm/helpers.ts";
import { createModel } from "../../storage/orm/orm.ts";
import { Comment, commentColumns } from "../types/entities.ts";
import { MessageMap } from "../types/zod/inbound.ts";
import { DatabaseError } from "../../errors/databaseErrors.ts";
import { ApiError } from "../../errors/apiErrors.ts";

export async function createComment(
    payload: MessageMap["CreateComment"],
): Promise<Comment> {
    const CommentModel = createModel<Comment>("comments", commentColumns);

    return await withTransaction(async (conn: DB) => {
        const lastInsertedRowId = await CommentModel.insert(payload, conn);
        if (!lastInsertedRowId) throw DatabaseError.ConflictError();

        const comment = await CommentModel.findOne(
            { id: lastInsertedRowId },
            undefined,
            conn,
        );
        if (!comment) throw DatabaseError.ConflictError();

        return comment;
    });
}

export async function deleteComment(
    payload: MessageMap["DeleteComment"],
): Promise<Comment> {
    const CommentModel = createModel<Comment>("comments", commentColumns);

    return await withTransaction(async (conn: DB) => {
        const comment = await CommentModel.delete(
            { id: payload.id },
            undefined,
            conn,
        );
        if (!comment) {
            throw ApiError.BadRequestError(
                `The comment with id: ${payload.id} doesn't exist`,
            );
        }
        return comment;
    });
}
