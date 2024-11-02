import { type QueryParameterSet } from "sqlite";

import {
    aquireConnection,
    releaseConnection,
} from "../utils/database/connectionPool.ts";
import { RowTuple } from "./types.ts";
import { row2Object } from "./utils/rowToObject.ts";

type WhereClause<T> = Partial<Record<keyof T, unknown>>;

export function createModel<T extends Record<string, unknown>>(table: string) {
    return {
        insert: async (data: T): Promise<number> => {
            const connection = await aquireConnection();
            try {
                const columns = Object.keys(data).join(",");
                const placeholders = Object.keys(data)
                    .map(() => "?")
                    .join(",");
                const values = Object.values(data) as QueryParameterSet;
                connection.query(
                    `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`,
                    values
                );
                return connection.lastInsertRowId;
            } catch (e) {
                console.log(e);
                throw e;
            } finally {
                releaseConnection(connection);
            }
        },

        findAll: async (where: WhereClause<T> = {}): Promise<T[]> => {
            const connection = await aquireConnection();
            try {
                const columns = Object.keys(where) as Array<keyof T>;
                const whereClause = Object.keys(where)
                    .map((key) => `${key} = ?`)
                    .join("AND");
                const queryString =
                    `SELECT * FROM ${table}` +
                    (whereClause ? `WHERE ${whereClause}` : "");
                const result = connection.query<RowTuple<T>>(
                    queryString,
                    Object.values(where) as QueryParameterSet
                );
                return row2Object(result, columns);
            } catch (e) {
                console.log(e);
                throw e;
            } finally {
                releaseConnection(connection);
            }
        },

        /**
         * Since calls to query always returns an array of tuples, if the
         * parameter allows for a collection of records to be returned,
         * the function will just return the first matching entry
         */
        findOne: async (where: WhereClause<T> = {}): Promise<T> => {
            const connection = await aquireConnection();
            try {
                const columns = Object.keys(where) as Array<keyof T>;
                const whereClause = Object.keys(where)
                    .map((key) => `${key} = ?`)
                    .join("AND");
                const queryString =
                    `SELECT * FROM ${table} ` +
                    (whereClause ? `WHERE ${whereClause}` : "");
                const result = connection.query<RowTuple<T>>(
                    queryString,
                    Object.values(where) as QueryParameterSet
                );
                return row2Object(result, columns)[0];
            } catch (e) {
                console.log(e);
                throw e;
            } finally {
                releaseConnection(connection);
            }
        },

        update: async (
            where: WhereClause<T>,
            data: Partial<T>
        ): Promise<void> => {
            const connection = await aquireConnection();
            try {
                const setString = Object.keys(data)
                    .map((key) => `${key} = ?`)
                    .join(", ");
                const whereString = Object.keys(where)
                    .map((key) => `${key} = ?`)
                    .join(" AND ");
                const values = [
                    ...Object.values(data),
                    ...Object.values(where),
                ];

                connection.query(
                    `UPDATE ${table} SET ${setString} WHERE ${whereString}`,
                    values
                );
            } catch (e) {
                console.log(e);
                throw e;
            } finally {
                releaseConnection(connection);
            }
        },
    };
}
