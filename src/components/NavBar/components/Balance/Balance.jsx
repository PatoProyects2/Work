import React, { useContext } from "react";
import { Button } from "reactstrap";
import { Context } from "../../../../context/Context";
import PolygonLogo from "../../../../assets/imgs/Nav_Bar/polygon.png";
import MetamaskLogo from "../../../../assets/imgs/Nav_Bar/fox.png";
import { useWeb3 } from "../../../../hooks/useWeb3";

const Balance = (props) => {
  const { balance } = useContext(Context);
  const {readBalance} = useWeb3();

  const openMetamask = () => {
    const ouathLink = "https://metamask.app.link/dapp/rpsgames.club/";
    location.href = ouathLink;
  };

  return balance !== "" ? (
    <div
      className={
        props.isMobileResolution
          ? "matic-balance-wrapper-mobile"
          : "matic-balance-wrapper"
      }
    >
      <button onClick={readBalance} className="refresh-balance">
        <i className="fas fa-sync-alt"></i>
      </button>

      <div className="balance-wrapper">
        <span style={{ color: "white" }} className="balance-span">
          {balance}
        </span>

        <div className="flip-image">
          <div className="flip-image-front">
            <img src={PolygonLogo} alt="Matic Amount" width="20" height="20" />
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
  ) : (
    props.isMobileResolution && (
      <div className="d-flex align-items-center gap-2">
        <Button onClick={openMetamask} color="warning">
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

export default Balance;
