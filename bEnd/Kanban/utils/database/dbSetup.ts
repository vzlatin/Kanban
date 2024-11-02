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
                role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'employee')),
                activationLink TEXT NOT NULL,
                isActivated BOOLEAN NOT NULL CHECK (isActivated IN (0, 1))
            ) 
        `);

    // Create the tokens table

    _db.query(`
            CREATE TABLE IF NOT EXISTS tokens (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
                userId INTEGER NOT NULL,
                refreshToken TEXT NOT NULL UNIQUE,
                FOREIGN KEY(userId) REFERENCES users(id)
        ) 
    `);

    _db.close();
}
