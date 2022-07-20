const WalletButton = (props) => {
  return (
    <>
      {props.account !== undefined &&
        props.account === "0x000000000000000000000000000000000000dEaD" && (
          <div className="center">
            <button
              className="DoubleOrNothing"
              onClick={props.readBlockchainData}
            >
              CONNECT WALLET
            </button>
          </div>
        )}
    </>
  );
};

export default WalletButton;
