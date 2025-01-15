import { AxiosResponse } from "axios";
import { $api } from "../http";
import { useAuthStore } from "../pages/signin/store";
import { UserReponse } from "../interfaces/http-interfaces";

export const checkAuth = () => useAuthStore.getState().isAuthenticated;

export const getUsers = async (): Promise<AxiosResponse<UserReponse[]>> => {
	return $api.get<UserReponse[]>("/users", {
		headers: {
			"Content-Type": "application/json; charser=utf-8",
		},
	});
};
