export type TokenType = "refresh" | "access";
export type TaskStatus = "New" | "InProgress" | "Testing" | "Done";
export type UserRole = "admin" | "manager" | "employee" | null;

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
};

export type Token = {
  id?: number;
  userId: number;
  refreshToken: string;
};

export type TokenJWTPayload = {
  exp: number;
  userId: number;
  email: string;
  isActivated: boolean;
};

export type Section = {
  id: number;
  title: string;
};

export type Board = {
  id: number;
  title: string;
  section: number;
};

export type Column = {
  id: number;
  boardId: number;
  title: string;
  columnOrder: number;
};

export type Task = {
  id: number;
  userId: number | null;
  columnId: number;
  boardId: number;
  title: string;
  description: string | null;
  taskOrder: number;
  status: TaskStatus;
  tag: string | null;
  createdOn: Date;
  completedOn: Date | null;
};

export type TaskToDo = {
  id: number;
  taskId: number;
  title: string;
  completed: boolean;
};

export type Comment = {
  id: number;
  taskId: number;
  userId: number;
  content: string;
  createdOn: Date;
};

export type EntityCollection = {
  sections: Section[];
  boards: Board[];
  columns: Column[];
  tasks: Task[];
  taskToDos: TaskToDo[];
  comments: Comment[];
  users: Partial<User>[];
};
