import React, { useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
export default function ConnectChain(props) {
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
    return (
        <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="md" className="my-2">
            <DropdownToggle caret color='danger'>
                {props.network}
            </DropdownToggle>
            <DropdownMenu >
                <DropdownItem disabled={props.network === 'POLYGON'} onClick={addPolygon}>Polygon</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}