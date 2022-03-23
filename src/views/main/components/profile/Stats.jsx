import React from 'react'
import { Table } from 'reactstrap'

export default function Stats(props) {

  return (
    <>
      <Table className="tbl-ranking" borderless responsive size="">
        <thead className="border-bottom">
          <tr>
            <th>
              Wallet
            </th>
            <th>
              Games Won
            </th>
            <th>
              Games Loss
            </th>
            <th>
              Total Games
            </th>
            <th>
              Amount Won
            </th>
            <th>
              Amount Loss
            </th>
            <th>
              Total Amount
            </th>
            <th>
              Win Streak
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
          {props.userData[0] ?
            <tr>
              <td>
                {props.userData[0].account.substring(0, 5) + "..." + props.userData[0].account.substring(38, 42)}
              </td>
              <td>
                {props.userData[0].rps.gameWon}
              </td>
              <td>
                {props.userData[0].rps.gameLoss}
              </td>
              <td>
                {props.userData[0].rps.totalGames}
              </td>
              <td>
                {props.userData[0].rps.amountWon}
              </td>
              <td>
                {props.userData[0].rps.amountLoss}
              </td>
              <td>
                {props.userData[0].rps.totalMaticAmount}
              </td>
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
            :
            <tr>
              <td>

              </td>
            </tr>
          }
        </tbody>
      </Table>
    </>
  );
}