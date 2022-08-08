import React, { useContext, useEffect } from "react";
import { Context } from "../../../../context/Context";
import PolygonLogo from "../../../../assets/imgs/Nav_Bar/polygon.png";
import { useMatchMedia } from "../../../../hooks/useMatchMedia";
import { useBalance } from "../../../../hooks/useBalance";

const Balance = () => {
  const { account, balance } = useContext(Context);
  const isMobileResolution = useMatchMedia("(max-width:770px)", false);
  const readBalance = useBalance();

  useEffect(() => {
    readBalance();
  }, [account]);

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

export default Balance;
