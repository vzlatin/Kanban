import { z } from "zod";

export const _Section = z.object({
  id: z.number(),
  title: z.string(),
});

export const _Board = z.object({
  id: z.number(),
  title: z.string(),
  section: z.number(),
});

export const _Column = z.object({
  id: z.number(),
  boardId: z.number(),
  title: z.string(),
  columnOrder: z.number(),
});

export const _Task = z.object({
  id: z.number(),
  userId: z.number().nullable(),
  columnId: z.number(),
  boardId: z.number(),
  taskOrder: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  status: z.enum(["New", "InProgress", "Testing", "Done"]),
  tag: z.string().nullable(),
  createdOn: z.preprocess((arg) => {
    if (typeof arg === "string") return new Date(arg);
    return arg;
  }, z.date()),
  completedOn: z.preprocess((arg) => {
    if (typeof arg === "string") return new Date(arg);
    return arg;
  }, z.date()).nullable(),
});

export const _TaskToDo = z.object({
  id: z.number(),
  taskId: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

export const _Comment = z.object({
  id: z.number(),
  taskId: z.number(),
  userId: z.number(),
  content: z.string(),
  createdOn: z.preprocess((arg) => {
    if (typeof arg === "string") return new Date(arg);
    return arg; // If already a Date, pass through
  }, z.date()),
});
