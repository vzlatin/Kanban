import { Context } from "@oak/oak";

import { initialConnectionAuthHandlerWS } from "../utils/auth.ts";

import {
    InboundMessage,
    InboundMessageSchema,
    InboundMessageT,
} from "../types/zod/inbound.ts";
import { validateToken } from "../../shared/services/token.service.ts";
import { sendErrorMessage } from "../utils/wsUtils.ts";
import { Message, OutboundMessageType } from "../types/messages.ts";
import {
    createBoard,
    deleteBoard,
    updateBoard,
} from "../services/board.service.ts";
import {
    createColumn,
    deleteColumn,
    updateColumn,
} from "../services/column.service.ts";
import {
    createTask,
    deleteTask,
    updateTask,
} from "../services/task.service.ts";
import { createComment, deleteComment } from "../services/comment.service.ts";
import {
    createTaskToDo,
    deleteTaskToDo,
    updateTaskToDo,
} from "../services/tasktodo.service.ts";
import {
    createSection,
    deleteSection,
    updateSection,
} from "../services/section.service.ts";

class Broadcaster {
    private clients: Set<WebSocket> = new Set<WebSocket>();

    constructor() {
        this.handleSocket = this.handleSocket.bind(this);
    }

    public async handleSocket(ctx: Context) {
        const socket = await initialConnectionAuthHandlerWS(ctx);
        this.handleConnection(socket);
    }

    private handleConnection(socket: WebSocket) {
        this.clients.add(socket);
        console.log("New Client Connected");

        socket.onopen = this.broadcastUsers.bind(this);

        socket.onmessage = async (message: MessageEvent<string>) => {
            const result = InboundMessageSchema.safeParse(
                JSON.parse(message.data),
            );
            if (!result.success) {
                sendErrorMessage(socket, result.error);
                return;
            }

            try {
                await this.handleMessage(result.data);
            } catch (e) {
                sendErrorMessage(socket, e);
                return;
            }
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

    // Non null assertion is justified because the id will always be
    // returned from the database.
    private async handleMessage(message: InboundMessage) {
        switch (message.type) {
            case InboundMessageT.Enum.CreateBoard: {
                const board = await createBoard(message.payload);
                this.broadcast({
                    type: OutboundMessageType.BoardCreated,
                    payload: board,
                });
                break;
            }
            case InboundMessageT.Enum.UpdateBoard: {
                const board = await updateBoard(message.payload);
                this.broadcast({
                    type: OutboundMessageType.BoardUpdated,
                    payload: board,
                });
                break;
            }
            case InboundMessageT.Enum.DeleteBoard: {
                const board = await deleteBoard(message.payload);
                this.broadcast({
                    type: OutboundMessageType.BoardDeleted,
                    payload: { id: board.id! },
                });
                break;
            }
            case InboundMessageT.Enum.CreateColumn: {
                const column = await createColumn(message.payload);
                this.broadcast({
                    type: OutboundMessageType.ColumnCreated,
                    payload: column,
                });
                break;
            }
            case InboundMessageT.Enum.UpdateColumn: {
                const column = await updateColumn(message.payload);
                this.broadcast({
                    type: OutboundMessageType.ColumnUpdated,
                    payload: column,
                });
                break;
            }
            case InboundMessageT.Enum.DeleteColumn: {
                const column = await deleteColumn(message.payload);
                this.broadcast({
                    type: OutboundMessageType.ColumnDeleted,
                    payload: { id: column.id! },
                });
                break;
            }
            case InboundMessageT.Enum.CreateTask: {
                const task = await createTask(message.payload);
                this.broadcast({
                    type: OutboundMessageType.TaskCreated,
                    payload: task,
                });
                break;
            }
            case InboundMessageT.Enum.DeleteTask: {
                const task = await deleteTask(message.payload);
                this.broadcast({
                    type: OutboundMessageType.TaskDeleted,
                    payload: { id: task.id! },
                });
                break;
            }
            case InboundMessageT.Enum.UpdateTask: {
                const task = await updateTask(message.payload);
                this.broadcast({
                    type: OutboundMessageType.TaskUpdated,
                    payload: task,
                });
                break;
            }
            case InboundMessageT.Enum.CreateComment: {
                const comment = await createComment(message.payload);
                this.broadcast({
                    type: OutboundMessageType.CommentCreated,
                    payload: comment,
                });
                break;
            }
            case InboundMessageT.Enum.DeleteComment: {
                const comment = await deleteComment(message.payload);
                this.broadcast({
                    type: OutboundMessageType.CommentDeleted,
                    payload: { id: comment.id! },
                });
                break;
            }
            case InboundMessageT.Enum.CreateTaskToDo: {
                const tasktodo = await createTaskToDo(message.payload);
                this.broadcast({
                    type: OutboundMessageType.TaskToDoCreated,
                    payload: tasktodo,
                });
                break;
            }
            case InboundMessageT.Enum.UpdateTaskToDo: {
                const tasktodo = await updateTaskToDo(message.payload);
                this.broadcast({
                    type: OutboundMessageType.TaskToDoUpdated,
                    payload: tasktodo,
                });
                break;
            }
            case InboundMessageT.Enum.DeleteTaskToDo: {
                const tasktodo = await deleteTaskToDo(message.payload);
                this.broadcast({
                    type: OutboundMessageType.TaskToDoDeleted,
                    payload: { id: tasktodo.id! },
                });
                break;
            }
            case InboundMessageT.Enum.CreateSection: {
                const section = await createSection(message.payload);
                this.broadcast({
                    type: OutboundMessageType.SectionCreated,
                    payload: section,
                });
                break;
            }
            case InboundMessageT.Enum.UpdateSection: {
                const section = await updateSection(message.payload);
                this.broadcast({
                    type: OutboundMessageType.SectionUpdated,
                    payload: section,
                });
                break;
            }
            case InboundMessageT.Enum.DeleteSection: {
                const section = await deleteSection(message.payload);
                this.broadcast({
                    type: OutboundMessageType.SectionDeleted,
                    payload: { id: section.id! },
                });
            }
        }
    }

    private disconnect(socket: WebSocket) {
        this.clients.delete(socket);
        this.broadcastUsers();
        console.log(
            `Client ${
                socket._user.fName + " " + socket._user.lName
            } disconnected`,
        );
    }
}

export default new Broadcaster();
