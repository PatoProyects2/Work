import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import RpsGame from '../../abis/RpsGame/rpsGame.json'
import chains from '../Blockchain/AvailableChains'

export default function HistoryGames() {
    const [rpsgame, setRpsgame] = useState({});
    const [userevents, setUserevents] = useState({});
    const [account, setAccount] = useState('0x000000000000000000000000000000000000dEaD');
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
    const [result0, setResult0] = useState(undefined);
    const [result1, setResult1] = useState(undefined);
    const [result2, setResult2] = useState(undefined);
    const [result3, setResult3] = useState(undefined);
    const [result4, setResult4] = useState(undefined);
    const [result5, setResult5] = useState(undefined);
    const [result6, setResult6] = useState(undefined);
    const [result7, setResult7] = useState(undefined);
    const [dropdown, setDropdown] = useState(false);

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
            for (let count = 0; count < 1000; count++) {
                web3.eth.getBlockNumber()
                    .then(n => {
                        n = n - 20
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
                            setResult1(events[1].returnValues[2])
                            setResult2(events[2].returnValues[2])
                            setResult3(events[3].returnValues[2])
                            setResult4(events[4].returnValues[2])
                            setResult5(events[5].returnValues[2])
                            setResult6(events[6].returnValues[2])
                            setResult7(events[7].returnValues[2])
                            rpsgame.methods.winLosesRache(events[0].returnValues[0], 0).call().then(loseStreak => setUserlosestreak0(loseStreak))
                            rpsgame.methods.winLosesRache(events[0].returnValues[0], 1).call().then(winStreak => setUserwinstreak0(winStreak))
                            rpsgame.methods.winLosesRache(events[1].returnValues[0], 0).call().then(loseStreak => setUserlosestreak1(loseStreak))
                            rpsgame.methods.winLosesRache(events[1].returnValues[0], 1).call().then(winStreak => setUserwinstreak1(winStreak))
                            rpsgame.methods.winLosesRache(events[2].returnValues[0], 0).call().then(loseStreak => setUserlosestreak2(loseStreak))
                            rpsgame.methods.winLosesRache(events[2].returnValues[0], 1).call().then(winStreak => setUserwinstreak2(winStreak))
                            rpsgame.methods.winLosesRache(events[3].returnValues[0], 0).call().then(loseStreak => setUserlosestreak3(loseStreak))
                            rpsgame.methods.winLosesRache(events[3].returnValues[0], 1).call().then(winStreak => setUserwinstreak3(winStreak))
                            rpsgame.methods.winLosesRache(events[4].returnValues[0], 0).call().then(loseStreak => setUserlosestreak4(loseStreak))
                            rpsgame.methods.winLosesRache(events[4].returnValues[0], 1).call().then(winStreak => setUserwinstreak4(winStreak))
                            rpsgame.methods.winLosesRache(events[5].returnValues[0], 0).call().then(loseStreak => setUserlosestreak5(loseStreak))
                            rpsgame.methods.winLosesRache(events[5].returnValues[0], 1).call().then(winStreak => setUserwinstreak5(winStreak))
                            rpsgame.methods.winLosesRache(events[6].returnValues[0], 0).call().then(loseStreak => setUserlosestreak6(loseStreak))
                            rpsgame.methods.winLosesRache(events[6].returnValues[0], 1).call().then(winStreak => setUserwinstreak6(winStreak))
                            rpsgame.methods.winLosesRache(events[7].returnValues[0], 0).call().then(loseStreak => setUserlosestreak7(loseStreak))
                            rpsgame.methods.winLosesRache(events[7].returnValues[0], 1).call().then(winStreak => setUserwinstreak7(winStreak))
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
                        {userevents[7] !== undefined
                            ?
                            <>
                                {userevents[7].returnValues[0] + " played " + (userevents[7].returnValues[1] / decimal) + " BNB and"}
                                {result7 === false
                                    ?
                                    " lost all "
                                    :
                                    " doubled "
                                }
                                {userlosestreak7 > 0
                                    ?
                                    userlosestreak7 + " times | "
                                    :
                                    ""
                                }
                                {userwinstreak7 > 0
                                    ?
                                    userwinstreak7 + " times | "
                                    :
                                    ""
                                }
                                {((blockchain - userevents[7].blockNumber) * 3) + " seconds ago"}
                            </>
                            :
                            ""
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {userevents[6] !== undefined
                            ?
                            <>
                                {userevents[6].returnValues[0] + " played " + (userevents[6].returnValues[1] / decimal) + " BNB and"}
                                {result6 === false
                                    ?
                                    " lost all "
                                    :
                                    " doubled "
                                }
                                {userlosestreak6 > 0
                                    ?
                                    userlosestreak6 + " times | "
                                    :
                                    ""
                                }
                                {userwinstreak6 > 0
                                    ?
                                    userwinstreak6 + " times | "
                                    :
                                    ""
                                }
                                {((blockchain - userevents[6].blockNumber) * 3) + " seconds ago"}
                            </>
                            :
                            ""
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {userevents[5] !== undefined
                            ?
                            <>
                                {userevents[5].returnValues[0] + " played " + (userevents[5].returnValues[1] / decimal) + " BNB and"}
                                {result5 === false
                                    ?
                                    " lost all "
                                    :
                                    " doubled "
                                }
                                {userlosestreak5 > 0
                                    ?
                                    userlosestreak5 + " times | "
                                    :
                                    ""
                                }
                                {userwinstreak5 > 0
                                    ?
                                    userwinstreak5 + " times | "
                                    :
                                    ""
                                }
                                {((blockchain - userevents[5].blockNumber) * 3) + " seconds ago"}
                            </>
                            :
                            ""
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {userevents[4] !== undefined
                            ?
                            <>
                                {userevents[4].returnValues[0] + " played " + (userevents[4].returnValues[1] / decimal) + " BNB and"}
                                {result4 === false
                                    ?
                                    " lost all "
                                    :
                                    " doubled "
                                }
                                {userlosestreak4 > 0
                                    ?
                                    userlosestreak4 + " times | "
                                    :
                                    ""
                                }
                                {userwinstreak4 > 0
                                    ?
                                    userwinstreak4 + " times | "
                                    :
                                    ""
                                }
                                {((blockchain - userevents[4].blockNumber) * 3) + " seconds ago"}
                            </>
                            :
                            ""
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {userevents[3] !== undefined
                            ?
                            <>
                                {userevents[3].returnValues[0] + " played " + (userevents[3].returnValues[1] / decimal) + " BNB and"}
                                {result3 === false
                                    ?
                                    " lost all "
                                    :
                                    " doubled "
                                }
                                {userlosestreak3 > 0
                                    ?
                                    userlosestreak3 + " times | "
                                    :
                                    ""
                                }
                                {userwinstreak3 > 0
                                    ?
                                    userwinstreak3 + " times | "
                                    :
                                    ""
                                }
                                {((blockchain - userevents[3].blockNumber) * 3) + " seconds ago"}
                            </>
                            :
                            ""
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {userevents[2] !== undefined
                            ?
                            <>
                                {userevents[2].returnValues[0] + " played " + (userevents[2].returnValues[1] / decimal) + " BNB and"}
                                {result2 === false
                                    ?
                                    " lost all "
                                    :
                                    " doubled "
                                }
                                {userlosestreak2 > 0
                                    ?
                                    userlosestreak2 + " times | "
                                    :
                                    ""
                                }
                                {userwinstreak2 > 0
                                    ?
                                    userwinstreak2 + " times | "
                                    :
                                    ""
                                }
                                {((blockchain - userevents[2].blockNumber) * 3) + " seconds ago"}
                            </>
                            :
                            ""
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {userevents[1] !== undefined
                            ?
                            <>
                                {userevents[1].returnValues[0] + " played " + (userevents[1].returnValues[1] / decimal) + " BNB and"}
                                {result1 === false
                                    ?
                                    " lost all "
                                    :
                                    " doubled "
                                }
                                {userlosestreak1 > 0
                                    ?
                                    userlosestreak1 + " times | "
                                    :
                                    ""
                                }
                                {userwinstreak1 > 0
                                    ?
                                    userwinstreak1 + " times | "
                                    :
                                    ""
                                }
                                {((blockchain - userevents[1].blockNumber) * 3) + " seconds ago"}
                            </>
                            :
                            ""
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {userevents[0] !== undefined
                            ?
                            <>
                                {userevents[0].returnValues[0] + " played " + (userevents[0].returnValues[1] / decimal) + " BNB and"}
                                {result0 === false
                                    ?
                                    " lost all "
                                    :
                                    " doubled "
                                }
                                {userlosestreak0 > 0
                                    ?
                                    userlosestreak0 + " times | "
                                    :
                                    ""
                                }
                                {userwinstreak0 > 0
                                    ?
                                    userwinstreak0 + " times | "
                                    :
                                    ""
                                }
                                {((blockchain - userevents[0].blockNumber) * 3) + " seconds ago"}
                            </>
                            :
                            ""
                        }
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}
