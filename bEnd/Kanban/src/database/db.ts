//import "@std/dotenv/load";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import {
  boards as boardTable,
  columns as columnTable,
  comments as commentTable,
  sections as sectionTable,
  tasks as taskTable,
  tasktodos as tasktodoTable,
  tokens as tokenTable,
  users as userTable,
} from "./schema.ts";
import { eq } from "drizzle-orm/expressions";

const { Pool } = pg;
const connectionString = Deno.env.get("DATABASE_URL");
if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not defined. Issues loading the environment variables",
  );
}

export const db = drizzle({
  client: new Pool({
    connectionString,
  }),
  schema: {
    userTable,
    tokenTable,
    sectionTable,
    boardTable,
    columnTable,
    taskTable,
    tasktodoTable,
    commentTable,
  },
});

// ================= User Helpers =================

import { User } from "../types/entities.ts";
import { Token } from "../types/entities.ts";
import {
  Board,
  Column,
  Comment,
  Section,
  Task,
  TaskToDo,
} from "../types/entities.ts";
import { sql } from "drizzle-orm";

export async function insertUser(
  user: typeof userTable.$inferInsert,
): Promise<User[]> {
  return await db.insert(userTable).values(user).returning();
}

export async function updateUser(
  id: number,
  payload: Partial<Omit<User, "password">>,
) {
  return await db.update(userTable).set({ ...payload }).where(
    eq(userTable.id, id),
  ).returning();
}

export async function findUserById(id: number): Promise<User[]> {
  return await db.select().from(userTable).where(eq(userTable.id, id));
}

export async function findUserByEmail(email: string): Promise<User[]> {
  return await db.select().from(userTable).where(eq(userTable.email, email));
}

export async function findAllUsers(): Promise<User[]> {
  return await db.select().from(userTable);
}

// ================= Token Helpers =================

export async function findTokenByUserId(id: number): Promise<Token[]> {
  return await db.select().from(tokenTable).where(eq(tokenTable.userId, id));
}

export async function findTokenByItself(token: string): Promise<Token[]> {
  return await db.select().from(tokenTable).where(
    eq(tokenTable.refreshToken, token),
  );
}

export async function updateRefreshToken(
  refreshToken: string,
  id: number,
): Promise<Token[]> {
  return await db.update(tokenTable).set({ refreshToken: refreshToken }).where(
    eq(tokenTable.userId, id),
  ).returning();
}

export async function insertToken(
  token: typeof tokenTable.$inferInsert,
): Promise<Token[]> {
  return await db.insert(tokenTable).values(token).returning();
}

export async function deleteTokenByItself(token: string): Promise<Token[]> {
  return await db.delete(tokenTable).where(eq(tokenTable.refreshToken, token))
    .returning();
}

// ================= Section Helpers =================
export async function findAllSections(): Promise<Section[]> {
  return await db.select().from(sectionTable);
}

export async function _insertSection(
  section: typeof sectionTable.$inferInsert,
): Promise<Section[]> {
  return await db.insert(sectionTable).values(section).returning();
}

export async function _updateSection(
  id: number,
  payload: Partial<Section>,
): Promise<Section[]> {
  return await db.update(sectionTable).set({ ...payload }).where(
    eq(sectionTable.id, id),
  ).returning();
}

export async function _deleteSection(id: number): Promise<Section[]> {
  return await db.delete(sectionTable).where(eq(sectionTable.id, id))
    .returning();
}

// ================= Board Helpers =================
export async function findAllBoards(): Promise<Board[]> {
  return await db.select().from(boardTable);
}

export async function _insertBoard(
  board: typeof boardTable.$inferInsert,
): Promise<Board[]> {
  return await db.insert(boardTable).values(board).returning();
}

export async function _updateBoard(
  id: number,
  payload: Partial<Board>,
): Promise<Board[]> {
  return await db.update(boardTable).set({ ...payload }).where(
    eq(boardTable.id, id),
  ).returning();
}

export async function _deleteBoard(id: number): Promise<Board[]> {
  return await db.delete(boardTable).where(eq(boardTable.id, id)).returning();
}

// ================= Column Helpers =================
export async function findAllColumns(): Promise<Column[]> {
  return await db.select().from(columnTable);
}

export async function _insertColumn(
  column: typeof columnTable.$inferInsert,
): Promise<Column[]> {
  return await db.insert(columnTable).values(column).returning();
}

export async function _updateColumn(
  id: number,
  payload: Partial<Column>,
): Promise<Column[]> {
  return await db.update(columnTable).set({ ...payload }).where(
    eq(columnTable.id, id),
  ).returning();
}

export function _updateColumnsOrder(payload: Column[]): Promise<Column[]> {
  return db.transaction(async (tx) => {
    await Promise.all(
      payload.map((col) =>
        tx.update(columnTable)
          .set({ columnOrder: sql`${col.columnOrder + 1000}` })
          .where(eq(columnTable.id, col.id))
      ),
    );
    await Promise.all(
      payload.map((col) =>
        tx.update(columnTable)
          .set({ columnOrder: col.columnOrder })
          .where(eq(columnTable.id, col.id))
      ),
    );
    const updatedColumns = await tx.query.columnTable.findMany();
    return updatedColumns;
  });
}

export async function _deleteColumn(id: number): Promise<Column[]> {
  return await db.delete(columnTable).where(eq(columnTable.id, id)).returning();
}
// ================= Task Helpers =================
export async function findAllTasks(): Promise<Task[]> {
  return await db.select().from(taskTable);
}

export async function _insertTask(
  task: typeof taskTable.$inferInsert,
): Promise<Task[]> {
  return await db.insert(taskTable).values(task).returning();
}

export async function _updateTask(
  id: number,
  payload: Partial<Task>,
): Promise<Task[]> {
  return await db.update(taskTable).set({ ...payload }).where(
    eq(taskTable.id, id),
  ).returning();
}

export async function _deleteTask(id: number): Promise<Task[]> {
  return await db.delete(taskTable).where(eq(taskTable.id, id)).returning();
}
// ================= TaskToDo Helpers =================
export async function findAllTaskToDos(): Promise<TaskToDo[]> {
  return await db.select().from(tasktodoTable);
}

export async function _insertTaskToDo(
  tasktodo: typeof tasktodoTable.$inferInsert,
): Promise<TaskToDo[]> {
  return await db.insert(tasktodoTable).values(tasktodo).returning();
}

export async function _updateTaskToDo(
  id: number,
  payload: Partial<TaskToDo>,
): Promise<TaskToDo[]> {
  return await db.update(tasktodoTable).set({ ...payload }).where(
    eq(tasktodoTable.id, id),
  ).returning();
}

export async function _deleteTaskToDo(id: number): Promise<TaskToDo[]> {
  return await db.delete(tasktodoTable).where(eq(tasktodoTable.id, id))
    .returning();
}
// ================= CommentHelpers =================
export async function findAllComments(): Promise<Comment[]> {
  return await db.select().from(commentTable);
}

export async function _insertComment(
  comment: typeof commentTable.$inferInsert,
): Promise<Comment[]> {
  return await db.insert(commentTable).values(comment).returning();
}

export async function _deleteComment(id: number): Promise<Comment[]> {
  return await db.delete(commentTable).where(eq(commentTable.id, id))
    .returning();
}
