import { useEffect, useContext } from "react";
import io from "socket.io-client";
import { Context } from "../../context/Context";

export const useSocket = () => {
  const { setSocket } = useContext(Context);

  useEffect(() => {
    const wssUrl = `wss://${process.env.REACT_APP_SOCKET_URL}`;
    const httpsUrl = `https://${process.env.REACT_APP_SOCKET_URL}`;

    const JWT =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3d3cucnBzZ2FtZXMuY2x1YiIsImlhdCI6MTY2MDE2NDk2MCwiZXhwIjoxNjkxNzAxMDM5LCJhdWQiOiJ3d3cucnBzZ2FtZXMuY2x1YiIsInN1YiI6InJwc2Nsb3VkY2x1YkBnbWFpbC5jb20ifQ.N8bHx3ZaRSDF8SwtY6rxflTUK68B7nE9FYLmXTJlEZw";

    const socketOptions = {
      query: {
        token: JWT,
      },
    };

    const socket = io.connect(wssUrl, socketOptions);

    setSocket(socket);
  }, []);

  return;
};
