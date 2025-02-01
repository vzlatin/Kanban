import type { DB, Row } from "sqlite";
import {
    aquireConnection,
    releaseConnection,
} from "../database/connectionPool.ts";
import { DatabaseError } from "../../errors/databaseErrors.ts";

/**
 * This helper functions helps turning a Row which is a tuple of values
 * returned by calls to db.query() into the corresponding type.
 */
export function row2Object<T>(data: Row[], columns: Array<keyof T>): T[] {
    return data.map((row) => {
        const rowObject = {} as T;
        columns.forEach((col, i) => {
            rowObject[col] = row[i] as T[keyof T];
        });
        return rowObject;
    });
}

/**
 * Helper function which runs several database operations atomically.
 */
export async function withTransaction<T>(
    callback: (conn: DB) => Promise<T>,
): Promise<T> {
    const connection = await aquireConnection();

    try {
        return connection.transaction(async () => await callback(connection));
    } catch (_error) {
        throw DatabaseError.ConflictError("Failed Transaction, Rollick Back");
    } finally {
        releaseConnection(connection);
    }
}
