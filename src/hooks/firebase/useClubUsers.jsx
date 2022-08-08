import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";

export const useClubUsers = (uid) => {
  const [clubUser, setClubUser] = useState(false);
  const { socket, playerDocument } = useContext(Context);

  useEffect(() => {
    const dataCallback = (data) => {
      setClubUser(data);
    };

    if (socket) {
      socket.emit("join_clubUsers", uid ? uid : playerDocument.uid);

      socket.on("receive_clubUsers", dataCallback);
    }

    return () => {
      socket && socket.off("receive_clubUsers", dataCallback);
      socket && socket.removeAllListeners("receive_clubUsers");
    };
  }, [socket, uid, playerDocument]);
  return clubUser;
};
