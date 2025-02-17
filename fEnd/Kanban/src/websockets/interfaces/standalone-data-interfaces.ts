import { TaskStatus } from "../../http/interfaces/data-interfaces";

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
