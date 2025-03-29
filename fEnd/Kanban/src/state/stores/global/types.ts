import { DraggableLocation } from "@hello-pangea/dnd";
import { ApiError } from "../../../miscellaneous/utils/errors";
import {
  Board,
  Column,
  Comment,
  ConnectedUser,
  Section,
  Task,
  TaskToDo,
  User,
} from "../../../types/entities";
import { Message } from "../../../types/messages";

export interface KanbanStore {
  sections: Section[];
  boards: Board[];
  columns: Column[];
  tasks: Task[];
  taskToDos: TaskToDo[];
  comments: Comment[];
  connectedUsers: ConnectedUser[];
  users: User[];
  socket: WebSocket | null;
  connect: (url: string) => void;
  send: (message: Message) => void;

  error: ApiError | null;
  getEntityCollection: () => Promise<void>;
  changeUserProfilePic: (data: FormData) => Promise<void>;

  moveColumn: (
    source: DraggableLocation<string>,
    destination: DraggableLocation<string>,
    boardId: number,
  ) => void;
}
