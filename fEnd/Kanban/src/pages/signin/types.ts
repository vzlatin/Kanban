import { ApiError } from "../../http/errors";
import { User } from "../../interfaces/data-interfaces";

export interface AuthStore {
	user: User;
	accessToken: string;
	isAuthenticated: boolean;
	error: ApiError | null;
	loading: boolean;
	signin: (email: string, password: string) => Promise<void>;
	refreshAccessToken: () => Promise<void>;
	setLoading: (val: boolean) => void;
}
