import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import io from "socket.io-client";
import ModalChat from "./ModalChat";
import db from '../../../../firebase/firesbaseConfig'
import "./Chat.css";

const socket = io.connect("http://192.168.1.54:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("1");

  useEffect(() => {
    joinRoom()
  }, []);

  async function joinRoom() {
    try {
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      const query = doc(db, "users", accounts[0])
      const document = await getDoc(query)
      const userData = document.data()
      if (userData) {
        setUsername(userData.name1)
        socket.emit("join_room", room);
      } else {

      }
    } catch (e) {

    }
  };

  return (
    <div className="Apssp">
      <ModalChat socket={socket} username={username} room={room} />
    </div>
  );
}

export default App;
