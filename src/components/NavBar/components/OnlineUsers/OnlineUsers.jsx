import styled from "styled-components";
import UsersIcon from "../../../../assets/imgs/Nav_Bar/usersIcon.png";
import { useOnlineUsers } from "../../../../hooks/socket/useOnlineUsers";

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
  const onlineUsers = useOnlineUsers();

  return (
    <StyledActive>
      <span className="LogoBackground d-flex align-items-center">
        <img className="Logo" src={UsersIcon} alt="" />
        &nbsp;
        <div className="ActiveText">
          {onlineUsers.length > 0 && onlineUsers.length}
        </div>
      </span>
    </StyledActive>
  );
};

export default OnlineUsers;
