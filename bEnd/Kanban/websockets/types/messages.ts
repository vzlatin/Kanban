import { Payload } from "jwt";
import {
	Board,
	Column,
	Comment,
	Task,
	TaskStatus,
	TaskToDo,
} from "./entities.ts";
import { ApiError } from "../../errors/apiErrors.ts";

export enum OutboundMessageType {
	UserConnected = "UserConnected",
	Error = "Error",
	BoardCreated = "BoardCreated",
	BoardUpdated = "BoardUpdated",
	BoardDeleted = "BoardDeleted",
	ColumnCreated = "ColumnCreated",
	ColumnUpdated = "ColumnUpdated",
	ColumnDeleted = "ColumnDeleted",
	TaskCreated = "TaskCreated",
	TaskUpdated = "TaskUpdated",
	TaskDeleted = "TaskDeleted",
	CommentCreated = "CommentCreated",
	CommentDeleted = "CommentDeleted",
	TaskToDoCreated = "TaskToDoCreated",
	TaskToDoUpdated = "TaskToDoUpdated",
	TaskToDoDeleted = "TaskToDoDeleted",
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
export interface BoardCreatedPayload extends Board {}

export interface UpdateBoardPayload extends Board {}
export interface BoardUpdatedPayload extends UpdateBoardPayload {}

export interface DeleteBoardPaylod {
	id: number;
}
export interface BoardDeletedPayload extends DeleteBoardPaylod {}

export interface CreateColumnPayload {
	title: string;
	boardId: number;
}
export interface ColumnCreatedPayload extends Column {}

export interface UpdateColumnPayload {
	id: number;
	title: string;
}
export interface ColumnUpdatedPayload extends Column {}

export interface DeleteColumnPaylod {
	id: number;
}
export interface ColumnDeletedPayload extends DeleteBoardPaylod {}

export interface CreateTaskPayload {
	userId: number;
	title: string;
	description?: string;
	status: TaskStatus;
	tag?: string;
	createdOn: Date;
}
export interface TaskCreatedPayload extends Task {}

export interface UpdateTaskPayload {
	userId?: number;
	title?: string;
	description?: string;
	status?: TaskStatus;
	tag?: string;
	completedOn?: Date;
}
export interface TaskUpdatedPayload extends Task {}

export interface DeleteTaskPayload {
	id: number;
}
export interface TaskDeletedPayload extends DeleteBoardPaylod {}

export interface CreateCommentPayload {
	taskId: number;
	userId: number;
	content: string;
	createdOn: Date;
}
export interface CommentCreatedPayload extends Comment {}

export interface DeleteCommentPayload {
	id: number;
}
export interface CommentDeletedPayload extends DeleteCommentPayload {}

export interface CreateTaskToDoPayload {
	taskId: number;
	title: string;
	completed: boolean;
}
export interface TaskToDoCreatedPayload extends TaskToDo {}

export interface UpdateTaskToDoPayload {
	id: number;
	taskId: number;
	title?: string;
	completed?: boolean;
}
export interface TaskToDoUpdatedPayload extends TaskToDo {}

export interface DeleteTaskToDoPayload {
	id: number;
}
export interface TaskToDoDeletedPayload extends DeleteBoardPaylod {}

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
	  }
	| {
			type: OutboundMessageType.BoardCreated;
			payload: BoardCreatedPayload;
	  }
	| {
			type: OutboundMessageType.BoardUpdated;
			payload: BoardUpdatedPayload;
	  }
	| {
			type: OutboundMessageType.BoardDeleted;
			payload: BoardDeletedPayload;
	  }
	| {
			type: OutboundMessageType.ColumnCreated;
			payload: ColumnCreatedPayload;
	  }
	| {
			type: OutboundMessageType.ColumnUpdated;
			payload: ColumnUpdatedPayload;
	  }
	| {
			type: OutboundMessageType.ColumnDeleted;
			payload: ColumnDeletedPayload;
	  }
	| {
			type: OutboundMessageType.TaskCreated;
			payload: TaskCreatedPayload;
	  }
	| {
			type: OutboundMessageType.TaskUpdated;
			payload: TaskUpdatedPayload;
	  }
	| {
			type: OutboundMessageType.TaskDeleted;
			payload: TaskDeletedPayload;
	  }
	| {
			type: OutboundMessageType.CommentCreated;
			payload: CommentCreatedPayload;
	  }
	| {
			type: OutboundMessageType.CommentDeleted;
			payload: CommentDeletedPayload;
	  }
	| {
			type: OutboundMessageType.TaskToDoCreated;
			payload: TaskToDoCreatedPayload;
	  }
	| {
			type: OutboundMessageType.TaskToDoUpdated;
			payload: TaskToDoUpdatedPayload;
	  }
	| {
			type: OutboundMessageType.TaskToDoDeleted;
			payload: TaskToDoDeletedPayload;
	  };
