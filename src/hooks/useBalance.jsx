import { useContext } from "react";
import Web3 from "web3";
import { Context } from "../context/Context";

export const useBalance = () => {
  const { account, setBalance } = useContext(Context);

  const readBalance = () => {
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

  return readBalance;
};
