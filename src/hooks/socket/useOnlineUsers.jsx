import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";

export const useOnlineUsers = () => {
  const { socket } = useContext(Context);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const listener = (data) => {
      setOnlineUsers(data);
    };

    socket && socket.emit("send_onlineUsers");
    socket && socket.on("reveive_onlineUsers", listener);

    return () => {
      socket && socket.off("reveive_onlineUsers", listener);
    };
  }, [socket]);

  return onlineUsers;
};
