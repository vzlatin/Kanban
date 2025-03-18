import { create } from "zustand";
import { KanbanStore } from "./types";
import { ApiError } from "../../../miscellaneous/utils/errors";
import { getEntityCollection } from "../../../services/entity.service";
import { Message, OutboundMessageType } from "../../../types/messages";
import {
  InboundMessage,
  InboundMessageSchema,
  InboundMessageT,
} from "../../../types/zod/validation";
import { renderErrorToast } from "../../../miscellaneous/utils/toasts";

const initialState = {
  sections: [],
  boards: [],
  columns: [],
  tasks: [],
  taskToDos: [],
  comments: [],
  connectedUsers: [],
  users: [],
  socket: null,
  error: null,
};

export const useKanbanStore = create<KanbanStore>((set) => ({
  ...initialState,
  getEntityCollection: async () => {
    try {
      const response = await getEntityCollection();
      const entities = response.data;
      set((state) => ({
        ...state,
        sections: entities.sections,
        boards: entities.boards,
        columns: entities.columns,
        tasks: entities.tasks,
        taskToDos: entities.taskToDos,
        comments: entities.comments,
        users: entities.users,
      }));
    } catch (e) {
      if (e instanceof ApiError) set({ error: e });
      else {
        set({
          error: new ApiError(
            "An unkown error has occured",
            "Unknown Error",
            0,
          ),
        });
      }
    }
  },

  connect: (url) => {
    set((state) => {
      if (state.socket) return state;

      const socket = new WebSocket(url);

      socket.onopen = () => console.log("Connected via WS");

      socket.onmessage = async (message: MessageEvent<string>) => {
        const result = InboundMessageSchema.safeParse(
          JSON.parse(message.data),
        );
        if (!result.success) {
          console.log(result);
          renderErrorToast("Invalid message");
          return state;
        }
        const m = result.data as InboundMessage;
        set((state) => {
          switch (m.type) {
            case InboundMessageT.Enum.UserConnected: {
              const newUsers = m.payload.users.filter((newUser) =>
                !state.connectedUsers.some((user) => user.id === newUser.id)
              );
              return {
                ...state,
                connectedUsers: [...state.connectedUsers, ...newUsers],
              };
            }
            case InboundMessageT.Enum.SectionCreated: {
              return {
                ...state,
                sections: [...state.sections, m.payload],
              };
            }
            case InboundMessageT.Enum.SectionUpdated: {
              return {
                ...state,
                sections: state.sections.map((section) =>
                  section.id === m.payload.id
                    ? { ...section, ...m.payload }
                    : section
                ),
              };
            }
            case InboundMessageT.Enum.SectionDeleted: {
              return {
                ...state,
                sections: state.sections.filter((section) =>
                  section.id !== m.payload.id
                ),
              };
            }
            case InboundMessageT.Enum.BoardCreated: {
              return {
                ...state,
                boards: [...state.boards, m.payload],
              };
            }
            case InboundMessageT.Enum.BoardUpdated: {
              return {
                ...state,
                boards: state.boards.map((board) =>
                  board.id === m.payload.id ? { ...board, ...m.payload } : board
                ),
              };
            }
            case InboundMessageT.Enum.BoardDeleted: {
              return {
                ...state,
                boards: state.boards.filter((board) =>
                  board.id !== m.payload.id
                ),
              };
            }
            case InboundMessageT.Enum.ColumnCreated: {
              return {
                ...state,
                columns: [...state.columns, m.payload],
              };
            }
            case InboundMessageT.Enum.ColumnUpdated: {
              return {
                ...state,
                columns: state.columns.map((column) =>
                  column.id === m.payload.id
                    ? { ...column, ...m.payload }
                    : column
                ),
              };
            }
            case InboundMessageT.Enum.ColumnsOrderUpdated: {
              return {
                ...state,
                columns: m.payload,
              };
            }
            case InboundMessageT.Enum.ColumnDeleted: {
              return {
                ...state,
                columns: state.columns.filter((column) =>
                  column.id !== m.payload.id
                ),
              };
            }
            default:
              return state;
          }
        });
      };

      socket.onerror = (error) => console.error("WebSocket error:", error);

      socket.onclose = () => {
        console.log("WebSocket closed");
        set({ socket: null });
      };

      return { ...state, socket };
    });
  },

  send: (message: Message) => {
    set((state) => {
      if (state.socket && state.socket.readyState === WebSocket.OPEN) {
        state.socket.send(JSON.stringify(message));
      } else {
        // TODO: Handle the error propperly
        console.error("WebSocket is not open");
      }
      return state;
    });
  },

  moveColumn: (source, destination, boardId) => {
    set((state) => {
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return state;
      }

      // INFO: Only update the columns which belong to the current board
      // and not the other columns
      const boardColumns = state.columns
        .filter((column) => column.boardId === boardId)
        .sort((a, b) => a.columnOrder - b.columnOrder);

      const [movedColumn] = boardColumns.splice(source.index, 1);
      boardColumns.splice(destination.index, 0, movedColumn);

      const updatedBoardColumns = boardColumns.map((column, index) => ({
        ...column,
        columnOrder: index,
      }));

      const updatedColumns = state.columns.map((column) =>
        column.boardId
          ? updatedBoardColumns.find((c) => c.id === column.id) || column
          : column
      );
      console.log(updatedBoardColumns);

      state.send({
        type: OutboundMessageType.UpdateColumnsOrder,
        payload: updatedBoardColumns,
      });

      return { ...state, columns: updatedColumns };
    });
  },
}));
