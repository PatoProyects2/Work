import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTime } from "../../hooks/useTime";
import { useUserProfile } from "../../hooks/firebase/useUserProfile";

const TableGames = ({
  uid,
  result,
  streak,
  maticAmount,
  amount,
  createdAt,
  game,
  account,
  isMobileResolution,
  index,
}) => {
  const unixTime = useTime();
  const userProfile = uid !== "anonymous" ? useUserProfile(uid) : true;
  const [gameTime, setGameTime] = useState(false);

  useEffect(() => {
    const second = unixTime - createdAt;
    const day = Math.floor(second / (24 * 3600));
    const hour = Math.floor((second - day * 24 * 3600) / 3600);
    const minute = Math.floor((second - day * 24 * 3600 - hour * 3600) / 60);
    setGameTime({ day, hour, minute, second });
  }, [createdAt, unixTime]);

  return (
    userProfile &&
    gameTime && (
      <tr className={index % 2 === 0 ? "table-selected" : ""}>
        <td>
          <span style={{ color: "ffe869" }}>{game}</span>
        </td>
        <td>
          <NavLink
            style={{ pointerEvents: uid !== "anonymous" ? "" : "none" }}
            to={`/stats/${uid}`}
          >
            <img
              width="25"
              height="25"
              className="rounded-circle me-2"
              alt=""
              src={
                uid !== "anonymous" && userProfile[0]
                  ? userProfile[0].photo
                  : "https://firebasestorage.googleapis.com/v0/b/games-club-dce4d.appspot.com/o/ClubLogo.png?alt=media&token=5dd64484-c99f-4ce9-a06b-0a3ee112b37b"
              }
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src =
                  "https://firebasestorage.googleapis.com/v0/b/rpsgame-c4a38.appspot.com/o/profile%2FClubLogo.png?alt=media&token=7d14512f-c4a8-400f-a7ca-413239add111";
              }}
            />
            <span style={{ color: "#ffe869" }}>
              {uid !== "anonymous" && userProfile[0] ? (
                isMobileResolution ? (
                  userProfile[0].name.length > 9 ? (
                    userProfile[0].name.substring(0, 9) + "..."
                  ) : (
                    userProfile[0].name
                  )
                ) : userProfile[0].name.length > 13 ? (
                  userProfile[0].name.substring(0, 13) + "..."
                ) : (
                  userProfile[0].name
                )
              ) : isMobileResolution ? (
                <span style={{ color: "#ffe869" }}>
                  {account.substring(0, 5) + "..."}
                </span>
              ) : (
                <span style={{ color: "#ffe869" }}>
                  {account.substring(0, 5) + "..." + account.substring(38, 42)}
                </span>
              )}
            </span>
          </NavLink>
        </td>
        {!isMobileResolution && (
          <>
            <td>{maticAmount}</td>
            <td>
              <span className={result ? "profit-plus" : "profit-minus"}>
                {result ? "doubled " : "bankrupt "}
              </span>
            </td>
            <td>{streak}</td>
          </>
        )}
        <td>
          <span className={result ? "profit-plus" : "profit-minus"}>
            {result ? "$" + amount.toFixed(2) : "-$" + amount.toFixed(2)}
          </span>
        </td>
        {!isMobileResolution && (
          <td>
            <small className="ms-auto me-2">
              {gameTime.second < 0 || (gameTime.second === 0 && "now")}
              {gameTime.second > 0 &&
                gameTime.second < 60 &&
                gameTime.second + " seconds ago"}
              {gameTime.second > 59 &&
                gameTime.second < 120 &&
                gameTime.minute + " minute ago"}
              {gameTime.second > 119 &&
                gameTime.second < 3600 &&
                gameTime.minute + " minutes ago"}
              {gameTime.second > 3599 &&
                gameTime.second < 7200 &&
                gameTime.hour + " hour ago"}
              {gameTime.second > 7199 &&
                gameTime.second < 86400 &&
                gameTime.hour + " hours ago"}
              {gameTime.second > 86399 &&
                gameTime.second < 172800 &&
                gameTime.day + " day ago"}
              {gameTime.second > 172799 && gameTime.day + " days ago"}
            </small>
          </td>
        )}
      </tr>
    )
  );
};

export default TableGames;
