import { AxiosRequestConfig } from "axios";
import { Column, Section, User } from "./data-interfaces";

export interface AuthResponse {
	user: User;
	accessToken: string;
}

export interface SectionResponse extends Section {}
export interface ColumnResponse extends Column {}
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
