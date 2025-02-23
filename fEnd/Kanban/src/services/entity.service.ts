import { AxiosResponse } from "axios";
import { EntityCollection } from "../types/entities";
import $api from "../miscellaneous/config/axios.working";

export const getEntityCollection = async (): Promise<
  AxiosResponse<EntityCollection>
> => {
  return $api.get<EntityCollection>("/entity-collection", {
    headers: {
      "Content-Type": "application/json; charser=utf-8",
    },
  });
};
