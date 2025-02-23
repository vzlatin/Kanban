export type Section = {
  id: number;
  title: string;
}

export type Board = {
  id: number;
  title: string;
  section: number;
}

export type Column = {
  id: number;
  boardId: number;
  title: string;
  columnOrder: number;
}

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
}

export type TaskToDo = {
  id: number;
  taskId: number;
  title: string;
  completed: boolean;
}

export type Comment = {
  id: number;
  taskId: number;
  userId: number;
  content: string;
  createdOn: Date;
}

export type ConnectedUser = {
  id: number;
  email: string;
  fName: string;
  lName: string;
}

export type User = {
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
