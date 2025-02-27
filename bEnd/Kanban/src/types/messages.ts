import { Payload } from "jwt";
import { ApiError } from "../errors/apiErrors.ts";
import { Board, Column, Comment, Section, Task, TaskToDo } from "./entities.ts";

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
  SectionCreated = "SectionCreated",
  SectionUpdated = "SectionUpdated",
  SectionDeleted = "SectionDeleted",
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
  CreateSection = "CreateSection",
  UpdateSection = "UpdateSection",
  DeleteSection = "DeleteSection",
}

export type EntityDeletedPayload = { id: number };

// FIX: This is unused. Either edit the conroller or remove.
export interface ErrorPayload {
  error: ApiError;
  code: number;
}

// --------------------------------- Inbound Messages ----------------------------------

// --- Sections ----
export type CreateSectionPayload = Omit<Section, "id">;
export type UpdateSectionPayload = Omit<Section, "id">;
export type DeleteSectionPayload = EntityDeletedPayload;

// ---- Boards ----
export type CreateBoardPayload = Omit<Board, "id">;
export type UpdateBoardPayload = Partial<Omit<Board, "id">>;
export type DeleteBoardPayload = EntityDeletedPayload;

// ---- Columns ----
export type CreateColumnPayload = Partial<Omit<Column, "id">>;
export type UpdateColumnPayload = Partial<Omit<Column, "id">>;
export type DeleteColumnPaylod = EntityDeletedPayload;

// ---- Tasks ----
export type CreateTaskPayload = Omit<Task, "id" | "completedOn">;
export type UpdateTaskPayload = Partial<
  Omit<Task, "id" | "boardId" | "createdOn">
>;
export type DeleteTaskPayload = EntityDeletedPayload;

// ---- Comments ----
export type CreateCommentPayload = Omit<Comment, "id">;
export type DeleteCommentPayload = EntityDeletedPayload;

// ---- TaskToDos ----
export type CreateTaskToDoPayload = Omit<TaskToDo, "id">;
export type UpdateTaskToDoPayload = Partial<Omit<TaskToDo, "id" | "taskId">>;
export type DeleteTaskToDoPayload = EntityDeletedPayload;

// --------------------------------- Outbound Messages ----------------------------------

// --- Sections ----
export interface SectionCreatedPayload extends Section {}
export interface SectionUpdatedPayload extends Section {}
export interface SectionDeletedPayload extends Section {}

// ---- Boards ----
export interface BoardCreatedPayload extends Board {}
export interface BoardUpdatedPayload extends Board {}
export interface BoardDeletedPayload extends Board {}

// ---- Columns ----
export interface ColumnCreatedPayload extends Column {}
export interface ColumnUpdatedPayload extends Column {}
export interface ColumnDeletedPayload extends Column {}

// ---- Tasks ----
export interface TaskCreatedPayload extends Task {}
export interface TaskUpdatedPayload extends Task {}
export interface TaskDeletedPayload extends Task {}

// ---- Comments ----
export interface CommentCreatedPayload extends Comment {}
export interface CommentDeletedPayload extends Comment {}

// ---- TaskToDos ----
export interface TaskToDoCreatedPayload extends TaskToDo {}
export interface TaskToDoUpdatedPayload extends TaskToDo {}
export interface TaskToDoDeletedPayload extends TaskToDo {}

// ---- Users ----
export interface UserConnectedPayload {
  users: Omit<Payload, "exp">[];
}

export type Message =
  | {
    type: InboundMessageType.CreateBoard;
    payload: CreateBoardPayload;
  }
  | {
    type: InboundMessageType.DeleteBoard;
    payload: DeleteBoardPayload;
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
    type: InboundMessageType.CreateSection;
    payload: CreateSectionPayload;
  }
  | {
    type: InboundMessageType.UpdateSection;
    payload: UpdateSectionPayload;
  }
  | {
    type: InboundMessageType.DeleteSection;
    payload: DeleteSectionPayload;
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
  }
  | {
    type: OutboundMessageType.SectionCreated;
    payload: SectionCreatedPayload;
  }
  | {
    type: OutboundMessageType.SectionUpdated;
    payload: SectionUpdatedPayload;
  }
  | {
    type: OutboundMessageType.SectionDeleted;
    payload: SectionDeletedPayload;
  };
