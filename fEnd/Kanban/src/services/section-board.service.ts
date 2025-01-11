import { AxiosResponse } from "axios";
import { SectionResponse } from "../interfaces/http-interfaces";
import { $api } from "../http";

export const getSections = async (): Promise<
	AxiosResponse<SectionResponse[]>
> => {
	return await $api.get<SectionResponse[]>("/sections", {
		headers: {
			"Content-Type": "application/json; charser=utf-8",
		},
	});
};
