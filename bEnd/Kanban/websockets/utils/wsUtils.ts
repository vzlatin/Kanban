import { ZodError } from "zod";
import { ApiError } from "../../errors/apiErrors.ts";
import { DatabaseError } from "../../errors/databaseErrors.ts";
import { OutboundMessageType } from "../types/messages.ts";

export function sendErrorMessage(socket: WebSocket, e: unknown): void {
	if (e instanceof ApiError || e instanceof DatabaseError) {
		socket.send(
			JSON.stringify({
				type: OutboundMessageType.Error,
				payload: { error: e, code: e.status },
			})
		);
	} else if (e instanceof ZodError) {
		socket.send(
			JSON.stringify({
				type: OutboundMessageType.Error,
				payload: { error: e, code: 1003 },
			})
		);
	} else {
		socket.close(1011, "Unexpected Server Error");
	}
}
