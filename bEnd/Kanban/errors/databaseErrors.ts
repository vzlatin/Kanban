import type { CustomError } from "../types/errorTypes.ts";

/** Dabatabase related errors */

export function DBRecordAlreadyExists(message: string): CustomError {
    const e = new Error(message) as CustomError;
    e.status = 500;
    e.name = "RecordAlreadyExistsError";
    return e;
}

export function DBRecordNotFound(message: string): CustomError {
    const e = new Error(message) as CustomError;
    e.status = 500;
    e.name = "RecordNotFoundError";
    return e;
}

export function DBInsertFailed(message: string): CustomError {
    const e = new Error(message) as CustomError;
    e.status = 500;
    e.name = "InsertFailedError";
    return e;
}
