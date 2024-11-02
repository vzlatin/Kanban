import { Application, Router } from "@oak/oak";

import { config } from "./config.ts";
import loginRouter from "./features/login/routes.ts";
import { closePool } from "./utils/database/connectionPool.ts";
import { initializeDatabase } from "./utils/database/dbSetup.ts";

initializeDatabase();

const router = new Router();
router.use(loginRouter.routes(), loginRouter.allowedMethods());

const app = new Application();
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
