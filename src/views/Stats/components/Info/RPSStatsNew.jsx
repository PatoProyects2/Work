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

const RPSStatsNew = ({ clubData }) => {
  return (
    <StyledStatsNew>
      <div className={"table-responsive"}>
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
                {clubData.account.substring(0, 5) +
                  "..." +
                  clubData.account.substring(38, 42)}
              </td>
              <td>{clubData.rps.gameWon + clubData.rps.gameLoss}</td>
              <td>
                {"$" +
                  (
                    clubData.rps.amountWon + clubData.rps.amountLoss
                  ).toFixed(2)}
              </td>
              <td
                className={
                  clubData.rps.amountWon - clubData.rps.amountLoss > 0
                    ? "profit-plus"
                    : "profit-minus"
                }
              >
                {"$" +
                  (
                    clubData.rps.amountWon - clubData.rps.amountLoss
                  ).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </StyledStatsNew>
  );
};

export default RPSStatsNew;
