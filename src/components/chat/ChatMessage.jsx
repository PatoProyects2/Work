import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Modal, ModalBody } from "reactstrap";
import styled from "styled-components";
import { useUserProfile } from "../../hooks/firebase/useUserProfile";
// import { useMatchMedia } from "../../hooks/useMatchMedia";
// import Chart from "../../views/Stats/components/Chart/Chart";
// import RPSStats from "../../views/Stats/components/Info/RPSStats";
// import RPSStatsNew from "../../views/Stats/components/Info/RPSStatsNew";
import CrownLevel from "../../views/Stats/components/Info/CrownLevel";
import Stats from "../../views/Stats/Stats";

const StyledProfile = styled.div`
  width: 100%;
  .TitleUsuario {
    height: 50px;
    display: flex;
    align-items: center;
    color: white;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    font-size: 20px;
    justify-content: center;
    background-color: #554c77;
  }
  .profile-container {
    width: 100%;
  }
  .profile-info {
    display: flex;
    @media (max-width: 992px) {
      width: 200%;
    }
    @media (max-width: 900px) {
      width: 100%;
    }
  }
  .rps-stats-mobile {
    display: flex;
    justify-content: center;
  }
  .statsNew-mobile {
    display: flex;
    justify-content: center;
  }
`;

const ChatMessage = ({ text, uid }) => {
  let navigate = useNavigate();
  // const isMobileResolution = useMatchMedia("(max-width:991px)", false);
  const userProfile = useUserProfile(uid);
  const [stats, setStats] = useState(false);

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
        <>
          <div
            role="button"
            onClick={() => {
              navigate(`/stats/${uid}`), navigate(0);
            }}
          >
            <li className="message d-flex align-items-center mt-2">
              <div className="chat-users">
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
              <div className="chat_cont">{text}</div>
            </li>
          </div>

          {stats && <Stats userProfile={userProfile} />}

          {/* <Modal isOpen={stats} className="chat-userstats-modal" size="xl">
            <ModalBody>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setStats(false)}
                ></button>
              </div>
              <StyledProfile>
                <div className="profile-container">
                  <h3 className="TitleUsuario text-center">
                    {userProfile[0].name + "#" + userProfile[0].id} Stats
                  </h3>
                  <div className="profile-info">
                    <div className="profile-info-container">
                      <img
                        alt={userProfile[0].name}
                        className="rounded-circle profile-img"
                        src={userProfile[0].photo}
                      />
                      <div className="d-flex m-auto">
                        <CrownLevel userLevel={userProfile[0].level} />
                        <span className={xpClassText()}>
                          {userProfile[0].name + "#" + userProfile[0].id}
                        </span>
                      </div>
                    </div>
                    {!isMobileResolution && (
                      <div className="profile-stats-container">
                        <RPSStats clubData={userProfile[0]} />
                      </div>
                    )}
                  </div>
                  {isMobileResolution && (
                    <div className="rps-stats-mobile mt-2">
                      <RPSStats clubData={userProfile[0]} />
                    </div>
                  )}
                  {userProfile[0].rps.gameWon + userProfile[0].rps.gameLoss >
                  0 ? (
                    <div className="mt-2">
                      <RPSStatsNew clubData={userProfile[0]} />
                      <Chart clubData={userProfile[0]} />
                    </div>
                  ) : (
                    <h4 className="text-center mt-2">No games found</h4>
                  )}
                </div>
              </StyledProfile>
            </ModalBody>
          </Modal> */}
        </>
      )}
    </>
  );
};
export default ChatMessage;
