import { useState, useEffect, useContext, useRef } from "react";
import { Context } from "../../context/Context";
import { GamePanel, ConnectPanel } from "./components/Modals/Modals";
import { useWeb3 } from "../../hooks/useWeb3";
import RPSGames from "../../assets/imgs/Home_Page/RPS Games.png";

export default function RPS() {
  const [load, setLoad] = useState(false);
  const screen = useRef(null);
  const { web3Data } = useContext(Context);
  const { readBlockchainData } = useWeb3();
  const age = window.localStorage.getItem("age");

  const scrollToBottom = () => {
    if (screen.current) {
      screen.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [screen, web3Data.account, load]);

  useEffect(() => {
    setLoad(true);
  }, []);

  return (
    load && (
      <>
        <div className="left-content-rps">
          <img src={RPSGames} alt="" />
        </div>
        <article>
          {web3Data.account && age === "true" ? (
            <GamePanel
              account={web3Data.account}
              web3={web3Data.web3}
              privateRpsGame={web3Data.chainStackRpsGame}
              rpsGame={web3Data.rpsGame}
              network={web3Data.network}
              maticPrice={web3Data.maticPrice}
            />
          ) : (
            <ConnectPanel
              readBlockchainData={readBlockchainData}
              age={age}
              account={web3Data.account}
            />
          )}
        </article>
        <div ref={screen}></div>
      </>
    )
  );
}
