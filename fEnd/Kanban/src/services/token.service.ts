import { AxiosResponse } from "axios";
import { useAuthStore } from "../pages/signin/store";
import { AuthResponse } from "../interfaces/http-interfaces";
import $api from "../http";

export const getToken = () => useAuthStore.getState().accessToken;

export const refreshAccessToken = async (): Promise<
	AxiosResponse<AuthResponse>
> => {
	return await $api.get<AuthResponse>("/refresh", {
		headers: {
			"Content-Type": "application/json; charser=utf-8",
		},
	});
};
