import { ApiError } from "../../http/errors";
import { Column, Section, User } from "../../http/interfaces/data-interfaces";

export interface KanbanStore {
  sections: Section[];
  columns: Column[];
  users: User[];
  error: ApiError | null;
  getSections: () => Promise<void>;
  getColumns: (boardId: number) => Promise<void>;
  getUsers: () => Promise<void>;
}
