import { CustomError } from "../types/errorTypes.ts";

export function MissingConfig(message: string): CustomError {
    const e = new Error(message) as CustomError;
    e.status = 500;
    e.name = "MissingConfigError";
    return e;
}
