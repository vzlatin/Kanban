import { AxiosResponse } from "axios";
import $api from "../http";
import { AuthResponse } from "../interfaces/http-interfaces";

export const signin = async (
	email: string,
	password: string
): Promise<AxiosResponse<AuthResponse>> => {
	return $api.post<AuthResponse>("/signin", { email, password });
};
