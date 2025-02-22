import { ZodError } from "zod";
import { ErrorCodeMap } from "../types/errormap.ts";
import { ApiError } from "../../errors/apiErrors.ts";
import { DatabaseError } from "../../errors/databaseErrors.ts";
import { OutboundMessageType } from "../types/messages.ts";

export function sendErrorMessage(socket: WebSocket, error: unknown): void {
    if (error instanceof ApiError || error instanceof DatabaseError) {
        const code = ErrorCodeMap[error.status as keyof typeof ErrorCodeMap] ??
            500;
        socket.send(
            JSON.stringify({
                type: OutboundMessageType.Error,
                payload: { error, code },
            }),
        );
    } else if (error instanceof ZodError) {
        socket.send(
            JSON.stringify({
                type: OutboundMessageType.Error,
                payload: { error, code: 1003 },
            }),
        );
    } else {
        socket.close(1011, "Unexpected Server Error");
    }
}
