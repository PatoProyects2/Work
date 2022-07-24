import React, { useContext, useEffect } from "react";
import { Button } from "reactstrap";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../config/firesbaseConfig";
import { Context } from "../../../../context/Context";
import PolygonLogo from "../../../../assets/imgs/Nav_Bar/polygon.png";
import MetamaskLogo from "../../../../assets/imgs/Nav_Bar/fox.png";
import { useWeb3 } from "../../../../hooks/useWeb3";

const Balance = (props) => {
  const { balance, discordId, setPlayerDocument } = useContext(Context);
  const { readBalance, account } = useWeb3();

  useEffect(() => {
    const deadWallet = "0x000000000000000000000000000000000000dEaD";
    if (account !== undefined && account !== deadWallet) {
      const query =
        discordId !== ""
          ? doc(db, "clubUsers", discordId)
          : doc(db, "anonUsers", account);
      const unsub = onSnapshot(query, async (document) => {
        const profile = document.data();
        if (profile) {
          setPlayerDocument(profile);
          if (profile.account === "") {
            updateDoc(doc(db, "clubUsers", discordId), {
              account: account,
            });
          }
        } else {
          const arrayData = {
            uid: "anonymous",
            account: account,
            name: "",
            photo:
              "https://firebasestorage.googleapis.com/v0/b/games-club-dce4d.appspot.com/o/ClubLogo.png?alt=media&token=5dd64484-c99f-4ce9-a06b-0a3ee112b37b",
            level: 1,
            chat: {
              banned: false,
              unbanTime: 0,
            },
          };
          setDoc(doc(db, "anonUsers", account), arrayData);
        }
      });
      return () => unsub();
    }
  }, [account, discordId]);

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
