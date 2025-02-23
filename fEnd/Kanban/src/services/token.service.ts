import { AxiosResponse } from "axios";
import { AuthResponse } from "../types/responses";
import { useSigninStore } from "../state/stores/signin/store";
import $defaultApi from "../miscellaneous/config/axios.default";

export const getToken = () => useSigninStore.getState().accessToken;

export const refreshAccessToken = async (): Promise<
  AxiosResponse<AuthResponse>
> => {
  return await $defaultApi.get<AuthResponse>("/refresh", {
    headers: {
      "Content-Type": "application/json; charser=utf-8",
    },
  });
};
