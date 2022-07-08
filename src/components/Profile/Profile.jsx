import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import DiscordButton from "../../assets/imgs/Home Page/discordButton.png";
import { Context } from "../../context/Context";
import { useAuth } from "../../hooks/useAuth";
import { useMatchMedia } from "../../hooks/useMatchMedia";

const Profile = () => {
  const { discordId } = useContext(Context);
  const [dropdown, setDropdown] = useState(false);
  const [user, setUser] = useState(false);
  const isMobileResolution = useMatchMedia("(max-width:500px)", false);
  const userData = window.localStorage.getItem("user");

  useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    const getLocalStorage = () => {
      const data = JSON.parse(userData);
      if (data) {
        const userLevel = window.localStorage.getItem("level");
        if (userLevel) {
          const level = {
            level: userLevel,
          };
          const rpsUser = Object.assign(data, level);
          setUser(rpsUser);
        }
      }
    };
    getLocalStorage();
  }, [userData]);

  const toggleMenu = () => {
    setDropdown(!dropdown);
  };

  const getToken = () => {
    const ouathLink =
      "https://discord.com/api/oauth2/authorize?client_id=961656991149875232&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&scope=identify%20email";
    location.href = ouathLink;
  };

  const removeToken = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.location.reload();
  };

  return discordId !== "" && user ? (
    <Dropdown
      isOpen={dropdown}
      toggle={toggleMenu}
      direction="down"
      size="sm"
      className="dd-profile"
    >
      <DropdownToggle color="transparent">
        {/* <div className="d-inline-flex">
            <span className="ms-2 fw-bold">{user.name}</span><span>#{user.id}</span>
          </div> */}
        <img
          className="rounded-circle"
          width="30px"
          height="30px"
          src={user.photo}
          alt="discord-pic"
        />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem
          onClick={() => {
            navigate("/stats"), navigate(0);
          }}
        >
          <i className="fa-solid fa-user me-3"></i>My Profile
        </DropdownItem>
        <DropdownItem onClick={removeToken}>
          <i className="fa-solid fa-right-from-bracket me-3 text-danger"></i>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ) : (
    <img
      role="button"
      style={isMobileResolution ? { width: "80px" } : { width: "100px" }}
      onClick={getToken}
      src={DiscordButton}
      alt="discord-button"
    />
  );
};

export default Profile;
