import { AxiosResponse } from "axios";
import { User } from "../types/entities";
import $api from "../miscellaneous/config/axios.working";
import { useSigninStore } from "../state/stores/signin/store";

export const checkAuth = () => useSigninStore.getState().isAuthenticated;

export const getUsers = async (): Promise<AxiosResponse<User[]>> => {
  return $api.get<User[]>("/users", {
    headers: {
      "Content-Type": "application/json; charser=utf-8",
    },
  });
};

export const changeUserProfilePic = async (
  data: FormData,
): Promise<AxiosResponse<User>> => {
  return $api.post<User>("/profile-pic", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
