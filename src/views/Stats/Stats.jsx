import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Context } from "../../context/Context";
import { useMatchMedia } from "../../hooks/useMatchMedia";
import Chart from "./components/Chart/Chart";
import HistoryGames from "./components/Info/HistoryGames";
import Level from "./components/Info/Level";
import RPSStats from "./components/Info/RPSStats";
import RPSStatsNew from "./components/Info/RPSStatsNew";
import { useGames } from "../../hooks/firebase/useGames";
import { useProfile } from "../../hooks/firebase/useProfile";

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
  const myGames = useGames();
  const myProfile = useProfile();
  const { discordId } = useContext(Context);
  const [gamesData, setGamesData] = useState(false);
  const isMobileResolution = useMatchMedia("(max-width:700px)", false);

  useEffect(() => {
    if (myGames) {
      const games = myGames.map((game) => {
        const games = {
          id: game.gameId,
          result: game.result,
          amount: game.maticAmount,
          txHash: game.txHash
        }
        return games;
      })
      const orderGames = games.sort((a, b) => b.id - a.id)
      setGamesData(orderGames);
    }
  }, [myGames]);

  return (
    <StyledProfile>
      {discordId !== "" && myProfile ? (
        <div className="profile-container">
          <h3 className="TitleUsuario my-3 text-center">
            {myProfile[0].name + "#" + myProfile[0].id} Stats
          </h3>
          <div className="profile-info">
            <div className="profile-info-container">
              <img
                alt={myProfile[0].name}
                className="rounded-circle profile-img"
                src={myProfile[0].photo}
              />
              <p style={{ textAlign: "center", color: "#ffda5c" }}>
                {myProfile[0].name + "#" + myProfile[0].id}
              </p>
              <Level clubData={myProfile[0]} />
            </div>
            {!isMobileResolution && (
              <div className="profile-stats-container">
                <RPSStats clubData={myProfile[0]} />
              </div>
            )}
          </div>
          {isMobileResolution && (
            <div className="rps-stats-mobile mt-2">
              <RPSStats clubData={myProfile[0]} />
            </div>
          )}

          {!isMobileResolution && (
            <div className="mt-2">
              <RPSStatsNew clubData={myProfile[0]} />
            </div>
          )}

          {isMobileResolution && (
            <div className="statsNew-mobile mt-2">
              <RPSStatsNew clubData={myProfile[0]} />
            </div>
          )}
          {
            gamesData
            &&
            <div className="mt-2">
              <HistoryGames gamesData={gamesData} />
            </div>
          }
          <div className="mt-2">
            <Chart clubData={myProfile[0]} discordId={discordId} />
          </div>
        </div>
      ) : (
        <h2 className="text-center mt-3">Log in with Discord</h2>
      )}
    </StyledProfile>
  );
};

export default Stats;