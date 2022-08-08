import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import DiscordProfile from "./components/DiscordProfile";
import WalletProfile from "./components/WalletProfile";
import { useMatchMedia } from "../../hooks/useMatchMedia";

const StyledProfile = styled.div`
  width: 100%;
  .TitleUsuario {
    height: 50px;
    display: flex;
    align-items: center;
    color: white;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    font-size: 20px;
    justify-content: center;
    background-color: #554c77;
  }

  .profile-container {
    width: 100%;
  }
  .profile-info {
    display: flex;
  }
  .rps-stats-mobile {
    display: flex;
    justify-content: center;
  }
  .statsNew-mobile {
    display: flex;
    justify-content: center;
  }
`;

const Stats = () => {
  const { account, playerDocument } = useContext(Context);
  const { urlParams } = useParams();
  const isMobileResolution = useMatchMedia("(max-width:700px)", false);

  let navigate = useNavigate();

  useEffect(() => {
    if (urlParams) {
      if (urlParams.length !== 18 && urlParams.length !== 42) {
        navigate("/stats", { replace: true });
      }
    }
  }, [urlParams]);

  return (
    <StyledProfile>
      {playerDocument && urlParams === undefined ? (
        playerDocument.uid !== "anonymous" ? (
          <DiscordProfile
            uid={playerDocument.uid}
            isMobileResolution={isMobileResolution}
          />
        ) : (
          <WalletProfile
            account={playerDocument.account}
            isMobileResolution={isMobileResolution}
          />
        )
      ) : (
        urlParams && (
          <>
            {urlParams.length === 18 && (
              <DiscordProfile
                uid={urlParams}
                isMobileResolution={isMobileResolution}
              />
            )}
            {urlParams.length === 42 && (
              <WalletProfile
                account={urlParams.toLocaleLowerCase()}
                isMobileResolution={isMobileResolution}
              />
            )}
          </>
        )
      )}

      {!playerDocument &&
        account === "0x000000000000000000000000000000000000dEaD" &&
        urlParams === undefined && (
          <h2 className="text-center text-white">Login or connect wallet</h2>
        )}
    </StyledProfile>
  );
};

export default Stats;
