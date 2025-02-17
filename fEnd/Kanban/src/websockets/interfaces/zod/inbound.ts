import { z } from "zod";

export const InboundMessageT = z.enum([
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
  "SectionCreated",
  "SectionUpdated",
  "SectionDeleted",
]);

export const ZEntityDeletedPayload = z.object({
  id: z.number(),
});

// ---- Sections ----
export const ZSectionCreatedPayload = z.object({
  id: z.optional(z.number()),
  title: z.string(),
});

export const ZSectionUpdatedPayload = z.object({
  id: z.number(),
  title: z.optional(z.string()),
});

export const ZSectionDeletedPayload = ZEntityDeletedPayload.extend({});

// ---- Boards ----
export const ZBoardCreatedPayload = z.object({
  id: z.number(),
  title: z.string(),
  section: z.number(),
});

export const ZBoardUpdatedPayload = z.object({
  id: z.number(),
  title: z.optional(z.string()),
  section: z.optional(z.number()),
});

export const ZBoardDeletedPayload = ZEntityDeletedPayload.extend({});

// ---- Columns ----
export const ZColumnCreatedPayload = z.object({
  id: z.number(),
  boardId: z.number(),
  title: z.string(),
  columnOrder: z.number(),
});

export const ZColumnUpdatedPayload = z.object({
  id: z.number(),
  boardId: z.number(),
  title: z.optional(z.string()),
  columnOrder: z.optional(z.number()),
});

export const ZColumnDeletedPayload = ZEntityDeletedPayload.extend({});

// ---- Tasks ----
export const ZTaskCreatedPayload = z.object({
  id: z.number(),
  userId: z.number(),
  columnId: z.number(),
  boardId: z.number(),
  taskOrder: z.number(),
  title: z.string(),
  description: z.optional(z.string()),
  status: z.enum(["New", "InProgress", "Testing", "Done"]),
  tag: z.optional(z.string()),
  createdOn: z.date(),
  completedOn: z.optional(
    z.preprocess((arg) => {
      if (typeof arg === "string") return new Date(arg);
      return arg; // If already a Date, pass through
    }, z.date()),
  ),
});

export const ZTaskUpdatedPayload = z.object({
  id: z.number(),
  userId: z.number(),
  columnId: z.number(),
  boardId: z.number(),
  taskOrder: z.number(),
  title: z.string(),
  description: z.optional(z.string()),
  status: z.enum(["New", "InProgress", "Testing", "Done"]),
  tag: z.optional(z.string()),
  createdOn: z.date(),
  completedOn: z.optional(
    z.preprocess((arg) => {
      if (typeof arg === "string") return new Date(arg);
      return arg; // If already a Date, pass through
    }, z.date()),
  ),
});

export const ZTaskDeletedPayload = ZEntityDeletedPayload.extend({});

// ----Comments----
export const ZCommentCreatedPayload = z.object({
  id: z.number(),
  taskId: z.number(),
  userId: z.number(),
  content: z.string(),
  createdOn: z.date(),
});

export const ZCommentDeletedPayload = ZEntityDeletedPayload.extend({});

// ----TaskToDos ----
export const ZTaskToDoCreatedPayload = z.object({
  id: z.number(),
  taskId: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

export const ZTaskToDoUpdatedPayload = z.object({
  id: z.number(),
  taskId: z.optional(z.number()),
  title: z.optional(z.string()),
  completed: z.optional(z.boolean()),
});

export const ZTaskToDoDeletedPayload = ZEntityDeletedPayload.extend({});

export const InboundMessageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("SectionCreated"),
    payload: ZSectionCreatedPayload,
  }),
  z.object({
    type: z.literal("SectionUpdated"),
    payload: ZSectionUpdatedPayload,
  }),
  z.object({
    type: z.literal("SectionDeleted"),
    payload: ZSectionDeletedPayload,
  }),
  z.object({
    type: z.literal("BoardCreated"),
    payload: ZBoardCreatedPayload,
  }),
  z.object({
    type: z.literal("BoardUpdated"),
    payload: ZBoardUpdatedPayload,
  }),
  z.object({
    type: z.literal("BoardDeleted"),
    payload: ZBoardDeletedPayload,
  }),
  z.object({
    type: z.literal("ColumnCreated"),
    payload: ZColumnCreatedPayload,
  }),
  z.object({
    type: z.literal("ColumnUpdated"),
    payload: ZColumnUpdatedPayload,
  }),
  z.object({
    type: z.literal("ColumnDeleted"),
    payload: ZColumnDeletedPayload,
  }),
  z.object({
    type: z.literal("TaskCreated"),
    payload: ZTaskCreatedPayload,
  }),
  z.object({
    type: z.literal("TaskUpdated"),
    payload: ZTaskUpdatedPayload,
  }),
  z.object({
    type: z.literal("TaskDeleted"),
    payload: ZTaskDeletedPayload,
  }),
  z.object({
    type: z.literal("CommentCreated"),
    payload: ZCommentCreatedPayload,
  }),
  z.object({
    type: z.literal("CommentDeleted"),
    payload: ZCommentDeletedPayload,
  }),
  z.object({
    type: z.literal("TaskToDoCreated"),
    payload: ZTaskToDoCreatedPayload,
  }),
  z.object({
    type: z.literal("TaskToDoUpdated"),
    payload: ZTaskToDoUpdatedPayload,
  }),
  z.object({
    type: z.literal("TaskToDoDeleted"),
    payload: ZTaskToDoDeletedPayload,
  }),
]);

export type InboundMessage = z.infer<typeof InboundMessageSchema>;

export type MessageMap = {
  [InboundMessageT.Enum.SectionCreated]: z.infer<typeof ZSectionCreatedPayload>;
  [InboundMessageT.Enum.SectionUpdated]: z.infer<typeof ZSectionUpdatedPayload>;
  [InboundMessageT.Enum.SectionDeleted]: z.infer<typeof ZSectionDeletedPayload>;
  [InboundMessageT.Enum.BoardCreated]: z.infer<typeof ZBoardCreatedPayload>;
  [InboundMessageT.Enum.BoardUpdated]: z.infer<typeof ZBoardUpdatedPayload>;
  [InboundMessageT.Enum.BoardDeleted]: z.infer<typeof ZBoardDeletedPayload>;
  [InboundMessageT.Enum.ColumnCreated]: z.infer<typeof ZCommentCreatedPayload>;
  [InboundMessageT.Enum.ColumnUpdated]: z.infer<typeof ZColumnUpdatedPayload>;
  [InboundMessageT.Enum.ColumnDeleted]: z.infer<typeof ZColumnDeletedPayload>;
  [InboundMessageT.Enum.TaskCreated]: z.infer<typeof ZTaskCreatedPayload>;
  [InboundMessageT.Enum.TaskUpdated]: z.infer<typeof ZTaskUpdatedPayload>;
  [InboundMessageT.Enum.TaskDeleted]: z.infer<typeof ZTaskDeletedPayload>;
  [InboundMessageT.Enum.CommentCreated]: z.infer<
    typeof ZCommentCreatedPayload
  >;
  [InboundMessageT.Enum.CommentDeleted]: z.infer<typeof ZCommentDeletedPayload>;
  [InboundMessageT.Enum.TaskToDoCreated]: z.infer<
    typeof ZTaskToDoCreatedPayload
  >;
  [InboundMessageT.Enum.TaskToDoUpdated]: z.infer<
    typeof ZTaskToDoUpdatedPayload
  >;
  [InboundMessageT.Enum.TaskToDoDeleted]: z.infer<
    typeof ZTaskDeletedPayload
  >;
};
