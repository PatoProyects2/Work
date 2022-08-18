import { useContext, useState, useEffect } from "react";
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

export const useWeb3 = () => {
  const { setWeb3Data } = useContext(Context);
  const [infuraWeb3, setInfuraWeb3] = useState(false);
  const [infuraRpsGame, setInfuraRpsGame] = useState(false);
  const [publicWeb3, setPublicWeb3] = useState(false);
  const [publicRpsGame, setPublicRpsGame] = useState(false);
  const chainUrl = process.env.REACT_APP_CHAINSTACK_WSS_POLYGON;
  const chainUser = process.env.REACT_APP_CHAINSTACK_WSS_POLYGON_USER;
  const chainPass = process.env.REACT_APP_CHAINSTACK_WSS_POLYGON_PASSWORD;

  const web3Cache = window.localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER");

  const providerOptions = {
    walletconnect: {
      display: {
        description: "",
      },
      package: WalletConnectProvider,
      options: {
        rpc: {
          137: `https://polygon-mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_POLYGON}`,
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
          host: `https://polygon-mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_POLYGON}`,
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
        rpc: `https://polygon-mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_POLYGON}`,
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
    readPrivateEndpoints();
  }, [web3Cache]);

  const readPrivateEndpoints = () => {
    const infura = `https://polygon-mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_POLYGON}`;
    const infuraProvider = new Web3.providers.HttpProvider(infura);
    const infWeb3 = new Web3(infuraProvider);

    const infRpsGame = new infWeb3.eth.Contract(
      RpsGamePolygon.abi,
      pRpsGameAddress
    );
    setInfuraWeb3(infWeb3);
    setInfuraRpsGame(infRpsGame);

    const publicPolygon = `https://polygon-mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_POLYGON}`;
    const publicProvider = new Web3.providers.HttpProvider(publicPolygon);
    const pubWeb3 = new Web3(publicProvider);

    const pubRpsGame = new pubWeb3.eth.Contract(
      RpsGamePolygon.abi,
      pRpsGameAddress
    );
    setPublicWeb3(pubWeb3);
    setPublicRpsGame(pubRpsGame);

    //rpc-mainnet.matic.quiknode.pro/

    https: if (web3Cache === null) {
      setWeb3Data({
        infuraWeb3: infWeb3,
        infuraRpsGame: infRpsGame,
        publicWeb3: pubWeb3,
        publicRpsGame: pubRpsGame,
      });
    }
  };

  useEffect(() => {
    if (
      web3Cache !== null &&
      infuraWeb3 &&
      infuraRpsGame &&
      publicWeb3 &&
      publicRpsGame
    ) {
      readBlockchainData();
    }
  }, [web3Cache, infuraWeb3, infuraRpsGame, publicWeb3, publicRpsGame]);

  const readBlockchainData = async () => {
    var account = false;
    var network = false;
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions,
      });

      // Injected connector
      const provider = await web3Modal.connect();
      if (provider._portis) {
        provider._portis.showPortis();
      }

      const web3 = new Web3(provider);

      account = await web3.eth.getAccounts();
      network = await web3.eth.getChainId();

      const chainStack = `wss://${chainUser}:${chainPass}@${chainUrl}`;
      const chainStackProvider = new Web3.providers.WebsocketProvider(
        chainStack
      );
      const chainStackWeb3 = new Web3(chainStackProvider);

      // Setting Contracts
      const polygonSwapContract = new web3.eth.Contract(
        UniswapRouter.abi,
        pRouterAddress
      );

      const rpsGame = new web3.eth.Contract(
        RpsGamePolygon.abi,
        pRpsGameAddress
      );

      const chainStackRpsGame = new chainStackWeb3.eth.Contract(
        RpsGamePolygon.abi,
        pRpsGameAddress
      );

      // Read Matic Price
      const price = await polygonSwapContract.methods
        .getAmountsOut("1000000000000000000", [pMaticAddress, pUsdcAddress])
        .call();
      const maticPrice = parseFloat((parseInt(price[1]) / 1000000).toFixed(4));

      const web3Array = {
        web3: web3,
        account: account[0].toLowerCase(),
        network: network,
        rpsGame: rpsGame,
        infuraWeb3: infuraWeb3,
        infuraRpsGame: infuraRpsGame,
        publicWeb3: publicWeb3,
        publicRpsGame: publicRpsGame,
        chainStackWeb3: chainStackWeb3,
        chainStackRpsGame: chainStackRpsGame,
        maticPrice: maticPrice,
      };
      setWeb3Data(web3Array);

      provider.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
          window.location.reload();
        } else {
          account = accounts;
          setWeb3Data({
            web3: web3,
            account: account[0].toLowerCase(),
            network: network,
            rpsGame: rpsGame,
            infuraWeb3: infuraWeb3,
            infuraRpsGame: infuraRpsGame,
            publicWeb3: publicWeb3,
            publicRpsGame: publicRpsGame,
            chainStackWeb3: chainStackWeb3,
            chainStackRpsGame: chainStackRpsGame,
            maticPrice: maticPrice,
          });
        }
      });

      provider.on("chainChanged", (chainId) => {
        network = chainId === "0x89" ? 137 : chainId;
        if (network !== 137) {
          setWeb3Data(account, network);
        } else {
          setWeb3Data({
            web3: web3,
            account: account[0].toLowerCase(),
            network: network,
            rpsGame: rpsGame,
            infuraWeb3: infuraWeb3,
            infuraRpsGame: infuraRpsGame,
            publicWeb3: publicWeb3,
            publicRpsGame: publicRpsGame,
            chainStackWeb3: chainStackWeb3,
            chainStackRpsGame: chainStackRpsGame,
            maticPrice: maticPrice,
          });
        }
      });
    } catch (e) {
      console.log(e);
      readBlockchainData();
    }
    if (account && network !== 137) {
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x89" }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x89",
                  chainName: "Polygon Mainnet",
                  rpcUrls: ["https://rpc-mainnet.matic.quiknode.pro/"],
                  iconUrls: [""],
                  nativeCurrency: {
                    name: "MATIC",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://polygonscan.com/"],
                },
              ],
            });
          } catch (addError) {
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }
      setWeb3Data(account, network);
    }
  };

  return {
    readBlockchainData,
  };
};
