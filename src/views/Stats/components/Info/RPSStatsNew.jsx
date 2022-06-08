import React from 'react'
import styled from 'styled-components'

const RPSStatsNew = ({ userData }) => {

  const StyledStatsNew = styled.div`
      display: flex;
      justify-content: center;    
      width: 100%;
      margin-top: 20px;
      margin-bottom: 20px;

      thead tr th{
        padding-left: 30px;
        padding-right: 30px;
        border-left: 1px solid #554b77; 
      }

      tbody tr td {
        padding-left: 30px;
        padding-right: 30px;
        border-left: 1px solid #554b77; 
      }
  `

  return (
    <StyledStatsNew>
      {userData[0] &&
        <>
          <table className="profile-account-stats" responsive size="">
            <thead>
              <tr>
                <th>Wallet</th>
                <th>Total Games</th>
                <th>Total Amount</th>
                <th>Profit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {userData[0].account.substring(0, 5) + "..." + userData[0].account.substring(38, 42)}
                </td>
                <td>
                  {userData[0].rps.totalGames}
                </td>
                <td>
                  {"$" + userData[0].rps.totalAmount.toFixed(2)}
                </td>
                <td className={`${(userData[0].rps.amountWon - userData[0].rps.amountLoss) > 0 ? "profit-plus" : "profit-minus"}`}>
                  {"$" + (userData[0].rps.amountWon - userData[0].rps.amountLoss).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      }
    </StyledStatsNew>
  );
}

export default RPSStatsNew;