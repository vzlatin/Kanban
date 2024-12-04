import { useAuthStore } from "../pages/signin/store";

export const checkAuth = () => useAuthStore.getState().isAuthenticated;
