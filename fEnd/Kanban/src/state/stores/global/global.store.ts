import { create } from "zustand";
import { KanbanStore } from "./types";
import { getUsers } from "../../../services/user.service";
import { ApiError } from "../../../miscellaneous/utils/errors";
import { getEntityCollection } from "../../../services/entity.service";
import { Message } from "../../../types/messages";
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
              return { ...state, connectedUsers: m.payload.users };
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

  getUsers: async () => {
    try {
      const users = await getUsers();
      set((state) => ({ ...state, users: users.data }));
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

  moveColumn: (source, destination) => {
    set((state) => {
      const copy = [...state.columns];
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return state;
      }

      const [movedColumn] = copy.splice(source.index, 1);
      copy.splice(destination.index, 0, movedColumn);

      return { ...state, columns: copy };
    });
  },
}));
