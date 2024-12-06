import { AxiosResponse } from "axios";
import { useAuthStore } from "../pages/signin/store";
import { AuthResponse } from "../interfaces/http-interfaces";
import $defaultApi from "../http";

export const getToken = () => useAuthStore.getState().accessToken;

export const refreshAccessToken = async (): Promise<
	AxiosResponse<AuthResponse>
> => {
	return await $defaultApi.get<AuthResponse>("/refresh", {
		headers: {
			"Content-Type": "application/json; charser=utf-8",
		},
	});
};
