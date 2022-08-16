import { NavLink } from "react-router-dom";
import CrownLevel from "../../views/Stats/components/Info/CrownLevel";
import ClubLogo from "../../assets/imgs/Views_Nfts/ClubLogo.png";
import Crown from "../../assets/imgs/Chat_Panel/Crown.png";

const ChatMessage = ({ name, photo, level, text, uid, index, account, id }) => {
  const xpClassText = () => {
    if (level <= 4) {
      return "text-yellow";
    } else if (level > 4 && level < 10) {
      return "text-orange";
    } else if (level > 9 && level < 15) {
      return "text-pink";
    } else if (level > 14 && level < 20) {
      return "text-blue";
    } else if (level > 19 && level < 24) {
      return "text-green";
    } else {
      return "text-white";
    }
  };

  return id === 1 ? (
    <li className="warning-message">
      <div className="chat-users">
        <div className="d-flex">
          <img
            className="chat_user_img"
            src={photo}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = ClubLogo;
            }}
          />
          &nbsp;
        </div>
        <div>
          <span className="text-green">{name + ": "}</span>
          <span className="chat_cont">{text}</span>
        </div>
      </div>
    </li>
  ) : (
    <li className={index % 2 !== 0 ? "active message" : "message"}>
      <div className="chat-users">
        <NavLink
          to={uid !== "anonymous" ? `/stats/${uid}` : `/stats/${account}`}
        >
          <div className="d-flex">
            <img
              className="chat_user_img"
              src={photo}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = ClubLogo;
              }}
              alt={uid}
            />
            &nbsp;
          </div>
        </NavLink>
        <div>
          <NavLink
            to={uid !== "anonymous" ? `/stats/${uid}` : `/stats/${account}`}
          >
            <CrownLevel userLevel={level} />
            &nbsp;
            <span className={xpClassText()}>
              {uid === "anonymous"
                ? account.substring(0, 5) + "..." + account.substring(38, 42)
                : name}
              {": "}
            </span>
          </NavLink>
          <span className="chat_cont">{text}</span>
        </div>
      </div>
    </li>
  );
};
export default ChatMessage;
