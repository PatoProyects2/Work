import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";

export const useStatus = () => {
  const [online, setOnline] = useState(false);
  const { socket } = useContext(Context);

  useEffect(() => {
    if (socket) {
      const timer = setInterval(() => {
        socket.emit("join_app", 1);
      }, 10000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.emit("join_app", 1);

      socket.on("receive_users_online", (data) => {
        setOnline(data);
      });
    }
  }, [socket]);

  return online;
};
