import { DB } from "sqlite";

export function clearDB(): void {
	const _db = new DB("kanban.db");

	try {
		_db.query(`DROP TABLE IF EXISTS comments`);
		_db.query(`DROP TABLE IF EXISTS tasktodos`);
		_db.query(`DROP TABLE IF EXISTS tasks`);
		_db.query(`DROP TABLE IF EXISTS tokens`);
		_db.query(`DROP TABLE IF EXISTS users`);
		_db.query(`DROP TABLE IF EXISTS boards`);
		_db.query(`DROP TABLE IF EXISTS columns`);
	} catch (e) {
		console.log(`[ERROR]: clearDB ==> ${e}`);
	} finally {
		_db.close();
	}
}

clearDB();
