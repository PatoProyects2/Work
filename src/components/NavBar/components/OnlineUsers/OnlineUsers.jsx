import styled from "styled-components";
import UsersIcon from "../../../../assets/imgs/Nav_Bar/usersIcon.png";
import { useStatus } from "../../../../hooks/firebase/useStatus";

const StyledActive = styled.div`
  .Logo {
    width: 20px;
  }

  .ActiveText {
    color: #ffdb5b;
  }

  .LogoBackground {
    background-color: #21202e;
    padding-bottom: 2px;
    padding-top: 2px;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 5px;
  }
`;

const OnlineUsers = () => {
  const online = useStatus();

  return (
    <StyledActive>
      <span className="LogoBackground d-flex align-items-center">
        <img className="Logo" src={UsersIcon} alt="" />
        &nbsp;
        <div className="ActiveText">{online.length > 0 && online.length}</div>
      </span>
    </StyledActive>
  );
};

export default OnlineUsers;
