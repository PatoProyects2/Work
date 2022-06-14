import { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import Crown from "../../assets/imgs/Chat Panel/Crown.png";
import Chart from "../../views/Stats/components/Chart/Chart";
import Level from "../../views/Stats/components/Info/Level";
import { useUserProfile } from "../../hooks/firebase/useUserProfile";

const ChatMessage = ({ text, uid }) => {
  const userProfile = useUserProfile(uid);
  const [stats, setStats] = useState(false);
  const [rpsStats, setRpsStats] = useState(true);

  const xpClass = () => {
    const level = userProfile[0].level;
    if (level <= 4) {
      return "xp-user-badge badge-yellow";
    } else if (level > 4 && level < 10) {
      return "xp-user-badge badge-orange";
    } else if (level > 9 && level < 15) {
      return "xp-user-badge badge-pink";
    } else if (level > 14 && level < 20) {
      return "xp-user-badge badge-blue";
    } else if (level > 19 && level < 24) {
      return "xp-user-badge badge-green";
    } else {
      return "xp-user-badge badge-black";
    }
  };

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
      {userProfile && (
        <>
          <div role="button" onClick={() => setStats(true)}>
            <li className="message d-flex align-items-center mt-2">
              <div className="chat-users">
                <div className="d-flex">
                  <img
                    className="chat_user_img"
                    src={userProfile[0].photo}
                    alt={userProfile[0].name}
                  />
                  <div className={xpClass()}>
                    <img src={Crown} alt="Level" />
                    <span>{userProfile[0].level}</span>
                  </div>
                  <span className={xpClassText()}>{userProfile[0].name}:</span>
                </div>
              </div>
              <div className="chat_cont">{text}</div>
            </li>
          </div>
          <Modal isOpen={stats} className="chat-userstats-modal" size="lg">
            <ModalBody>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setStats(false)}
                ></button>
              </div>
              <div className="user-stats-info">
                <div className="user-stats-profile">
                  <img
                    className="rounded-circle user-stats-image"
                    width="100"
                    height="100"
                    src={userProfile[0].photo}
                    alt={name}
                  />
                  <div className="user-stats-lvl">
                    <div className={xpClass()}>
                      <div className="circle">
                        <span>{userProfile[0].level}</span>
                      </div>
                    </div>
                    <span className="chat_user_name">{`${userProfile[0].name}#${userProfile[0].id}`}</span>
                  </div>
                  <div className="w-100 text-center">
                    <Level clubData={userProfile[0]} showLvl={false} />
                  </div>
                </div>
                <div className="user-daily-stats">
                  <h5>USER DAILY RESULTS</h5>
                  <div className="user-daily-stats-container">
                    <div className="game-list-stats">
                      <button
                        onClick={() => setRpsStats(true)}
                        className={`btn-game-stats mt-1 ${rpsStats ? "active" : ""
                          }`}
                      >
                        RPS
                      </button>
                    </div>
                    <div className="game-stats">
                      <div className="row header-row text-center mb-2">
                        <div className="col-4">Win Streak</div>
                        <div className="col-2">Rock</div>
                        <div className="col-3">Paper</div>
                        <div className="col-3">Scissors</div>
                      </div>
                      <div className="row content-row text-center">
                        <div className="col-4">
                          {userProfile[0].rps.topWinStreak}
                        </div>
                        <div className="col-2">{userProfile[0].rps.rock}</div>
                        <div className="col-3">{userProfile[0].rps.paper}</div>
                        <div className="col-3">{userProfile[0].rps.scissors}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {userProfile[0].rps.totalGames > 0 ? (
                <>
                  <div className="user-stats-profit">
                    <div className="d-flex flex-column align-items-center profit-border">
                      <span className="header-row">Wallet</span>
                      <span className="content-row">
                        {userProfile[0].account.substring(0, 5) +
                          "..." +
                          userProfile[0].account.substring(38, 42)}
                      </span>
                    </div>
                    <div className="d-flex flex-column align-items-center profit-border">
                      <span className="header-row">Total Games</span>
                      <span className="content-row">
                        {userProfile[0].rps.totalGames}
                      </span>
                    </div>
                    <div className="d-flex flex-column align-items-center profit-border">
                      <span className="header-row">Total Amount</span>
                      <span className="content-row">
                        {"$" + userProfile[0].rps.totalAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <span className="header-row">Profit</span>
                      <span
                        className={`content-row ${userProfile[0].rps.amountWon -
                          userProfile[0].rps.amountLoss >
                          0
                          ? "profit-plus"
                          : "profit-minus"
                          }`}
                      >
                        {"$" +
                          (
                            userProfile[0].rps.amountWon -
                            userProfile[0].rps.amountLoss
                          ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="chart-user">
                    <Chart clubData={userProfile[0]} />
                  </div>
                </>
              ) : (
                <div className="user-stats-profit">
                  <span>No games found</span>
                </div>
              )}
            </ModalBody>
          </Modal>
        </>
      )}
    </>
  );
};
export default ChatMessage;
