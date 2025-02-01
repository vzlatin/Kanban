import { ApiValidationError } from "../interfaces/http-interfaces";

export class ApiError extends Error {
	name: string;
	status: number;

	constructor(message: string, name: string, status: number) {
		super(message);
		this.name = name;
		this.status = status;
	}
}

export class UnauthorizedError extends ApiError {
	constructor(message: string = "Access Unauthorized") {
		super(message, "Unauthorized Error", 401);
	}
}

export class BadRequestError extends ApiError {
	errors: ApiValidationError[];

	constructor(message: string, errors: ApiValidationError[] = []) {
		super(message, "Bad Request Error", 400);
		this.errors = errors;
	}
}

export class UnsuportedMediaTypeError extends ApiError {
	constructor(message: string = "Expected JSON content type") {
		super(message, "Unsuported Media Type Error", 415);
	}
}

export class NetworkError extends ApiError {
	constructor(message: string = "Unexpected Network Error") {
		super(message, "Network Error", 0);
	}
}

export class ServerError extends ApiError {
	constructor(message: string, status: number) {
		super(message, "Internal Server Error", status);
	}
}
