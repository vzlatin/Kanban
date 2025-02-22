import { oakCors } from "x/cors";
import router from "./routes.ts";
import { Application } from "@oak/oak";
import { config } from "./src/https/utils/config.ts";
import { errorHandler } from "./src/https/middleware/errorHandler.ts";

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

const port = parseInt(config.port!);
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
}
