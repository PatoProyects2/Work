import React from 'react'
import { Table } from 'reactstrap'

export default function Stats({ userData }) {
  return (
    <>
      {userData[0] &&
        <>
          <Table className="profile-game-stats" responsive size="">
            <thead>
              <tr>
                <th>Day Streak</th>
                <th>Rock</th>
                <th>Paper</th>
                <th>Scissors</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {userData[0].rps.dayWinStreak}
                </td>
                <td>
                  {userData[0].rps.rock}
                </td>
                <td>
                  {userData[0].rps.paper}
                </td>
                <td>
                  {userData[0].rps.scissors}
                </td>
              </tr>
            </tbody>
          </Table>
          <Table className="profile-account-stats" responsive size="">
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
          </Table>
        </>
      }
    </>
  );
}