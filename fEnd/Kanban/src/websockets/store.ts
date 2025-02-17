import { create } from "zustand";

const initialState = {
  socket: null,
  connected: false,
};

const useWebsocketStore = create((set) => ({}));
