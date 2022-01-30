import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import chains from '../Blockchain/AvailableChains'

export default function ConnectChain() {
    const [dropdown, setDropdown] = useState(false);
    const [network, setNetwork] = useState('NETWORK');

    const toggleMenu = () => {
        setDropdown(!dropdown);
    }

    useEffect(() => {
        loadWeb3()
        loadBlockchainData()
    }, []);

    async function loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('ETHEREUM - BROWSER NOT DETECTED! PLEASE INSTALL METAMASK EXTENSION')
        }
    }

    async function loadBlockchainData() {
        const web3 = window.web3
        let chainIds = await web3.eth.getChainId()
        let chainInUse = null

        for (let chainIndex in chains) {
            if (chains[chainIndex].id === chainIds) {
                chainInUse = chains[chainIndex]
            }
        }
        if (!chainInUse) {
            window.alert('INVALID NETWORK, CONNECT TO POLYGON MAINNET NETWORK!')
        } else {
            if (chainIds === 56) {
                setNetwork('BSC')
            }
            if (chainIds === 137) {
                setNetwork('POLYGON')
            }
            if (chainIds === 97) {
                setNetwork('BSC TEST')
            }
        }
    }

    async function addPolygon() {
        try {
            const provider = window.web3.currentProvider
            await provider.sendAsync({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: "0x89",
                    chainName: "Polygon Mainnet",
                    rpcUrls: ["https://polygon-rpc.com/"],
                    iconUrls: ["https://queesunbitcoin.com/wp-content/uploads/2021/05/curso-sobre-binance-online.png"],
                    nativeCurrency: {
                        name: "MATIC",
                        symbol: "MATIC",
                        decimals: 18,
                    },
                    blockExplorerUrls: ["https://explorer.matic.network/"],
                }],
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function switchPolygon() {
        try {
            const provider = window.web3.currentProvider
            await provider.sendAsync({
                method: 'wallet_switchEthereumChain',
                params: [{
                    chainId: "0x89",
                }],
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function addBsc() {
        try {
            const provider = window.web3.currentProvider
            await provider.sendAsync({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: "0x38",
                    chainName: "BSC Mainnet",
                    rpcUrls: ["https://bsc-dataseed.binance.org/"],
                    iconUrls: ["https://queesunbitcoin.com/wp-content/uploads/2021/05/curso-sobre-binance-online.png"],
                    nativeCurrency: {
                        name: "BNB",
                        symbol: "BNB",
                        decimals: 18,
                    },
                    blockExplorerUrls: ["https://bscscan.com/"],
                }],
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function switchBsc() {
        try {
            const provider = window.web3.currentProvider
            await provider.sendAsync({
                method: 'wallet_switchEthereumChain',
                params: [{
                    chainId: "0x38",
                }],
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="sm">
            <DropdownToggle caret>
                {network}
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={addBsc}>BSC</DropdownItem>
                <DropdownItem onClick={addPolygon} disabled>POLYGON (soon)</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}