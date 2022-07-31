import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import DiscordButton from "../../../../assets/imgs/Nav_Bar/discordButton.png";
import { Context } from "../../../../context/Context.jsx";
import ClubLogo from "../../../../assets/imgs/Views_Nfts/ClubLogo.png";
import { useMatchMedia } from "../../../../hooks/useMatchMedia";
import { useLogin } from "../../../../hooks/useLogin";
import { useWeb3 } from "../../../../hooks/useWeb3";

const LogIn = ({ photo }) => {
  const [dropdown, setDropdown] = useState(false);

  const removeDiscord = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
    window.location.reload();
  };

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
          src={photo !== "" ? photo : ClubLogo}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = ClubLogo;
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
        <DropdownItem onClick={removeDiscord}>
          <i className="fa-solid fa-right-from-bracket me-3 text-danger"></i>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const LogOut = ({ wallet }) => {
  const isMobileResolution = useMatchMedia("(max-width:500px)", false);
  const [dropdown, setDropdown] = useState(false);

  const getToken = () => {
    const ouathLink =
      "https://discord.com/api/oauth2/authorize?client_id=961656991149875232&redirect_uri=https%3A%2F%2Frpsgames.club%2F&response_type=code&scope=identify%20email";
    // https://discord.com/api/oauth2/authorize?client_id=961656991149875232&redirect_uri=https%3A%2F%2Frpsgames.club%2F&response_type=code&scope=identify%20email
    // https://discord.com/api/oauth2/authorize?client_id=961656991149875232&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&scope=identify%20email"
    window.location.href = ouathLink;
  };

  const removeWallet = () => {
    window.localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
    window.localStorage.removeItem("connected");
    window.location.reload();
  };

  return (
    <>
      <Dropdown
        isOpen={dropdown}
        toggle={() => setDropdown(!dropdown)}
        direction="down"
        size="md"
        className="dd-profile"
      >
        <DropdownToggle color="transparent" className="text-white" caret>
          {wallet.substring(0, 5) + "..." + wallet.substring(38, 42) + " "}
        </DropdownToggle>
        <DropdownMenu>
          <NavLink to="/stats">
            <DropdownItem>
              <i className="fa-solid fa-user me-3"></i>My Profile
            </DropdownItem>
          </NavLink>
          <DropdownItem onClick={removeWallet}>
            <i className="fa-solid fa-right-from-bracket me-3 text-danger"></i>
            Disconnect
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <img
        role="button"
        style={isMobileResolution ? { width: "80px" } : { width: "100px" }}
        onClick={getToken}
        src={DiscordButton}
        alt="discord-button"
      />
    </>
  );
};

const Profile = () => {
  const { account } = useContext(Context);
  const { user } = useLogin();
  const { readBlockchainData } = useWeb3();

  return account !== "0x000000000000000000000000000000000000dEaD" ? (
    user ? (
      <LogIn photo={user.photo} />
    ) : (
      <LogOut wallet={account} />
    )
  ) : (
    <button onClick={readBlockchainData}>Connect Wallet</button>
  );
};

export default Profile;
