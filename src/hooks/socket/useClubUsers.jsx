import { useEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";

export const useClubUsers = () => {
  const { socket } = useContext(Context);
  const [clubUsers, setClubUsers] = useState([]);

  useEffect(() => {
    const listener = (data) => {
      setClubUsers(data);
    };

    socket && socket.emit("send_clubUsers");
    socket && socket.on("receive_clubUsers", listener);

    return () => {
      socket && socket.off("receive_clubUsers", listener);
    };
  }, [socket]);

  return clubUsers;
};
