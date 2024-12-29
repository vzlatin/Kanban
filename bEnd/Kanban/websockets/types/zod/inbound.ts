import { z } from "zod";

export const OutboundMessage = z.enum(["UserConnected", "Error"]);
export type OutboundMessageT = z.infer<typeof OutboundMessage>;

export const InboundMessage = z.enum([
	"CreateBoard",
	"DeleteBoard",
	"UpdateBoard",
	"CreateColumn",
	"DeleteColumn",
	"UpdateColumn",
	"CreateTask",
	"DeleteTask",
	"UpdateTask",
	"CreateComment",
	"DeleteComment",
	"CreateTaskToDo",
	"DeleteTaskToDo",
	"UpdateTaskToDo",
]);
export type InboundMessageT = z.infer<typeof InboundMessage>;

export const ZCreateBoardPayload = z.object({
	title: z.string(),
});

export const ZUpdateBoardPayload = z.object({
	title: z.string(),
});
export const ZDeleteBoardPaylod = z.object({
	id: z.number(),
});

export const ZCreateColumnPayload = z.object({
	title: z.string(),
});

export const ZUpdateColumnPayload = z.object({
	title: z.string(),
});

export const ZDeleteColumnPaylod = z.object({
	id: z.number(),
});

export const ZCreateTaskPayload = z.object({
	userId: z.number(),
	title: z.string(),
	description: z.optional(z.string()),
	status: z.enum(["New", "InProgress", "Testing", "Done"]),
	tag: z.optional(z.string()),
	createdOn: z.date(),
});

export const ZUpdateTaskPayload = z.object({
	userId: z.optional(z.number()),
	title: z.optional(z.string()),
	description: z.optional(z.string()),
	status: z.optional(z.enum(["New", "InProgress", "Testing", "Done"])),
	tag: z.optional(z.string()),
	completedOn: z.optional(z.date()),
});

export const ZDeleteTaskPayload = z.object({
	id: z.number(),
});

export const ZCreateCommentPayload = z.object({
	taskId: z.number(),
	userId: z.number(),
	content: z.string(),
	createdOn: z.date(),
});

export const ZDeleteCommentPayload = z.object({
	id: z.number(),
});

export const ZCreateTaskToDoPayload = z.object({
	taskId: z.number(),
	title: z.string(),
	completed: z.boolean(),
});

export const ZUpdateTaskToDoPayload = z.object({
	taskId: z.number(),
	title: z.optional(z.string()),
	completed: z.optional(z.boolean()),
});

export const ZDeleteTaskToDoPayload = z.object({
	id: z.number(),
});

const payload = z.union([
	ZCreateBoardPayload,
	ZUpdateBoardPayload,
	ZDeleteBoardPaylod,
	ZCreateColumnPayload,
	ZUpdateColumnPayload,
	ZDeleteColumnPaylod,
	ZCreateTaskPayload,
	ZUpdateTaskPayload,
	ZDeleteTaskPayload,
	ZCreateTaskToDoPayload,
	ZUpdateTaskToDoPayload,
	ZDeleteTaskToDoPayload,
	ZCreateCommentPayload,
	ZDeleteCommentPayload,
]);

export type InboundMessageP = z.infer<typeof payload>;

export const InboundMessageSchema = z.object({
	type: InboundMessage,
	payload,
});
