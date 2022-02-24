import React from 'react'
export default function MostPlays(props) {

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>
              No #
            </td>
            <td>
              User
            </td>
            <td>
              Most games played
            </td>
          </tr>
        </thead>
        <tbody>
          {props.leaderboardGames[0] ?
            <tr>
              <td>
                1
              </td>
              <td>
                <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboardGames[0].pic}`} />
                {" " + props.leaderboardGames[0].name}
              </td>
              <td>
                {props.leaderboardGames[0].totalGames}
              </td>
            </tr>
            :
            ""}
          {props.leaderboardGames[1] ?
            <tr>
              <td>
                2
              </td>
              <td>
                <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboardGames[1].pic}`} />
                {" " + props.leaderboardGames[1].name}
              </td>
              <td>
                {props.leaderboardGames[1].totalGames}
              </td>
            </tr>
            :
            ""}
          {props.leaderboardGames[2] ?
            <tr>
              <td>
                3
              </td>
              <td>
                <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboardGames[2].pic}`} />
                {" " + props.leaderboardGames[2].name}
              </td>
              <td>
                {props.leaderboardGames[2].totalGames}
              </td>
            </tr>
            :
            ""}
          {props.leaderboardGames[3] ?
            <tr>
              <td>
                4
              </td>
              <td>
                <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboardGames[3].pic}`} />
                {" " + props.leaderboardGames[3].name}
              </td>
              <td>
                {props.leaderboardGames[3].totalGames}
              </td>
            </tr>
            :
            ""}
          {props.leaderboardGames[4] ?
            <tr>
              <td>
                5
              </td>
              <td>
                <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboardGames[4].pic}`} />
                {" " + props.leaderboardGames[4].name}
              </td>
              <td>
                {props.leaderboardGames[4].totalGames}
              </td>
            </tr>
            :
            ""}
          {props.leaderboardGames[5] ?
            <tr>
              <td>
                6
              </td>
              <td>
                <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboardGames[5].pic}`} />
                {" " + props.leaderboardGames[5].name}
              </td>
              <td>
                {props.leaderboardGames[5].totalGames}
              </td>
            </tr>
            :
            ""}
          {props.leaderboardGames[6] ?
            <tr>
              <td>
                7
              </td>
              <td>
                <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboardGames[6].pic}`} />
                {" " + props.leaderboardGames[6].name}
              </td>
              <td>
                {props.leaderboardGames[6].totalGames}
              </td>
            </tr>
            :
            ""}
          {props.leaderboardGames[7] ?
            <tr>
              <td>
                8
              </td>
              <td>
                <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboardGames[7].pic}`} />
                {" " + props.leaderboardGames[7].name}
              </td>
              <td>
                {props.leaderboardGames[7].totalGames}
              </td>
            </tr>
            :
            ""}
          {props.leaderboardGames[8] ?
            <tr>
              <td>
                9
              </td>
              <td>
                <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboardGames[8].pic}`} />
                {" " + props.leaderboardGames[8].name}
              </td>
              <td>
                {props.leaderboardGames[8].totalGames}
              </td>
            </tr>
            :
            ""}
          {props.leaderboardGames[9] ?
            <tr>
              <td>
                10
              </td>
              <td>
                <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboardGames[9].pic}`} />
                {" " + props.leaderboardGames[9].name}
              </td>
              <td>
                {props.leaderboardGames[9].totalGames}
              </td>
            </tr>
            :
            ""}
        </tbody>
      </table>
    </>
  );
}