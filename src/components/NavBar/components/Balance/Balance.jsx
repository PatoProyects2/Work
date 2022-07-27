import React, { useContext, useEffect } from "react";
import { Button } from "reactstrap";
import Web3 from "web3";
import { Context } from "../../../../context/Context";
import PolygonLogo from "../../../../assets/imgs/Nav_Bar/polygon.png";
import MetamaskLogo from "../../../../assets/imgs/Nav_Bar/fox.png";
import { useMatchMedia } from "../../../../hooks/useMatchMedia";

const BalanceModal = ({ isMobileResolution }) => {
  const { account, balance, setBalance } = useContext(Context);

  useEffect(() => {
    updateBalance();
  }, [account]);

  const updateBalance = () => {
    const myWeb3 = new Web3(
      new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_POLYGON)
    );
    if (myWeb3 && account !== "0x000000000000000000000000000000000000dEaD") {
      myWeb3.eth
        .getBalance(account)
        .then((myBalance) => {
          const userBalance = parseFloat(
            myBalance / 1000000000 / 1000000000
          ).toFixed(3);
          setBalance(userBalance);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    balance !== "" && (
      <div
        className={
          isMobileResolution
            ? "matic-balance-wrapper-mobile"
            : "matic-balance-wrapper"
        }
      >
        <button onClick={updateBalance} className="refresh-balance">
          <i className="fas fa-sync-alt"></i>
        </button>

        <div className="balance-wrapper">
          <span style={{ color: "white" }} className="balance-span">
            {balance}
          </span>

          <div className="flip-image">
            <div className="flip-image-front">
              <img
                src={PolygonLogo}
                alt="Matic Amount"
                width="20"
                height="20"
              />
            </div>
            <div className="flip-image-back">
              <img
                src={PolygonLogo}
                className="image-reverse"
                alt="Matic Amount"
                width="20"
                height="20"
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

const MetamaskModal = ({ isMobileResolution }) => {
  return (
    isMobileResolution && (
      <div className="d-flex align-items-center gap-2">
        <Button
          onClick={() =>
            (location.href = "https://metamask.app.link/dapp/rpsgames.club/")
          }
          color="warning"
        >
          <span>OPEN</span>
          &nbsp;
          <img
            src={MetamaskLogo}
            className="mb-1"
            width="20"
            height="20"
            alt="fox"
          />
        </Button>
      </div>
    )
  );
};

const Balance = () => {
  const isMobileResolution = useMatchMedia("(max-width:500px)", false);
  return (
    <>
      <BalanceModal isMobileResolution={isMobileResolution} />
      <MetamaskModal isMobileResolution={isMobileResolution} />
    </>
  );
};

export default Balance;
