import React, { useEffect, useState, useRef } from "react"
import { addDoc, onSnapshot, orderBy, collection, serverTimestamp, query } from "firebase/firestore";
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap'
import { auth, db } from "../../../../firebase/firesbaseConfig";
import ChatMessage from './ChatMessage';

function ChatRoom() {
  const [dropdown, setDropdown] = useState(true);
  const [messages, setMessages] = useState([])
  const [formValue, setFormValue] = useState('')

  const toggleMenu = () => {
    setDropdown(!dropdown);
  }
  // console.log(messages)
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"))
    const unsub = onSnapshot(q, (doc) => {
      const mes = doc.docs.map(message => (Object.assign({}, { id: message.id }, message.data())))
      // console.log( "data: ", doc.docs[0].data());
      setMessages(mes)
      // console.log("setMessage" , mes)
    });
    return unsub;
  }, [])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (formValue === "") return
    const { uid, photoURL } = auth.currentUser;
    const docRef = await addDoc(collection(db, "messages"), {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL
    })
    setFormValue('')
  }
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <>
      <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="lg" className="my-2">
        <DropdownToggle caret color='danger'>
          CHAT
        </DropdownToggle>
        <DropdownMenu >
          <main>
            <div>
              {messages && messages.map(msg => <ChatMessage key={msg.id} {...msg} auth={auth} />)}
            </div>
            <div ref={messagesEndRef}></div>

          </main>
          <form onSubmit={sendMessage}>
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type something..." />
            <button type="submit">🕊️</button>
          </form>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

export default ChatRoom;