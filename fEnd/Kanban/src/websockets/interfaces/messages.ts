import { TaskStatus } from "../../http/interfaces/data-interfaces";
import {
  Board,
  Column,
  Comment,
  ConnectedUser,
  Section,
  Task,
  TaskToDo,
} from "./standalone-data-interfaces";

export enum InboundMessageType {
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

export enum OutboundMessageType {
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

// --------------------------------- Outbound Messages ----------------------------------

// ---- Sections ----
export interface CreateSectionPayload {
  title: string;
}

export interface UpdateSectionPayload {
  title: string;
}

export interface DeleteSectionPayload extends EntityDeletedPayload {}

// ---- Boards ----
export interface CreateBoardPayload {
  title: string;
  section: number;
}

export interface UpdateBoardPayload {
  title: string;
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

// ---- Sections ----
export interface SectionCreatedPayload extends Section {}
export interface SectionUpdatedPayload extends Section {}
export interface SectionDeletedPayload extends EntityDeletedPayload {}

// ---- Boards ----
export interface BoardCreatedPayload extends Board {}
export interface BoardUpdatedPayload extends Board {}
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

// ---- TasksToDo ----
export interface TaskToDoCreatedPayload extends TaskToDo {}
export interface TaskToDoUpdatedPayload extends TaskToDo {}
export interface TaskToDoDeletedPayload extends EntityDeletedPayload {}

// ---- Users ----
export interface UserConnectedPayload {
  users: ConnectedUser[];
}

export type Message =
  | {
    type: OutboundMessageType.CreateBoard;
    payload: CreateBoardPayload;
  }
  | {
    type: OutboundMessageType.DeleteBoard;
    payload: DeleteBoardPaylod;
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
    type: InboundMessageType.UserConnected;
    payload: UserConnectedPayload;
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
