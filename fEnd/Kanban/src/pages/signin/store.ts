import { create } from "zustand";
import { AuthStore } from "./types";
import { UserRole } from "../../interfaces/data-interfaces";
import { signin } from "../../services/auth.service";

const initialState = {
	user: {
		id: 0,
		email: "",
		firstName: "",
		lastName: "",
		role: UserRole.None,
	},
	isAuthenticated: false,
	tokens: {
		accessT: "",
		refreshT: "",
	},
};

export const useAuthStore = create<AuthStore>((set) => ({
	...initialState,
	setToken: (accessT) =>
		set((state) => ({ ...state, tokens: { ...state.tokens, accessT } })),
	signin: async (email, password) => {
		try {
			const response = await signin(email, password);
			const { tokens, user } = response.data;

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
				tokens: {
					accessT: tokens.accessToken,
					refreshT: tokens.refreshToken,
				},
			}));
		} catch (error) {
			console.log(error);
		}
	},
}));
