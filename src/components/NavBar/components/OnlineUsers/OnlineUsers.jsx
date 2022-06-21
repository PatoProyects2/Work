import styled from "styled-components";
import UsersIcon from "../../../../assets/imgs/Home Page/usersIcon.png";
import { useAllUsers } from "../../../../hooks/firebase/useAllUsers";

const StyledActive = styled.div`
  .Logo {
    width: 25px;
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
  const allUsers = useAllUsers();

  return (
    <StyledActive>
      <span className="LogoBackground d-flex align-items-center">
        <img className="Logo" src={UsersIcon} alt="" />
        &nbsp;
        <div className="ActiveText">{allUsers}</div>
      </span>
    </StyledActive>
  );
};

export default OnlineUsers;
