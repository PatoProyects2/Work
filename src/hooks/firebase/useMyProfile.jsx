import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";

export const useMyProfile = (identifier) => {
  const [loginUser, setLoginUser] = useState(false);
  const { socket } = useContext(Context);

  useEffect(() => {
    const dataCallback = (data) => {
      setLoginUser(data);
    };

    if (socket) {
      if (identifier.length === 18) {
        socket.emit("join_clubUsers", identifier);

        socket.on("receive_clubUsers", dataCallback);
      }
      if (identifier.length === 42) {
        socket.emit("join_anonUsers", identifier);

        socket.on("receive_anonUsers", dataCallback);
      }
    }
    return () => {
      socket && socket.off("receive_clubUsers", dataCallback);
      socket && socket.off("receive_anonUsers", dataCallback);
    };
  }, [socket, identifier]);

  return loginUser;
};
