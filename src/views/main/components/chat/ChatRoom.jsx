import React, { useEffect, useState, useRef } from "react"
import { addDoc, onSnapshot, orderBy, collection, serverTimestamp, where, limit, getDocs, query, arrayRemove, updateDoc, doc } from "firebase/firestore";
import { Modal, ModalBody, FormGroup } from 'reactstrap'
import { auth, db } from "../../../../firebase/firesbaseConfig";
import ChatMessage from './ChatMessage';

function ChatRoom(props) {
  const [userClub, setUserClub] = useState({})
  const [messages, setMessages] = useState([])
  const [ignoredUsers, setIgnoredUsers] = useState([])
  const [formValue, setFormValue] = useState('')
  const [chatHistory, setChatHistory] = useState(50)
  const [settings, setSettings] = useState(false)

  useEffect(() => {
    const readUserProfile = (user) => {
      try {
        const q = query(collection(db, "clubUsers"), where("uid", "==", user.uid))
        const unsub = onSnapshot(q, (doc) => {
          const userData = doc._snapshot.docChanges[0]
          if (userData) {
            setUserClub(userData.doc.data.value.mapValue.fields)
          }
        });
        return unsub;
      } catch (e) {

      }
    }

    readUserProfile(props.user)
  }, [props.user])


  useEffect(() => {
    const readIgnoredUser = async (userClub) => {
      try {
        var q = userClub.ignored.arrayValue.values.map(ignored => query(collection(db, "clubUsers"), where("uid", "==", ignored.stringValue)))
        const array = await Promise.all(
          q.map(async query => {
            return await getDocs(query)
          })
        )
        const ignored = array.map(data => {
          const field = data._snapshot.docChanges[0].doc.data.value.mapValue.fields
          const result = [field.name.stringValue, field.uid.stringValue]
          return result
        })
        setIgnoredUsers(ignored)
      } catch (e) {

      }
    }

    readIgnoredUser(userClub)
  }, [userClub])


  useEffect(() => {
    const readUserMessages = (userClub, chatHistory) => {
      try {
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"), limit(chatHistory))
        const unsub = onSnapshot(q, (doc) => {
          try {
            var message = message = doc.docs.map(message => (Object.assign({}, { id: message.id }, message.data())))
            setMessages(message.reverse())
            if (userClub) {
              let value = userClub.ignored.arrayValue.values
              if (value !== undefined) {
                const idsNotAllowed = value.map(doc => doc.stringValue);
                var userMessages = message.filter(data => !idsNotAllowed.includes(data.uid))
                setMessages(userMessages)
              }
            }
          } catch (e) {

          }
        });
        return unsub;
      } catch (e) {

      }
    }
    readUserMessages(userClub, chatHistory)
  }, [userClub, chatHistory])

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

  const openChatSettings = () => {
    if (settings) {
      setSettings(false)
    } else {
      setSettings(true)
    }
  }

  const removeIgnoredUsers = (event) => {
    if (userClub) {
      updateDoc(doc(db, "clubUsers", userClub.account.stringValue), {
        ignored: arrayRemove(event)
      })
    }
  }

  const setHistoryChat = () => {
    if (chatHistory === 50) {
      setChatHistory(100)
    }
    if (chatHistory === 100) {
      setChatHistory(300)
    }
    if (chatHistory === 300) {
      setChatHistory(50)
    }
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
              <button type="button" onClick={openChatSettings}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-gear"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
                  />
                  <path
                    d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
                  />
                </svg>
              </button>
              <input type="text" className="chat_input" maxLength="500" placeholder="Type something..." value={formValue} onChange={(e) => setFormValue(e.target.value)} />
              <button className="btn btn-transparent chat_send" type="submit"><i className="fa-solid fa-paper-plane"></i></button>
            </div>
          </form>
          :
          <div className="chat_input_contain disabled">
            <input type="text" className="chat_input" maxLength="500" placeholder="Log in to start chatting..." disabled="" />
            <span className="chat_send"><i className="fa-solid fa-paper-plane"></i></span>
          </div>
        }
        <Modal isOpen={settings} className="d-modal" size="lg">
          <ModalBody>
            <div className='d-flex justify-content-end'>
              <button type="button" className="btn-close" aria-label="Close" onClick={openChatSettings}></button>
            </div>
            <h4 className="text-center">Settings</h4>
            <FormGroup className="pt-3 text-center">
              {"Chat history duration: "}
              <button type="button" onClick={setHistoryChat}>{chatHistory}</button>
            </FormGroup>
            <FormGroup className="pt-3 text-center">
              {userClub ?
                <>
                  {"Ignored Users: " + ignoredUsers.length}
                  <ul>
                    {ignoredUsers.map(users => (
                      <li role="button" onClick={(event) => removeIgnoredUsers(users[1])} key={users[0]}>{users[0]}</li>
                    ))}
                  </ul>
                </>
                :
                ""
              }
            </FormGroup>
          </ModalBody>
        </Modal>
      </div>
    </div>
  )
}

export default ChatRoom;