import { load } from "@std/dotenv";

await load({
	envPath: "./.env",
	export: true,
});

export const config = {
	hostname: Deno.env.get("HOSTNAME") || "localhost",
	port: Deno.env.get("PORT") || "5000",
	certFile: Deno.env.get("CERTFILE")!,
	keyFile: Deno.env.get("KEYFILE")!,
	accessTokenKey: await crypto.subtle.generateKey(
		{ name: "HMAC", hash: "SHA-512" },
		true,
		["sign", "verify"]
	),
	refreshTokenKey: await crypto.subtle.generateKey(
		{ name: "HMAC", hash: "SHA-512" },
		true,
		["sign", "verify"]
	),
	accessTokenExpiration: 15,
	refreshTokenExpiration: 60 * 24 * 30,
};
