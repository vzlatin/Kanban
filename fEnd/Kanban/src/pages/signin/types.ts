import { ApiError } from "../../http/errors";
import { User } from "../../http/interfaces/data-interfaces";
import { Credentials } from "../signup/types";

export interface AuthStore {
  user: User;
  accessToken: string;
  isAuthenticated: boolean;
  error: ApiError | null;
  trustDevice: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signup: (credentials: Credentials) => Promise<void>;
  setTrustDevice: (val: boolean) => void;
  refreshAccessToken: () => Promise<void>;
}
