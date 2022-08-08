import { useState, useEffect } from "react";
import { Table } from "reactstrap";
import TableGames from "./TableGames";
import { useTime } from "../../hooks/useTime";

const Games = ({ isMobileResolution, allGames }) => {
  const [lastGames, setLastGames] = useState(false);
  const unixTime = useTime();

  useEffect(() => {
    if (allGames) {
      const games = allGames.filter((userGame) => userGame.state === "confirmed");
      setLastGames(games.slice(0, 10));
    }
  }, [allGames]);

  return (
    <Table className="tbl-ranking" borderless responsive>
      <thead>
        <tr>
          <th>Game</th>
          <th>Player</th>
          {!isMobileResolution && (
            <>
              <th>Bet</th>
              <th>Result</th>
              <th>Win Streak</th>
            </>
          )}
          <th>Profit</th>
          {!isMobileResolution && <th>Time</th>}
        </tr>
      </thead>
      <tbody>
        {lastGames &&
          lastGames.map((games, index) => (
            <TableGames
              key={games.gameId}
              {...games}
              isMobileResolution={isMobileResolution}
              index={index}
              unixTime={unixTime}
            />
          ))}
      </tbody>
    </Table>
  );
};

export default Games;
