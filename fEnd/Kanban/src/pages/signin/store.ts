import { create } from "zustand";
import { AuthStore } from "./types";
import { UserRole } from "../../interfaces/data-interfaces";
import { signin } from "../../services/auth.service";
import { refreshAccessToken } from "../../services/token.service";
import { ApiError } from "../../http/errors";

const initialState = {
	user: {
		id: 0,
		email: "",
		firstName: "",
		lastName: "",
		role: UserRole.None,
	},
	isAuthenticated: false,
	error: null,
	accessToken: "",
};

export const useAuthStore = create<AuthStore>((set) => ({
	...initialState,
	signin: async (email, password) => {
		try {
			const response = await signin(email, password);
			const { accessToken, user } = response.data;

			set((state) => ({
				...state,
				user: {
					id: user.id,
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
					role: user.role,
				},
				isAuthenticated: true,
				accessToken,
			}));
		} catch (e) {
			if (e instanceof ApiError) set({ error: e });
			else
				set({
					error: new ApiError(
						"An unkown error has occured",
						"Unknown Error",
						0
					),
				});
		}
	},
	refreshAccessToken: async () => {
		try {
			const response = await refreshAccessToken();
			console.log(JSON.stringify(response));
		} catch (e) {
			console.error(e);
		}
	},
}));
