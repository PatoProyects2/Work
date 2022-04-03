import React from 'react'
import { Table } from 'reactstrap'
import Chart from './Chart'
export default function Stats(props) {
  return (
    <>
      {props.userData[0] &&
        <>
          <Table className="tbl-ranking" borderless responsive size="">
            <thead className="border-bottom">
              <tr>
                <th>
                  Day Streak
                </th>
                <th>
                  Rock
                </th>
                <th>
                  Paper
                </th>
                <th>
                  Scissors
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {props.userData[0].rps.dayWinStreak}
                </td>
                <td>
                  {props.userData[0].rps.rock}
                </td>
                <td>
                  {props.userData[0].rps.paper}
                </td>
                <td>
                  {props.userData[0].rps.scissors}
                </td>
              </tr>
            </tbody>
          </Table>
          <Table className="tbl-ranking" borderless responsive size="">
            <thead className="border-bottom">
              <tr>
                <th>
                  Wallet
                </th>
                <th>
                  Total Games
                </th>
                <th>
                  Total Amount
                </th>
                <th>
                  Profit
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {props.userData[0].account.substring(0, 5) + "..." + props.userData[0].account.substring(38, 42)}
                </td>
                <td>
                  {props.userData[0].rps.totalGames}
                </td>
                <td>
                  {"$" + props.userData[0].rps.totalAmount}
                </td>
                <td>
                  {"$" + (props.userData[0].rps.amountWon - props.userData[0].rps.amountLoss).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </Table>
          <Chart userData={props.userData[0]} />
        </>
      }
    </>
  );
}