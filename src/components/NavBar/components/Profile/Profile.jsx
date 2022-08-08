import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

import DiscordButton from "../../../../assets/imgs/Nav_Bar/discordButton.png";
import ClubLogo from "../../../../assets/imgs/Views_Nfts/ClubLogo.png";
import { useMatchMedia } from "../../../../hooks/useMatchMedia";
import { useWeb3 } from "../../../../hooks/useWeb3";
import { useMetamask } from "../../../../hooks/useMetamask";

const LogIn = ({ photo }) => {
  const [dropdown, setDropdown] = useState(false);

  const removeDiscord = () => {
    localStorage.clear();
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

const getToken = () => {
  const ouathLink =
    "https://discord.com/api/oauth2/authorize?client_id=961656991149875232&redirect_uri=https%3A%2F%2Frpsgames.club%2F&response_type=code&scope=identify%20email";
  // https://discord.com/api/oauth2/authorize?client_id=961656991149875232&redirect_uri=https%3A%2F%2Frpsgames.club%2F&response_type=code&scope=identify%20email
  // https://discord.com/api/oauth2/authorize?client_id=961656991149875232&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&scope=identify%20email
  window.location.href = ouathLink;
};

export const LogOut = ({ account }) => {
  const [dropdown, setDropdown] = useState(false);

  const removeWallet = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Dropdown
      isOpen={dropdown}
      toggle={() => setDropdown(!dropdown)}
      direction="down"
      size="md"
      className="dd-profile"
    >
      <DropdownToggle color="transparent" className="text-white" caret>
        {account.substring(0, 5) + "..." + account.substring(38, 42) + " "}
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
  );
};

const Profile = ({ user, account }) => {
  const { readBlockchainData } = useWeb3();
  const isMobileResolution = useMatchMedia("(max-width:525px)", false);
  const metamask = useMetamask({ isMobileResolution });

  return account !== "0x000000000000000000000000000000000000dEaD" ? (
    user ? (
      <LogIn photo={user.photo} />
    ) : (
      <>
        {!isMobileResolution && <LogOut account={account} />}
        <img
          role="button"
          style={{ width: "100px" }}
          onClick={getToken}
          src={DiscordButton}
          alt="discord-button"
        />
      </>
    )
  ) : (
    <button
      onClick={() =>
        !metamask && isMobileResolution
          ? (window.location.href =
              "https://metamask.app.link/dapp/rpsgames.club/")
          : readBlockchainData()
      }
      className="ConnectWallet"
    >
      {isMobileResolution ? "CONNECT" : "CONNECT WALLET"}
    </button>
  );
};

export default Profile;
