import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import io from "socket.io-client";
import ModalChat from "./ModalChat";
import "./Chat.css";
import db from '../../../../firebase/firesbaseConfig'
import ChatIcon from '../../../../assets/imgs/speech-bubble.png';

const socket = io.connect("http://192.168.1.54:3001");

function App() {
  const [displayModal, setDisplayModal] = useState(false);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("1");

  useEffect(() => {
    const joinRoom = async () => {
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
    joinRoom()
  }, [username]);

  return (
    <>
      {
        displayModal ? (
          <div className="Apssp">
            <ModalChat socket={socket} username={username} room={room} handleDisplay={() => setDisplayModal(false)} />
          </div>
        )
          :
          <button className="btn-chat" type="button" onClick={() => setDisplayModal(true)}>
            <img src={ChatIcon} alt="Chat" height="36px" />
          </button>
      }
    </>
  );
}

export default App;
