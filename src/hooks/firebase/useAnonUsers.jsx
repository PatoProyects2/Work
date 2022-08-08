import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";

export const useAnonUsers = (account) => {
  const [anonUser, setAnonUser] = useState(false);
  const { socket, playerDocument } = useContext(Context);

  useEffect(() => {
    const dataCallback = (data) => {
      setAnonUser(data);
    };

    if (socket) {
      socket.emit("join_anonUsers", account);

      socket.on("receive_anonUsers", dataCallback);
    }
    return () => {
      socket && socket.off("receive_anonUsers", dataCallback);
      socket && socket.removeAllListeners("receive_anonUsers");
    };
  }, [socket, account, playerDocument]);

  return anonUser;
};
