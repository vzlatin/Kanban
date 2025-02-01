import type { StatusCode, StatusText } from "jsr:@oak/commons@1/status";

export class DatabaseError extends Error {
    errorName: StatusText;
    status: StatusCode;
    errors: unknown[];

    constructor(
        errorName: StatusText,
        status: StatusCode,
        message: string,
        errors: unknown[] = [],
    ) {
        super(message);
        this.errorName = errorName;
        this.status = status;
        this.errors = errors;
    }

    static ConflictError(message?: string): DatabaseError {
        return new DatabaseError("Conflict", 409, message || "Invalid Isert");
    }
}
