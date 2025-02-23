import { useEffect } from "react";
import { useSigninStore } from "../../state/stores/signin/store";
import { useKanbanStore } from "../../state/stores/global/global.store";

const WebsocketInitializer = () => {
  const connect = useKanbanStore((state) => state.connect);
  const accessToken = useSigninStore((state) => state.accessToken);
  const url: string =
    `${import.meta.env.VITE_WS_BASE_URL}/ws?token=${accessToken}`;

  useEffect(() => {
    connect(url);
  }, []);

  return null;
};

export default WebsocketInitializer;
