import { CustomError } from "../types/errorTypes.ts";

export function BadRequest(message: string): CustomError {
    const e = new Error(message) as CustomError;
    e.status = 400;
    e.name = "BadRequestError";
    return e;
}

export function Unauthorized(message: string): CustomError {
    const e = new Error(message) as CustomError;
    e.status = 401;
    e.name = "UnauthorizedError";
    return e;
}
