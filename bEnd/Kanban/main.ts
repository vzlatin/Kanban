import { Application } from "@oak/oak";
import { oakCors } from "x/cors";

import { config } from "./https/utils/config.ts";
import router from "./routes.ts";
import { closePool } from "./storage/database/connectionPool.ts";
import { initializeDatabase } from "./storage/database/dbSetup.ts";
import { errorHandler } from "./https/middleware/errorHandler.ts";

initializeDatabase();

const app = new Application();

app.use(
  oakCors({
    origin: "https://127.0.0.1:5173",
    credentials: true,
  }),
);
app.use(errorHandler);
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("close", () => {
  closePool();
});

const port = parseInt(config.port!);
const hostname = config.hostname;

//const hostname = "127.0.0.1";
//const port = 5000;

console.log(`Listening to ${config.hostname} on port: ${config.port}`);
//console.log(`Listening to ${hostname} on port: ${port}`);
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
