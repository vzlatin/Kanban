import { User } from "./entities";

export type AuthResponse = {
  user: User;
  accessToken: string;
}

export type ApiErrorResponse = {
  success: boolean;
  name: string;
  message: string;
  errors?: ApiValidationError[];
}

export type ApiValidationError = {
  error?: {
    path: (string | number)[];
    message: string;
  };
}
