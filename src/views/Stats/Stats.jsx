import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useUserGames } from "../../hooks/firebase/useUserGames";
import { useUserProfile } from "../../hooks/firebase/useUserProfile";
import { useMatchMedia } from "../../hooks/useMatchMedia";
import Chart from "./components/Chart/Chart";
import HistoryGames from "./components/Info/HistoryGames";
import Level from "./components/Info/Level";
import CrownLevel from "./components/Info/CrownLevel";
import RPSStats from "./components/Info/RPSStats";
import RPSStatsNew from "./components/Info/RPSStatsNew";

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

const Stats = () => {
  const [gamesData, setGamesData] = useState(false);
  const [changeModal, setChangeModal] = useState(false);
  const isMobileResolution = useMatchMedia("(max-width:700px)", false);

  const userStorage = window.localStorage.getItem("user");
  const { uid } = useParams();

  var discordId = "";
  if (userStorage) {
    discordId = JSON.parse(userStorage).id;
  }

  var userGames = useUserGames(uid ? uid : discordId);
  var userProfile = useUserProfile(uid ? uid : discordId);

  const handleChangeModal = () => {
    setChangeModal(!changeModal);
  };

  useEffect(() => {
    if (userGames[0]) {
      const gameData = userGames.map((game) => {
        const data = {
          id: game.gameId,
          result: game.result,
          amount: game.maticAmount,
          txHash: game.txHash,
        };
        return data;
      });
      const orderGames = gameData.sort((a, b) => b.id - a.id);
      setGamesData(orderGames);
    }
  }, [userGames, uid]);

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
    <StyledProfile>
      {userProfile && (
        <div className="profile-container">
          <h3 className="TitleUsuario my-3 text-center">
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
              <Level clubData={userProfile[0]} />
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
          {gamesData ? (
            <div className="mt-2">
              <RPSStatsNew
                clubData={userProfile[0]}
                isMobileResolution={isMobileResolution}
              />
              <div className="botones-tabla mt-4 mb-4">
                <div className="botones-tipos">
                  <button
                    onClick={handleChangeModal}
                    disabled={!changeModal}
                    className={
                      changeModal ? "btn-rango-left" : "active btn-rango-left"
                    }
                  >
                    Chart
                  </button>
                  <button
                    onClick={handleChangeModal}
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
                <HistoryGames gamesData={gamesData} />
              ) : (
                <Chart clubData={userProfile[0]} />
              )}
            </div>
          ) : (
            <h2 className="text-center mt-2">No games found</h2>
          )}
        </div>
      )}
      {discordId === "" && !uid && (
        <h2 className="text-center mt-3">Log in with discord</h2>
      )}
      {uid && !userProfile && <h2 className="text-center mt-3">Loading...</h2>}
    </StyledProfile>
  );
};

export default Stats;
