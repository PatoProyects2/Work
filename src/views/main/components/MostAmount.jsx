import React, { useState, useEffect } from 'react'
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
            {props.leaderboardAmount[0] ?
              <tr>
                <td>
                  1
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboardAmount[0].pic}`} />
                  {" " + props.leaderboardAmount[0].name}
                </td>
                <td>
                  {props.leaderboardAmount[0].totalMaticAmount}
                </td>
              </tr>
              :
              ""}
            {props.leaderboardAmount[1] ?
              <tr>
                <td>
                  2
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboardAmount[1].pic}`} />
                  {" " + props.leaderboardAmount[1].name}
                </td>
                <td>
                  {props.leaderboardAmount[1].totalMaticAmount}
                </td>
              </tr>
              :
              ""}
            {props.leaderboardAmount[2] ?
              <tr>
                <td>
                  3
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboardAmount[2].pic}`} />
                  {" " + props.leaderboardAmount[2].name}
                </td>
                <td>
                  {props.leaderboardAmount[2].totalMaticAmount}
                </td>
              </tr>
              :
              ""}
            {props.leaderboardAmount[3] ?
              <tr>
                <td>
                  4
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboardAmount[3].pic}`} />
                  {" " + props.leaderboardAmount[3].name}
                </td>
                <td>
                  {props.leaderboardAmount[3].totalMaticAmount}
                </td>
              </tr>
              :
              ""}
            {props.leaderboardAmount[4] ?
              <tr>
                <td>
                  5
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboardAmount[4].pic}`} />
                  {" " + props.leaderboardAmount[4].name}
                </td>
                <td>
                  {props.leaderboardAmount[4].totalMaticAmount}
                </td>
              </tr>
              :
              ""}
            {props.leaderboardAmount[5] ?
              <tr>
                <td>
                  6
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboardAmount[5].pic}`} />
                  {" " + props.leaderboardAmount[5].name}
                </td>
                <td>
                  {props.leaderboardAmount[5].totalMaticAmount}
                </td>
              </tr>
              :
              ""}
            {props.leaderboardAmount[6] ?
              <tr>
                <td>
                  7
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboardAmount[6].pic}`} />
                  {" " + props.leaderboardAmount[6].name}
                </td>
                <td>
                  {props.leaderboardAmount[6].totalMaticAmount}
                </td>
              </tr>
              :
              ""}
            {props.leaderboardAmount[7] ?
              <tr>
                <td>
                  8
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboardAmount[7].pic}`} />
                  {" " + props.leaderboardAmount[7].name}
                </td>
                <td>
                  {props.leaderboardAmount[7].totalMaticAmount}
                </td>
              </tr>
              :
              ""}
            {props.leaderboardAmount[8] ?
              <tr>
                <td>
                  9
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboardAmount[8].pic}`} />
                  {" " + props.leaderboardAmount[8].name}
                </td>
                <td>
                  {props.leaderboardAmount[8].totalMaticAmount}
                </td>
              </tr>
              :
              ""}
            {props.leaderboardAmount[9] ?
              <tr>
                <td>
                  10
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${props.leaderboardAmount[9].pic}`} />
                  {" " + props.leaderboardAmount[9].name}
                </td>
                <td>
                  {props.leaderboardAmount[9].totalMaticAmount}
                </td>
              </tr>
              :
              ""}
          </tbody>
        </table>
    </>
  );
}