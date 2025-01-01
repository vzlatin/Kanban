import { z } from "zod";

export const OutboundMessage = z.enum(["UserConnected", "Error"]);
export type OutboundMessageT = z.infer<typeof OutboundMessage>;

export const InboundMessageT = z.enum([
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

export const ZCreateBoardPayload = z.object({
	title: z.string(),
});

export const ZUpdateBoardPayload = z.object({
	id: z.number(),
	title: z.string(),
});
export const ZDeleteBoardPayload = z.object({
	id: z.number(),
});

export const ZCreateColumnPayload = z.object({
	boardId: z.number(),
	title: z.string(),
});

export const ZUpdateColumnPayload = z.object({
	id: z.number(),
	title: z.string(),
});

export const ZDeleteColumnPayload = z.object({
	id: z.number(),
});

export const ZCreateTaskPayload = z.object({
	userId: z.number(),
	columnId: z.number(),
	boardId: z.number(),
	title: z.string(),
	description: z.optional(z.string()),
	status: z.enum(["New", "InProgress", "Testing", "Done"]),
	tag: z.optional(z.string()),
	createdOn: z.optional(
		z.preprocess((arg) => {
			if (typeof arg === "string") return new Date(arg);
			return arg; // If already a Date, pass through
		}, z.date())
	),
	completedOn: z.optional(
		z.preprocess((arg) => {
			if (typeof arg === "string") return new Date(arg);
			return arg; // If already a Date, pass through
		}, z.date())
	),
});

export const ZUpdateTaskPayload = z.object({
	id: z.number(),
	userId: z.optional(z.number()),
	title: z.optional(z.string()),
	description: z.optional(z.string()),
	status: z.optional(z.enum(["New", "InProgress", "Testing", "Done"])),
	tag: z.optional(z.string()),
	completedOn: z.optional(
		z.preprocess((arg) => {
			if (typeof arg === "string") return new Date(arg);
			return arg; // If already a Date, pass through
		}, z.date())
	),
});

export const ZDeleteTaskPayload = z.object({
	id: z.number(),
});

export const ZCreateCommentPayload = z.object({
	taskId: z.number(),
	userId: z.number(),
	content: z.string(),
	createdOn: z.optional(
		z.preprocess((arg) => {
			if (typeof arg === "string") return new Date(arg);
			return arg; // If already a Date, pass through
		}, z.date())
	),
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
	id: z.number(),
	taskId: z.optional(z.number()),
	title: z.optional(z.string()),
	completed: z.optional(z.boolean()),
});

export const ZDeleteTaskToDoPayload = z.object({
	id: z.number(),
});

export const InboundMessageSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.literal("CreateBoard"),
		payload: ZCreateBoardPayload,
	}),
	z.object({
		type: z.literal("UpdateBoard"),
		payload: ZUpdateBoardPayload,
	}),
	z.object({
		type: z.literal("DeleteBoard"),
		payload: ZDeleteBoardPayload,
	}),
	z.object({
		type: z.literal("CreateColumn"),
		payload: ZCreateColumnPayload,
	}),
	z.object({
		type: z.literal("UpdateColumn"),
		payload: ZUpdateColumnPayload,
	}),
	z.object({
		type: z.literal("DeleteColumn"),
		payload: ZDeleteColumnPayload,
	}),
	z.object({
		type: z.literal("CreateTask"),
		payload: ZCreateTaskPayload,
	}),
	z.object({
		type: z.literal("UpdateTask"),
		payload: ZUpdateTaskPayload,
	}),
	z.object({
		type: z.literal("DeleteTask"),
		payload: ZDeleteTaskPayload,
	}),
	z.object({
		type: z.literal("CreateComment"),
		payload: ZCreateCommentPayload,
	}),
	z.object({
		type: z.literal("DeleteComment"),
		payload: ZDeleteCommentPayload,
	}),
	z.object({
		type: z.literal("CreateTaskToDo"),
		payload: ZCreateTaskToDoPayload,
	}),
	z.object({
		type: z.literal("UpdateTaskToDo"),
		payload: ZUpdateTaskToDoPayload,
	}),
	z.object({
		type: z.literal("DeleteTaskToDo"),
		payload: ZDeleteTaskToDoPayload,
	}),
]);

export type InboundMessage = z.infer<typeof InboundMessageSchema>;

export type MessageMap = {
	[InboundMessageT.Enum.CreateBoard]: z.infer<typeof ZCreateBoardPayload>;
	[InboundMessageT.Enum.DeleteBoard]: z.infer<typeof ZDeleteBoardPayload>;
	[InboundMessageT.Enum.UpdateBoard]: z.infer<typeof ZUpdateBoardPayload>;
	[InboundMessageT.Enum.CreateColumn]: z.infer<typeof ZCreateColumnPayload>;
	[InboundMessageT.Enum.DeleteColumn]: z.infer<typeof ZDeleteColumnPayload>;
	[InboundMessageT.Enum.UpdateColumn]: z.infer<typeof ZUpdateColumnPayload>;
	[InboundMessageT.Enum.CreateTask]: z.infer<typeof ZCreateTaskPayload>;
	[InboundMessageT.Enum.DeleteTask]: z.infer<typeof ZDeleteTaskPayload>;
	[InboundMessageT.Enum.UpdateTask]: z.infer<typeof ZUpdateTaskPayload>;
	[InboundMessageT.Enum.CreateTaskToDo]: z.infer<typeof ZCreateTaskToDoPayload>;
	[InboundMessageT.Enum.DeleteTaskToDo]: z.infer<typeof ZDeleteTaskToDoPayload>;
	[InboundMessageT.Enum.UpdateTaskToDo]: z.infer<typeof ZUpdateTaskToDoPayload>;
	[InboundMessageT.Enum.CreateComment]: z.infer<typeof ZCreateCommentPayload>;
	[InboundMessageT.Enum.DeleteComment]: z.infer<typeof ZDeleteCommentPayload>;
};
