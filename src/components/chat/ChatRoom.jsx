import { useEffect, useRef, useState, useContext } from "react";
import Picker from "emoji-picker-react";
// import "emoji-picker-react/dist/main.css";
import ChatMessage from "./ChatMessage";
import { Context } from "../../context/Context";
import { useTime } from "../../hooks/useTime";
import { useMessages } from "../../hooks/firebase/useMessages";

const ChatRoom = ({ showChat, setShowChat }) => {
  const messagesEndRef = useRef(null);
  const { account, playerDocument, socket } = useContext(Context);
  const [formValue, setFormValue] = useState("");
  const [emojis, setEmojis] = useState(false);
  const unixTime = useTime();
  const messages = useMessages();

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
    const myMessages = messages.filter(
      (messages) => messages.account === account
    );
    const lastMessages = myMessages.filter(
      (messages) => messages.createdAt > unixTime - 30
    );

    var flood = false;

    const warningMessage = {
      text: "wait 30 seconds before sending another message",
      createdAt: unixTime,
      uid: playerDocument.uid,
      id: socket.id,
      account: account,
      name: playerDocument.name,
      photo: playerDocument.photo,
      level: playerDocument.level,
      room: 1,
      flood: flood,
    };

    if (lastMessages.length > 4) {
      flood = true;
      socket.emit("join_chat", warningMessage);
    }

    const text = formValue.trim();
    const message = {
      text: text,
      createdAt: unixTime,
      uid: playerDocument.uid,
      id: socket.id,
      account: account,
      name: playerDocument.name,
      photo: playerDocument.photo,
      level: playerDocument.level,
      room: 1,
      flood: flood,
    };

    if (text !== "") {
      socket.emit("send_message", message);
      setFormValue("");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [showChat, messages]);

  return (
    <div className="chatting_chat_msgs">
      <div className="chat_input_hold">
        <div className="background-messages">
          <h1>Chat Room</h1>
        </div>
        <div className="chat_msgs">
          <ul className="messages">
            {messages &&
              messages.map((msg, index) => (
                <ChatMessage
                  key={index}
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
              value={formValue}
              onChange={handleInputChange}
              maxLength="50"
              spellCheck="false"
            />
            <div className="chat_buttons">
              <div
                role="button"
                className={emojis ? "chat_btn_selected" : "chat_btn"}
                onClick={() => setEmojis(!emojis)}
              >
                <i className="fas fa-smile"></i>
              </div>
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
