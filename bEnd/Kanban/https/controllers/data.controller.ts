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

export async function getSections(ctx: Context): Promise<void> {
	const { response } = ctx;

	const SectionModel = createModel<Section>("sections", sectionColumns);
	const result = await SectionModel.findWithJoin("boards", "id", "section", {
		primary: sectionColumns,
		joined: boardColumns,
	});
	response.body = result;
}

export async function getColumns(
	ctx: RouterContext<"/columns/:boardId">
): Promise<void> {
	const { response } = ctx;
	const boardId = parseInt(ctx.params.boardId);
	const ColumnModel = createModel<Column>("columns", columnColumns);
	const columns = await ColumnModel.findWithJoin(
		"tasks",
		"id",
		"columnId",
		{
			primary: columnColumns,
			joined: taskColumns,
		},
		{ boardId: boardId }
	);

	response.body = columns;
}
