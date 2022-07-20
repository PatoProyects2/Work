import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
// import "emoji-picker-react/dist/main.css";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firesbaseConfig";
import { useAllMessages } from "../../hooks/firebase/useAllMessages";
import { useTime } from "../../hooks/useTime";
import ChatMessage from "./ChatMessage";
import { useUserProfile } from "../../hooks/firebase/useUserProfile";

const ChatRoom = ({ showChat }) => {
  const messagesEndRef = useRef(null);
  const allMessages = useAllMessages();
  const [formValue, setFormValue] = useState("");
  const [emojis, setEmojis] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const unixTime = useTime();
  const userStorage = window.localStorage.getItem("user");

  var discordId = "";
  if (userStorage) {
    discordId = JSON.parse(userStorage).id;
  }

  const userProfile = useUserProfile(discordId !== "" && discordId);

  const onEmojiClick = (event, emojiObject) => {
    let emoticon = emojiObject.emoji;
    if (formValue.length < 50) {
      setFormValue(formValue + emoticon);
    }
  };

  const banned = userProfile[0] ? userProfile[0].chat.banned : false;
  const unbanTime = userProfile[0] ? userProfile[0].chat.unbanTime : false;

  useEffect(() => {
    if (discordId !== "" && unbanTime >= 0 && unixTime > 0) {
      const time = unbanTime - unixTime;

      if (time > 0 && banned) {
        setPlaceholder("You are banned for " + time + " seconds");
      } else {
        setPlaceholder("Type something...");
      }

      if (time < 0 && banned) {
        updateDoc(doc(db, "clubUsers", discordId), {
          chat: {
            banned: false,
            unbanTime: 0,
          },
        });
      }
    } else {
      setPlaceholder("Login to chat...");
    }
  }, [discordId, banned, unbanTime, unixTime]);

  const sendMessage = async (e) => {
    if (discordId !== "") {
      e.preventDefault();
      if (formValue.trim() === "") {
        setFormValue("");
        return false;
      }
      const myMessages = allMessages.filter(
        (messages) => messages.uid === discordId
      );
      const lastMessages = myMessages.filter(
        (messages) => messages.createdAt > unixTime - 10
      );
      if (lastMessages.length > 4) {
        updateDoc(doc(db, "clubUsers", discordId), {
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
        uid: discordId,
      });
      setFormValue("");
      setEmojis(false);
    }
    return () => {
      setFormValue("");
      setEmojis(false);
    };
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [showChat, formValue]);

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
                <ChatMessage key={msg.id} index={index} {...msg} />
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
              preload={true}
            />
          </div>
        )}

        <form onSubmit={sendMessage}>
          <div
            className={
              discordId === "" || banned
                ? "chat_input_contain disabled"
                : "chat_input_contain"
            }
          >
            <input
              disabled={discordId === "" || banned}
              type="text"
              className="chat_input"
              placeholder={placeholder}
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              maxLength="50"
            />
            <div className="chat_buttons">
              <button
                disabled={discordId === "" || banned}
                className={emojis ? "chat_btn_selected" : "chat_btn"}
                onClick={() => setEmojis(!emojis)}
              >
                <i className="fas fa-smile"></i>
              </button>
              <button
                disabled={discordId === "" || banned}
                type="submit"
                className="chat_btn"
              >
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
