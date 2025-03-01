import { z } from "zod";
import {
  _Board,
  _Column,
  _Comment,
  _ConnectedUser,
  _Section,
  _Task,
  _TaskToDo,
} from "./entities.zod";

export const InboundMessageT = z.enum([
  "SectionCreated",
  "SectionUpdated",
  "SectionDeleted",
  "BoardCreated",
  "BoardUpdated",
  "BoardDeleted",
  "ColumnCreated",
  "ColumnUpdated",
  "ColumnDeleted",
  "TaskCreated",
  "TaskUpdated",
  "TaskDeleted",
  "CommentCreated",
  "CommentDeleted",
  "TaskToDoCreated",
  "TaskToDoUpdated",
  "TaskToDoDeleted",
  "UserConnected",
]);

export const _SectionCreatedPayload = _Section;
export const _SectionUpdatedPayload = _Section;
export const _SectionDeletedPayload = _Section;

export const _BoardCreatedPayload = _Board;
export const _BoardUpdatedPayload = _Board;
export const _BoardDeletedPayload = _Board;

export const _ColumnCreatedPayload = _Column;
export const _ColumnUpdatedPayload = _Column;
export const _ColumnDeletedPayload = _Column;

export const _TaskCreatedPayload = _Task;
export const _TaskUpdatedPayload = _Task;
export const _TaskDeletedPayload = _Task;

export const _CommentCreatedPayload = _Comment;
export const _CommentDeletedPayload = _Comment;

export const _TaskToDoCreatedPayload = _TaskToDo;
export const _TaskToDoUpdatedPayload = _TaskToDo;
export const _TaskToDoDeletedPayload = _TaskToDo;

export const _ConnectedUserPayload = _ConnectedUser;

export const InboundMessageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("SectionCreated"),
    payload: _SectionCreatedPayload,
  }),
  z.object({
    type: z.literal("SectionUpdated"),
    payload: _SectionUpdatedPayload,
  }),
  z.object({
    type: z.literal("SectionDeleted"),
    payload: _SectionDeletedPayload,
  }),
  z.object({
    type: z.literal("BoardCreated"),
    payload: _BoardCreatedPayload,
  }),
  z.object({
    type: z.literal("BoardUpdated"),
    payload: _BoardUpdatedPayload,
  }),
  z.object({
    type: z.literal("BoardDeleted"),
    payload: _BoardDeletedPayload,
  }),
  z.object({
    type: z.literal("ColumnCreated"),
    payload: _ColumnCreatedPayload,
  }),
  z.object({
    type: z.literal("ColumnUpdated"),
    payload: _ColumnUpdatedPayload,
  }),
  z.object({
    type: z.literal("ColumnDeleted"),
    payload: _ColumnDeletedPayload,
  }),
  z.object({
    type: z.literal("TaskCreated"),
    payload: _TaskCreatedPayload,
  }),
  z.object({
    type: z.literal("TaskUpdated"),
    payload: _TaskUpdatedPayload,
  }),
  z.object({
    type: z.literal("TaskDeleted"),
    payload: _TaskDeletedPayload,
  }),
  z.object({
    type: z.literal("CommentCreated"),
    payload: _CommentCreatedPayload,
  }),
  z.object({
    type: z.literal("CommentDeleted"),
    payload: _CommentDeletedPayload,
  }),
  z.object({
    type: z.literal("TaskToDoCreated"),
    payload: _TaskToDoCreatedPayload,
  }),
  z.object({
    type: z.literal("TaskToDoUpdated"),
    payload: _TaskToDoUpdatedPayload,
  }),
  z.object({
    type: z.literal("TaskToDoDeleted"),
    payload: _TaskToDoDeletedPayload,
  }),
  z.object({
    type: z.literal("UserConnected"),
    payload: _ConnectedUserPayload,
  }),
]);

export type InboundMessage = z.infer<typeof InboundMessageSchema>;

export type MessageMap = {
  [InboundMessageT.Enum.SectionCreated]: z.infer<typeof _SectionCreatedPayload>;
  [InboundMessageT.Enum.SectionUpdated]: z.infer<typeof _SectionUpdatedPayload>;
  [InboundMessageT.Enum.SectionDeleted]: z.infer<typeof _SectionDeletedPayload>;
  [InboundMessageT.Enum.BoardCreated]: z.infer<typeof _BoardCreatedPayload>;
  [InboundMessageT.Enum.BoardUpdated]: z.infer<typeof _BoardUpdatedPayload>;
  [InboundMessageT.Enum.BoardDeleted]: z.infer<typeof _BoardDeletedPayload>;
  [InboundMessageT.Enum.ColumnCreated]: z.infer<typeof _ColumnCreatedPayload>;
  [InboundMessageT.Enum.ColumnUpdated]: z.infer<typeof _ColumnUpdatedPayload>;
  [InboundMessageT.Enum.ColumnDeleted]: z.infer<typeof _ColumnDeletedPayload>;
  [InboundMessageT.Enum.TaskCreated]: z.infer<typeof _TaskCreatedPayload>;
  [InboundMessageT.Enum.TaskUpdated]: z.infer<typeof _TaskUpdatedPayload>;
  [InboundMessageT.Enum.TaskDeleted]: z.infer<typeof _TaskDeletedPayload>;
  [InboundMessageT.Enum.CommentCreated]: z.infer<
    typeof _CommentCreatedPayload
  >;
  [InboundMessageT.Enum.CommentDeleted]: z.infer<typeof _CommentDeletedPayload>;
  [InboundMessageT.Enum.TaskToDoCreated]: z.infer<
    typeof _TaskToDoCreatedPayload
  >;
  [InboundMessageT.Enum.TaskToDoUpdated]: z.infer<
    typeof _TaskToDoUpdatedPayload
  >;
  [InboundMessageT.Enum.TaskToDoDeleted]: z.infer<
    typeof _TaskDeletedPayload
  >;
  [InboundMessageT.Enum.UserConnected]: z.infer<typeof _ConnectedUserPayload>;
};
