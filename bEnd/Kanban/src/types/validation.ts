import { z } from "zod";
import {
  _Board,
  _Column,
  _Comment,
  _Section,
  _Task,
  _TaskToDo,
} from "./entities.zod.ts";

//export const OutboundMessage = z.enum(["UserConnected", "Error"]);
//export type OutboundMessageT = z.infer<typeof OutboundMessage>;

export const InboundMessageT = z.enum([
  "CreateSection",
  "UpdateSection",
  "DeleteSection",
  "CreateBoard",
  "DeleteBoard",
  "UpdateBoard",
  "CreateColumn",
  "DeleteColumn",
  "UpdateColumn",
  "UpdateColumnsOrder",
  "CreateTask",
  "DeleteTask",
  "UpdateTask",
  "CreateComment",
  "DeleteComment",
  "CreateTaskToDo",
  "DeleteTaskToDo",
  "UpdateTaskToDo",
  "DisconnectUser",
]);

export const _CreateSectionPayload = _Section.omit({ id: true });
export const _UpdateSectionPayload = _Section.partial().required({ id: true });
export const _DeleteSectionPayload = z.object({ id: z.number() });

export const _CreateBoardPayload = _Board.omit({ id: true });
export const _UpdateBoardPayload = _Board.partial().required({ id: true });
export const _DeleteBoardPayload = z.object({ id: z.number() });

export const _CreateColumnPayload = _Column.omit({ id: true });
export const _UpdateColumnPayload = _Column.partial().required({ id: true });
export const _UpdateColumnsOrderPayload = z.array(_Column);
export const _DeleteColumnPayload = z.object({ id: z.number() });

export const _CreateTaskPayload = _Task.omit({ id: true, completedOn: true });
export const _UpdateTaskPayload = _Task.omit({
  boardId: true,
  createdOn: true,
}).partial().required({ id: true });

export const _DeleteTaskPayload = z.object({ id: z.number() });

export const _CreateCommentPayload = _Comment.omit({ id: true });
export const _DeleteCommentPayload = z.object({ id: z.number() });

export const _CreateTaskToDoPayload = _TaskToDo.omit({ id: true });
export const _UpdateTaskToDoPayload = _TaskToDo.omit({ taskId: true })
  .partial().required({ id: true });
export const _DeleteTaskToDoPayload = z.object({ id: z.number() });

export const _DisconnectUserPayload = z.null();

export const InboundMessageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("CreateBoard"),
    payload: _CreateBoardPayload,
  }),
  z.object({
    type: z.literal("UpdateBoard"),
    payload: _UpdateBoardPayload,
  }),
  z.object({
    type: z.literal("DeleteBoard"),
    payload: _DeleteBoardPayload,
  }),
  z.object({
    type: z.literal("CreateColumn"),
    payload: _CreateColumnPayload,
  }),
  z.object({
    type: z.literal("UpdateColumn"),
    payload: _UpdateColumnPayload,
  }),
  z.object({
    type: z.literal("UpdateColumnsOrder"),
    payload: _UpdateColumnsOrderPayload,
  }),
  z.object({
    type: z.literal("DeleteColumn"),
    payload: _DeleteColumnPayload,
  }),
  z.object({
    type: z.literal("CreateTask"),
    payload: _CreateTaskPayload,
  }),
  z.object({
    type: z.literal("UpdateTask"),
    payload: _UpdateTaskPayload,
  }),
  z.object({
    type: z.literal("DeleteTask"),
    payload: _DeleteTaskPayload,
  }),
  z.object({
    type: z.literal("CreateComment"),
    payload: _CreateCommentPayload,
  }),
  z.object({
    type: z.literal("DeleteComment"),
    payload: _DeleteCommentPayload,
  }),
  z.object({
    type: z.literal("CreateTaskToDo"),
    payload: _CreateTaskToDoPayload,
  }),
  z.object({
    type: z.literal("UpdateTaskToDo"),
    payload: _UpdateTaskToDoPayload,
  }),
  z.object({
    type: z.literal("DeleteTaskToDo"),
    payload: _DeleteTaskToDoPayload,
  }),
  z.object({
    type: z.literal("CreateSection"),
    payload: _CreateSectionPayload,
  }),
  z.object({
    type: z.literal("UpdateSection"),
    payload: _UpdateSectionPayload,
  }),
  z.object({
    type: z.literal("DeleteSection"),
    payload: _DeleteSectionPayload,
  }),
  z.object({
    type: z.literal("DisconnectUser"),
    payload: _DisconnectUserPayload,
  }),
]);

export type InboundMessage = z.infer<typeof InboundMessageSchema>;

export type MessageMap = {
  [InboundMessageT.Enum.CreateBoard]: z.infer<typeof _CreateBoardPayload>;
  [InboundMessageT.Enum.DeleteBoard]: z.infer<typeof _DeleteBoardPayload>;
  [InboundMessageT.Enum.UpdateBoard]: z.infer<typeof _UpdateBoardPayload>;
  [InboundMessageT.Enum.CreateColumn]: z.infer<typeof _CreateColumnPayload>;
  [InboundMessageT.Enum.DeleteColumn]: z.infer<typeof _DeleteColumnPayload>;
  [InboundMessageT.Enum.UpdateColumn]: z.infer<typeof _UpdateColumnPayload>;
  [InboundMessageT.Enum.UpdateColumnsOrder]: z.infer<
    typeof _UpdateColumnsOrderPayload
  >;
  [InboundMessageT.Enum.CreateTask]: z.infer<typeof _CreateTaskPayload>;
  [InboundMessageT.Enum.DeleteTask]: z.infer<typeof _DeleteTaskPayload>;
  [InboundMessageT.Enum.UpdateTask]: z.infer<typeof _UpdateTaskPayload>;
  [InboundMessageT.Enum.CreateTaskToDo]: z.infer<
    typeof _CreateTaskToDoPayload
  >;
  [InboundMessageT.Enum.DeleteTaskToDo]: z.infer<
    typeof _DeleteTaskToDoPayload
  >;
  [InboundMessageT.Enum.UpdateTaskToDo]: z.infer<
    typeof _UpdateTaskToDoPayload
  >;
  [InboundMessageT.Enum.CreateComment]: z.infer<typeof _CreateCommentPayload>;
  [InboundMessageT.Enum.DeleteComment]: z.infer<typeof _DeleteCommentPayload>;
  [InboundMessageT.Enum.CreateSection]: z.infer<typeof _CreateSectionPayload>;
  [InboundMessageT.Enum.UpdateSection]: z.infer<typeof _UpdateSectionPayload>;
  [InboundMessageT.Enum.DeleteSection]: z.infer<typeof _DeleteSectionPayload>;
  [InboundMessageT.Enum.DisconnectUser]: z.infer<typeof _DisconnectUserPayload>;
};
