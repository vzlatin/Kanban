import { Context } from "@oak/oak/context";
import { EntityCollection } from "../../types/entities.ts";
import {
  findAllBoards,
  findAllColumns,
  findAllComments,
  findAllSections,
  findAllTasks,
  findAllTaskToDos,
} from "../../database/db.ts";
import { getAllUsers } from "../services/user.service.ts";

export async function getEntityCollection(ctx: Context): Promise<void> {
  const { response } = ctx;
  const body: Partial<EntityCollection> = {};
  body.sections = await findAllSections();
  body.boards = await findAllBoards();
  body.columns = await findAllColumns();
  body.tasks = await findAllTasks();
  body.taskToDos = await findAllTaskToDos();
  body.comments = await findAllComments();
  body.users = await getAllUsers();
  response.body = body;
}
