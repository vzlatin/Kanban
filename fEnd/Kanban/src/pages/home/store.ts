import { create } from "zustand";
import { KanbanStore } from "./types";
import { getSections } from "../../services/section-board.service";
import { ApiError } from "../../http/errors";
import { getColumns } from "../../services/column-task.service";
import { getUsers } from "../../services/user.service";

const initialState = {
  sections: [],
  columns: [],
  users: [],
  error: null,
};

export const useKanbanStore = create<KanbanStore>((set) => ({
  ...initialState,
  getSections: async () => {
    try {
      const sections = await getSections();
      set((state) => ({ ...state, sections: sections.data }));
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
  getColumns: async (boardId: number) => {
    try {
      const columns = await getColumns(boardId);
      set((state) => ({ ...state, columns: columns.data }));
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
