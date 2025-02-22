import { ApiError } from "../http/errors";

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

export interface Section {
  id: number;
  title: string;
}

export interface Board {
  id: number;
  title: string;
  section: number;
}

export interface Column {
  id: number;
  boardId: number;
  title: string;
  columnOrder: number;
}

export interface Task {
  id: number;
  userId: number;
  columnId: number;
  boardId: number;
  title: string;
  description?: string;
  taskOrder: number;
  status: TaskStatus;
  tag?: string;
  createdOn: Date;
  completedOn?: Date;
}

export interface TaskToDo {
  id: number;
  taskId: number;
  title: string;
  completed: boolean;
}

export interface Comment {
  id: number;
  taskId: number;
  userId: number;
  content: string;
  createdOn: Date;
}

export interface ConnectedUser {
  id: number;
  email: string;
  fName: string;
  lName: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export enum TaskStatus {
  Review = "review",
  InProgress = "in progress",
  Testing = "Testing",
  Done = "done",
}

export enum UserRole {
  Employee = "employee",
  Manaager = "manager",
  Admin = "admin",
  None = "none",
}

export type EntityCollection = {
  sections: Section[];
  boards: Board[];
  columns: Column[];
  tasks: Task[];
  taskToDos: TaskToDo[];
  comments: Comment[];
};
