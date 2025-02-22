import { create } from "zustand";
import { KanbanStore } from "./types";
import { ApiError } from "../http/errors";
import { getUsers } from "../services/user.service";
import { getEntityCollection } from "../services/entity-collection.service";

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

      socket.onopen = () => console.log("WebSocket connected");

      socket.onmessage = (event) => {
        //const _data = JSON.parse(event.data);
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
