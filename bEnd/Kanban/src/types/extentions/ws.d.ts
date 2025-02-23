import { Payload } from "jwt";

declare global {
  interface WebSocket {
    _token: string;
    _user: Omit<Payload, "exp">;
  }
}

export {};
