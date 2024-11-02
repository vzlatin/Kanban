/**
 * This helper functions helps turning a Row which is a tuple of values
 * returned by calls to db.query() into the corresponding type.
 */

import type { Row } from "sqlite";

export function row2Object<T>(data: Row[], columns: Array<keyof T>): T[] {
    return data.map((row) => {
        const rowObject = {} as T;
        columns.forEach((col, i) => {
            rowObject[col] = row[i] as T[keyof T];
        });
        return rowObject;
    });
}
