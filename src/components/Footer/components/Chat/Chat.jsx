import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ModalChat from "./ModalChat";
import "./Chat.css";

const socket = io.connect("http://192.168.1.54:3001");

function App() {
  const [username, setUsername] = useState("User1");
  const [room, setRoom] = useState("1");

  useEffect(() => {
    joinRoom()
  }, []);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };

  return (
    <div className="Apssp">
      <ModalChat socket={socket} username={username} room={room} />
    </div>
  );
}

export default App;
