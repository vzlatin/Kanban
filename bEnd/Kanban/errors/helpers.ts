import { CustomError } from "../types/errorTypes.ts";

export function isCustomError(error: unknown): error is CustomError {
    return (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        "message" in error
    );
}
