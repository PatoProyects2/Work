import React, { useState, useEffect } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import RpsGame from '../../abis/RpsGame/rpsGame.json'
import { rpsGameContract } from '../../components/blockchain/Contracts'
import { doc, getDoc } from "firebase/firestore";
import db from '../../firebase/firesbaseConfig'

export default function HistoryGames(props) {
    const [rpsgame, setRpsgame] = useState({});
    const [dropdown, setDropdown] = useState(false);
    const [decimal, setDecimal] = useState(1000000000000000000);
    const [blockchain, setBlockchain] = useState(0);
    const [events, setEvents] = useState({});
    const [userdata0, setUserdata0] = useState({ name1: '' });
    const [userdata1, setUserdata1] = useState({ name1: '' });
    const [userdata2, setUserdata2] = useState({ name1: '' });
    const [userdata3, setUserdata3] = useState({ name1: '' });
    const [userdata4, setUserdata4] = useState({ name1: '' });
    const [userdata5, setUserdata5] = useState({ name1: '' });
    const [userdata6, setUserdata6] = useState({ name1: '' });
    const [userdata7, setUserdata7] = useState({ name1: '' });

    useEffect(() => {
        readEvents(props.web3)
    }, [props.web3]);

    async function readEvents(web3) {
        const rpsgame = new web3.eth.Contract(RpsGame.abi, rpsGameContract)
        setRpsgame(rpsgame)
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
        for (let i = 0; i < 2000; i++) {
            let actuallBlock = await web3.eth.getBlockNumber()
            setBlockchain(actuallBlock)
            let lastMinuteBlock = actuallBlock - 28
            try {
                let events = await rpsgame.getPastEvents('Play', { fromBlock: lastMinuteBlock, toBlock: 'latest' })
                setEvents(events)
                const userData0 = await getDoc(doc(db, "users", events[0].returnValues[0].toLowerCase()))
                setUserdata0(userData0.data())
                const userData1 = await getDoc(doc(db, "users", events[1].returnValues[0].toLowerCase()))
                setUserdata1(userData1.data())
                const userData2 = await getDoc(doc(db, "users", events[2].returnValues[0].toLowerCase()))
                setUserdata2(userData2.data())
                const userData3 = await getDoc(doc(db, "users", events[3].returnValues[0].toLowerCase()))
                setUserdata3(userData3.data())
                const userData4 = await getDoc(doc(db, "users", events[4].returnValues[0].toLowerCase()))
                setUserdata4(userData4.data())
                const userData5 = await getDoc(doc(db, "users", events[5].returnValues[0].toLowerCase()))
                setUserdata5(userData5.data())
                const userData6 = await getDoc(doc(db, "users", events[6].returnValues[0].toLowerCase()))
                setUserdata6(userData6.data())
                const userData7 = await getDoc(doc(db, "users", events[7].returnValues[0].toLowerCase()))
                setUserdata7(userData7.data())
            } catch (e) {

            }
            await sleep(2000)
        }
    }

    const toggleMenu = () => {
        setDropdown(!dropdown);
    }

    return (
        <>
            <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="sm">
                <DropdownToggle caret>
                    LIVEPLAYS
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>
                        {events[7] !== undefined
                            ?
                            <>
                                {userdata7.name1 + " played " + (events[7].returnValues[1] / decimal) + " MATIC and"}
                                {events[7].returnValues[2] === false ? " lost all " : ""}{events[7].returnValues[2] === true ? " doubled " : ""}
                                {((blockchain - events[7].blockNumber) * 2) + " seconds ago"}
                            </>
                            :
                            ""
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {events[6] !== undefined
                            ?
                            <>
                                {userdata6.name1 + " played " + (events[6].returnValues[1] / decimal) + " MATIC and"}
                                {events[6].returnValues[2] === false ? " lost all " : ""}{events[6].returnValues[2] === true ? " doubled " : ""}
                                {((blockchain - events[6].blockNumber) * 2) + " seconds ago"}
                            </>
                            :
                            ""
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {events[5] !== undefined
                            ?
                            <>
                                {userdata5.name1 + " played " + (events[5].returnValues[1] / decimal) + " MATIC and"}
                                {events[5].returnValues[2] === false ? " lost all " : ""}{events[5].returnValues[2] === true ? " doubled " : ""}
                                {((blockchain - events[5].blockNumber) * 2) + " seconds ago"}
                            </>
                            :
                            ""
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {events[4] !== undefined
                            ?
                            <>
                                {userdata4.name1 + " played " + (events[4].returnValues[1] / decimal) + " MATIC and"}
                                {events[4].returnValues[2] === false ? " lost all " : ""}{events[4].returnValues[2] === true ? " doubled " : ""}
                                {((blockchain - events[4].blockNumber) * 2) + " seconds ago"}
                            </>
                            :
                            ""
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {events[3] !== undefined
                            ?
                            <>
                                {userdata3.name1 + " played " + (events[3].returnValues[1] / decimal) + " MATIC and"}
                                {events[3].returnValues[2] === false ? " lost all " : ""}{events[3].returnValues[2] === true ? " doubled " : ""}
                                {((blockchain - events[3].blockNumber) * 2) + " seconds ago"}
                            </>
                            :
                            ""
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {events[2] !== undefined
                            ?
                            <>
                                {userdata2.name1 + " played " + (events[2].returnValues[1] / decimal) + " MATIC and"}
                                {events[2].returnValues[2] === false ? " lost all " : ""}{events[2].returnValues[2] === true ? " doubled " : ""}
                                {((blockchain - events[2].blockNumber) * 2) + " seconds ago"}
                            </>
                            :
                            ""
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {events[1] !== undefined
                            ?
                            <>
                                {userdata1.name1 + " played " + (events[1].returnValues[1] / decimal) + " MATIC and"}
                                {events[1].returnValues[2] === false ? " lost all " : ""}{events[1].returnValues[2] === true ? " doubled " : ""}
                                {((blockchain - events[1].blockNumber) * 2) + " seconds ago"}
                            </>
                            :
                            ""
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {events[0] !== undefined
                            ?
                            <>
                                {userdata0.name1 + " played " + (events[0].returnValues[1] / decimal) + " MATIC and"}
                                {events[0].returnValues[2] === false ? " lost all " : ""}{events[0].returnValues[2] === true ? " doubled " : ""}
                                {((blockchain - events[0].blockNumber) * 2) + " seconds ago"}
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
