import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import DiscordProfile from "./components/DiscordProfile";
import WalletProfile from "./components/WalletProfile";
import { useMatchMedia } from "../../hooks/useMatchMedia";
import { useAllGames } from "../../hooks/socket/useAllGames";
import { useClubUsers } from "../../hooks/socket/useClubUsers";
import { useAnonUsers } from "../../hooks/socket/useAnonUsers";

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

export default function Stats() {
  const { web3Data, playerDocument } = useContext(Context);
  const { urlParams } = useParams();
  const isMobileResolution = useMatchMedia("(max-width:700px)", false);
  const allGames = useAllGames();
  const clubUsers = useClubUsers();
  const anonUsers = useAnonUsers();

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
            clubUsers={clubUsers}
            allGames={allGames}
            uid={playerDocument.uid}
            isMobileResolution={isMobileResolution}
          />
        ) : (
          <WalletProfile
            anonUsers={anonUsers}
            account={playerDocument.account}
            isMobileResolution={isMobileResolution}
          />
        )
      ) : (
        urlParams && (
          <>
            {urlParams.length === 18 && (
              <DiscordProfile
                clubUsers={clubUsers}
                allGames={allGames}
                uid={urlParams}
                isMobileResolution={isMobileResolution}
              />
            )}
            {urlParams.length === 42 && (
              <WalletProfile
                anonUsers={anonUsers}
                account={urlParams.toLocaleLowerCase()}
                isMobileResolution={isMobileResolution}
              />
            )}
          </>
        )
      )}

      {!playerDocument && !web3Data.account && urlParams === undefined && (
        <h2 className="text-center text-white">Login or connect wallet</h2>
      )}
    </StyledProfile>
  );
}
