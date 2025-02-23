import { ApiError } from "../../../miscellaneous/utils/errors";
import { Board, Column, Section, Task, TaskToDo, User, Comment } from "../../../types/entities";

export interface KanbanStore {
  sections: Section[];
  boards: Board[];
  columns: Column[];
  tasks: Task[];
  taskToDos: TaskToDo[];
  comments: Comment[];
  users: User[];

  socket: WebSocket | null;
  connect: (url: string) => void;
  send: (message: string) => void;

  error: ApiError | null;
  getEntityCollection: () => Promise<void>;
  getUsers: () => Promise<void>;
}

