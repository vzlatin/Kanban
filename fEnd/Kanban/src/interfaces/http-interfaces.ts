import { User } from "./data-interfaces";

export interface AuthResponse {
	tokens: {
		accessToken: string;
		refreshToken: string;
	};
	user: User;
}
