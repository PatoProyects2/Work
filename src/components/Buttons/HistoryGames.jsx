import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import RpsGame from '../../abis/RpsGame/rpsGame.json'
import chains from '../Blockchain/AvailableChains'

export default function HistoryGames() {
    const [dropdown, setDropdown] = useState(false);
    const [account, setAccount] = useState('0x0');
    const [rpsgame, setRpsgame] = useState({});
    const [userevents, setUserevents] = useState({});
    const [decimal, setDecimal] = useState(1000000000000000000);
    const [count, setCount] = useState(0);
    const [result0, setResult0] = useState(undefined);
    const [result1, setResult1] = useState(undefined);
    const [result2, setResult2] = useState(undefined);
    const [result3, setResult3] = useState(undefined);
    const [result4, setResult4] = useState(undefined);
    const [result5, setResult5] = useState(undefined);
    const [result6, setResult6] = useState(undefined);
    const [result7, setResult7] = useState(undefined);

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
            const sleep = (milliseconds) => {
                return new Promise(resolve => setTimeout(resolve, milliseconds))
            }
            while (count < 100) {
                const rpsgame = new web3.eth.Contract(RpsGame.abi, chainInUse.rpsGameAddress)
                setRpsgame(rpsgame)
                web3.eth.getBlockNumber()
                    .then(n => {
                        n = n - 50
                        rpsgame.getPastEvents(
                            'Play',
                            {
                                // filter: { _to: account.toString() },
                                fromBlock: n,
                                toBlock: 'latest'
                            }
                        ).then(events => setUserevents(events))
                    })
                web3.eth.getBlockNumber()
                    .then(n => {
                        n = n - 50
                        rpsgame.getPastEvents(
                            'Play',
                            {
                                // filter: { _to: account.toString() },
                                fromBlock: n,
                                toBlock: 'latest'
                            }
                        ).then(events => setResult0(events[0].returnValues[2]))
                    })
                web3.eth.getBlockNumber()
                    .then(n => {
                        n = n - 50
                        rpsgame.getPastEvents(
                            'Play',
                            {
                                // filter: { _to: account.toString() },
                                fromBlock: n,
                                toBlock: 'latest'
                            }
                        ).then(events => setResult1(events[1].returnValues[2]))
                    })
                web3.eth.getBlockNumber()
                    .then(n => {
                        n = n - 50
                        rpsgame.getPastEvents(
                            'Play',
                            {
                                // filter: { _to: account.toString() },
                                fromBlock: n,
                                toBlock: 'latest'
                            }
                        ).then(events => setResult2(events[2].returnValues[2]))
                    })
                web3.eth.getBlockNumber()
                    .then(n => {
                        n = n - 50
                        rpsgame.getPastEvents(
                            'Play',
                            {
                                // filter: { _to: account.toString() },
                                fromBlock: n,
                                toBlock: 'latest'
                            }
                        ).then(events => setResult3(events[3].returnValues[2]))
                    })
                web3.eth.getBlockNumber()
                    .then(n => {
                        n = n - 50
                        rpsgame.getPastEvents(
                            'Play',
                            {
                                // filter: { _to: account.toString() },
                                fromBlock: n,
                                toBlock: 'latest'
                            }
                        ).then(events => setResult4(events[4].returnValues[2]))
                    })
                web3.eth.getBlockNumber()
                    .then(n => {
                        n = n - 50
                        rpsgame.getPastEvents(
                            'Play',
                            {
                                // filter: { _to: account.toString() },
                                fromBlock: n,
                                toBlock: 'latest'
                            }
                        ).then(events => setResult5(events[5].returnValues[2]))
                    })
                web3.eth.getBlockNumber()
                    .then(n => {
                        n = n - 50
                        rpsgame.getPastEvents(
                            'Play',
                            {
                                // filter: { _to: account.toString() },
                                fromBlock: n,
                                toBlock: 'latest'
                            }
                        ).then(events => setResult6(events[6].returnValues[2]))
                    })
                web3.eth.getBlockNumber()
                    .then(n => {
                        n = n - 50
                        rpsgame.getPastEvents(
                            'Play',
                            {
                                // filter: { _to: account.toString() },
                                fromBlock: n,
                                toBlock: 'latest'
                            }
                        ).then(events => setResult7(events[7].returnValues[2]))
                    })
                setCount(count + 1)
                await sleep(3000);
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
                    <DropdownItem header>
                        {userevents[0] !== undefined
                            ?
                            userevents[0].returnValues[0] + " play " + (userevents[0].returnValues[1] / decimal) + " BNB and "
                            :
                            ""
                        }
                        {result0 === false
                            ?
                            "Lose"
                            :
                            "Win"
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {userevents[1] !== undefined
                            ?
                            userevents[1].returnValues[0] + " play " + (userevents[1].returnValues[1] / decimal) + " BNB and "
                            :
                            ""
                        }
                        {result1 === false
                            ?
                            "Lose"
                            :
                            "Win"
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {userevents[2] !== undefined
                            ?
                            userevents[2].returnValues[0] + " play " + (userevents[2].returnValues[1] / decimal) + " BNB and "
                            :
                            ""
                        }
                        {result2 === false
                            ?
                            "Lose"
                            :
                            "Win"
                        }

                    </DropdownItem>
                    <DropdownItem header>
                        {userevents[3] !== undefined
                            ?
                            userevents[3].returnValues[0] + " play " + (userevents[3].returnValues[1] / decimal) + " BNB and "
                            :
                            ""
                        }
                        {result3 === false
                            ?
                            "Lose"
                            :
                            "Win"
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {userevents[4] !== undefined
                            ?
                            userevents[4].returnValues[0] + " play " + (userevents[4].returnValues[1] / decimal) + " BNB and "
                            :
                            ""
                        }
                        {result4 === false
                            ?
                            "Lose"
                            :
                            "Win"
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {userevents[5] !== undefined
                            ?
                            userevents[5].returnValues[0] + " play " + (userevents[5].returnValues[1] / decimal) + " BNB and "
                            :
                            ""
                        }
                        {result5 === false
                            ?
                            "Lose"
                            :
                            "Win"
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {userevents[6] !== undefined
                            ?
                            userevents[6].returnValues[0] + " play " + (userevents[6].returnValues[1] / decimal) + " BNB and "
                            :
                            ""
                        }
                        {result6 === false
                            ?
                            "Lose"
                            :
                            "Win"
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {userevents[7] !== undefined
                            ?
                            userevents[7].returnValues[0] + " play " + (userevents[7].returnValues[1] / decimal) + " BNB and "
                            :
                            ""
                        }
                        {result7 === false
                            ?
                            "Lose"
                            :
                            "Win"
                        }
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}
