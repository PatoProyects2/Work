import styled from "styled-components";
const StyledStatsNew = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;

  thead tr th {
    padding-left: 30px;
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
`;

const RPSStatsNew = ({ clubData, isMobileResolution }) => {
  return (
    <StyledStatsNew>
      <div className={isMobileResolution ? "table-responsive": ""}>
        <table>
          <thead>
            <tr>
              <th>Wallet</th>
              <th>Total Games</th>
              {
                !isMobileResolution &&
                <>
                  <th>Total Amount</th>
                  <th>Profit</th>
                </>
              }
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {clubData.account.substring(0, 5) + "..." + clubData.account.substring(38, 42)}
              </td>
              <td>
                {clubData.rps.gameWon + clubData.rps.gameLoss}
              </td>
              {
                !isMobileResolution &&
                <>
                  <td>
                    {"$" + (clubData.rps.amountWon + clubData.rps.amountLoss).toFixed(2)}
                  </td>
                  <td className={clubData.rps.amountWon - clubData.rps.amountLoss > 0 ? "profit-plus" : "profit-minus"}>
                    {"$" + (clubData.rps.amountWon - clubData.rps.amountLoss).toFixed(2)}
                  </td>
                </>
              }
            </tr>
          </tbody>
        </table>
      </div>
    </StyledStatsNew >
  );
};

export default RPSStatsNew;
