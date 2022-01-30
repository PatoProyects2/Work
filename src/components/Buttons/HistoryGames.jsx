import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import RpsGame from '../../abis/RpsGame/rpsGame.json'
import chains from '../Blockchain/AvailableChains'

export default function HistoryGames() {
    const [dropdown, setDropdown] = useState(false);
    const [account, setAccount] = useState('0x0');
    const [rpsgame, setRpsgame] = useState({});
    const [events, setEvents] = useState({});

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
            window.alert('METAMASK BROWSER NOT DETECTED! PLEASE INSTALL METAMASK EXTENSION')
        }
    }

    async function loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])
        let chainId = await web3.eth.getChainId()
        let chainInUse = null

        for (let chainIndex in chains) {
            if (chains[chainIndex].id === chainId) {
                chainInUse = chains[chainIndex]
            }
        }
        if (!chainInUse) {
            window.alert('INVALID NETWORK DETECTED')
        } else {
            try {
                const rpsgame = new web3.eth.Contract(RpsGame.abi, chainInUse.rpsGameAddress)
                setRpsgame(rpsgame)
                web3.eth.getBlockNumber()
                    .then(n => {
                        n = n - 100
                        rpsgame.getPastEvents(
                            'Play',
                            {
                                // filter: { _to: account.toString() },
                                fromBlock: n,
                                toBlock: 'latest'
                            }
                        ).then(events => setEvents(events))
                    })
            } catch (e) {
                console.log('RPSGAME CONTRACT NOT DEPLOYED TO DETECTED NETWORK')
            }
        }
    }

    return (
        <>
            <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="sm">
                <DropdownToggle caret>
                    LIVEPLAYS
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header> {events[0] !== undefined
                        ?
                        events[0].returnValues[0] + " " + events[0].returnValues[2]
                        :
                        ""
                    }</DropdownItem>
                    <DropdownItem header> {events[1] !== undefined
                        ?
                        events[1].returnValues[0] + " " + events[1].returnValues[2]
                        :
                        ""
                    }</DropdownItem>
                    <DropdownItem header>  {events[2] !== undefined
                        ?
                        events[2].returnValues[0] + " " + events[2].returnValues[2]
                        :
                        ""
                    }</DropdownItem>
                    <DropdownItem header> {events[3] !== undefined
                        ?
                        events[3].returnValues[0] + " " + events[3].returnValues[2]
                        :
                        ""
                    }</DropdownItem>
                    <DropdownItem header>  {events[4] !== undefined
                        ?
                        events[4].returnValues[0] + " " + events[4].returnValues[2]
                        :
                        ""
                    }
                    </DropdownItem>
                    <DropdownItem header>  {events[5] !== undefined
                        ?
                        events[5].returnValues[0] + " " + events[5].returnValues[2]
                        :
                        ""
                    }</DropdownItem>
                    <DropdownItem header>  {events[6] !== undefined
                        ?
                        events[6].returnValues[0] + " " + events[6].returnValues[2]
                        :
                        ""
                    }</DropdownItem>
                    <DropdownItem header>  {events[7] !== undefined
                        ?
                        events[7].returnValues[0] + " " + events[7].returnValues[2]
                        :
                        ""
                    }</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}
