import { User } from "../../interfaces/data-interfaces";

export interface AuthStore {
	user: User;
	tokens: {
		accessT: string;
		refreshT: string;
	};
	isAuthenticated: boolean;
	setToken: (accessT: string) => void;
	signin: (email: string, password: string) => Promise<void>;
}
