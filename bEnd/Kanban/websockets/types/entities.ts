export type TaskStatus = "New" | "InProgress" | "Testing" | "Done";

export interface Board {
	[key: string]: unknown;
	id?: number;
	title: string;
}
export const boardColumns = ["id", "title"];

export interface Column {
	[key: string]: unknown;
	id?: number;
	boardId: number;
	title: string;
}
export const columnColumns = ["id", "boardId", "title"];

export interface Task {
	[key: string]: unknown;
	id?: number;
	userId: number;
	columnId: number;
	boardId: number;
	title: string;
	description?: string;
	status: TaskStatus;
	tag?: string;
	createdOn?: Date;
	completedOn?: Date;
}
export const taskColumns = [
	"id",
	"userId",
	"columnId",
	"boardId",
	"title",
	"description",
	"status",
	"tag",
	"createdOn",
	"completedOn",
];

export interface TaskToDo {
	[key: string]: unknown;
	id?: number;
	taskId: number;
	title: string;
	completed: boolean;
}
export const taskTodoColumns = ["id", "taskId", "title", "completed"];

export interface Comment {
	[key: string]: unknown;
	id?: number;
	taskId: number;
	userId: number;
	content: string;
	createdOn: Date;
}
export const commentColumns = [
	"id",
	"taskId",
	"userId",
	"content",
	"createdOn",
];
