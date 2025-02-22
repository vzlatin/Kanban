import { EntityCollection } from "../state/types";
import { AxiosResponse } from "axios";
import { $api } from "../http";

export const getEntityCollection = async (): Promise<
  AxiosResponse<EntityCollection>
> => {
  return $api.get<EntityCollection>("/entity-collection", {
    headers: {
      "Content-Type": "application/json; charser=utf-8",
    },
  });
};
