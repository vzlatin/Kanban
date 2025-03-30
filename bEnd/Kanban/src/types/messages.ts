import { Payload } from "jwt";
import { ApiError } from "../errors/apiErrors.ts";
import { Board, Column, Comment, Section, Task, TaskToDo } from "./entities.ts";
import { InputTypeOfTuple } from "zod";

export enum OutboundMessageType {
  UserConnected = "UserConnected",
  Error = "Error",
  BoardCreated = "BoardCreated",
  BoardUpdated = "BoardUpdated",
  BoardDeleted = "BoardDeleted",
  ColumnCreated = "ColumnCreated",
  ColumnUpdated = "ColumnUpdated",
  ColumnDeleted = "ColumnDeleted",
  ColumnsOrderUpdated = "ColumnsOrderUpdated",
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
  UserDisconnected = "UserDisconnected",
}

export enum InboundMessageType {
  CreateBoard = "CreateBoard",
  DeleteBoard = "DeleteBoard",
  UpdateBoard = "UpdateBoard",
  CreateColumn = "CreateColumn",
  DeleteColumn = "DeleteColumn",
  UpdateColumn = "UpdateColumn",
  UpdateColumnsOrder = "UpdateColumnsOrder",
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
  DisconnectUser = "DisconnectUser",
}

// FIX: This is unused. Either edit the conroller or remove.
export type ErrorPayload = {
  error: ApiError;
  code: number;
};

// --------------------------------- Inbound Messages ----------------------------------

// --- Sections ----
export type CreateSectionPayload = Omit<Section, "id">;
export type UpdateSectionPayload = Section;
export type DeleteSectionPayload = Section;

// ---- Boards ----
export type CreateBoardPayload = Omit<Board, "id">;
export type UpdateBoardPayload = Board;
export type DeleteBoardPayload = Board;

// ---- Columns ----
export type CreateColumnPayload = Partial<Omit<Column, "id">>;
export type UpdateColumnPayload = Column;
export type UpdateColumnsOrderPayload = Column[];
export type DeleteColumnPaylod = Column;

// ---- Tasks ----
export type CreateTaskPayload = Omit<Task, "id" | "completedOn">;
export type UpdateTaskPayload = Partial<
  Omit<Task, "boardId" | "createdOn">
>;
export type DeleteTaskPayload = Task;

// ---- Comments ----
export type CreateCommentPayload = Comment;
export type DeleteCommentPayload = Comment;

// ---- TaskToDos ----
export type CreateTaskToDoPayload = Omit<TaskToDo, "id">;
export type UpdateTaskToDoPayload = Partial<Omit<TaskToDo, "taskId">>;
export type DeleteTaskToDoPayload = TaskToDo;

// ---- User ----
export type DisconnectUserPayload = null;
// --------------------------------- Outbound Messages ----------------------------------

// --- Sections ----
export type SectionCreatedPayload = Section;
export type SectionUpdatedPayload = Section;
export type SectionDeletedPayload = Section;

// ---- Boards ----
export type BoardCreatedPayload = Board;
export type BoardUpdatedPayload = Board;
export type BoardDeletedPayload = Board;

// ---- Columns ----
export type ColumnCreatedPayload = Column;
export type ColumnUpdatedPayload = Column;
export type ColumnsOrderUpdatedPayload = Column[];
export type ColumnDeletedPayload = Column;

// ---- Tasks ----
export type TaskCreatedPayload = Task;
export type TaskUpdatedPayload = Task;
export type TaskDeletedPayload = Task;

// ---- Comments ----
export type CommentCreatedPayload = Comment;
export type CommentDeletedPayload = Comment;

// ---- TaskToDos ----
export type TaskToDoCreatedPayload = TaskToDo;
export type TaskToDoUpdatedPayload = TaskToDo;
export type TaskToDoDeletedPayload = TaskToDo;

// ---- Users ----
export type UserConnectedPayload = {
  users: Omit<Payload, "exp">[];
};
export type UserDisconnectedPayload = {
  user: Omit<Payload, "exp">
};

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
    type: InboundMessageType.UpdateColumnsOrder;
    payload: UpdateColumnsOrderPayload;
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
    type: InboundMessageType.DisconnectUser;
    payload: DisconnectUserPayload;
  }
  | {
    type: OutboundMessageType.UserConnected;
    payload: UserConnectedPayload;
  }
  | {
    type: OutboundMessageType.UserDisconnected;
    payload: UserDisconnectedPayload;
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
    type: OutboundMessageType.ColumnsOrderUpdated;
    payload: ColumnsOrderUpdatedPayload;
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
