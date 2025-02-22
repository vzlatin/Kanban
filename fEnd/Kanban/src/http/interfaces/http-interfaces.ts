import { AxiosRequestConfig } from "axios";
import { EntityCollection, User } from "../../state/types";

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface EntityCollectionResponse extends EntityCollection {}

export interface UserReponse extends User {}

export interface ApiErrorResponse {
  success: boolean;
  name: string;
  message: string;
  errors?: ApiValidationError[];
}

export interface ApiValidationError {
  error?: {
    path: (string | number)[];
    message: string;
  };
}

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  retryCount?: number;
}
