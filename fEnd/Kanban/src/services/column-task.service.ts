import { AxiosResponse } from "axios";
import { ColumnResponse } from "../interfaces/http-interfaces";
import { $api } from "../http";

export const getColumns = async (
	boardId: number
): Promise<AxiosResponse<ColumnResponse[]>> => {
	return $api.get<ColumnResponse[]>(`/columns/${boardId}`, {
		headers: {
			"Content-Type": "application/json; charser=utf-8",
		},
	});
};
