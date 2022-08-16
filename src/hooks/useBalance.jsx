import { useContext } from "react";
import { Context } from "../context/Context";

export const useBalance = () => {
  const { web3Data, setBalance } = useContext(Context);

  const readBalance = () => {
    if (web3Data.infuraWeb3 && web3Data.account) {
      web3Data.infuraWeb3.eth
        .getBalance(web3Data.account)
        .then((balance) => {
          const walletBalance = parseFloat(
            balance / 1000000000 / 1000000000
          ).toString();
          setBalance(walletBalance);
        })
        .catch((err) => console.log(err));
    }
  };

  return readBalance;
};
