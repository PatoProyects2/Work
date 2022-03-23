import React, { useEffect, useState, useRef } from "react"
import { addDoc, onSnapshot, orderBy, collection, serverTimestamp, query, where, limit } from "firebase/firestore";
import { auth, db } from "../../../../firebase/firesbaseConfig";
import ChatMessage from './ChatMessage';
import { confirmPasswordReset } from "firebase/auth";

function ChatRoom(props) {
  const [userClub, setUserClub] = useState({})
  const [messages, setMessages] = useState([])
  const [formValue, setFormValue] = useState('')

  useEffect(() => {
    const readUserProfile = (user) => {
      try {
        const q = query(collection(db, "clubUsers"), where("uid", "==", user.uid))
        const unsub = onSnapshot(q, (doc) => {
          const userData = doc._snapshot.docChanges[0]
          if (userData) {
            let datas = userData.doc.data.value.mapValue.fields
            setUserClub(datas)
          }
        });
        return unsub;
      } catch (e) {

      }

    }
    readUserProfile(props.user)
  }, [props.user])

  useEffect(() => {
    const readUserMessages = (userClub) => {
      try {
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"), limit(50))
        const unsub = onSnapshot(q, (doc) => {
          try {
            var message = message = doc.docs.map(message => (Object.assign({}, { id: message.id }, message.data())))
            setMessages(message.reverse())
            if (userClub) {
              let value = userClub.ignored.arrayValue.values
              if (value !== undefined) {
                const idsNotAllowed = value.map(doc => doc.stringValue);
                var userMessages = message.filter(data => !idsNotAllowed.includes(data.uid))
                setMessages(userMessages.reverse())
              }
            }
          } catch (e) {

          }
        });
        return unsub;
      } catch (e) {

      }

    }
    readUserMessages(userClub)
  }, [userClub])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (formValue === "") return
    if (userClub.name) {
      const docRef = await addDoc(collection(db, "messages"), {
        text: formValue,
        createdAt: serverTimestamp(),
        uid: props.user.uid,
        name: userClub.name.stringValue,
        level: userClub.level.integerValue,
        photo: userClub.photo.stringValue,
      })
    } else {
      const docRef = await addDoc(collection(db, "messages"), {
        text: formValue,
        createdAt: serverTimestamp(),
        uid: props.user.uid,
        name: props.user.displayName,
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
            {messages && messages.map(msg => <ChatMessage key={msg.id} {...msg} auth={auth} userClub={userClub} />)}
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