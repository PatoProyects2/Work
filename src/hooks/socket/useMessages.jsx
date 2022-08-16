import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";

export const useMessages = () => {
  const { socket } = useContext(Context);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const listener = (data) => {
      setMessages(data);
    };

    socket && socket.emit("send_messages");
    socket && socket.on("receive_messages", listener);

    return () => {
      socket && socket.off("receive_messages", listener);
    };
  }, [socket]);

  return messages;
};
