import React from 'react'
import { Table } from 'reactstrap';

const MostAmount = (props) => {

  return (
    <>
      <Table className='tbl-ranking' borderless responsive>
        <tbody>
          {props.leaderboard.map((user, index) => {
            return (
              <tr key={index}>
                <td>
                  {index + 1}
                </td>
                <td>
                  <img width="25" height="25" className="rounded-circle me-2" alt="" src={`${user[1]}`} />
                  {props.isMobileResolution ?
                    <>
                      {user[2].length > 5
                        ? user[2].substring(0, 5) + "..."
                        : user[2]
                      }
                    </>
                    :
                    <>
                      {user[2].length > 15
                        ? user[2].substring(0, 15) + "..."
                        : user[2]
                      }
                    </>
                  }
                </td>
                <td>
                  {"$" + user[4].toFixed(2)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  );
}

export default MostAmount;