import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import RpsGame from '../../abis/RpsGame/rpsGame.json'
import chains from '../Blockchain/AvailableChains'

export default function HistoryGames() {
    const [rpsgame, setRpsgame] = useState({});
    const [userevents, setUserevents] = useState({});
    const [account, setAccount] = useState('0x000000000000000000000000000000000000dEaD');
    const [account0, setAccount0] = useState('0x000000000000000000000000000000000000dEaD');
    const [account1, setAccount1] = useState('0x000000000000000000000000000000000000dEaD');
    const [account2, setAccount2] = useState('0x000000000000000000000000000000000000dEaD');
    const [account3, setAccount3] = useState('0x000000000000000000000000000000000000dEaD');
    const [account4, setAccount4] = useState('0x000000000000000000000000000000000000dEaD');
    const [account5, setAccount5] = useState('0x000000000000000000000000000000000000dEaD');
    const [account6, setAccount6] = useState('0x000000000000000000000000000000000000dEaD');
    const [account7, setAccount7] = useState('0x000000000000000000000000000000000000dEaD');
    const [decimal, setDecimal] = useState(1000000000000000000);
    const [blockchain, setBlockchain] = useState(0);
    const [userwinstreak0, setUserwinstreak0] = useState(0);
    const [userwinstreak1, setUserwinstreak1] = useState(0);
    const [userwinstreak2, setUserwinstreak2] = useState(0);
    const [userwinstreak3, setUserwinstreak3] = useState(0);
    const [userwinstreak4, setUserwinstreak4] = useState(0);
    const [userwinstreak5, setUserwinstreak5] = useState(0);
    const [userwinstreak6, setUserwinstreak6] = useState(0);
    const [userwinstreak7, setUserwinstreak7] = useState(0);
    const [userlosestreak0, setUserlosestreak0] = useState(0);
    const [userlosestreak1, setUserlosestreak1] = useState(0);
    const [userlosestreak2, setUserlosestreak2] = useState(0);
    const [userlosestreak3, setUserlosestreak3] = useState(0);
    const [userlosestreak4, setUserlosestreak4] = useState(0);
    const [userlosestreak5, setUserlosestreak5] = useState(0);
    const [userlosestreak6, setUserlosestreak6] = useState(0);
    const [userlosestreak7, setUserlosestreak7] = useState(0);
    const [dropdown, setDropdown] = useState(false);
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
            const rpsgame = new web3.eth.Contract(RpsGame.abi, chainInUse.rpsGameAddress)
            setRpsgame(rpsgame)
            for (let count = 0; count < 2; count++) {
                web3.eth.getBlockNumber()
                    .then(n => {
                        n = n - 2000
                        rpsgame.getPastEvents(
                            'Play',
                            {
                                // filter: { _to: account.toString() },
                                fromBlock: n,
                                toBlock: 'latest'
                            }
                        ).then(events => {
                            setUserevents(events)
                            setResult0(events[0].returnValues[2])
                        })
                    })
                web3.eth.getBlockNumber()
                    .then(n => setBlockchain(n))

                console.log(count)
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
                            userevents[0].returnValues[0] + " play " + (userevents[0].returnValues[1] / decimal) + " BNB and"
                            :
                            ""
                        }
                        {result0 === false
                            ?
                            " lose all | "
                            :
                            " doubled | "
                        }
                        {userevents[0] !== undefined
                            ?
                            ((blockchain - userevents[0].blockNumber) * 3) + " seconds ago"
                            :
                            " "
                        }
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}
