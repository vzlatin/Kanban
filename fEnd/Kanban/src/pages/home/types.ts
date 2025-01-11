import { ApiError } from "../../http/errors";
import { Column, Section } from "../../interfaces/data-interfaces";

export interface KanbanStore {
	sections: Section[];
	columns: Column[];
	error: ApiError | null;
	getSections: () => Promise<void>;
	getColumns: (boardId: number) => Promise<void>;
}
