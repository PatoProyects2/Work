import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "./Chart/Chart";
import HistoryGames from "./Info/HistoryGames";
import Level from "./Info/Level";
import CrownLevel from "./Info/CrownLevel";
import RPSStats from "./Info/RPSStats";
import RPSStatsNew from "./Info/RPSStatsNew";
import { useUserGames } from "../../../hooks/firebase/useUserGames";
import { useClubUsers } from "../../../hooks/firebase/useClubUsers";
import ClubLogo from "../../../assets/imgs/Views_Nfts/ClubLogo.png";
import Spinner from "../../../components/Spinner/Spinner";

const DiscordProfile = ({ uid, isMobileResolution }) => {
  const [changeModal, setChangeModal] = useState(false);
  const [register, setRegister] = useState(false);

  const clubUser = useClubUsers(uid);
  const userGames = useUserGames(uid);

  let navigate = useNavigate();

  useEffect(() => {
    if (clubUser === null && userGames.length === 0) {
      navigate("/stats", { replace: true });
    }
  }, [userGames, clubUser]);

  const xpClassText = () => {
    const level = clubUser.level;
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
    if (clubUser) {
      const date = new Date(clubUser.register * 1000);
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
  }, [clubUser]);
  return clubUser ? (
    <div className="profile-container">
      <h3 className="TitleUsuario my-3 text-center">
        {clubUser.name + "#" + clubUser.id} Stats
      </h3>
      <div className="profile-info">
        <div className="profile-info-container">
          <img
            className="rounded-circle profile-img"
            src={clubUser.photo}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = ClubLogo;
            }}
            alt={clubUser.uid}
          />
          <div className="d-flex m-auto mb-2">
            <CrownLevel userLevel={clubUser.level} />
            <span className={xpClassText()}>
              {clubUser.name + "#" + clubUser.id}
            </span>
          </div>
          <Level clubUser={clubUser} />
          <span className="text-white mt-2">User since: {register}</span>
        </div>
        {!isMobileResolution && (
          <div className="profile-stats-container">
            <RPSStats clubUser={clubUser} />
          </div>
        )}
      </div>
      {isMobileResolution && (
        <div className="rps-stats-mobile mt-2">
          <RPSStats clubUser={clubUser} />
        </div>
      )}

      <div className="mt-2">
        <RPSStatsNew
          clubUser={clubUser}
          isMobileResolution={isMobileResolution}
        />

        {userGames.length > 0 ? (
          <>
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
              <Chart clubUser={clubUser} userGames={userGames} />
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
