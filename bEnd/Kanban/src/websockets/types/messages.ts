import { Payload } from "jwt";
import {
  Board,
  Column,
  Comment,
  Section,
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

export interface EntityDeletedPayload {
  id: number;
}

// FIX: This is unused. Either edit the conroller or remove.
export interface ErrorPayload {
  error: ApiError;
  code: number;
}

// --------------------------------- Inbound Messages ----------------------------------

// --- Sections ----
export interface CreateSectionPayload {
  title: string;
}

export interface UpdateSectionPayload {
  title?: string;
}

export interface DeleteSectionPayload extends EntityDeletedPayload {}

// ---- Boards ----
export interface CreateBoardPayload {
  title: string;
  section: number;
}

export interface UpdateBoardPayload {
  title?: string;
}

export interface DeleteBoardPaylod extends EntityDeletedPayload {}

// ---- Columns ----
export interface CreateColumnPayload {
  title: string;
  boardId: number;
}

export interface UpdateColumnPayload {
  id: number;
  title?: string;
  columnOrder?: number;
}

export interface DeleteColumnPaylod extends EntityDeletedPayload {}

// ---- Tasks ----
export interface CreateTaskPayload {
  userId?: number;
  columnId: number;
  boardId: number;
  title: string;
  description?: string;
  taskOrder: number;
  status: TaskStatus;
  tag?: string;
  createdOn: Date;
}

export interface UpdateTaskPayload {
  userId?: number;
  title?: string;
  description?: string;
  status?: TaskStatus;
  taskOrder?: number;
  tag?: string;
  completedOn?: Date;
}

export interface DeleteTaskPayload extends EntityDeletedPayload {}

// ---- Comments ----
export interface CreateCommentPayload {
  taskId: number;
  userId: number;
  content: string;
  createdOn: Date;
}

export interface DeleteCommentPayload extends EntityDeletedPayload {}

// ---- TaskToDos ----
export interface CreateTaskToDoPayload {
  taskId: number;
  title: string;
  completed: boolean;
}

export interface UpdateTaskToDoPayload {
  id: number;
  taskId: number;
  title?: string;
  completed?: boolean;
}

export interface DeleteTaskToDoPayload extends EntityDeletedPayload {}

// --------------------------------- Inbound Messages ----------------------------------

// --- Sections ----
export interface SectionCreatedPayload extends Section {}
export interface SectionUpdatedPayload extends Section {}
export interface SectionDeletedPayload extends EntityDeletedPayload {}

// ---- Boards ----
export interface BoardCreatedPayload extends Board {}
export interface BoardUpdatedPayload extends UpdateBoardPayload {}
export interface BoardDeletedPayload extends EntityDeletedPayload {}

// ---- Columns ----
export interface ColumnCreatedPayload extends Column {}
export interface ColumnUpdatedPayload extends Column {}
export interface ColumnDeletedPayload extends EntityDeletedPayload {}

// ---- Tasks ----
export interface TaskCreatedPayload extends Task {}
export interface TaskUpdatedPayload extends Task {}
export interface TaskDeletedPayload extends EntityDeletedPayload {}

// ---- Comments ----
export interface CommentCreatedPayload extends Comment {}
export interface CommentDeletedPayload extends EntityDeletedPayload {}

// ---- TaskToDos ----
export interface TaskToDoCreatedPayload extends TaskToDo {}
export interface TaskToDoUpdatedPayload extends TaskToDo {}
export interface TaskToDoDeletedPayload extends EntityDeletedPayload {}

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
