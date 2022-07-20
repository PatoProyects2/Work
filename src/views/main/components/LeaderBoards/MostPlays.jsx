import React from "react";
import { NavLink } from "react-router-dom";
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
        {props.leaderboard.map((user, index) => {
          return (
            <tr key={index} className={index % 2 === 0 ? "table-selected" : ""}>
              <td>{index + 1}</td>
              <td role="button">
                <NavLink to={`/stats/${user.uid}`}>
                  <img
                    width="25"
                    height="25"
                    className="rounded-circle me-2"
                    alt=""
                    src={user.photo}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src =
                        "https://firebasestorage.googleapis.com/v0/b/rpsgame-c4a38.appspot.com/o/profile%2FClubLogo.png?alt=media&token=7d14512f-c4a8-400f-a7ca-413239add111";
                    }}
                  />
                  <span style={{ color: "#ffe869" }}>
                    {props.isMobileResolution
                      ? user.name.length > 9
                        ? user.name.substring(0, 9) + "..."
                        : user.name
                      : user.name.length > 13
                      ? user.name.substring(0, 13) + "..."
                      : user.name}
                  </span>
                </NavLink>
              </td>
              <td>{user.game}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default MostPlays;
