import axios, { AxiosError } from "axios";
import { getToken } from "../services/token.service";
import {
  ApiErrorResponse,
  CustomAxiosRequestConfig,
} from "../interfaces/http-interfaces";
import {
  ApiError,
  BadRequestError,
  NetworkError,
  ServerError,
  UnauthorizedError,
  UnsuportedMediaTypeError,
} from "./errors";

const baseURL: string = import.meta.env.VITE_BASE_URL;
const maxRetries: number = import.meta.env.VITE_MAX_RETRIES;
const timeout: number = import.meta.env.VITE_TIMEOUT;

console.log(baseURL);

const $defaultApi = axios.create({
  baseURL,
  timeout,
  withCredentials: true,
});

// Response interceptor to normalize the errors and
// retry the request
$defaultApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const config = error.config as CustomAxiosRequestConfig;
    if (!config || config.retryCount === undefined) {
      config.retryCount = 0;
    }

    if (
      config.retryCount < maxRetries &&
      (isNetworkError(error) || isServerError(error))
    ) {
      config.retryCount += 1;
      console.warn(
        `Retrying request. Attempt: ${config.retryCount} / ${maxRetries}`,
      );
      return $defaultApi(config);
    }

    throw normalizeError(error);
  },
);

export const $api = axios.create({
  baseURL,
  timeout,
  withCredentials: true,
});

$api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  (error) => Promise.reject(error),
);

export default $defaultApi;

const isNetworkError = (error: AxiosError<ApiErrorResponse>): boolean => {
  return !error.response || error.code === "ECONNABORTED";
};

const isServerError = (error: AxiosError<ApiErrorResponse>): boolean => {
  return error.response?.status !== undefined && error.response.status >= 500;
};

const normalizeError = (error: AxiosError<ApiErrorResponse>): ApiError => {
  if (error.response) {
    // If there's a response, it means that the server has returned
    // a response containing an error, a.k.a. status is >= 400
    const { data, status } = error.response;

    if (status === 400) return new BadRequestError(data.message, data.errors);
    if (status === 401) return new UnauthorizedError();
    if (status === 415) return new UnsuportedMediaTypeError();
    if (status >= 500) return new ServerError(data.message, status);
    // For any other response errors:
    return new ApiError(data.message, data.name, status);
  }

  if (isNetworkError(error)) return new NetworkError();

  return new ApiError(
    error.message || "An unexpected error has occured",
    error.name || "Unexpected Error",
    0,
  );
};
