import { type QueryParameterSet } from "sqlite";

import {
    aquireConnection,
    releaseConnection,
} from "../utils/database/connectionPool.ts";
import { row2Object } from "./utils/rowToObject.ts";
import { RowTuple, type Operator, type WhereClause } from "./types.ts";

export function createModel<T extends Record<string, unknown>>(
    table: string,
    columns: Array<keyof T>
) {
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

        findAll: async (
            where: WhereClause<T> = {},
            operator?: Operator
        ): Promise<T[] | undefined> => {
            const connection = await aquireConnection();
            operator === undefined ? "AND" : operator;
            try {
                const whereClause = Object.keys(where)
                    .map((key) => `${key} = ?`)
                    .join(`${operator}`);
                const queryString =
                    `SELECT * FROM ${table}` +
                    (whereClause ? `WHERE ${whereClause}` : "");
                const result = connection.query<RowTuple<T>>(
                    queryString,
                    Object.values(where) as QueryParameterSet
                );

                if (!result || result.length === 0) return undefined;

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
        findOne: async (
            where: WhereClause<T> = {},
            operator?: Operator
        ): Promise<T | undefined> => {
            const connection = await aquireConnection();
            operator === undefined ? "AND" : operator;
            try {
                const whereClause = Object.keys(where)
                    .map((key) => `${key} = ?`)
                    .join(`${operator}`);
                const queryString =
                    `SELECT * FROM ${table} ` +
                    (whereClause ? `WHERE ${whereClause}` : "");
                const result = connection.query<RowTuple<T>>(
                    queryString,
                    Object.values(where) as QueryParameterSet
                );

                if (!result || result.length === 0) {
                    return undefined;
                }

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
            data: Partial<T>,
            operator?: Operator
        ): Promise<void> => {
            const connection = await aquireConnection();
            operator === undefined ? "AND" : operator;
            try {
                const setString = Object.keys(data)
                    .map((key) => `${key} = ?`)
                    .join(", ");
                const whereString = Object.keys(where)
                    .map((key) => `${key} = ?`)
                    .join(` ${operator} `);
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
