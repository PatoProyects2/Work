import React from 'react'
export default function MostAmount(props) {

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
              Most amount played
            </td>
          </tr>
        </thead>
        <tbody>
          {props.leaderboard[0] ?
            <tr>
              <td>
                1
              </td>
              <td>
                <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboard[0][1]}`} />
                {props.leaderboard[0][2] ? " " + props.leaderboard[0][2] : props.leaderboard[0][0].substring(0, 5) + "..." + props.leaderboard[0][0].substring(38, 42)}
              </td>
              <td>
                {props.leaderboard[0][3]}
              </td>
            </tr>
            :
            ""}
          {props.leaderboard[1] ?
            <tr>
              <td>
                1
              </td>
              <td>
                <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboard[1][1]}`} />
                {props.leaderboard[1][2] ? " " + props.leaderboard[1][2] : props.leaderboard[1][0].substring(0, 5) + "..." + props.leaderboard[1][0].substring(38, 42)}
              </td>
              <td>
                {props.leaderboard[1][3]}
              </td>
            </tr>
            :
            ""}
          {props.leaderboard[2] ?
            <tr>
              <td>
                1
              </td>
              <td>
                <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboard[2][1]}`} />
                {props.leaderboard[2][2] ? " " + props.leaderboard[2][2] : props.leaderboard[2][0].substring(0, 5) + "..." + props.leaderboard[2][0].substring(38, 42)}
              </td>
              <td>
                {props.leaderboard[2][3]}
              </td>
            </tr>
            :
            ""}
          {props.leaderboard[3] ?
            <tr>
              <td>
                1
              </td>
              <td>
                <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboard[3][1]}`} />
                {props.leaderboard[3][2] ? " " + props.leaderboard[3][2] : props.leaderboard[3][0].substring(0, 5) + "..." + props.leaderboard[3][0].substring(38, 42)}
              </td>
              <td>
                {props.leaderboard[3][3]}
              </td>
            </tr>
            :
            ""}
          {props.leaderboard[4] ?
            <tr>
              <td>
                1
              </td>
              <td>
                <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboard[4][1]}`} />
                {props.leaderboard[4][2] ? " " + props.leaderboard[4][2] : props.leaderboard[4][0].substring(0, 5) + "..." + props.leaderboard[4][0].substring(38, 42)}
              </td>
              <td>
                {props.leaderboard[4][3]}
              </td>
            </tr>
            :
            ""}
          {props.leaderboard[5] ?
            <tr>
              <td>
                1
              </td>
              <td>
                <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboard[5][1]}`} />
                {props.leaderboard[5][2] ? " " + props.leaderboard[5][2] : props.leaderboard[5][0].substring(0, 5) + "..." + props.leaderboard[5][0].substring(38, 42)}
              </td>
              <td>
                {props.leaderboard[5][3]}
              </td>
            </tr>
            :
            ""}
          {props.leaderboard[6] ?
            <tr>
              <td>
                1
              </td>
              <td>
                <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboard[6][1]}`} />
                {props.leaderboard[6][2] ? " " + props.leaderboard[6][2] : props.leaderboard[6][0].substring(0, 5) + "..." + props.leaderboard[6][0].substring(38, 42)}
              </td>
              <td>
                {props.leaderboard[6][3]}
              </td>
            </tr>
            :
            ""}
          {props.leaderboard[7] ?
            <tr>
              <td>
                1
              </td>
              <td>
                <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboard[7][1]}`} />
                {props.leaderboard[7][2] ? " " + props.leaderboard[7][2] : props.leaderboard[7][0].substring(0, 5) + "..." + props.leaderboard[7][0].substring(38, 42)}
              </td>
              <td>
                {props.leaderboard[7][3]}
              </td>
            </tr>
            :
            ""}
          {props.leaderboard[8] ?
            <tr>
              <td>
                1
              </td>
              <td>
                <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboard[8][1]}`} />
                {props.leaderboard[8][2] ? " " + props.leaderboard[8][2] : props.leaderboard[8][0].substring(0, 5) + "..." + props.leaderboard[8][0].substring(38, 42)}
              </td>
              <td>
                {props.leaderboard[8][3]}
              </td>
            </tr>
            :
            ""}
          {props.leaderboard[9] ?
            <tr>
              <td>
                1
              </td>
              <td>
                <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboard[9][1]}`} />
                {props.leaderboard[9][2] ? " " + props.leaderboard[9][2] : props.leaderboard[9][0].substring(0, 5) + "..." + props.leaderboard[9][0].substring(38, 42)}
              </td>
              <td>
                {props.leaderboard[9][3]}
              </td>
            </tr>
            :
            ""}
        </tbody>
      </table>
    </>
  );
}