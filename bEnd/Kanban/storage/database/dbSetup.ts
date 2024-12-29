/**
 * This script performs the database setup.
 * At the time of development, Deno lacks a good, mature or an actively maintainer ORM.
 * Given the circumstances, migrations are also not possible, at least not with a
 * plug and play solution. Will look into perhaps writing my own migration scripts.
 *
 */

import { DB } from "sqlite";

export function initializeDatabase(): void {
	const _db = new DB("kanban.db");

	// Create the users table
	_db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
                firstName TEXT NOT NULL,
                lastName TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'employee'))
            ) 
        `);

	// Create the tokens table
	_db.query(`
            CREATE TABLE IF NOT EXISTS tokens (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
                userId INTEGER NOT NULL,
                refreshToken TEXT NOT NULL UNIQUE,
                FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
        ) 
    `);

	// Create the boards table
	_db.query(`
            CREATE TABLE IF NOT EXISTS boards (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
                title TEXT NOT NULL
            )
        `);

	// Create the columns table
	_db.query(`
            CREATE TABLE IF NOT EXISTS columns (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
                title TEXT NOT NULL
            ) 
        `);

	// Create the tasks table
	_db.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
                userId INTEGER NOT NULL,
                title TEXT NOT NULL,
                description TEXT,
                status TEXT NOT NULL CHECK (status IN ('new', 'in_progress', 'testing', 'done')),
                tag TEXT,
                createdOn TEXT NOT NULL,
                completedOn TEXT,
                FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
            ) 
        `);

	// Create the tasktodos table
	_db.query(`
            CREATE TABLE IF NOT EXISTS tasktodos (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
                taskId INTEGER NOT NULL,
                title TEXT NOT NULL,
                completed INTEGER NOT NULL DEFAULT 0,
                FOREIGN KEY(taskId) REFERENCES tasks(id) ON DELETE CASCADE
            ) 
        `);

	// Create the comments table
	_db.query(`
            CREATE TABLE IF NOT EXISTS comments (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
                taskId INTEGER NOT NULL,
                userId INTEGER NOT NULL,
                content TEXT NOT NULL,
                createdOn TEXT NOT NULL,
                FOREIGN KEY(taskId) REFERENCES tasks(id) ON DELETE CASCADE,
                FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
            ) 
        `);

	_db.close();
}
