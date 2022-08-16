import styled from "styled-components";
const StyledStatsNew = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;

  thead tr th {
    padding-left: 30px;
    color: #ffda5c;
    padding-right: 30px;
    border-left: 1px solid #554b77;
    @media (max-width: 700px) {
      border-left: none;
    }
  }

  tbody tr td {
    padding-left: 30px;
    padding-right: 30px;
    border-left: 1px solid #554b77;
    @media (max-width: 700px) {
      border-left: none;
      border-bottom: 1px solid #554b77;
    }
  }

  .table-responsive {
    display: grid;
    align-items: center;
    gap: 40px;
    border: none;
  }
  .wallet-info-text {
    border-left: 1px solid transparent;
  }
`;

const RPSStatsNew = ({ clubUser }) => {
  const account = clubUser.account[0];
  const games = clubUser.rps.gameWon + clubUser.rps.gameLoss;
  const amount = clubUser.rps.amountWon + clubUser.rps.amountLoss;
  const profit = clubUser.rps.amountWon - clubUser.rps.amountLoss;

  return (
    <StyledStatsNew>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th className="wallet-info-text">Wallet</th>
              <th>Total Games</th>
              <th>Total Amount</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="wallet-info-text">
                {account.substring(0, 5) + "..." + account.substring(38, 42)}
              </td>
              <td>{games}</td>
              <td>{"$" + amount.toFixed(2)}</td>
              <td className={profit >= 0 ? "profit-plus" : "profit-minus"}>
                {profit >= 0
                  ? "$" + profit.toFixed(2)
                  : "-$" + (profit.toFixed(2) - profit.toFixed(2) * 2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </StyledStatsNew>
  );
};

export default RPSStatsNew;
