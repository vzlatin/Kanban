import { useAuthStore } from "../pages/signin/store";

export const getToken = () => useAuthStore.getState().tokens.accessT;
