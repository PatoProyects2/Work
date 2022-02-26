import React from 'react'
export default function Stats(props) {

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>
              Wallet
            </td>
            <td>
              Games Won
            </td>
            <td>
              Games Loss
            </td>
            <td>
              Total Games
            </td>
            <td>
              Amount Won
            </td>
            <td>
              Amount Loss
            </td>
            <td>
              Total Amount
            </td>
            <td>
              Win Streak
            </td>
            <td>
              Rock
            </td>
            <td>
              Paper
            </td>
            <td>
              Scissors
            </td>
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
                {props.userData[0].rps.winStreak}
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
            ""}
          {props.userData[1] ?
            <tr>
              <td>
                {props.userData[1].account.substring(0, 5) + "..." + props.userData[1].account.substring(38, 42)}
              </td>
              <td>
                {props.userData[1].rps.gameWon}
              </td>
              <td>
                {props.userData[1].rps.gameLoss}
              </td>
              <td>
                {props.userData[1].rps.totalGames}
              </td>
              <td>
                {props.userData[1].rps.amountWon}
              </td>
              <td>
                {props.userData[1].rps.amountLoss}
              </td>
              <td>
                {props.userData[1].rps.totalMaticAmount}
              </td>
              <td>
                {props.userData[1].rps.winStreak}
              </td>
              <td>
                {props.userData[1].rps.rock}
              </td>
              <td>
                {props.userData[1].rps.paper}
              </td>
              <td>
                {props.userData[1].rps.scissors}
              </td>
            </tr>
            :
            ""}
          {props.userData[2] ?
            <tr>
              <td>
                {props.userData[2].account.substring(0, 5) + "..." + props.userData[2].account.substring(38, 42)}
              </td>
              <td>
                {props.userData[2].rps.gameWon}
              </td>
              <td>
                {props.userData[2].rps.gameLoss}
              </td>
              <td>
                {props.userData[2].rps.totalGames}
              </td>
              <td>
                {props.userData[2].rps.amountWon}
              </td>
              <td>
                {props.userData[2].rps.amountLoss}
              </td>
              <td>
                {props.userData[2].rps.totalMaticAmount}
              </td>
              <td>
                {props.userData[2].rps.winStreak}
              </td>
              <td>
                {props.userData[2].rps.rock}
              </td>
              <td>
                {props.userData[2].rps.paper}
              </td>
              <td>
                {props.userData[2].rps.scissors}
              </td>
            </tr>
            :
            ""}
        </tbody>
      </table>
    </>
  );
}