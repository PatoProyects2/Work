import React, { useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'

export default function ConnectChain(props) {
    const [dropdown, setDropdown] = useState(false);

    const toggleMenu = () => {
        setDropdown(!dropdown);
    }

    async function addPolygon() {
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

    async function addMumbai() {
        try {
            await ethereum.sendAsync({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: "0x13881",
                    chainName: "Mumbai Testnet",
                    rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
                    iconUrls: ["https://queesunbitcoin.com/wp-content/uploads/2021/05/curso-sobre-binance-online.png"],
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
        <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="md" className="my-2">
            <DropdownToggle caret color='danger'>
                {props.network}
            </DropdownToggle>
            <DropdownMenu >
                <DropdownItem disabled={props.network === 'POLYGON'} onClick={addPolygon}>Polygon</DropdownItem>
                <DropdownItem disabled={props.network === 'MUMBAI'} onClick={addMumbai}>Mumbai</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}