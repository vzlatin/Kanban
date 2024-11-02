import { DB } from "sqlite";

const poolSize = 6;
const timeout = 5000;

const connections: DB[] = Array.from(
    { length: poolSize },
    () => new DB("kanban.db")
);
const queue: Array<() => void> = [];

/**
 * This is a basic implementation of a connection pool.
 * It is not necessary for this application, the load is never high enough
 * and sqlite is not really built to operate on multiple concurrent connections.
 *
 * Note! The queued attempt to aquire the connection is executed
 * by the releaseConnection function. Whenever a function will release
 * a database connection, the releaseConnection will dequeue any aquiry attempt,
 * granted the timeout hasn't expired, and will execute it.
 *
 */
export function aquireConnection(): Promise<DB> {
    const startTime = Date.now();

    return new Promise((resolve, reject) => {
        const attemptAquire = () => {
            const now = Date.now();

            if (connections.length > 0) {
                resolve(connections.pop()!);
            } else if (now - startTime >= timeout) {
                reject(
                    new Error(
                        "Connection timeout: No available database connections"
                    )
                );
            } else {
                queue.push(attemptAquire);
            }
        };
        attemptAquire();
    });
}

export function releaseConnection(connection: DB): void {
    connections.push(connection);
    if (queue.length > 0) {
        const nextRequest = queue.shift();
        if (nextRequest) nextRequest();
    }
}

export function closePool(): void {
    connections.forEach((connection) => connection.close());
}
