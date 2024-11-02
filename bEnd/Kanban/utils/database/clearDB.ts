import { DB } from "sqlite";

export function clearDB(): void {
    const _db = new DB("kanban.db");

    // Create the users table
    _db.query(`DROP TABLE users`);

    // Create the tokens table

    _db.query(`DROP TABLE tokens`);

    _db.close();
}

clearDB();
