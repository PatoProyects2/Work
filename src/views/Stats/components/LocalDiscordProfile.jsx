import { useState } from "react";
import Chart from "./Chart/Chart";
import HistoryGames from "./Info/HistoryGames";
import Level from "./Info/Level";
import CrownLevel from "./Info/CrownLevel";
import RPSStats from "./Info/RPSStats";
import RPSStatsNew from "./Info/RPSStatsNew";
import { useUserGames } from "../../../hooks/firebase/useUserGames";
import ClubLogo from "../../../assets/imgs/Views_Nfts/ClubLogo.png";
import Spinner from "../../../components/Spinner/Spinner";

const LocalDiscordProfile = ({ playerDocument, isMobileResolution }) => {
  const [changeModal, setChangeModal] = useState(false);

  var userGames = useUserGames(playerDocument.uid);

  const xpClassText = () => {
    const level = playerDocument.level;
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
      return "text-red";
    }
  };
  return playerDocument ? (
    <div className="profile-container">
      <h3 className="TitleUsuario my-3 text-center">
        {playerDocument.name + "#" + playerDocument.id} Stats
      </h3>
      <div className="profile-info">
        <div className="profile-info-container">
          <img
            className="rounded-circle profile-img"
            src={playerDocument.photo}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = ClubLogo;
            }}
            alt={playerDocument.uid}
          />
          <div className="d-flex m-auto">
            <CrownLevel userLevel={playerDocument.level} />
            <span className={xpClassText()}>
              {playerDocument.name + "#" + playerDocument.id}
            </span>
          </div>
          <Level clubData={playerDocument} />
        </div>
        {!isMobileResolution && (
          <div className="profile-stats-container">
            <RPSStats clubData={playerDocument} />
          </div>
        )}
      </div>
      {isMobileResolution && (
        <div className="rps-stats-mobile mt-2">
          <RPSStats clubData={playerDocument} />
        </div>
      )}

      {userGames.length > 0 ? (
        <div className="mt-2">
          <RPSStatsNew
            clubData={playerDocument}
            isMobileResolution={isMobileResolution}
          />
          <div className="botones-tabla mt-4 mb-4">
            <div className="botones-tipos">
              <button
                onClick={() => setChangeModal(!changeModal)}
                disabled={!changeModal}
                className={
                  changeModal ? "btn-rango-left" : "active btn-rango-left"
                }
              >
                Chart
              </button>
              <button
                onClick={() => setChangeModal(!changeModal)}
                disabled={changeModal}
                className={
                  changeModal ? "active btn-rango-right" : "btn-rango-right"
                }
              >
                Games
              </button>
            </div>
          </div>
          {changeModal ? (
            <HistoryGames userGames={userGames} />
          ) : (
            <Chart clubData={playerDocument} userGames={userGames} />
          )}
        </div>
      ) : (
        <h2 className="text-center text-white mt-5">No games found</h2>
      )}
    </div>
  ) : (
    <div className="d-flex justify-content-center">
      <Spinner />
    </div>
  );
};
export default LocalDiscordProfile;
