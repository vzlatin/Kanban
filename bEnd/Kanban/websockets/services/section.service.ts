import { DB } from "sqlite";
import { withTransaction } from "../../storage/orm/helpers.ts";
import { createModel } from "../../storage/orm/orm.ts";
import { Section, sectionColumns } from "../types/entities.ts";
import { MessageMap } from "../types/zod/inbound.ts";
import { DatabaseError } from "../../errors/databaseErrors.ts";
import { ApiError } from "../../errors/apiErrors.ts";

export async function createSection(
	payload: MessageMap["CreateSection"]
): Promise<Section> {
	const SectionModel = createModel<Section>("sections", sectionColumns);
	return await withTransaction(async (conn: DB) => {
		const lastInsertedRowId = await SectionModel.insert(payload, conn);
		if (!lastInsertedRowId) throw DatabaseError.ConflictError();

		const section = await SectionModel.findOne({ id: lastInsertedRowId });
		if (!section) throw DatabaseError.ConflictError();

		return section;
	});
}

export async function updateSection(
	payload: MessageMap["UpdateSection"]
): Promise<Section> {
	const SectionModel = createModel<Section>("sections", sectionColumns);
	return await withTransaction(async (conn: DB) => {
		const candidate = await SectionModel.findOne(
			{ id: payload.id },
			undefined,
			conn
		);
		if (!candidate)
			throw ApiError.BadRequestError(
				`A section with id: ${payload.id} doesn't exist`
			);

		const section = await SectionModel.update(
			{ id: payload.id },
			{ title: payload.title },
			undefined,
			conn
		);
		if (!section)
			throw ApiError.BadRequestError(
				`A section with id: ${payload.id} doesn't exist`
			);
		return section;
	});
}

export async function deleteSection(
	payload: MessageMap["DeleteSection"]
): Promise<Section> {
	const SectionModel = createModel<Section>("sections", sectionColumns);
	return await withTransaction(async (conn: DB) => {
		const section = await SectionModel.delete(
			{ id: payload.id },
			undefined,
			conn
		);
		if (!section)
			throw ApiError.BadRequestError(
				`A section with id: ${payload.id} doesn't exist`
			);
		return section;
	});
}
