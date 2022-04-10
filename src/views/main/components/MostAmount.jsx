import React from 'react'
import { Table } from 'reactstrap';

export default function MostAmount(props) {

  return (
    <>
      <Table className='tbl-ranking' borderless responsive>
        <thead>
          <tr>
            <th> Nº</th>
            <th> User </th>
            <th> Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.leaderboard[0] ?
            <tr>
              <td>
                1
              </td>
              <td>
                <img width="25" height="25" className="rounded-circle me-2" alt="" src={`${props.leaderboard[0][1]}`} />
                {props.isMobileResolution ?
                  <>
                    {props.leaderboard[0][2].length > 5
                      ? props.leaderboard[0][2].substring(0, 5) + "..."
                      : props.leaderboard[0][2]
                    }
                  </>
                  :
                  <>
                    {props.leaderboard[0][2].length > 15
                      ? props.leaderboard[0][2].substring(0, 15) + "..."
                      : props.leaderboard[0][2]
                    }
                  </>
                }
              </td>
              <td>
                {"$" + (props.leaderboard[0][4]).toFixed(2)}
              </td>
            </tr>
            :
            <tr>
              <td>

              </td>
            </tr>
          }
          {props.leaderboard[1] ?
            <tr>
              <td>
                2
              </td>
              <td>
                <img width="25" height="25" className="rounded-circle me-2" alt="" src={`${props.leaderboard[1][1]}`} />
                {props.isMobileResolution ?
                  <>
                    {props.leaderboard[1][2].length > 5
                      ? props.leaderboard[1][2].substring(0, 5) + "..."
                      : props.leaderboard[1][2]
                    }
                  </>
                  :
                  <>
                    {props.leaderboard[1][2].length > 15
                      ? props.leaderboard[1][2].substring(0, 15) + "..."
                      : props.leaderboard[1][2]
                    }
                  </>
                }
              </td>
              <td>
                {"$" + (props.leaderboard[1][3]).toFixed(2)}
              </td>
            </tr>
            :
            <tr>
              <td>

              </td>
            </tr>
          }
          {props.leaderboard[2] ?
            <tr>
              <td>
                3
              </td>
              <td>
                <img width="25" height="25" className="rounded-circle me-2" alt="" src={`${props.leaderboard[2][1]}`} />
                {props.isMobileResolution ?
                  <>
                    {props.leaderboard[2][2].length > 5
                      ? props.leaderboard[2][2].substring(0, 5) + "..."
                      : props.leaderboard[2][2]
                    }
                  </>
                  :
                  <>
                    {props.leaderboard[2][2].length > 15
                      ? props.leaderboard[2][2].substring(0, 15) + "..."
                      : props.leaderboard[2][2]
                    }
                  </>
                }
              </td>
              <td>
                {"$" + (props.leaderboard[2][3]).toFixed(2)}
              </td>
            </tr>
            :
            <tr>
              <td>

              </td>
            </tr>
          }
          {props.leaderboard[3] ?
            <tr>
              <td>
                4
              </td>
              <td>
                <img width="25" height="25" className="rounded-circle me-2" alt="" src={`${props.leaderboard[3][1]}`} />
                {props.isMobileResolution ?
                  <>
                    {props.leaderboard[3][2].length > 5
                      ? props.leaderboard[3][2].substring(0, 5) + "..."
                      : props.leaderboard[3][2]
                    }
                  </>
                  :
                  <>
                    {props.leaderboard[3][2].length > 15
                      ? props.leaderboard[3][2].substring(0, 15) + "..."
                      : props.leaderboard[3][2]
                    }
                  </>
                }
              </td>
              <td>
                {"$" + (props.leaderboard[3][3]).toFixed(2)}
              </td>
            </tr>
            :
            <tr>
              <td>

              </td>
            </tr>
          }
          {props.leaderboard[4] ?
            <tr>
              <td>
                5
              </td>
              <td>
                <img width="25" height="25" className="rounded-circle me-2" alt="" src={`${props.leaderboard[4][1]}`} />
                {props.isMobileResolution ?
                  <>
                    {props.leaderboard[4][2].length > 5
                      ? props.leaderboard[4][2].substring(0, 5) + "..."
                      : props.leaderboard[4][2]
                    }
                  </>
                  :
                  <>
                    {props.leaderboard[4][2].length > 15
                      ? props.leaderboard[4][2].substring(0, 15) + "..."
                      : props.leaderboard[4][2]
                    }
                  </>
                }
              </td>
              <td>
                {"$" + (props.leaderboard[4][3]).toFixed(2)}
              </td>
            </tr>
            :
            <tr>
              <td>

              </td>
            </tr>
          }
          {props.leaderboard[5] ?
            <tr>
              <td>
                6
              </td>
              <td>
                <img width="25" height="25" className="rounded-circle me-2" alt="" src={`${props.leaderboard[5][1]}`} />
                {props.isMobileResolution ?
                  <>
                    {props.leaderboard[5][2].length > 5
                      ? props.leaderboard[5][2].substring(0, 5) + "..."
                      : props.leaderboard[5][2]
                    }
                  </>
                  :
                  <>
                    {props.leaderboard[5][2].length > 15
                      ? props.leaderboard[5][2].substring(0, 15) + "..."
                      : props.leaderboard[5][2]
                    }
                  </>
                }
              </td>
              <td>
                {"$" + (props.leaderboard[5][3]).toFixed(2)}
              </td>
            </tr>
            :
            <tr>
              <td>

              </td>
            </tr>
          }
          {props.leaderboard[6] ?
            <tr>
              <td>
                7
              </td>
              <td>
                <img width="25" height="25" className="rounded-circle me-2" alt="" src={`${props.leaderboard[6][1]}`} />
                {props.isMobileResolution ?
                  <>
                    {props.leaderboard[6][2].length > 5
                      ? props.leaderboard[6][2].substring(0, 5) + "..."
                      : props.leaderboard[6][2]
                    }
                  </>
                  :
                  <>
                    {props.leaderboard[6][2].length > 15
                      ? props.leaderboard[6][2].substring(0, 15) + "..."
                      : props.leaderboard[6][2]
                    }
                  </>
                }
              </td>
              <td>
                {"$" + (props.leaderboard[6][3]).toFixed(2)}
              </td>
            </tr>
            :
            <tr>
              <td>

              </td>
            </tr>
          }
          {props.leaderboard[7] ?
            <tr>
              <td>
                8
              </td>
              <td>
                <img width="25" height="25" className="rounded-circle me-2" alt="" src={`${props.leaderboard[7][1]}`} />
                {props.isMobileResolution ?
                  <>
                    {props.leaderboard[7][2].length > 5
                      ? props.leaderboard[7][2].substring(0, 5) + "..."
                      : props.leaderboard[7][2]
                    }
                  </>
                  :
                  <>
                    {props.leaderboard[7][2].length > 15
                      ? props.leaderboard[7][2].substring(0, 15) + "..."
                      : props.leaderboard[7][2]
                    }
                  </>
                }
              </td>
              <td>
                {"$" + (props.leaderboard[7][3]).toFixed(2)}
              </td>
            </tr>
            :
            <tr>
              <td>

              </td>
            </tr>
          }
          {props.leaderboard[8] ?
            <tr>
              <td>
                9
              </td>
              <td>
                <img width="25" height="25" className="rounded-circle me-2" alt="" src={`${props.leaderboard[8][1]}`} />
                {props.isMobileResolution ?
                  <>
                    {props.leaderboard[8][2].length > 5
                      ? props.leaderboard[8][2].substring(0, 5) + "..."
                      : props.leaderboard[8][2]
                    }
                  </>
                  :
                  <>
                    {props.leaderboard[8][2].length > 15
                      ? props.leaderboard[8][2].substring(0, 15) + "..."
                      : props.leaderboard[8][2]
                    }
                  </>
                }
              </td>
              <td>
                {"$" + (props.leaderboard[8][3]).toFixed(2)}
              </td>
            </tr>
            :
            <tr>
              <td>

              </td>
            </tr>
          }
          {props.leaderboard[9] ?
            <tr>
              <td>
                10
              </td>
              <td>
                <img width="25" height="25" className="rounded-circle me-2" alt="" src={`${props.leaderboard[9][1]}`} />
                {props.isMobileResolution ?
                  <>
                    {props.leaderboard[9][2].length > 5
                      ? props.leaderboard[9][2].substring(0, 5) + "..."
                      : props.leaderboard[9][2]
                    }
                  </>
                  :
                  <>
                    {props.leaderboard[9][2].length > 15
                      ? props.leaderboard[9][2].substring(0, 15) + "..."
                      : props.leaderboard[9][2]
                    }
                  </>
                }
              </td>
              <td>
                {"$" + (props.leaderboard[9][3]).toFixed(2)}
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