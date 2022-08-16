import { useState, useEffect } from "react";
import { Table } from "reactstrap";
import TableGames from "./TableGames";

const Games = ({ isMobileResolution, allGames }) => {
  const [unixTime, setUnixTime] = useState(false);

  useEffect(() => {
    getUnixTime();
  }, [allGames]);

  const getUnixTime = () => {
    setUnixTime(Math.round(new Date().getTime() / 1000));
  };

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
        {allGames.length > 0 &&
          allGames.map((games, index) => (
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
