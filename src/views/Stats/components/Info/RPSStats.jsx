import styled from "styled-components";

const StyledStats = styled.div`
.profile-game-stats {
  border-bottom: 1px solid transparent;   
}

thead tr th {
  color: #ffda5c;
  border-left: 1px solid #554b77; 
  vertical-align: middle;
  padding: 10px;
  font-weight: 400;
}

.Logo {      
  vertical-align: middle;
  padding-right: 20px;
  margin-top: 50%;
      display: flex;
      justify-content: flex-start;
      color: #f1cf61;
      text-shadow:
          1px 4px black;
          0px 2px black,
          2px 3px black, 
          1px 4px black;
      text-shadow: 3px 0 0 black, 
                  2px 4px 0 black, 
                  0 2px 0 black, 
                  0 -2px 0 black, 
                  1px 1px black, 
                  -1px -1px 0 black, 
                  1px -1px 0 black, 
                  -1px 1px 0 black;    
      letter-spacing: -2px;

      @media (max-width: 840px) {
        margin-left: 10px;
        margin-top: 50%;
      }
}

tbody tr td {
  border-left: 1px solid #554b77; 
}

.Vacio {
  border: none;
}

`;

const RPSStats = ({ clubData }) => {
  return (
    <StyledStats>
      <table className="profile-game-stats">
        <thead>
          <tr>
            <th className="Logo h1">RPS</th>
            <th>Top Win Streak</th>
            <th>Rock</th>
            <th>Paper</th>
            <th>Scissors</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="Vacio"></td>
            <td>{clubData.rps.topWinStreak}</td>
            <td>{clubData.rps.rock}</td>
            <td>{clubData.rps.paper}</td>
            <td>{clubData.rps.scissors}</td>
          </tr>
        </tbody>
      </table>
    </StyledStats>
  );
};

export default RPSStats;
