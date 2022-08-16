import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ClubLogo from "../../../../assets/imgs/Views_Nfts/ClubLogo.png";
import PolygonLogo from "../../../../assets/imgs/Nav_Bar/polygon.png";

const TableGames = ({
  uid,
  result,
  streak,
  coinAmount,
  coin,
  amount,
  createdAt,
  game,
  account,
  isMobileResolution,
  index,
  photo,
  name,
  unixTime,
}) => {
  const [gameTime, setGameTime] = useState(false);

  useEffect(() => {
    const second = unixTime - createdAt;
    const day = Math.floor(second / (24 * 3600));
    const hour = Math.floor((second - day * 24 * 3600) / 3600);
    const minute = Math.floor((second - day * 24 * 3600 - hour * 3600) / 60);
    setGameTime({ day, hour, minute, second });
  }, [createdAt, unixTime]);

  return (
    gameTime && (
      <tr className={index % 2 === 0 ? "table-selected" : ""}>
        <td>
          <span style={{ color: "ffe869" }}>{game}</span>
        </td>
        <td>
          <NavLink
            to={uid !== "anonymous" ? `/stats/${uid}` : `/stats/${account}`}
          >
            <img
              width="25"
              height="25"
              className="rounded-circle me-2"
              src={photo}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = ClubLogo;
              }}
              alt={uid}
            />
            <span style={{ color: "#ffe869" }}>
              {uid !== "anonymous" && name ? (
                isMobileResolution ? (
                  name.length > 9 ? (
                    name.substring(0, 9) + "..."
                  ) : (
                    name
                  )
                ) : name.length > 13 ? (
                  name.substring(0, 13) + "..."
                ) : (
                  name
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
            <td>
              {coinAmount}
              <img
                className="ms-2"
                src={coin === "MATIC" ? PolygonLogo : PolygonLogo}
                width="25"
                height="25"
                alt="polygon"
              />
            </td>
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
