import { create } from "zustand";
import { KanbanStore } from "./types";
import { getUsers } from "../../../services/user.service";
import { ApiError } from "../../../miscellaneous/utils/errors";
import { renderInfoToast } from "../../../miscellaneous/utils/toasts";
import { getEntityCollection } from "../../../services/entity.service";

const initialState = {
  sections: [],
  boards: [],
  columns: [],
  tasks: [],
  taskToDos: [],
  comments: [],
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
      if (state.socket) state;

      const socket = new WebSocket(url);

      socket.onopen = () => renderInfoToast("You have connected via WS");

      socket.onmessage = async (message: MessageEvent<string>) => {
        const _data = JSON.parse(message.data);
        console.log(_data);
        // TODO: Add parsing
        // TODO: build and add the controller
      };

      socket.onerror = (error) => console.error("WebSocket error:", error);

      socket.onclose = () => {
        console.log("WebSocket closed");
        set({ socket: null });
      };

      return { ...state, socket };
    });
  },

  send: (message) => {
    set((state) => {
      if (state.socket && state.socket.readyState === WebSocket.OPEN) {
        state.socket.send(JSON.stringify(message));
      } else {
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
}));
