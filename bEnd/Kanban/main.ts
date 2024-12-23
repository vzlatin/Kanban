import { Application } from "@oak/oak";
import { oakCors } from "x/cors";

import { config } from "./utils/config.ts";
import router from "./routes.ts";
import { closePool } from "./database/connectionPool.ts";
import { initializeDatabase } from "./database/dbSetup.ts";
import { errorHandler } from "./middleware/errorHandler.ts";

initializeDatabase();

const app = new Application();
app.use(
	oakCors({
		origin: /^.+127.0.0.1:5173$/,
		credentials: true,
	})
);
app.use(errorHandler);
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("close", () => {
	closePool();
});

const port = parseInt(config.port);
const hostname = config.hostname;

console.log(`Listening to ${config.hostname} on port: ${config.port}`);
try {
	await app.listen({
		port,
		hostname,
		secure: true,
		cert: Deno.readTextFileSync("./localhost.crt"),
		key: Deno.readTextFileSync("./localhost.key"),
	});
} catch (e) {
	console.log(e);
	closePool();
}
