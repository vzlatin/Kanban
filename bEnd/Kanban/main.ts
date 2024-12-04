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
		origin: /^.+localhost:5173$/,
		credentials: true,
	})
);
app.use(errorHandler);
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("close", () => {
	closePool();
});

console.log(`Listening to ${config.hostname} on port: ${config.port}`);
try {
	await app.listen({
		port: parseInt(config.port),
		hostname: config.hostname,
	});
} catch (e) {
	console.log(e);
	closePool();
}
