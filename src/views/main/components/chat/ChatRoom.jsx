import React, { useEffect, useState, useRef } from "react"
import { addDoc, onSnapshot, orderBy, collection, serverTimestamp, query, where, limit } from "firebase/firestore";
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap'
import { auth, db } from "../../../../firebase/firesbaseConfig";
import ChatMessage from './ChatMessage';

function ChatRoom(props) {
  const [user, setUser] = useState({})
  const [messages, setMessages] = useState([])
  const [formValue, setFormValue] = useState('')
  const [dropdown, setDropdown] = useState(true);

  const toggleMenu = () => {
    setDropdown(!dropdown);
  }

  useEffect(() => {

    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"), limit(50))
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
    <>
      <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="right" size="md" className="my-2">
        <DropdownToggle caret color='danger'>
          CHAT
        </DropdownToggle>
        <DropdownMenu >
          <main>
            <div>
              {messages && messages.map(msg => <ChatMessage key={msg.id} {...msg} auth={auth}/>)}
            </div>
            <div ref={messagesEndRef}></div>

          </main>
          {props.user ?
            <form onSubmit={sendMessage}>
              <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type something..." />
              <button type="submit">🕊️</button>
            </form>
            :
            <>
              <input type="text" defaultValue="Sign in to start chatting..." disabled={true} />
              <button type="submit">🕊️</button>
            </>
          }
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

export default ChatRoom;