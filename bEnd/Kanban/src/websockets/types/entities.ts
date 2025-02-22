export type TaskStatus = "New" | "InProgress" | "Testing" | "Done" | null;

export interface Board {
  [key: string]: unknown;
  id?: number;
  title: string;
  section: number;
}

export interface Column {
  [key: string]: unknown;
  id?: number;
  boardId: number;
  title: string;
  columnOrder: number;
}

export interface Task {
  [key: string]: unknown;
  id?: number;
  userId: number | null;
  columnId: number;
  boardId: number;
  title: string;
  description: string | null;
  taskOrder: number;
  status: TaskStatus;
  tag: string | null;
  createdOn: Date;
  completedOn?: Date | null;
}

export interface TaskToDo {
  [key: string]: unknown;
  id?: number;
  taskId: number;
  title: string;
  completed: boolean;
}

export interface Comment {
  [key: string]: unknown;
  id?: number;
  taskId: number;
  userId: number;
  content: string;
  createdOn: Date;
}

export interface Section {
  [key: string]: unknown;
  id?: number;
  title: string;
}
