import { ApiError } from "../../http/errors";
import { User } from "../../interfaces/data-interfaces";
import { Credentials } from "../signup/types";

export interface AuthStore {
	user: User;
	accessToken: string;
	isAuthenticated: boolean;
	error: ApiError | null;
	loading: boolean;
	signin: (email: string, password: string) => Promise<void>;
	signup: (credentials: Credentials) => Promise<void>;
	refreshAccessToken: () => Promise<void>;
	setLoading: (val: boolean) => void;
}
