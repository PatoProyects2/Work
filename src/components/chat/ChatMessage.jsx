import { NavLink } from "react-router-dom";
import CrownLevel from "../../views/Stats/components/Info/CrownLevel";
import ClubLogo from "../../assets/imgs/Views_Nfts/ClubLogo.png";

const ChatMessage = ({
  name,
  photo,
  level,
  text,
  uid,
  index,
  setShowChat,
  account,
}) => {
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

  return (
    <li className={index % 2 === 0 ? "active message" : "message"}>
      <NavLink
        to={uid !== "anonymous" ? `/stats/${uid}` : `/stats/${account}`}
        onClick={() => setShowChat(false)}
      >
        <div className="chat-users" role="button">
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
            <CrownLevel userLevel={level} />
            <span className={xpClassText()}>
              {uid === "anonymous"
                ? account.substring(0, 5) + "..." + account.substring(38, 42)
                : name}
              :
            </span>
          </div>
        </div>
      </NavLink>
      <div className="chat_cont">{text}</div>
    </li>
  );
};
export default ChatMessage;
