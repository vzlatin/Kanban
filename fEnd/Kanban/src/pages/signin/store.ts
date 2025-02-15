import { create } from "zustand";
import { AuthStore } from "./types";
import { UserRole } from "../../interfaces/data-interfaces";
import { signin, signup } from "../../services/auth.service";
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
  trustDevice: JSON.parse(localStorage.getItem("trustDevice") || "false"),
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
        user,
        isAuthenticated: true,
        error: null,
        accessToken,
      }));
    } catch (e) {
      if (e instanceof ApiError) set({ error: e });
      else {
        set({
          error: new ApiError(
            "An unkown error has occured",
            "Unknown Error",
            0,
          ),
        });
      }
    }
  },
  refreshAccessToken: async () => {
    try {
      const response = await refreshAccessToken();
      const { accessToken, user } = response.data;

      set((state) => {
        return {
          ...state,
          user,
          accessToken,
          isAuthenticated: true,
          error: null,
        };
      });
    } catch (e) {
      if (e instanceof ApiError) set({ error: e });
      else {
        set({
          error: new ApiError(
            "An unkown error has occured",
            "Unknown Error",
            0,
          ),
        });
      }
    }
  },
  signup: async (credentials) => {
    try {
      const response = await signup(credentials);
      const { accessToken, user } = response.data;

      set((state) => ({
        ...state,
        user,
        isAuthenticated: true,
        accessToken,
        error: null,
      }));
    } catch (e) {
      if (e instanceof ApiError) set({ error: e });
      else {
        set({
          error: new ApiError(
            "An unkown error has occured",
            "Unknown Error",
            0,
          ),
        });
      }
    }
  },
  setTrustDevice: (val) => {
    localStorage.setItem("trustDevice", JSON.stringify(val));
    set({ trustDevice: val });
  },
}));
