import React, { useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'

const ChainButton = (props) => {
    const [dropdown, setDropdown] = useState(false);
    const toggleMenu = () => {
        setDropdown(!dropdown);
    }

    const addPolygon = async () => {
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

        }
    }
    return (
        <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="lg" className="dd-profile my-2 text-center">
            <DropdownToggle caret color='danger'>
                {props.network === 137 && 'POLYGON'}
                {props.network === 80001 && 'MUMBAI'}
                {props.network !== 80001 && props.network !== 137 && 'NETWORK'}
            </DropdownToggle>
            <DropdownMenu >
                <DropdownItem disabled={props.network === 137} onClick={addPolygon}>POLYGON</DropdownItem>
                <DropdownItem disabled={props.network === 80001} onClick={addMumbai}>MUMBAI</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default ChainButton;