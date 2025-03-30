import { Credentials } from "../signup/types";
import { User } from "../../../types/entities";
import { ApiError } from "../../../miscellaneous/utils/errors";

export interface SigninStore {
  user: User;
  accessToken: string;
  isAuthenticated: boolean;
  error: ApiError | null;
  trustDevice: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signup: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  setTrustDevice: (val: boolean) => void;
  refreshAccessToken: () => Promise<void>;
}
