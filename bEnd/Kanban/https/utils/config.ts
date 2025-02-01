import { load } from "@std/dotenv";
import { resolve } from "@std/path";

await load({
  envPath: resolve(Deno.cwd(), ".env"),
  export: true,
});

export const config = {
  path: resolve(Deno.cwd(), "storage", "database", "kanban.db"),
  hostname: Deno.env.get("H") ?? "localhost",
  port: Deno.env.get("P") ?? 5000,
  accessTokenKey: await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
  ),
  refreshTokenKey: await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
  ),
  accessTokenExpiration: 15,
  refreshTokenExpiration: 60 * 24 * 30,
};
