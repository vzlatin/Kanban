import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const userRoles = pgEnum("role", ["admin", "manager", "employee"]);
export const taskStatus = pgEnum("status", [
  "New",
  "InProgress",
  "Testing",
  "Done",
]);

export const users = pgTable("users", {
  id: serial().primaryKey().unique().notNull(),
  firstName: text().notNull(),
  lastName: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  role: userRoles(),
});

export const tokens = pgTable("tokens", {
  id: serial().primaryKey().unique().notNull(),
  userId: integer().notNull().references(() => users.id, {
    onDelete: "cascade",
  }),
  refreshToken: text().notNull().unique(),
});

export const sections = pgTable("sections", {
  id: serial().primaryKey().unique().notNull(),
  title: text().notNull(),
});

export const boards = pgTable("boards", {
  id: serial().primaryKey().unique().notNull(),
  title: text().notNull(),
  section: integer().notNull().references(() => sections.id, {
    onDelete: "cascade",
  }),
});

export const columns = pgTable("columns", {
  id: serial().primaryKey().unique().notNull(),
  boardId: integer().notNull().references(() => boards.id, {
    onDelete: "cascade",
  }),
  title: text().notNull(),
  columnOrder: integer().notNull(),
}, (t) => [
  unique().on(t.boardId, t.columnOrder),
]);

export const tasks = pgTable("tasks", {
  id: serial().primaryKey().unique().notNull(),
  userId: integer().references(() => users.id, {
    onDelete: "set null",
  }),
  columnId: integer().notNull().references(() => columns.id, {
    onDelete: "cascade",
  }),
  boardId: integer().notNull().references(() => boards.id, {
    onDelete: "cascade",
  }),
  title: text().notNull(),
  description: text(),
  taskOrder: integer().notNull().unique(),
  status: taskStatus(),
  tag: text(),
  createdOn: timestamp({ precision: 6, withTimezone: true }).notNull()
    .defaultNow(),
  completedOn: timestamp({ precision: 6, withTimezone: true }),
}, (t) => [unique().on(t.columnId, t.taskOrder)]);

export const tasktodos = pgTable("tasktodos", {
  id: serial().primaryKey().unique().notNull(),
  taskId: integer().notNull().references(() => tasks.id, {
    onDelete: "cascade",
  }),
  title: text().notNull(),
  completed: boolean().notNull(),
});

export const comments = pgTable("comments", {
  id: serial().primaryKey().unique().notNull(),
  taskId: integer().notNull().references(() => tasks.id, {
    onDelete: "cascade",
  }),
  userId: integer().notNull().references(() => users.id, {
    onDelete: "no action",
  }),
  content: text().notNull(),
  createdOn: timestamp({ precision: 6, withTimezone: true }).notNull()
    .defaultNow(),
});
