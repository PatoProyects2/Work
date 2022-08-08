import { Table } from "reactstrap";
import PolygonLogo from "../../../../assets/imgs/Nav_Bar/polygon.png";

const HistoryGames = ({ userGames }) => {
  return (
    <Table borderless responsive>
      <thead>
        <tr>
          <th className="modal-history-games">Id</th>
          <th className="modal-history-games">Result</th>
          <th className="modal-history-games">USD Amount</th>
          <th className="modal-history-games">Bet</th>
          <th className="modal-history-games">Profit</th>
        </tr>
      </thead>
      <tbody>
        {userGames.map((game, index) => {
          return (
            <tr key={index}>
              <td>
                <a
                  href={`https://polygonscan.com/tx/${game.txHash}`}
                  target="_blank"
                >
                  {game.gameId}
                </a>
              </td>
              <td>
                <span className={game.result ? "profit-plus" : "profit-minus"}>
                  {game.result ? "doubled " : "bankrupt "}
                </span>
              </td>
              <td>{"$" + game.amount}</td>
              <td>
                <span>{game.coinAmount + " "}</span>
                <img
                  className="mb-1"
                  src={game.coin === "MATIC" ? PolygonLogo : PolygonLogo}
                  width="25"
                  height="25"
                  alt="polygon"
                />
              </td>
              <td>
                <span
                  className={game.profit >= 0 ? "profit-plus" : "profit-minus"}
                >
                  {game.profit >= 0
                    ? "$" + game.profit.toFixed(2)
                    : "-$" +
                      (game.profit.toFixed(2) - game.profit.toFixed(2) * 2)}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default HistoryGames;
