import { TaskStatus } from "./entityTypes.ts";

export enum MessageType {
	CreateBoard,
	DeleteBoard,
	UpdateBoard,

	CreateColumn,
	DeleteColumn,
	UpdateColumn,

	CreateTask,
	DeleteTask,
	UpdateTask,

	CreateComment,
	DeleteComment,

	CreateTaskToDo,
	DeleteTaskToDo,
	UpdateTaskToDo,
}

export interface CreateBoardPayload {
	title: string;
}

export interface UpdateBoardPayload {
	title: string;
}

export interface DeleteBoardPaylod {
	id: number;
}

export interface CreateColumnPayload {
	title: string;
}

export interface UpdateColumnPayload {
	title: string;
}

export interface DeleteColumnPaylod {
	id: number;
}

export interface CreateTaskPayload {
	userId: number;
	title: string;
	description?: string;
	status: TaskStatus;
	tag?: string;
	createdOn: Date;
}

export interface UpdateTaskPayload {
	userId?: number;
	title?: string;
	description?: string;
	status?: TaskStatus;
	tag?: string;
	completedOn?: Date;
}

export interface DeleteTaskPayload {
	id: number;
}

export interface CreateCommentPayload {
	taskId: number;
	userId: number;
	content: string;
	createdOn: Date;
}

export interface DeleteCommentPayload {
	id: number;
}

export interface CreateTaskToDoPayload {
	taskId: number;
	title: string;
	completed: boolean;
}

export interface UpdateTaskToDoPayload {
	taskId: number;
	title?: string;
	completed?: boolean;
}

export interface DeleteTaskToDoPayload {
	id: number;
}

export type Message =
	| { type: MessageType.CreateBoard; payload: CreateBoardPayload }
	| { type: MessageType.DeleteBoard; payload: DeleteBoardPaylod }
	| { type: MessageType.UpdateBoard; payload: UpdateBoardPayload }
	| { type: MessageType.CreateColumn; payload: CreateColumnPayload }
	| { type: MessageType.UpdateColumn; payload: UpdateColumnPayload }
	| { type: MessageType.DeleteColumn; payload: DeleteColumnPaylod }
	| { type: MessageType.CreateTask; payload: CreateTaskPayload }
	| { type: MessageType.UpdateTask; payload: UpdateTaskPayload }
	| { type: MessageType.DeleteTask; payload: DeleteTaskPayload }
	| { type: MessageType.CreateTaskToDo; payload: CreateTaskToDoPayload }
	| { type: MessageType.UpdateTaskToDo; payload: UpdateTaskToDoPayload }
	| { type: MessageType.DeleteTaskToDo; payload: DeleteTaskToDoPayload }
	| { type: MessageType.CreateComment; payload: CreateCommentPayload }
	| { type: MessageType.DeleteComment; payload: DeleteCommentPayload };
