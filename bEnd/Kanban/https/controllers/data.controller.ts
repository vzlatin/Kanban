import { Context } from "@oak/oak/context";
import {
  boardColumns,
  Column,
  columnColumns,
  Section,
  sectionColumns,
  taskColumns,
} from "../../websockets/types/entities.ts";
import { createModel } from "../../storage/orm/orm.ts";
import { RouterContext } from "@oak/oak/router";

export function getSections(ctx: Context): void {
  const { response } = ctx;

  const SectionModel = createModel<Section>("sections", sectionColumns);
  const result = SectionModel.findWithJoin("boards", "id", "section", {
    primary: sectionColumns,
    joined: boardColumns,
  });
  response.body = result;
}

export function getColumns(
  ctx: RouterContext<"/columns/:boardId">,
): void {
  const { response } = ctx;
  const boardId = parseInt(ctx.params.boardId);
  const ColumnModel = createModel<Column>("columns", columnColumns);
  const columns = ColumnModel.findWithJoin(
    "tasks",
    "id",
    "columnId",
    {
      primary: columnColumns,
      joined: taskColumns,
    },
    { boardId: boardId },
  );

  response.body = columns;
}
