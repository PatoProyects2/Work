import { NavLink } from "react-router-dom";
import { useUserProfile } from "../../hooks/firebase/useUserProfile";
import CrownLevel from "../../views/Stats/components/Info/CrownLevel";

const ChatMessage = ({ text, uid, index }) => {
  const userProfile = useUserProfile(uid);

  const xpClassText = () => {
    const level = userProfile[0].level;
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
    <>
      {userProfile[0] && (
        <li className={index % 2 === 0 ? "active message" : "message"}>
          <NavLink to={`/stats/${uid}`}>
            <div
              className="chat-users"
              role="button"
            >
              <div className="d-flex">
                <img
                  className="chat_user_img"
                  src={userProfile[0].photo}
                  alt={userProfile[0].name}
                />
                <CrownLevel userLevel={userProfile[0].level} />
                <span className={xpClassText()}>{userProfile[0].name}:</span>
              </div>
            </div>
          </NavLink>
          <div className="chat_cont">{text}</div>
        </li>
      )}
    </>
  );
};
export default ChatMessage;
