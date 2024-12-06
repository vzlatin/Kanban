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
	loading: false,
	accessToken: "",
};

export const useAuthStore = create<AuthStore>((set) => ({
	...initialState,
	signin: async (email, password) => {
		try {
			// set({ loading: true });
			const response = await signin(email, password);
			const { accessToken, user } = response.data;

			set((state) => ({
				...state,
				user,
				isAuthenticated: true,
				accessToken,
				// loading: false,
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
					// loading: false,
				});
		}
	},
	refreshAccessToken: async () => {
		try {
			// set({ loading: true });
			const response = await refreshAccessToken();
			const { accessToken, user } = response.data;

			set((state) => {
				return {
					...state,
					user,
					accessToken,
					isAuthenticated: true,
					error: null,
					loading: false,
				};
			});
		} catch (e) {
			if (e instanceof ApiError) set({ error: e });
			else
				set({
					error: new ApiError(
						"An unkown error has occured",
						"Unknown Error",
						0
					),
					// loading: false,
				});
		}
	},
	setLoading: (val) => {
		set({ loading: val });
	},
}));
