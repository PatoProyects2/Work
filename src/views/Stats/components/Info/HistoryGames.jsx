import { Table } from "reactstrap";

const HistoryGames = ({ gamesData }) => {
  return (
    <Table borderless responsive>
      <thead>
        <tr>
          <th className="modal-history-games">Id</th>
          <th className="modal-history-games">Result</th>
          <th className="modal-history-games">Amount</th>
        </tr>
      </thead>
      <tbody>
        {gamesData.map((games, index) => {
          return (
            <tr key={index}>
              <td>
                <a
                  href={`https://polygonscan.com/tx/${games.txHash}`}
                  target="_blank"
                >
                  {games.id}
                </a>
              </td>
              <td>
                <span
                  style={{
                    color: games.result ? "mediumseagreen" : "#ca5c7f",
                  }}
                >
                  {games.result ? "doubled " : "bankrupt "}
                </span>
              </td>
              <td>{games.amount}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default HistoryGames;
