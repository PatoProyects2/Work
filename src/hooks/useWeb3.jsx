import { useState, useContext } from "react";
import Web3 from 'web3'
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Torus from "@toruslabs/torus-embed";
import Portis from "@portis/web3";
import ethProvider from "eth-provider";
import WalletLink from "walletlink";
import RpsGamePolygon from '../abis/RpsGamePolygon/Santaflip.json'
import RpsGameMumbai from '../abis/RpsGameMumbai/Santaflip.json'
import UniswapRouter from '../abis/RouterPolygon/IUniswapV2Router02.json'
import { mRpsGameAddress, pRpsGameAddress, pMaticAddress, pUsdcAddress, pRouterAddress } from '../utils/Address'
import { Context } from "../context/Context"

export const useWeb3 = () => {
    const { setBalance } = useContext(Context);
    const [web3, setWeb3] = useState(false);
    const [rpsgame, setRpsgame] = useState(false);
    const [web3ModalInfo, setWeb3ModalInfo] = useState({});
    const [swapPolygon, setSwapPolygon] = useState(false);
    const [network, setNetwork] = useState(0);
    const [maticPrice, setMaticPrice] = useState(0);
    const [account, setAccount] = useState('0x000000000000000000000000000000000000dEaD');
    const providerOptions = {
        walletconnect: {
            display: {
                description: " ",
            },
            package: WalletConnectProvider,
            options: {
                rpc: {
                    137: 'https://polygon-rpc.com/',
                },
            }
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
            }
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
                rpc: 'https://polygon-rpc.com/',
                chainId: 137,
                appLogoUrl: null,
                darkMode: false
            },
        },
        frame: {
            display: {
                description: " ",
            },
            package: ethProvider
        },
    };
    Number.prototype.toFixedNumber = function (digits, base) {
        var pow = Math.pow(base || 10, digits);
        return Math.round(this * pow) / pow;
    }
    if (swapPolygon) {
        swapPolygon.methods.getAmountsOut('1000000000000000000', [pMaticAddress, pUsdcAddress]).call()
            .then(price => {
                const matic = parseFloat((parseInt(price[1]) / 1000000).toFixed(4))
                setMaticPrice(matic)
            })
            .catch(err => console.log(err))
    }

    if (web3 && account !== '0x000000000000000000000000000000000000dEaD') {
        web3.eth.getBalance(account)
            .then(b => {
                const userBalance = (parseInt(b / 1000000000) / 1000000000).toFixedNumber(3)
                setBalance(userBalance)
            })
            .catch(err => console.log(err))
    }

    const readBlockchainData = async () => {
        const web3Modal = new Web3Modal({
            cacheProvider: false,
            providerOptions,
            //theme: theme
        });
        setWeb3ModalInfo(web3Modal)
        try {
            const provider = await web3Modal.connect();
            if (provider._portis) {
                provider._portis.showPortis();
            }
            const web3 = new Web3(provider);
            setWeb3(web3)
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0].toLowerCase())
            ethereum.on('accountsChanged', () => {
                window.location.reload()
            });
            const chainId = await web3.eth.getChainId();
            setNetwork(chainId)
            if (chainId === 137) {
                const polygonSwap = new web3.eth.Contract(UniswapRouter.abi, pRouterAddress)
                setSwapPolygon(polygonSwap)
                const rpsgame = new web3.eth.Contract(RpsGamePolygon.abi, pRpsGameAddress)
                setRpsgame(rpsgame)
            }
            // if (chainId === 80001) {
            //     const rpsgame = new web3.eth.Contract(RpsGameMumbai.abi, mRpsGameAddress)
            //     setRpsgame(rpsgame)
            // }
            ethereum.on('chainChanged', () => {
                window.location.reload()
            });
            if (chainId !== 137) {
                try {
                    await ethereum.sendAsync({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: "0x89",
                            chainName: "Polygon Mainnet",
                            rpcUrls: ["https://polygon-rpc.com/"],
                            iconUrls: [""],
                            nativeCurrency: {
                                name: "MATIC",
                                symbol: "MATIC",
                                decimals: 18,
                            },
                            blockExplorerUrls: ["https://explorer.matic.network/"],
                        }],
                    });
                } catch (error) {

                }
            }
        } catch (e) {

        }
    }

    const disconnectWallet = () => {
        web3ModalInfo.clearCachedProvider();
        window.location.reload()
    }

    return {
        web3,
        rpsgame,
        swapPolygon,
        web3ModalInfo,
        network,
        account,
        maticPrice,
        readBlockchainData,
        disconnectWallet,
    }
}