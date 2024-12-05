import { ApiError } from "../../http/errors";
import { User } from "../../interfaces/data-interfaces";

export interface AuthStore {
	user: User;
	accessToken: string;
	isAuthenticated: boolean;
	error: ApiError | null;
	signin: (email: string, password: string) => Promise<void>;
	refreshAccessToken: () => Promise<void>;
}
