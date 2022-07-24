import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
// import "emoji-picker-react/dist/main.css";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firesbaseConfig";
import ChatMessage from "./ChatMessage";
import { useAllMessages } from "../../hooks/firebase/useAllMessages";
import { useUserProfile } from "../../hooks/firebase/useUserProfile";
import { useAnonProfile } from "../../hooks/firebase/useAnonProfile";
import { useWeb3 } from "../../hooks/useWeb3";

const ChatRoom = ({ showChat, setShowChat }) => {
  const messagesEndRef = useRef(null);
  const allMessages = useAllMessages();
  const [formValue, setFormValue] = useState("");
  const [emojis, setEmojis] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    photo: "",
    level: 1,
  });
  const [unixTime, setUnixTime] = useState(0);
  const [placeholder, setPlaceholder] = useState("");
  const [userBan, setUserBan] = useState(false);
  const { account } = useWeb3();
  const userStorage = window.localStorage.getItem("user");

  const userProfile = useUserProfile(userInfo.id !== "" && userInfo.id);
  const anonProfile = useAnonProfile(
    account !== "0x000000000000000000000000000000000000dEaD" && account
  );

  const handleInputChange = (e) => {
    setFormValue(e.target.value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setUnixTime(Math.round(new Date().getTime() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [unixTime]);

  useEffect(() => {
    if (userStorage !== null) {
      setUserInfo(JSON.parse(userStorage));
    }
  }, [userStorage]);

  const onEmojiClick = (event, emojiObject) => {
    let emoticon = emojiObject.emoji;
    if (formValue.length < 50) {
      setFormValue(formValue + emoticon);
    }
  };

  var banned = false;
  var unbanTime = 0;
  var time = 0;

  useEffect(() => {
    // Leer si el usuario esta logueado con discord
    if (
      userInfo.id !== "" &&
      unbanTime >= 0 &&
      unixTime > 0 &&
      userProfile[0]
    ) {
      banned = userProfile[0].chat.banned;
      unbanTime = userProfile[0].chat.unbanTime;
      time = unbanTime - unixTime;

      if (time < 0 && banned) {
        updateDoc(doc(db, "clubUsers", userInfo.id), {
          chat: {
            banned: false,
            unbanTime: 0,
          },
        });
      }
    }

    // Leer si el usuario ha conectado la wallet y no ha logueado con discord
    if (
      userInfo.id === "" &&
      account !== "0x000000000000000000000000000000000000dEaD" &&
      unbanTime >= 0 &&
      unixTime > 0 &&
      anonProfile[0]
    ) {
      banned = anonProfile[0].chat.banned;
      unbanTime = anonProfile[0].chat.unbanTime;
      time = unbanTime - unixTime;

      if (time < 0 && banned) {
        updateDoc(doc(db, "anonUsers", account), {
          chat: {
            banned: false,
            unbanTime: 0,
          },
        });
      }
    }

    // leer si el usuario esta baneado
    setUserBan(banned);
    if (time > 0 && banned) {
      setPlaceholder("You are banned for " + time + " seconds");
    } else {
      if (
        userInfo.id !== "" ||
        account !== "0x000000000000000000000000000000000000dEaD"
      ) {
        setPlaceholder("Type something...");
      } else {
        setPlaceholder("Login or connect wallet to chat");
      }
    }
  }, [account, userInfo, userProfile, anonProfile, unixTime]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (formValue.trim() === "") {
      setFormValue("");
      return false;
    }
    const myMessages = allMessages.filter(
      (messages) => messages.uid === userInfo.id
    );
    const lastMessages = myMessages.filter(
      (messages) => messages.createdAt > unixTime - 10
    );
    if (lastMessages.length > 4) {
      const userDoc =
        userInfo.id !== ""
          ? doc(db, "clubUsers", userInfo.id)
          : doc(db, "anonUsers", account);
      updateDoc(userDoc, {
        chat: {
          banned: true,
          unbanTime: unixTime + 30,
        },
      });
      setEmojis(false);
      setFormValue("");
      return false;
    }

    addDoc(collection(db, "messages"), {
      text: formValue.trim(),
      createdAt: unixTime,
      uid: userInfo.id !== "" ? userInfo.id : "anonymous",
      name: userInfo.name,
      photo: userInfo.photo,
      level: userInfo.level,
    });
    setFormValue("");
    setEmojis(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [showChat, allMessages]);

  return (
    <div className="chatting_chat_msgs">
      <div className="chat_input_hold">
        <div className="background-messages">
          <h1>Chat Room</h1>
        </div>
        <div className="chat_msgs">
          <ul className="messages">
            {allMessages &&
              allMessages.map((msg, index) => (
                <ChatMessage
                  key={msg.id}
                  index={index}
                  {...msg}
                  setShowChat={setShowChat}
                />
              ))}
            <div ref={messagesEndRef}></div>
          </ul>
        </div>
        {emojis && (
          <div className="emojis_modal">
            <Picker
              onEmojiClick={onEmojiClick}
              groupNames={{ smileys_people: "PEOPLE" }}
              pickerStyle={{
                width: "100%",
                boxShadow: "none",
              }}
              disableSearchBar={true}
              disableSkinTonePicker={true}
              preload={false}
            />
          </div>
        )}

        <form onSubmit={sendMessage}>
          <div
            className={
              (userInfo.id === "" &&
                account === "0x000000000000000000000000000000000000dEaD") ||
              userBan
                ? "chat_input_contain disabled"
                : "chat_input_contain"
            }
          >
            <input
              type="text"
              className="chat_input"
              placeholder={placeholder}
              value={formValue}
              onChange={handleInputChange}
              maxLength="50"
            />
            <div className="chat_buttons">
              <button
                className={emojis ? "chat_btn_selected" : "chat_btn"}
                onClick={() => setEmojis(!emojis)}
              >
                <i className="fas fa-smile"></i>
              </button>
              <button type="submit" className="chat_btn">
                <i className="fa fa-paper-plane" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
