import React from "react";
import { NavLink } from "react-router-dom";
import { Table } from "reactstrap";
import ClubLogo from "../../../../assets/imgs/Views_Nfts/ClubLogo.png";

const MostAmount = (props) => {
  return (
    <Table className="tbl-ranking" borderless responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Player</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {props.leaderboard.map((user, index) => {
          return (
            <tr key={index} className={index % 2 === 0 ? "table-selected" : ""}>
              <td>{index + 1}</td>
              <td>
                <NavLink to={`/stats/${user.uid}`}>
                  <img
                    width="25"
                    height="25"
                    className="rounded-circle me-2"
                    alt=""
                    src={user.photo}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = ClubLogo;
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
              <td>{"$" + user.amount.toFixed(2)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default MostAmount;
