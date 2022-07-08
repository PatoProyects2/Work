import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import { addDoc, collection } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import SendLogo from "../../assets/imgs/sendNew.png";
import { db } from "../../config/firesbaseConfig";
import { Context } from "../../context/Context";
import { useAllMessages } from "../../hooks/firebase/useAllMessages";
import { useTime } from "../../hooks/useTime";
import ChatMessage from "./ChatMessage";

const ChatRoom = ({ showChat }) => {
  const messagesEndRef = useRef(null);
  const allMessages = useAllMessages();
  const unixTime = useTime();
  const { discordId } = useContext(Context);
  const [formValue, setFormValue] = useState("");
  const [dropdown, setDropdown] = useState(false);

  const toggleMenu = () => {
    setDropdown(!dropdown);
  };

  const onEmojiClick = (event, emojiObject) => {
    let emoticon = emojiObject.emoji;
    setFormValue(formValue + emoticon);
  };

  const sendMessage = async (e) => {
    if (discordId !== "") {
      e.preventDefault();
      if (formValue.trim() === "") {
        setFormValue("");
        return false;
      }
      const docRef = await addDoc(collection(db, "messages"), {
        text: formValue.trim(),
        createdAt: unixTime,
        uid: discordId,
      });
      setFormValue("");
    }
    return () => {
      setFormValue("");
    };
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [showChat, formValue]);

  return (
    <div className="chatting_chat_msgs">
      <div className="chat_input_hold">
        <div className="chat_msgs">
          <ul className="messages">
            <div className="background-messages">
              <h1>Chat Room</h1>
            </div>
            {allMessages &&
              allMessages.map((msg) => (
                <ChatMessage key={msg.id} {...msg} />
              ))
            }
            <div ref={messagesEndRef}></div>
          </ul>
        </div>
        {discordId !== "" ? (
          <form onSubmit={sendMessage}>
            <div className="chat_input_contain">
              <input
                type="text"
                className="chat_input"
                placeholder="Type something..."
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
                maxLength="50"
              />
              <Dropdown
                isOpen={dropdown}
                toggle={toggleMenu}
                direction="up"
                size="xs"
                className="chat_emoji"
              >
                <DropdownToggle className="chat_emoji_btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="#4c4460"
                    viewBox="0 0 15.498 15.498"
                  >
                    <path
                      id="face-smile-emoji"
                      d="M7.749,8A7.749,7.749,0,1,0,15.5,15.749,7.748,7.748,0,0,0,7.749,8Zm0,14A6.249,6.249,0,1,1,14,15.749,6.256,6.256,0,0,1,7.749,22Zm-2.5-6.749a1,1,0,1,0-1-1A1,1,0,0,0,5.249,15.249Zm5,0a1,1,0,1,0-1-1A1,1,0,0,0,10.249,15.249Zm.125,2.268a3.413,3.413,0,0,1-5.249,0,.75.75,0,0,0-1.153.959,4.919,4.919,0,0,0,7.555,0,.75.75,0,0,0-1.153-.959Z"
                      transform="translate(0 -8)"
                    />
                  </svg>
                </DropdownToggle>
                <DropdownMenu>
                  <>
                    <Picker
                      onEmojiClick={onEmojiClick}
                      disableAutoFocus={true}
                      skinTone={SKIN_TONE_MEDIUM_DARK}
                      groupNames={{ smileys_people: "PEOPLE" }}
                      native
                    />
                  </>
                </DropdownMenu>
              </Dropdown>
              <button className="btn btn-transparent chat_send" type="submit">
                <img widht="30" height="30" src={SendLogo} alt="" />
              </button>
            </div>
          </form>
        ) : (
          <div className="chat_input_contain disabled">
            <input
              type="text"
              className="chat_input"
              maxLength="500"
              placeholder="Log in with discord to start chatting"
              disabled={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
