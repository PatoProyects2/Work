import React, { useContext, useEffect } from "react";
import { Context } from "../../../../context/Context";
import PolygonLogo from "../../../../assets/imgs/Nav_Bar/polygon.png";
import { useBalance } from "../../../../hooks/useBalance";

const PolygonImage = () => {
  return (
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
  );
};

const Balance = ({ isMobileResolution }) => {
  const { web3Data, balance } = useContext(Context);
  const readBalance = useBalance();

  useEffect(() => {
    if (web3Data.account && web3Data.network) {
      readBalance();
    }
  }, [web3Data.account, web3Data.network]);

  return (
    balance !== "" && (
      <div
        className={
          isMobileResolution
            ? "matic-balance-wrapper-mobile"
            : "matic-balance-wrapper"
        }
      >
        <button onClick={readBalance} className="refresh-balance">
          <i className="fas fa-sync-alt"></i>
        </button>

        <div className="balance-wrapper">
          {web3Data.network === 137 ? (
            <>
              <span style={{ color: "white" }} className="balance-span">
                {balance.substring(0, 6)}
              </span>

              <PolygonImage />
            </>
          ) : (
            <span className="text-white">INVALID NETWORK</span>
          )}
        </div>
      </div>
    )
  );
};

export default Balance;
