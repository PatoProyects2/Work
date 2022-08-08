import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";

export const useAllGames = (uid) => {
  const [allGames, setAllGames] = useState(false);
  const { socket } = useContext(Context);

  useEffect(() => {
    if (socket) {
      const timer = setInterval(() => {
        socket.emit("join_allGames", uid);
      }, 10000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [socket, uid]);

  useEffect(() => {
    const dataCallback = (data) => {
      setAllGames(data);
    };

    if (socket) {
      socket.emit("join_allGames", uid);

      socket.on("receive_allGames", dataCallback);
    }

    return () => {
      socket && socket.off("receive_allGames", dataCallback);
    };
  }, [socket, uid]);

  return allGames;
};
