import { AxiosResponse } from "axios";
import { AuthResponse } from "../interfaces/http-interfaces";
import $defaultApi from "../http/index";

export const signin = async (
	email: string,
	password: string
): Promise<AxiosResponse<AuthResponse>> => {
	return await $defaultApi.post<AuthResponse>(
		"/signin",
		{ email, password },
		{
			headers: {
				"Content-Type": "application/json; charser=utf-8",
			},
		}
	);
};
