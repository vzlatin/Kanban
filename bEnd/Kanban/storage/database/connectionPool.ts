import { DB } from "sqlite";
import { config } from "../../https/utils/config.ts";

const poolSize = 6;
const timeout = 5000;

const connections: DB[] = Array.from(
  { length: poolSize },
  () => new DB(config.path),
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
 */
export function aquireConnection(): Promise<DB> {
  const startTime = Date.now();
  return new Promise((resolve, reject) => {
    const attemptAquire = () => {
      const now = Date.now();

      console.log("Attempting to acquire a connection...");
      console.log(`Connections available: ${connections.length}`);
      console.log(`Queue size: ${queue.length}`);
      if (connections.length > 0) {
        resolve(connections.pop()!);
      } else if (now - startTime >= timeout) {
        reject(
          new Error(
            "Connection timeout: No available database connections",
          ),
        );
      } else {
        queue.push(attemptAquire);
      }
    };
    attemptAquire();
  });
}

//export function releaseConnection(connection: DB): void {
//  connections.push(connection);
//  if (queue.length > 0) {
//    const nextRequest = queue.shift();
//    if (nextRequest) nextRequest();
//    console.log("connection released");
//  }
//  console.log("connection released");
//}

export function releaseConnection(connection: DB): void {
  console.log("Releasing a connection...");
  connections.push(connection);

  // Process the next queued request, if any
  while (queue.length > 0) {
    const nextRequest = queue.shift();
    if (nextRequest) {
      nextRequest(); // Attempt to acquire connection for the queued task
      break; // Only process one task per release
    }
  }
  console.log(`Connections available after release: ${connections.length}`);
}

export function closePool(): void {
  connections.forEach((connection) => connection.close());
}
