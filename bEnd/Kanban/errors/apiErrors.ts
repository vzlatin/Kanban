import type { StatusCode, StatusText } from "jsr:@oak/commons@1/status";

export class ApiError extends Error {
  status: StatusCode;
  errors: unknown[];
  errorName: StatusText;

  constructor(
    errorName: StatusText,
    status: StatusCode,
    message: string,
    errors: {
      path: (string | number)[];
      message: string;
    }[] = [],
  ) {
    super(message);

    this.status = status;
    this.errors = errors;
    this.errorName = errorName;
  }

  static UnauthorizedError(): ApiError {
    return new ApiError("Unauthorized", 401, "User not authorized");
  }

  static BadRequestError(
    message: string,
    errors: {
      path: (string | number)[];
      message: string;
    }[] = [],
  ): ApiError {
    return new ApiError("Bad Request", 400, message, errors);
  }

  static UnsuportedMediaTypeError(): ApiError {
    return new ApiError(
      "Unsupported Media Type",
      415,
      "Expected JSON content type",
    );
  }

  static UnprocessableEntity(message: string): ApiError {
    return new ApiError("Unprocessable Entity", 422, message);
  }
}
