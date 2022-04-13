import React, { useEffect, useState, useRef, useContext } from "react"
import { addDoc, onSnapshot, orderBy, collection, serverTimestamp, where, limit, getDocs, query, arrayRemove, updateDoc, doc } from "firebase/firestore"
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import { Modal, ModalBody, FormGroup, Dropdown, DropdownMenu, DropdownToggle, } from 'reactstrap'
import { db } from "../../firebase/firesbaseConfig";
import ChatMessage from './ChatMessage';
import SendLogo from '../../assets/imgs/send.png'
import { Context } from '../../context/Context'
function ChatRoom() {
  const { discordId } = useContext(Context);
  const [userClub, setUserClub] = useState('')
  const [messages, setMessages] = useState([])
  const [ignoredUsers, setIgnoredUsers] = useState([])
  const [formValue, setFormValue] = useState('')
  const [chatHistory, setChatHistory] = useState(50)
  const [dropdown, setDropdown] = useState(false);
  const [settings, setSettings] = useState(false)
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const toggleMenu = () => {
    setDropdown(!dropdown);
  }

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    let emoticon = emojiObject.emoji
    setFormValue(formValue + emoticon);
  };

  useEffect(() => {
    if (discordId !== '') {
      const q = query(collection(db, "clubUsers"), where("uid", "==", discordId))
      const unsub = onSnapshot(q, (doc) => {
        const userData = doc._snapshot.docChanges[0]
        if (userData) {
          setUserClub(userData.doc.data.value.mapValue.fields)
        }
      });
      return () => unsub()
    }
  }, [discordId])


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
    return () => {
      setIgnoredUsers([]);
    };
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
        return () => unsub()
      } catch (e) {

      }
    }
    readUserMessages(userClub, chatHistory)
  }, [userClub, chatHistory])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (formValue.trim() === "") {
      setFormValue("")
      return false
    }
    if (userClub.name) {
      const docRef = await addDoc(collection(db, "messages"), {
        text: formValue.trim(),
        createdAt: serverTimestamp(),
        uid: discordId,
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
      updateDoc(doc(db, "clubUsers", userClub.uid.stringValue), {
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
            {messages && messages.map(msg => <ChatMessage key={msg.id} {...msg} userClub={userClub} />)}
            <div ref={messagesEndRef}></div>
          </ul>
        </div>
        {discordId !== '' ?
          <form onSubmit={sendMessage}>
            <div className="chat_input_contain">
              <button type="button" className="btn btn-transparent" onClick={openChatSettings}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="white"
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
              <input type="text" className="chat_input" placeholder="Type something..." value={formValue} onChange={(e) => setFormValue(e.target.value)} maxLength="50" />
              <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="up" size="xs" className="chat_emoji">
                <DropdownToggle className="chat_emoji_btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 15.498 15.498">
                    <path id="face-smile-emoji" d="M7.749,8A7.749,7.749,0,1,0,15.5,15.749,7.748,7.748,0,0,0,7.749,8Zm0,14A6.249,6.249,0,1,1,14,15.749,6.256,6.256,0,0,1,7.749,22Zm-2.5-6.749a1,1,0,1,0-1-1A1,1,0,0,0,5.249,15.249Zm5,0a1,1,0,1,0-1-1A1,1,0,0,0,10.249,15.249Zm.125,2.268a3.413,3.413,0,0,1-5.249,0,.75.75,0,0,0-1.153.959,4.919,4.919,0,0,0,7.555,0,.75.75,0,0,0-1.153-.959Z" transform="translate(0 -8)" />
                  </svg>
                </DropdownToggle>
                <DropdownMenu >
                  <>
                    <Picker
                      onEmojiClick={onEmojiClick}
                      disableAutoFocus={true}
                      skinTone={SKIN_TONE_MEDIUM_DARK}
                      groupNames={{ smileys_people: 'PEOPLE' }}
                      native
                    />
                  </>
                </DropdownMenu>
              </Dropdown>
              <button className="btn btn-transparent chat_send" type="submit"><img widht="30" height="30" src={SendLogo} alt="" /></button>
            </div>
          </form>
          :
          <div className="chat_input_contain disabled">
            <input type="text" className="chat_input" maxLength="500" placeholder="Log in with discord to start chatting" disabled={true} />
          </div>
        }
        <Modal isOpen={settings} className="d-modal" size="lg">
          <ModalBody>
            <div className='d-flex justify-content-end'>
              <button type="button" className="btn-close" aria-label="Close" onClick={openChatSettings}></button>
            </div>
            <h4 className="text-center">Settings</h4>
            <div className="row">
              <div className="col-12 col-md-6">
                <FormGroup className="pt-3 text-center">
                  <span className="d-block mb-3">Chat history duration: </span>
                  <button type="button" className="btn btn-info" onClick={setHistoryChat}>{chatHistory}</button> <span>ms</span>
                </FormGroup>
              </div>
              <div className="col-12 col-md-6">
                <FormGroup className="pt-3 text-center">
                  {userClub ?
                    <>
                      <span className="d-block mb-3">{"Ignored Users: " + ignoredUsers.length}</span>
                      <ul className="ignored-list">
                        {ignoredUsers.map(users => (
                          <li role="button" onClick={(event) => removeIgnoredUsers(users[1])} key={users[0]}>{users[0]}</li>
                        ))}
                      </ul>
                    </>
                    :
                    ""
                  }
                </FormGroup>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  )
}

export default ChatRoom;