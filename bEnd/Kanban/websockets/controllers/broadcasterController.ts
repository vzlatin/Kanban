import { Context } from "@oak/oak";

import { initialConnectionAuthHandlerWS } from "../utils/auth.ts";

import {
	InboundMessage,
	InboundMessageP,
	InboundMessageSchema,
	InboundMessageT,
} from "../types/zod/inbound.ts";
import { validateToken } from "../../shared/services/tokenService.ts";
import { sendErrorMessage } from "../utils/wsUtils.ts";
import { Message, OutboundMessageType } from "../types/messages.ts";

class Broadcaster {
	private clients: Set<WebSocket> = new Set<WebSocket>();

	constructor() {
		this.handleSocket = this.handleSocket.bind(this);
	}

	public async handleSocket(ctx: Context) {
		console.log("Request reaching handler");

		const socket = await initialConnectionAuthHandlerWS(ctx);
		this.handleConnection(socket);
	}

	private handleConnection(socket: WebSocket) {
		this.clients.add(socket);
		console.log("New Client Connected");

		socket.onopen = () => this.broadcastUsers();

		socket.onmessage = (message: MessageEvent<string>) => {
			const result = InboundMessageSchema.safeParse(JSON.parse(message.data));

			if (!result.success) {
				sendErrorMessage(socket, result.error);
				return;
			}

			this.handleMessage(result.data);
		};
		socket.onerror = () => {};

		socket.onclose = () => {
			this.disconnect(socket);
		};
	}

	private async broadcastUsers() {
		const users = [...this.clients].map((socket) => socket._user);
		await this.broadcast({
			type: OutboundMessageType.UserConnected,
			payload: { users },
		});
	}

	private async broadcast(message: Message) {
		const messagestring = JSON.stringify(message);
		for (const client of this.clients) {
			try {
				await validateToken(client._token, "access");
				client.send(messagestring);
			} catch (e) {
				sendErrorMessage(client, e);
				return;
			}
		}
	}

	private handleMessage(message: {
		type: InboundMessageT;
		payload: InboundMessageP;
	}) {
		switch (message.type) {
			case InboundMessage.Enum.CreateBoard:
				console.log("Received a request to create a new board");
				break;
			case InboundMessage.Enum.DeleteBoard:
				console.log("Message type: " + message.type);
				break;
			case InboundMessage.Enum.UpdateBoard:
				console.log("Message type: " + message.type);
				break;
			case InboundMessage.Enum.CreateColumn:
				console.log("Message type: " + message.type);
				break;
			case InboundMessage.Enum.DeleteColumn:
				console.log("Message type: " + message.type);
				break;
			case InboundMessage.Enum.UpdateColumn:
				console.log("Message type: " + message.type);
				break;
			case InboundMessage.Enum.CreateTask:
				console.log("Message type: " + message.type);
				break;
			case InboundMessage.Enum.DeleteTask:
				console.log("Message type: " + message.type);
				break;
			case InboundMessage.Enum.UpdateTask:
				console.log("Message type: " + message.type);
				break;
			case InboundMessage.Enum.CreateComment:
				console.log("Message type: " + message.type);
				break;
			case InboundMessage.Enum.DeleteComment:
				console.log("Message type: " + message.type);
				break;
			case InboundMessage.Enum.CreateTaskToDo:
				console.log("Message type: " + message.type);
				break;
			case InboundMessage.Enum.DeleteTaskToDo:
				console.log("Message type: " + message.type);
				break;
			case InboundMessage.Enum.UpdateTaskToDo:
		}
	}

	private disconnect(socket: WebSocket) {
		this.clients.delete(socket);
		this.broadcastUsers();
		console.log(
			`Client ${socket._user.fName + " " + socket._user.lName} disconnected`
		);
	}
}

export default new Broadcaster();
