import { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

const WalletButton = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const [copy, setCopy] = useState(false);

  const toggleMenu = () => {
    setDropdown(!dropdown);
  };

  const connectWallet = () => {
    if (document.getElementById("age").checked === false) {
      props.toast.error("Confirm that you are at least 18 years old");
      return false;
    }
    props.readBlockchainData();
  };

  const manageWallets = () => {
    ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
  };

  useEffect(() => {
    const readClipboard = async () => {
      if (copy) {
        const sleep = (milliseconds) => {
          return new Promise((resolve) => setTimeout(resolve, milliseconds));
        };
        for (let i = 0; i < 3; i++) {
          if (i === 2) {
            setCopy(false);
          }
          await sleep(1000);
        }
      }
    };
    readClipboard();
  }, [copy]);

  const copyAddress = () => {
    navigator.clipboard.writeText(props.account);
    setCopy(true);
  };

  return (
    <>
      {props.account !== undefined &&
      props.account !== "0x000000000000000000000000000000000000dEaD" ? (
        <>
          <Dropdown
            className="dd-profile"
            isOpen={dropdown}
            toggle={toggleMenu}
            direction="down"
            size="md"
          >
            <DropdownToggle color="transparent" className="modal-wallet">
              <span className="wallet-span">
                {props.account.substring(0, 5) +
                  "..." +
                  props.account.substring(38, 42)}
                &nbsp;&nbsp;
                <Button
                  color="dark"
                  className="btn-sm mb-1"
                  onClick={copyAddress}
                  disabled={copy}
                >
                  {copy ? (
                    <i
                      className="fa fa-check"
                      style={{ color: "#198754" }}
                      aria-hidden="true"
                    ></i>
                  ) : (
                    <i className="fa fa-clone" aria-hidden="true"></i>
                  )}
                </Button>
              </span>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={manageWallets}>Accounts</DropdownItem>
              <DropdownItem onClick={props.disconnectWallet}>
                Disconnect
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </>
      ) : (
        <>
          <p className="text-center mt-3">
            <label className="switch">
              <input id="age" type="checkbox"></input>&nbsp;
              <span className="slider round"></span>
            </label>
            &nbsp; I confirm that I am at least 18 years old
          </p>
          <div className="center">
            <button className="DoubleOrNothing" onClick={connectWallet}>
              CONNECT WALLET
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default WalletButton;
