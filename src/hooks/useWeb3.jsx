import { useState, useContext } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Torus from "@toruslabs/torus-embed";
import Portis from "@portis/web3";
import ethProvider from "eth-provider";
import WalletLink from "walletlink";
import RpsGamePolygon from "../abis/GamesClubPolygon/Santaflip.json";
import UniswapRouter from "../abis/RouterPolygon/IUniswapV2Router02.json";
import {
  pRpsGameAddress,
  pMaticAddress,
  pUsdcAddress,
  pRouterAddress,
} from "../utils/Address";
import { Context } from "../context/Context";
import { useEffect } from "react";

export const useWeb3 = () => {
  const { setBalance } = useContext(Context);
  const [account, setAccount] = useState(
    "0x000000000000000000000000000000000000dEaD"
  );
  const [web3, setWeb3] = useState(false);
  const [rpsgame, setRpsgame] = useState(false);
  const [web3ModalInfo, setWeb3ModalInfo] = useState({});
  const [network, setNetwork] = useState(0);
  const [maticPrice, setMaticPrice] = useState(0);
  const [privateWeb3, setPrivateWeb3] = useState(false);
  const [privateGamesClub, setPrivateGamesClub] = useState(false);

  const providerOptions = {
    walletconnect: {
      display: {
        description: "",
      },
      package: WalletConnectProvider,
      options: {
        rpc: {
          137: "https://polygon-rpc.com",
        },
      },
    },
    torus: {
      display: {
        description: " ",
      },
      package: Torus,
      options: {
        networkParams: {
          host: process.env.REACT_APP_INFURA_RPC,
          chainId: 137,
          networkId: 137,
          blockExplorer: "https://polygonscan.com/",
          ticker: "MATIC",
          tickerName: "MATIC",
        },
      },
    },
    portis: {
      display: {
        description: " ",
      },
      package: Portis,
      options: {
        id: "fc6fd5a9-493b-4806-858d-ff67918ea1dc",
        network: "matic",
      },
    },
    walletlink: {
      display: {
        description: " ",
      },
      package: WalletLink,
      options: {
        appName: "Games Club",
        rpc: "https://polygon-rpc.com",
        chainId: 137,
        appLogoUrl: null,
        darkMode: false,
      },
    },
    frame: {
      display: {
        description: " ",
      },
      package: ethProvider,
    },
  };

  useEffect(() => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_POLYGON)
    );
    setPrivateWeb3(web3);

    const gamesClubContract = new web3.eth.Contract(
      RpsGamePolygon.abi,
      pRpsGameAddress
    );
    setPrivateGamesClub(gamesClubContract);
  }, []);

  useEffect(() => {
    readBalance();
  }, [privateWeb3, account]);

  const readBalance = () => {
    if (
      privateWeb3 &&
      account !== "0x000000000000000000000000000000000000dEaD"
    ) {
      privateWeb3.eth
        .getBalance(account)
        .then((balance) => {
          const userBalance = (
            parseFloat(balance / 1000000000) / 1000000000
          ).toFixed(3);
          setBalance(userBalance);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    readBlockchainData();
    return () => {
      setWeb3ModalInfo(false);
      setWeb3(false);
      setAccount("0x000000000000000000000000000000000000dEaD");
      setNetwork(0);
      setRpsgame(false);
    };
  }, []);

  const readBlockchainData = async () => {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions,
      //theme: theme
    });
    setWeb3ModalInfo(web3Modal);
    try {
      const web3Provider = await web3Modal.connect();
      if (web3Provider._portis) {
        web3Provider._portis.showPortis();
      }

      const web3 = new Web3(web3Provider);
      setWeb3(web3);

      const accounts = await web3.eth.getAccounts();
      ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      setAccount(accounts[0].toLowerCase());

      const chainId = await web3.eth.getChainId();
      ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      setNetwork(chainId);
      if (chainId === 137) {
        const polygonSwap = new web3.eth.Contract(
          UniswapRouter.abi,
          pRouterAddress
        );
        polygonSwap.methods
          .getAmountsOut("1000000000000000000", [pMaticAddress, pUsdcAddress])
          .call()
          .then((price) => {
            const matic = parseFloat((parseInt(price[1]) / 1000000).toFixed(4));
            setMaticPrice(matic);
          })
          .catch((err) => console.log(err));

        const rpsgame = new web3.eth.Contract(
          RpsGamePolygon.abi,
          pRpsGameAddress
        );
        setRpsgame(rpsgame);
      } else {
        await ethereum.sendAsync({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x89",
              chainName: "Polygon Mainnet",
              rpcUrls: ["https://polygon-rpc.com"],
              iconUrls: [""],
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
              },
              blockExplorerUrls: ["https://explorer.matic.network/"],
            },
          ],
        });
      }
    } catch (e) {}
  };

  const disconnectWallet = () => {
    web3ModalInfo.clearCachedProvider();
    window.location.reload();
  };

  return {
    account,
    web3,
    rpsgame,
    privateGamesClub,
    network,
    maticPrice,
    readBlockchainData,
    disconnectWallet,
    readBalance,
  };
};
