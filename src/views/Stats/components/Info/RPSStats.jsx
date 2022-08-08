import styled from "styled-components";
import rps from "../../../../assets/imgs/Home_Page/RPS.png";

const StyledStats = styled.div`
  width: 75%;
  .profile-game-stats {
    border-bottom: 1px solid transparent;
  }

  .item1 {
    width: 25%;
  }

  thead tr th {
    color: #ffda5c;
    border-left: 1px solid #554b77;
    font-weight: 400;
    height: 0px;
    align-items: center;
  }

  .Logo {
    border-left: none;
  }

  .LogoImg {
    width: 75px;
    margin-top: 20px;
    margin-right: 15px;
  }

  tbody tr td {
    border-left: 1px solid #554b77;
  }

  .Vacio {
    border: none;
  }
`;

const RPSStats = ({ clubUser }) => {
  return (
    <StyledStats>
      <table className="profile-game-stats">
        <thead>
          <tr className="tr-profile-text">
            <th className="Logo h1">
              <img src={rps} className="LogoImg" alt="Logo" />
            </th>
            <th className="item1">Top Win Streak</th>
            <th className="item1">Rock</th>
            <th className="item1">Paper</th>
            <th className="item1">Scissors</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="Vacio"></td>
            <td>{clubUser.rps.topWinStreak}</td>
            <td>{clubUser.rps.rock}</td>
            <td>{clubUser.rps.paper}</td>
            <td>{clubUser.rps.scissors}</td>
          </tr>
        </tbody>
      </table>
      <span className="text-center text-white">
        {clubUser.whitelist ? "WHITELISTED" : "NOT WHITELISTED"}
      </span>
    </StyledStats>
  );
};

export default RPSStats;
