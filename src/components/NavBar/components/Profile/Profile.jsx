import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DiscordButton from "../../../../assets/imgs/Nav_Bar/discordButton.png";
import ClubLogo from "../../../../assets/imgs/Views_Nfts/ClubLogo.png";
import { useMatchMedia } from "../../../../hooks/useMatchMedia";
import { useMetamask } from "../../../../hooks/useMetamask";

const ProfileModal = ({ photo }) => {
  const removeProfile = () => {
    localStorage.clear();
    window.location.reload();
  };

  let navigate = useNavigate();

  return (
    <Dropdown className="dd-profile">
      <Dropdown.Toggle>
        <img
          className="rounded-circle"
          width="30px"
          height="30px"
          src={photo ? photo : ClubLogo}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = ClubLogo;
          }}
          alt="discord-pic"
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => navigate("/stats")}>
          <i className="fa-solid fa-user me-3"></i>My Profile
        </Dropdown.Item>

        <Dropdown.Item onClick={removeProfile}>
          <i className="fa-solid fa-right-from-bracket me-3 text-danger"></i>
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const LoginButton = ({ user }) => {
  const getDiscordToken = () => {
    const ouathLink = process.env.REACT_APP_DISCORD_AUTH;
    window.location.href = ouathLink;
  };

  return (
    !user && (
      <img
        role="button"
        style={{ width: "100px" }}
        onClick={getDiscordToken}
        src={DiscordButton}
        alt="discord-button"
      />
    )
  );
};

const Profile = ({ readBlockchainData, user, account }) => {
  const isMobileResolution = useMatchMedia("(max-width:525px)", false);
  const metamask = useMetamask({ isMobileResolution });

  return account ? (
    <>
      <ProfileModal photo={user.photo} />
      <LoginButton user={user} />
    </>
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
