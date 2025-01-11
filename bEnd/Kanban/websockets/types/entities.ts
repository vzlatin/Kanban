export type TaskStatus = "New" | "InProgress" | "Testing" | "Done";

export interface Board {
	[key: string]: unknown;
	id?: number;
	title: string;
	section: number;
}
export const boardColumns = ["id", "title", "section"];

export interface Column {
	[key: string]: unknown;
	id?: number;
	boardId: number;
	title: string;
	columnOrder: number;
}
export const columnColumns = ["id", "boardId", "title", "columnOrder"];

export interface Task {
	[key: string]: unknown;
	id?: number;
	userId?: number;
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
export const taskColumns = [
	"id",
	"userId",
	"columnId",
	"boardId",
	"title",
	"description",
	"taskOrder",
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

export interface Section {
	[key: string]: unknown;
	id?: number;
	title: string;
}
export const sectionColumns = ["id", "title"];
