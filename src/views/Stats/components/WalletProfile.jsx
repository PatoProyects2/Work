import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CrownLevel from "./Info/CrownLevel";
import rps from "../../../assets/imgs/Home_Page/RPS.png";
import { useAnonProfile } from "../../../hooks/firebase/useAnonProfile";
import ClubLogo from "../../../assets/imgs/Views_Nfts/ClubLogo.png";
import Spinner from "../../../components/Spinner/Spinner";

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

const WalletProfile = ({ account, isMobileResolution }) => {
  const anonProfile = useAnonProfile(account);

  let navigate = useNavigate();

  useEffect(() => {
    if (anonProfile.length === 0) {
      navigate("/stats", { replace: true });
    }
  }, [anonProfile]);

  const xpClassText = () => {
    const level = anonProfile[0].level;
    if (level <= 4) {
      return "text-yellow";
    } else if (level > 4 && level < 10) {
      return "text-orange";
    } else if (level > 9 && level < 15) {
      return "text-pink";
    } else if (level > 14 && level < 20) {
      return "text-blue";
    } else if (level > 19 && level < 24) {
      return "text-green";
    } else {
      return "text-red";
    }
  };

  return anonProfile[0] ? (
    <div className="profile-container">
      <h3 className="TitleUsuario my-3 text-center">
        {anonProfile[0].account.substring(0, 5) +
          "..." +
          anonProfile[0].account.substring(38, 42) +
          " Stats"}
      </h3>
      <div className="profile-info">
        <div className="profile-info-container">
          <img
            className="rounded-circle profile-img"
            src={anonProfile[0].photo}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = ClubLogo;
            }}
            alt={anonProfile[0].account}
          />
          <div className="d-flex m-auto">
            <CrownLevel userLevel={anonProfile[0].level} />
            <span className={xpClassText()}>
              {anonProfile[0].account.substring(0, 5) +
                "..." +
                anonProfile[0].account.substring(38, 42)}
            </span>
          </div>
          <span className="text-white">Login to save your game data</span>
        </div>
        {!isMobileResolution && (
          <div className="profile-stats-container">
            <StyledStats>
              <div className="Logo h1">
                <img src={rps} className="LogoImg" alt="Logo" />
              </div>
              <span className="text-center text-white">
                {anonProfile[0].whitelist ? "WHITELISTED" : "NOT WHITELISTED"}
              </span>
            </StyledStats>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="d-flex justify-content-center text-center">
      <Spinner />
    </div>
  );
};

export default WalletProfile;
