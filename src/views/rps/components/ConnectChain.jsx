import React, { useState, useEffect } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
export default function ConnectChain(props) {
    const [dropdown, setDropdown] = useState(false);
    const [actualNetwork, setActualNetwork] = useState('NETWORK')
    const toggleMenu = () => {
        setDropdown(!dropdown);
    }
 
    useEffect(() => {
        readNetworkData(props.network)
        return () => {
            setActualNetwork('');
          };
    }, [props.network])

    const readNetworkData = (network) => {
        if (network === 80001) {
            setActualNetwork('MUMBAI')
        }
        if (network === 137) {
            setActualNetwork('POLYGON')
        }
    }

    const addPolygon = async () => {
        try {
            await ethereum.sendAsync({
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

    const addMumbai = async () => {
        try {
            await ethereum.sendAsync({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: "0x13881",
                    chainName: "Mumbai Testnet",
                    rpcUrls: ["https://rpc-mumbai.matic.today"],
                    iconUrls: [""],
                    nativeCurrency: {
                        name: "MATIC",
                        symbol: "MATIC",
                        decimals: 18,
                    },
                    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
                }],
            });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="lg" className="my-2">
            <DropdownToggle caret color='danger'>
                {actualNetwork}
            </DropdownToggle>
            <DropdownMenu >
                <DropdownItem disabled={actualNetwork === 'POLYGON'} onClick={addPolygon}>POLYGON</DropdownItem>
                <DropdownItem disabled={actualNetwork === 'MUMBAI'} onClick={addMumbai}>MUMBAI</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}