import { load } from "@std/dotenv";

await load({
    envPath: "./.env",
    export: true,
});

export const config = {
    hostname: Deno.env.get("HOSTNAME")!,
    port: Deno.env.get("PORT")!,
    accessTokenKey: Deno.env.get("ACCESS_TOKEN_KEY")!,
    refreshTokenKey: Deno.env.get("REFRESH_TOKEN_KEY")!,
};
