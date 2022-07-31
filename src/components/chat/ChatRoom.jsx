import { useEffect, useRef, useState, useContext } from "react";
import Picker from "emoji-picker-react";
// import "emoji-picker-react/dist/main.css";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firesbaseConfig";
import ChatMessage from "./ChatMessage";
import { Context } from "../../context/Context";
import { useAllMessages } from "../../hooks/firebase/useAllMessages";
import { useTime } from "../../hooks/useTime";
import { useChatBan } from "../../hooks/useChatBan";

const ChatRoom = ({ showChat, setShowChat }) => {
  const { account, playerDocument } = useContext(Context);
  const messagesEndRef = useRef(null);
  const allMessages = useAllMessages();
  const [formValue, setFormValue] = useState("");
  const [emojis, setEmojis] = useState(false);

  const unixTime = useTime();
  const banValue = useChatBan({
    playerDocument,
    account,
    unixTime,
    db,
    doc,
    updateDoc,
  });

  const handleInputChange = (e) => {
    setFormValue(e.target.value);
  };

  const onEmojiClick = (event, emojiObject) => {
    let emoticon = emojiObject.emoji;
    if (formValue.length < 50) {
      setFormValue(formValue + emoticon);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (formValue.trim() === "") {
      setFormValue("");
      return false;
    }
    const myMessages = allMessages.filter(
      (messages) => messages.account === account
    );
    const lastMessages = myMessages.filter(
      (messages) => messages.createdAt > unixTime - 10
    );
    if (lastMessages.length > 4) {
      const userDoc =
        playerDocument.uid === "anonymous"
          ? doc(db, "anonUsers", account)
          : doc(db, "clubUsers", playerDocument.uid);
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

    if (playerDocument) {
      if (!playerDocument.chat.banned) {
        addDoc(collection(db, "messages"), {
          text: formValue.trim(),
          createdAt: unixTime,
          uid: playerDocument.uid,
          account: account,
          name: playerDocument.name,
          photo: playerDocument.photo,
          level: playerDocument.level,
        });
        setFormValue("");
        setEmojis(false);
      }
    }
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
              !playerDocument
                ? "chat_input_contain disabled"
                : "chat_input_contain"
            }
          >
            <input
              type="text"
              className="chat_input"
              placeholder={
                playerDocument ? "Type something..." : "Connect wallet to chat"
              }
              value={
                playerDocument && playerDocument.chat.banned
                  ? banValue
                  : formValue
              }
              onChange={handleInputChange}
              maxLength="50"
              spellCheck="false"
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
