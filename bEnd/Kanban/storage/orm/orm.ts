import { DB, type QueryParameterSet } from "sqlite";

import {
  aquireConnection,
  releaseConnection,
} from "../database/connectionPool.ts";
import { row2Object } from "./helpers.ts";
import { type Operator, RowTuple, type WhereClause } from "./types/ormTypes.ts";

export function createModel<
  T extends Record<string, unknown>,
  U extends Record<string, unknown> = never,
>(table: string, columns: Array<keyof T>) {
  const model = {
    insert: async (data: T, conn?: DB): Promise<number | undefined> => {
      const connection = conn || (await aquireConnection());
      const shouldRelease = !conn;
      console.log("Connection aquired: insert");
      const columns = Object.keys(data).join(",");
      const placeholders = Object.keys(data)
        .map(() => "?")
        .join(",");
      const values = Object.values(data) as QueryParameterSet;
      connection.query(
        `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`,
        values,
      );
      if (shouldRelease) releaseConnection(connection);
      return connection.lastInsertRowId
        ? connection.lastInsertRowId
        : undefined;
    },

    findAll: async (
      where: WhereClause<T> = {},
      operator: Operator = "AND",
      conn?: DB,
    ): Promise<T[] | undefined> => {
      const connection = conn || (await aquireConnection());
      const shouldRelease = !conn;
      console.log("Connection aquired: findall");
      const whereClause = Object.keys(where)
        .map((key) => `${key} = ?`)
        .join(`${operator}`);
      const queryString = `SELECT * FROM ${table}` +
        (whereClause ? `WHERE ${whereClause}` : "");
      const result = connection.query<RowTuple<T>>(
        queryString,
        Object.values(where) as QueryParameterSet,
      );

      if (!result || result.length === 0) {
        if (shouldRelease) releaseConnection(connection);
        return undefined;
      }

      if (shouldRelease) releaseConnection(connection);
      return row2Object(result, columns);
    },

    /**
     * Since calls to query always returns an array of tuples, if the
     * parameter allows for a collection of records to be returned,
     * the function will just return the first matching entry
     */
    findOne: async (
      where: WhereClause<T> = {},
      operator: Operator = "AND",
      conn?: DB,
    ): Promise<T | undefined> => {
      const connection = conn || (await aquireConnection());
      const shouldRelease = !conn;
      console.log("Connection aquired: findone");
      const whereClause = Object.keys(where)
        .map((key) => `${key} = ?`)
        .join(`${operator}`);
      const queryString = `SELECT * FROM ${table} ` +
        (whereClause ? `WHERE ${whereClause}` : "");
      const result = connection.query<RowTuple<T>>(
        queryString,
        Object.values(where) as QueryParameterSet,
      );

      if (!result || result.length === 0) {
        if (shouldRelease) releaseConnection(connection);
        return undefined;
      }

      if (shouldRelease) releaseConnection(connection);
      return row2Object(result, columns)[0];
    },

    update: async (
      where: WhereClause<T> = {},
      data: Partial<T>,
      operator: Operator = "AND",
      conn?: DB,
    ): Promise<T | undefined> => {
      const connection = conn || (await aquireConnection());
      const shouldRelease = !conn;
      console.log("Connection aquired: update");
      const setString = Object.keys(data)
        .map((key) => `${key} = ?`)
        .join(", ");
      const whereString = Object.keys(where)
        .map((key) => `${key} = ?`)
        .join(` ${operator} `);
      const values = [...Object.values(data), ...Object.values(where)];

      connection.query(
        `UPDATE ${table} SET ${setString} WHERE ${whereString}`,
        values,
      );
      console.log("update query executed");
      const updatedRow = await model.findOne(where, operator, connection);
      if (shouldRelease) releaseConnection(connection);

      return updatedRow;
    },

    delete: async (
      where: WhereClause<T>,
      operator: Operator = "AND",
      conn?: DB,
    ): Promise<T | undefined> => {
      const connection = conn || (await aquireConnection());
      const shouldRelease = !conn;
      console.log("Connection aquired: delete");
      const deletedRow = await model.findOne(where, operator, connection);

      const whereClause = Object.keys(where)
        .map((key) => `${key} = ?`)
        .join(`${operator}`);
      const queryString = `DELETE FROM ${table} ` +
        (whereClause ? `WHERE ${whereClause}` : "");
      connection.query(
        queryString,
        Object.values(where) as QueryParameterSet,
      );

      if (shouldRelease) releaseConnection(connection);
      return deletedRow;
    },

    findWithJoin: async (
      joinTable: string,
      primaryKey: keyof T,
      foreignKey: keyof U,
      selectColumns: {
        primary: Array<keyof T>;
        joined: Array<keyof U>;
      },
      where: Partial<T> = {},
      operator: Operator = "AND",
      conn?: DB,
    ): Promise<(T & { [K in keyof U[]]: U[] })[]> => {
      const connection = conn || (await aquireConnection());
      const shouldRelease = !conn;
      console.log("Connection aquired: findwithjoin");
      const primaryColumns = selectColumns.primary
        .map((col) => `${table}.${String(col)}`)
        .join(", ");
      const joinedColumns = selectColumns.joined
        .map((col) => `${joinTable}.${String(col)}`)
        .join(", ");
      const selectClause = `${primaryColumns}, ${joinedColumns}`;

      const whereClause = Object.keys(where)
        .map((key) => `${table}.${key} = ?`)
        .join(` ${operator} `);
      const whereValues = Object.values(where) as QueryParameterSet;

      const query = `
                SELECT ${selectClause}
                FROM ${table}
                LEFT JOIN ${joinTable} ON ${table}.${
        String(
          primaryKey,
        )
      } = ${joinTable}.${String(foreignKey)}
                ${whereClause ? `WHERE ${whereClause}` : ""}`;

      const result = connection.query(query, whereValues);
      if (shouldRelease) releaseConnection(connection);

      const primaryMap: Record<
        string | number,
        T & { [K in keyof U[]]: U[] }
      > = {};
      const joinedColumnOffset = selectColumns.primary.length;

      for (const row of result) {
        const primaryData = row.slice(0, joinedColumnOffset);
        const joinedData = row.slice(joinedColumnOffset);

        const primaryRecord: T = Object.fromEntries(
          selectColumns.primary.map((
            col,
            idx,
          ) => [col, primaryData[idx]]),
        ) as T;

        const joinedRecord: U = Object.fromEntries(
          selectColumns.joined.map((
            col,
            idx,
          ) => [col, joinedData[idx]]),
        ) as U;

        const primaryKeyValue = primaryRecord[primaryKey] as
          | string
          | number;
        if (!primaryMap[primaryKeyValue]) {
          primaryMap[primaryKeyValue] = {
            ...primaryRecord,
            [joinTable]: [],
          } as T & { [K in keyof U[]]: U[] };
        }

        if (Object.values(joinedRecord).some((val) => val !== null)) {
          (primaryMap[primaryKeyValue][joinTable] as U[]).push(
            joinedRecord,
          );
        }
      }

      return Object.values(primaryMap);
    },
  };

  return model;
}
