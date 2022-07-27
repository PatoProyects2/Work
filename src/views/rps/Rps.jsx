import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import { GameLogo, GamePanel, ConnectPanel } from "./components/Modals/Modals";
import Spinner from "../../components/Spinner/Spinner";
import { useGas } from "../../hooks/useGas";
import { useWeb3 } from "../../hooks/useWeb3";

const RPS = () => {
  const screen = useRef(null);
  const { account } = useContext(Context);
  const { gas } = useGas();
  const {
    web3,
    privateWeb3,
    privateGamesClub,
    rpsgame,
    network,
    maticPrice,
    readBlockchainData,
  } = useWeb3();

  return (
    <>
      {account !== undefined &&
        account !== "0x000000000000000000000000000000000000dEaD" &&
        gas && <GameLogo />}
      {account === undefined ||
        (account === "0x000000000000000000000000000000000000dEaD" && (
          <GameLogo />
        ))}
      <article>
        {account !== undefined &&
        account !== "0x000000000000000000000000000000000000dEaD" ? (
          gas ? (
            <GamePanel
              web3={web3}
              privateWeb3={privateWeb3}
              privateGamesClub={privateGamesClub}
              rpsgame={rpsgame}
              network={network}
              maticPrice={maticPrice}
              screen={screen}
              account={account}
              gas={gas}
            />
          ) : (
            <Spinner />
          )
        ) : (
          <ConnectPanel readBlockchainData={readBlockchainData} />
        )}
        <div ref={screen}></div>
      </article>
    </>
  );
};

export default RPS;
