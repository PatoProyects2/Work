import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";

export const useMessages = () => {
  const [messages, setMessages] = useState(false);
  const { socket } = useContext(Context);

  const chatHistory = window.localStorage.getItem("chat");

  useEffect(() => {
    if (socket && chatHistory !== null) {
      const timer = setInterval(() => {
        socket.emit(`join_chat_${chatHistory}`, 1);
      }, 500);
      return () => {
        clearInterval(timer);
      };
    }
  }, [socket, chatHistory]);

  useEffect(() => {
    if (socket && chatHistory !== null) {
      socket.emit(`join_chat_${chatHistory}`, 1);

      socket.on("receive_messages", (data) => {
        setMessages(data);
      });
    }
  }, [socket, chatHistory]);

  return messages;
};
