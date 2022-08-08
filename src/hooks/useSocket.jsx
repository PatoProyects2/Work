import { useEffect, useContext } from "react";
import io from "socket.io-client";
import { Context } from "../context/Context";

export const useSocket = () => {
  const { setSocket } = useContext(Context);

  useEffect(() => {
    const apiSocket = io.connect("https://api.rpsgames.club/");
    setSocket(apiSocket);
  }, []);

  return;
};
