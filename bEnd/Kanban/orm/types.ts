/**
 * This type is a helper to type calls to the db.query() which is
 * generic over a tuple of types, corresponsding to columns of a database row.
 * This type converts a object of type T into a tuple of the types of its properties.
 */
export type RowTuple<T extends Record<string, unknown>> = {
    [K in keyof T]: T[K];
} extends infer U
    ? U extends unknown[]
        ? U
        : never
    : never;
