import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";

export const useUserGames = (uid) => {
  const [userGames, setUserGames] = useState(false);
  const { socket } = useContext(Context);

  useEffect(() => {
    const dataCallback = (data) => {
      setUserGames(data);
    };

    if (socket) {
      socket.emit("join_allGames", uid);

      socket.on("receive_userGames", dataCallback);
    }

    return () => {
      socket && socket.off("receive_userGames", dataCallback);
    };
  }, [socket, uid]);

  return userGames;
};
