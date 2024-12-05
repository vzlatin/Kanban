import { AxiosRequestConfig } from "axios";
import { User } from "./data-interfaces";

export interface AuthResponse {
	user: User;
	accessToken: string;
}

export interface ApiErrorResponse {
	success: boolean;
	name: string;
	message: string;
	errors?: unknown[];
}

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
	retryCount?: number;
}
