import { Context } from "@oak/oak/context";
import { ApiError } from "../errors/apiErrors.ts";

export function wsConnectionHandler(ctx: Context) {
	console.log("Request reaching handler");
	if (!ctx.isUpgradable) {
		throw ApiError.BadRequestError("Connection not upgradeable");
	}

	const socket = ctx.upgrade();

	socket.onopen = () => console.log("socket connection opened");
	socket.onmessage = (event) => {
		console.log(`Message received ${event.data}`);
		socket.send(`Prinde inapoi ${event.data}`);
	};
	socket.onerror = (event) => console.error(event);
	socket.onclose = () => console.log("Connection closed");
}
