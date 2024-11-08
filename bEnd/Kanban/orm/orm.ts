import { type QueryParameterSet } from "sqlite";

import {
    aquireConnection,
    releaseConnection,
} from "../database/connectionPool.ts";
import { row2Object } from "./helpers.ts";
import {
    RowTuple,
    type Operator,
    type WhereClause,
} from "../types/ormTypes.ts";

export function createModel<T extends Record<string, unknown>>(
    table: string,
    columns: Array<keyof T>
) {
    const model = {
        insert: async (data: T): Promise<number | undefined> => {
            const connection = await aquireConnection();
            const columns = Object.keys(data).join(",");
            const placeholders = Object.keys(data)
                .map(() => "?")
                .join(",");
            const values = Object.values(data) as QueryParameterSet;
            connection.query(
                `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`,
                values
            );
            releaseConnection(connection);
            return connection.lastInsertRowId
                ? connection.lastInsertRowId
                : undefined;
        },

        findAll: async (
            where: WhereClause<T> = {},
            operator?: Operator
        ): Promise<T[] | undefined> => {
            const connection = await aquireConnection();
            operator === undefined ? "AND" : operator;
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

            releaseConnection(connection);
            return row2Object(result, columns);
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

            releaseConnection(connection);
            return row2Object(result, columns)[0];
        },

        update: async (
            where: WhereClause<T> = {},
            data: Partial<T>,
            operator?: Operator
        ): Promise<void> => {
            const connection = await aquireConnection();
            operator === undefined ? "AND" : operator;
            const setString = Object.keys(data)
                .map((key) => `${key} = ?`)
                .join(", ");
            const whereString = Object.keys(where)
                .map((key) => `${key} = ?`)
                .join(` ${operator} `);
            const values = [...Object.values(data), ...Object.values(where)];

            connection.query(
                `UPDATE ${table} SET ${setString} WHERE ${whereString}`,
                values
            );
            releaseConnection(connection);
        },

        delete: async (
            where: WhereClause<T>,
            operator?: Operator
        ): Promise<T | undefined> => {
            const connection = await aquireConnection();

            operator === undefined ? "AND" : operator;

            const deletedRow = await model.findOne(where, operator);

            const whereClause = Object.keys(where)
                .map((key) => `${key} = ?`)
                .join(`${operator}`);
            const queryString =
                `DELETE FROM ${table} ` +
                (whereClause ? `WHERE ${whereClause}` : "");
            connection.query(
                queryString,
                Object.values(where) as QueryParameterSet
            );

            releaseConnection(connection);
            return deletedRow;
        },
    };
    return model;
}
