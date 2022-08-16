import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";

export const useAnonUsers = () => {
  const { socket } = useContext(Context);
  const [anonUsers, setAnonUsers] = useState([]);

  useEffect(() => {
    const listener = (data) => {
      setAnonUsers(data);
    };

    socket && socket.emit("send_anonUsers");
    socket && socket.on("receive_anonUsers", listener);

    return () => {
      socket && socket.off("receive_anonUsers", listener);
    };
  }, [socket]);

  return anonUsers;
};
