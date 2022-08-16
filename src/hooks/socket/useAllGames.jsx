import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";

export const useAllGames = () => {
  const { socket } = useContext(Context);
  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    const listener = (data) => {
      setAllGames(data);
    };

    socket && socket.emit("send_allGames");
    socket && socket.on("receive_allGames", listener);

    return () => {
      socket && socket.off("receive_allGames", listener);
    };
  }, [socket]);

  return allGames;
};
