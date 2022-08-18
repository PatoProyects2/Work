import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "./Chart/Chart";
import HistoryGames from "./Info/HistoryGames";
import Level from "./Info/Level";
import CrownLevel from "./Info/CrownLevel";
import RPSStats from "./Info/RPSStats";
import RPSStatsNew from "./Info/RPSStatsNew";
import ClubLogo from "../../../assets/imgs/Views_Nfts/ClubLogo.png";
import Spinner from "../../../components/Spinner/Spinner";

const DiscordProfile = ({ uid, isMobileResolution, clubUsers, allGames }) => {
  const [user, setUser] = useState(false);
  const [games, setGames] = useState(false);
  const [changeModal, setChangeModal] = useState(false);
  const [register, setRegister] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    if (clubUsers.length && allGames.length) {
      setUser(clubUsers.find((user) => user.uid === uid));
      setGames(allGames.filter((game) => game.uid === uid));
    }
  }, [clubUsers, allGames]);

  useEffect(() => {
    if (user === null && games.length === 0) {
      navigate("/stats", { replace: true });
    }
  }, [user, games]);

  const xpClassText = () => {
    const level = user.level;
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

  useEffect(() => {
    if (user) {
      const date = new Date(user.register * 1000);
      var day = date.getDate().toString();
      var month = (date.getMonth() + 1).toString();
      const year = date.getFullYear().toString();

      if (day.length === 1) {
        day = "0" + day;
      }
      if (month.length === 1) {
        month = "0" + month;
      }

      setRegister(`${day}/${month}/${year}`);
    }
  }, [user]);

  return user ? (
    <div className="profile-container">
      <h3 className="TitleUsuario my-3 text-center">
        {user.name + "#" + user.id} Stats
      </h3>
      <div className="profile-info">
        <div className="profile-info-container">
          <img
            className="rounded-circle profile-img"
            src={user.photo}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = ClubLogo;
            }}
            alt={user.uid}
          />
          <div className="d-flex m-auto mb-2">
            <CrownLevel userLevel={user.level} />
            &nbsp;
            <span className={xpClassText()}>{user.name + "#" + user.id}</span>
          </div>
          <Level clubUser={user} />
          <span className="text-white mt-2">User since: {register}</span>
        </div>
        {!isMobileResolution && (
          <div className="profile-stats-container">
            <RPSStats clubUser={user} />
          </div>
        )}
      </div>
      {isMobileResolution && (
        <div className="rps-stats-mobile mt-2">
          <RPSStats clubUser={user} />
        </div>
      )}

      <div className="mt-2">
        <RPSStatsNew clubUser={user} isMobileResolution={isMobileResolution} />

        {games.length > 0 ? (
          <>
            <div className="botones-tabla-stats mt-4 mb-4">
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
              <HistoryGames userGames={games} />
            ) : (
              <Chart clubUser={user} userGames={[...games].reverse()} />
            )}
          </>
        ) : (
          <h3 className="text-center text-white mt-5">No games found</h3>
        )}
      </div>
    </div>
  ) : (
    <div className="d-flex justify-content-center">
      <Spinner />
    </div>
  );
};
export default DiscordProfile;
