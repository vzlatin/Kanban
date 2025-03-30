import { create } from "zustand";
import { SigninStore } from "./types";
import { UserRole } from "../../../types/entities";
import { ApiError } from "../../../miscellaneous/utils/errors";
import { logout, signin, signup } from "../../../services/auth.service";
import { refreshAccessToken } from "../../../services/token.service";

const initialState = {
  user: {
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    role: UserRole.None,
    profileImageUrl: "",
  },
  isAuthenticated: false,
  error: null,
  trustDevice: JSON.parse(localStorage.getItem("trustDevice") || "false"),
  accessToken: "",
};

export const useSigninStore = create<SigninStore>((set) => ({
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
  logout: async () => {
    await logout();
    set((state) => ({
      ...state,
      isAuthenticated: false,
      accessToken: "",
      error: null,
      trustDevice: false,
    }));
  },
  setTrustDevice: (val) => {
    localStorage.setItem("trustDevice", JSON.stringify(val));
    set({ trustDevice: val });
  },
}));
