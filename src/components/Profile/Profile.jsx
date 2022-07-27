import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import DiscordButton from "../../assets/imgs/Nav_Bar/discordButton.png";
import { useMatchMedia } from "../../hooks/useMatchMedia";
import { useLogin } from "../../hooks/useLogin";

const getToken = async () => {
  const ouathLink =
    "https://discord.com/api/oauth2/authorize?client_id=961656991149875232&redirect_uri=https%3A%2F%2Frpsgames.club%2F&response_type=code&scope=identify%20email";
  // https://discord.com/api/oauth2/authorize?client_id=961656991149875232&redirect_uri=https%3A%2F%2Frpsgames.club%2F&response_type=code&scope=identify%20email
  // https://discord.com/api/oauth2/authorize?client_id=961656991149875232&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&scope=identify%20email"
  location.href = ouathLink;
};

const removeToken = () => {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("user");
  window.localStorage.removeItem("age");
  window.localStorage.removeItem("sound");
  window.localStorage.removeItem("gas");
  window.localStorage.removeItem("chat");
  window.localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
  window.location.reload();
};

const LogIn = ({ photo }) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <Dropdown
      isOpen={dropdown}
      toggle={() => setDropdown(!dropdown)}
      direction="down"
      size="sm"
      className="dd-profile"
    >
      <DropdownToggle color="transparent">
        <img
          className="rounded-circle"
          width="30px"
          height="30px"
          src={photo}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src =
              "https://firebasestorage.googleapis.com/v0/b/rpsgame-c4a38.appspot.com/o/profile%2FClubLogo.png?alt=media&token=7d14512f-c4a8-400f-a7ca-413239add111";
          }}
          alt="discord-pic"
        />
      </DropdownToggle>
      <DropdownMenu>
        <NavLink to="/stats">
          <DropdownItem>
            <i className="fa-solid fa-user me-3"></i>My Profile
          </DropdownItem>
        </NavLink>
        <DropdownItem onClick={removeToken}>
          <i className="fa-solid fa-right-from-bracket me-3 text-danger"></i>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const LogOut = () => {
  const isMobileResolution = useMatchMedia("(max-width:500px)", false);

  return (
    <img
      role="button"
      style={isMobileResolution ? { width: "80px" } : { width: "100px" }}
      onClick={getToken}
      src={DiscordButton}
      alt="discord-button"
    />
  );
};

const Profile = () => {
  const { user } = useLogin();

  return user ? <LogIn photo={user.photo} /> : <LogOut />;
};

export default Profile;
