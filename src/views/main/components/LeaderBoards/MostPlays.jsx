import React from "react";
import { Table } from "reactstrap";

const MostPlays = (props) => {
  return (
    <Table className="tbl-ranking" borderless responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Player</th>
          <th>Plays</th>
        </tr>
      </thead>
      <tbody>
        {
          props.leaderboard.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    width="25"
                    height="25"
                    className="rounded-circle me-2"
                    alt=""
                    src={user.photo}
                  />
                  {props.isMobileResolution
                    ? user.name.length > 9
                      ? user.name.substring(0, 9) + "..."
                      : user.name
                    : user.name.length > 13
                      ? user.name.substring(0, 13) + "..."
                      : user.name
                  }
                </td>
                <td>{user.game}</td>
              </tr>
            );
          })
        }
      </tbody>
    </Table>
  );
};

export default MostPlays;
