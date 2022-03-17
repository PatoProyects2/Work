import React, { useEffect, useState, useRef } from "react"
import { addDoc, onSnapshot, orderBy, collection, serverTimestamp, query, where } from "firebase/firestore";
import { auth, db } from "../../../../firebase/firesbaseConfig";
import ChatMessage from './ChatMessage';

function ChatRoom(props) {
  const [user, setUser] = useState({})
  const [messages, setMessages] = useState([])
  const [formValue, setFormValue] = useState('')
  const [dropdown, setDropdown] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"))
    const unsub = onSnapshot(q, (doc) => {
      const message = doc.docs.map(message => (Object.assign({}, { id: message.id }, message.data())))
      setMessages(message)

    });
    return unsub;
  }, [])

  useEffect(() => {
    const readUserProfile = (user) => {
      try {
        const q = query(collection(db, "clubUsers"), where("uid", "==", user.uid))
        const unsub = onSnapshot(q, (doc) => {
          const user = doc._snapshot.docChanges[0]
          let datas = null
          if (user) {
            datas = user.doc.data.value.mapValue.fields
          }
          setUser(datas)
        });
        return unsub;
      } catch (e) {

      }
      return () => {
        setUser({});
      };
    }
    readUserProfile(props.user)
  }, [props.user])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (formValue === "") return
    if (user) {
      const docRef = await addDoc(collection(db, "messages"), {
        text: formValue,
        createdAt: serverTimestamp(),
        uid: props.user.uid,
        name: user.name.stringValue,
        level: user.level.integerValue,
        photo: user.photo.stringValue,
      })
    } else {
      const docRef = await addDoc(collection(db, "messages"), {
        text: formValue,
        createdAt: serverTimestamp(),
        uid: props.user.uid,
        name: "ClubUser",
        level: "1",
        photo: "https://gateway.ipfs.io/ipfs/QmP7jTCiimXHJixUNAVBkb7z7mCZQK3vwfFiULf5CgzUDh",
      })
    }

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
    <div className="chatting_chat_msgs">
      <div className="top-gradient"></div>
      <div className="chat_input_hold">
        <div className="chat_msgs">
          <ul className="messages">
            {messages && messages.map(msg => <ChatMessage key={msg.id} {...msg} auth={auth} />)}
            <div ref={messagesEndRef}></div>
          </ul>
        </div>
        {props.user ?
          <form onSubmit={sendMessage}>
            <div className="chat_input_contain">
              <input type="text" className="chat_input" maxLength="500" placeholder="Type something..." value={formValue} onChange={(e) => setFormValue(e.target.value)} />
              <button className="btn btn-transparent chat_send" type="submit"><i className="fa-solid fa-paper-plane"></i></button>
            </div>
          </form>
          :
          <div className="chat_input_contain disabled">
            <input type="text" className="chat_input" maxLength="500" placeholder="Sign in to start chatting..." disabled="" />
            <span className="chat_send"><i className="fa-solid fa-paper-plane"></i></span>
          </div>
        }

      </div>
    </div>
  )
}

export default ChatRoom;