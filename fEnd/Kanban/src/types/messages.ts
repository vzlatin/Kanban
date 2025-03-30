import {
  Board,
  Column,
  Comment,
  ConnectedUser,
  Section,
  Task,
  TaskToDo,
} from "./entities";
import { PartiallyRequired } from "./helpers";

export enum InboundMessageType {
  SectionCreated = "SectionCreated",
  SectionUpdated = "SectionUpdated",
  SectionDeleted = "SectionDeleted",
  UserConnected = "UserConnected",
  Error = "Error",
  BoardCreated = "BoardCreated",
  BoardUpdated = "BoardUpdated",
  BoardDeleted = "BoardDeleted",
  ColumnCreated = "ColumnCreated",
  ColumnUpdated = "ColumnUpdated",
  ColumnsOrderUpdated = "ColumnsOrderUpdated",
  ColumnDeleted = "ColumnDeleted",
  TaskCreated = "TaskCreated",
  TaskUpdated = "TaskUpdated",
  TaskDeleted = "TaskDeleted",
  CommentCreated = "CommentCreated",
  CommentDeleted = "CommentDeleted",
  TaskToDoCreated = "TaskToDoCreated",
  TaskToDoUpdated = "TaskToDoUpdated",
  TaskToDoDeleted = "TaskToDoDeleted",
  UserDisconnected = "UserDisconnected",
}

export enum OutboundMessageType {
  CreateSection = "CreateSection",
  UpdateSection = "UpdateSection",
  DeleteSection = "DeleteSection",
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
  DisconnectUser = "DisconnectUser",
}

// --------------------------------- Outbound Messages ----------------------------------

// --- Sections ----
export type CreateSectionPayload = Omit<Section, "id">;
export type UpdateSectionPayload = PartiallyRequired<Section, "id">;
export type DeleteSectionPayload = Section;

// ---- Boards ----
export type CreateBoardPayload = Omit<Board, "id">;
export type UpdateBoardPayload = PartiallyRequired<Board, "id">;
export type DeleteBoardPayload = Board;

// ---- Columns ----
export type CreateColumnPayload = Omit<Partial<Column>, "id">;
export type UpdateColumnPayload = PartiallyRequired<Column, "id">;
export type UpdateColumnsOrderPayload = Column[];
export type DeleteColumnPaylod = Column;

// ---- Tasks ----
export type CreateTaskPayload = Omit<Task, "id" | "completedOn">;
export type UpdateTaskPayload = PartiallyRequired<
  Omit<Task, "boardId" | "createdOn">,
  "id"
>;
export type DeleteTaskPayload = Task;

// ---- Comments ----
export type CreateCommentPayload = Omit<Comment, "id">;
export type DeleteCommentPayload = Comment;

// ---- TaskToDos ----
export type CreateTaskToDoPayload = Omit<TaskToDo, "id">;
export type UpdateTaskToDoPayload = PartiallyRequired<
  Omit<TaskToDo, "taskId">,
  "id"
>;
export type DeleteTaskToDoPayload = TaskToDo;

// ---- User ----
export type DisconnectUserPayload = null;

// --------------------------------- Inbound Messages ----------------------------------

// ---- Sections ----
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

// ---- TasksToDo ----
export type TaskToDoCreatedPayload = TaskToDo;
export type TaskToDoUpdatedPayload = TaskToDo;
export type TaskToDoDeletedPayload = TaskToDo;

// ---- Users ----
export type UserConnectedPayload = { users: ConnectedUser[] };
export type UserDisconnectedPayload = { user: ConnectedUser };

export type Message =
  | {
    type: OutboundMessageType.CreateSection;
    payload: CreateSectionPayload;
  }
  | {
    type: OutboundMessageType.UpdateSection;
    payload: UpdateSectionPayload;
  }
  | {
    type: OutboundMessageType.DeleteSection;
    payload: DeleteSectionPayload;
  }
  | {
    type: OutboundMessageType.CreateBoard;
    payload: CreateBoardPayload;
  }
  | {
    type: OutboundMessageType.DeleteBoard;
    payload: DeleteBoardPayload;
  }
  | {
    type: OutboundMessageType.UpdateBoard;
    payload: UpdateBoardPayload;
  }
  | {
    type: OutboundMessageType.CreateColumn;
    payload: CreateColumnPayload;
  }
  | {
    type: OutboundMessageType.UpdateColumn;
    payload: UpdateColumnPayload;
  }
  | {
    type: OutboundMessageType.UpdateColumnsOrder;
    payload: UpdateColumnsOrderPayload;
  }
  | {
    type: OutboundMessageType.DeleteColumn;
    payload: DeleteColumnPaylod;
  }
  | {
    type: OutboundMessageType.CreateTask;
    payload: CreateTaskPayload;
  }
  | {
    type: OutboundMessageType.UpdateTask;
    payload: UpdateTaskPayload;
  }
  | {
    type: OutboundMessageType.DeleteTask;
    payload: DeleteTaskPayload;
  }
  | {
    type: OutboundMessageType.CreateTaskToDo;
    payload: CreateTaskToDoPayload;
  }
  | {
    type: OutboundMessageType.UpdateTaskToDo;
    payload: UpdateTaskToDoPayload;
  }
  | {
    type: OutboundMessageType.DeleteTaskToDo;
    payload: DeleteTaskToDoPayload;
  }
  | {
    type: OutboundMessageType.CreateComment;
    payload: CreateCommentPayload;
  }
  | {
    type: OutboundMessageType.DeleteComment;
    payload: DeleteCommentPayload;
  }
  | {
    type: OutboundMessageType.DisconnectUser;
    payload: DisconnectUserPayload;
  }
  | {
    type: InboundMessageType.UserConnected;
    payload: UserConnectedPayload;
  }
  | {
    type: InboundMessageType.UserDisconnected;
    payload: UserDisconnectedPayload;
  }
  // FIX: Check this after fixing the backend error message type
  //| {
  //  type: InboundMessageType.Error;
  //  payload: ErrorPayload;
  //}
  | {
    type: InboundMessageType.BoardCreated;
    payload: BoardCreatedPayload;
  }
  | {
    type: InboundMessageType.BoardUpdated;
    payload: BoardUpdatedPayload;
  }
  | {
    type: InboundMessageType.BoardDeleted;
    payload: BoardDeletedPayload;
  }
  | {
    type: InboundMessageType.ColumnCreated;
    payload: ColumnCreatedPayload;
  }
  | {
    type: InboundMessageType.ColumnUpdated;
    payload: ColumnUpdatedPayload;
  }
  | {
    type: InboundMessageType.ColumnsOrderUpdated;
    payload: ColumnsOrderUpdatedPayload;
  }
  | {
    type: InboundMessageType.ColumnDeleted;
    payload: ColumnDeletedPayload;
  }
  | {
    type: InboundMessageType.TaskCreated;
    payload: TaskCreatedPayload;
  }
  | {
    type: InboundMessageType.TaskUpdated;
    payload: TaskUpdatedPayload;
  }
  | {
    type: InboundMessageType.TaskDeleted;
    payload: TaskDeletedPayload;
  }
  | {
    type: InboundMessageType.CommentCreated;
    payload: CommentCreatedPayload;
  }
  | {
    type: InboundMessageType.CommentDeleted;
    payload: CommentDeletedPayload;
  }
  | {
    type: InboundMessageType.TaskToDoCreated;
    payload: TaskToDoCreatedPayload;
  }
  | {
    type: InboundMessageType.TaskToDoUpdated;
    payload: TaskToDoUpdatedPayload;
  }
  | {
    type: InboundMessageType.TaskToDoDeleted;
    payload: TaskToDoDeletedPayload;
  }
  | {
    type: InboundMessageType.SectionCreated;
    payload: SectionCreatedPayload;
  }
  | {
    type: InboundMessageType.SectionUpdated;
    payload: SectionUpdatedPayload;
  }
  | {
    type: InboundMessageType.SectionDeleted;
    payload: SectionDeletedPayload;
  };
