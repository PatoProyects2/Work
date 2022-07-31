import { useState, useEffect } from "react";
import { Table } from "reactstrap";
import TableGames from "./TableGames";

const Games = ({ isMobileResolution, liveGames }) => {
  const [unixTime, setUnixTime] = useState(0);
  const [lastGames, setLastGames] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setUnixTime(Math.round(new Date().getTime() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [unixTime]);

  useEffect(() => {
    if (liveGames) {
      setLastGames(liveGames.slice(0, 10));
    }
  }, [liveGames]);
  return (
    <Table className="tbl-ranking" borderless responsive>
      <thead>
        <tr>
          <th>Game</th>
          <th>Player</th>
          {!isMobileResolution && (
            <>
              <th>Amount</th>
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
