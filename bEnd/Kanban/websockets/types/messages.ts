import { Payload } from "jwt";
import { TaskStatus } from "../../https/types/entityTypes.ts";
import { ApiError } from "../../errors/apiErrors.ts";

export enum OutboundMessageType {
	UserConnected,
	Error,
}

export enum InboundMessageType {
	CreateBoard = "CreateBoard",
	DeleteBoard = "DeleteBoard",
	UpdateBoard = "UpdateBoard",

	CreateColumn = "CreateColumn",
	DeleteColumn = "DeleteColumn",
	UpdateColumn = "UpdateColumn",

	CreateTask = "CreateTask",
	DeleteTask = "DeleteTask",
	UpdateTask = "UpdateTask",

	CreateComment = "CreateComment",
	DeleteComment = "DeleteComment",

	CreateTaskToDo = "CreateTaskToDo",
	DeleteTaskToDo = "DeleteTaskToDo",
	UpdateTaskToDo = "UpdateTaskToDo",
}

export interface UserConnectedPayload {
	users: Omit<Payload, "exp">[];
}

export interface ErrorPayload {
	error: ApiError;
	code: number;
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
	| {
			type: InboundMessageType.CreateBoard;
			payload: CreateBoardPayload;
	  }
	| {
			type: InboundMessageType.DeleteBoard;
			payload: DeleteBoardPaylod;
	  }
	| {
			type: InboundMessageType.UpdateBoard;
			payload: UpdateBoardPayload;
	  }
	| {
			type: InboundMessageType.CreateColumn;
			payload: CreateColumnPayload;
	  }
	| {
			type: InboundMessageType.UpdateColumn;
			payload: UpdateColumnPayload;
	  }
	| {
			type: InboundMessageType.DeleteColumn;
			payload: DeleteColumnPaylod;
	  }
	| {
			type: InboundMessageType.CreateTask;
			payload: CreateTaskPayload;
	  }
	| {
			type: InboundMessageType.UpdateTask;
			payload: UpdateTaskPayload;
	  }
	| {
			type: InboundMessageType.DeleteTask;
			payload: DeleteTaskPayload;
	  }
	| {
			type: InboundMessageType.CreateTaskToDo;
			payload: CreateTaskToDoPayload;
	  }
	| {
			type: InboundMessageType.UpdateTaskToDo;
			payload: UpdateTaskToDoPayload;
	  }
	| {
			type: InboundMessageType.DeleteTaskToDo;
			payload: DeleteTaskToDoPayload;
	  }
	| {
			type: InboundMessageType.CreateComment;
			payload: CreateCommentPayload;
	  }
	| {
			type: InboundMessageType.DeleteComment;
			payload: DeleteCommentPayload;
	  }
	| {
			type: OutboundMessageType.UserConnected;
			payload: UserConnectedPayload;
	  }
	| {
			type: OutboundMessageType.Error;
			payload: ErrorPayload;
	  };
