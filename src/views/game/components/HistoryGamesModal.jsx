import React, { useState, useEffect } from 'react'
import { doc, getDoc } from "firebase/firestore";
import db from '../../../firebase/firesbaseConfig'

export default function HistoryGamesModal(props) {
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
    const [userdata8, setUserdata8] = useState({ name1: '' });
    const [userdata9, setUserdata9] = useState({ name1: '' });
    const [userdata10, setUserdata10] = useState({ name1: '' });
    const [userdata11, setUserdata11] = useState({ name1: '' });

    useEffect(() => {
        readEvents(props.web3, props.rpsgame)
    }, [props.web3, props.rpsgame]);

    async function readEvents(web3, rpsgame) {
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
        try {
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
                    const userData8 = await getDoc(doc(db, "users", events[8].returnValues[0].toLowerCase()))
                    setUserdata8(userData8.data())
                    const userData9 = await getDoc(doc(db, "users", events[9].returnValues[0].toLowerCase()))
                    setUserdata9(userData9.data())
                    const userData10 = await getDoc(doc(db, "users", events[10].returnValues[0].toLowerCase()))
                    setUserdata10(userData10.data())
                    const userData11 = await getDoc(doc(db, "users", events[11].returnValues[0].toLowerCase()))
                    setUserdata11(userData11.data())
                } catch (e) {

                }
                await sleep(2000)
            }
        } catch (e) {

        }
    }

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td>
                            {events[11] !== undefined
                                ?
                                <>
                                    {userdata11.name1 + " played " + (events[11].returnValues[1] / decimal) + " MATIC and"}
                                    {events[11].returnValues[2] === false ? " lost all " : ""}{events[11].returnValues[2] === true ? " doubled " : ""}
                                    {((blockchain - events[11].blockNumber) * 2) < 0 || ((blockchain - events[11].blockNumber) * 2) === 0 ? "now" : ((blockchain - events[11].blockNumber) * 2) + " seconds ago"}
                                </>
                                :
                                ""
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {events[10] !== undefined
                                ?
                                <>
                                    {userdata10.name1 + " played " + (events[10].returnValues[1] / decimal) + " MATIC and"}
                                    {events[10].returnValues[2] === false ? " lost all " : ""}{events[10].returnValues[2] === true ? " doubled " : ""}
                                    {((blockchain - events[10].blockNumber) * 2) < 0 || ((blockchain - events[10].blockNumber) * 2) === 0 ? "now" : ((blockchain - events[10].blockNumber) * 2) + " seconds ago"}
                                </>
                                :
                                ""
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>

                            {events[9] !== undefined
                                ?
                                <>
                                    {userdata9.name1 + " played " + (events[9].returnValues[1] / decimal) + " MATIC and"}
                                    {events[9].returnValues[2] === false ? " lost all " : ""}{events[9].returnValues[2] === true ? " doubled " : ""}
                                    {((blockchain - events[9].blockNumber) * 2) < 0 || ((blockchain - events[9].blockNumber) * 2) === 0 ? "now" : ((blockchain - events[9].blockNumber) * 2) + " seconds ago"}
                                </>
                                :
                                ""
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {events[8] !== undefined
                                ?
                                <>
                                    {userdata8.name1 + " played " + (events[8].returnValues[1] / decimal) + " MATIC and"}
                                    {events[8].returnValues[2] === false ? " lost all " : ""}{events[8].returnValues[2] === true ? " doubled " : ""}
                                    {((blockchain - events[8].blockNumber) * 2) < 0 || ((blockchain - events[8].blockNumber) * 2) === 0 ? "now" : ((blockchain - events[8].blockNumber) * 2) + " seconds ago"}
                                </>
                                :
                                ""
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {events[7] !== undefined
                                ?
                                <>
                                    {userdata7.name1 + " played " + (events[7].returnValues[1] / decimal) + " MATIC and"}
                                    {events[7].returnValues[2] === false ? " lost all " : ""}{events[7].returnValues[2] === true ? " doubled " : ""}
                                    {((blockchain - events[7].blockNumber) * 2) < 0 || ((blockchain - events[7].blockNumber) * 2) === 0 ? "now" : ((blockchain - events[7].blockNumber) * 2) + " seconds ago"}
                                </>
                                :
                                ""
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {events[6] !== undefined
                                ?
                                <>
                                    {userdata6.name1 + " played " + (events[6].returnValues[1] / decimal) + " MATIC and"}
                                    {events[6].returnValues[2] === false ? " lost all " : ""}{events[6].returnValues[2] === true ? " doubled " : ""}
                                    {((blockchain - events[6].blockNumber) * 2) < 0 || ((blockchain - events[6].blockNumber) * 2) === 0 ? "now" : ((blockchain - events[6].blockNumber) * 2) + " seconds ago"}
                                </>
                                :
                                ""
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {events[5] !== undefined
                                ?
                                <>
                                    {userdata5.name1 + " played " + (events[5].returnValues[1] / decimal) + " MATIC and"}
                                    {events[5].returnValues[2] === false ? " lost all " : ""}{events[5].returnValues[2] === true ? " doubled " : ""}
                                    {((blockchain - events[5].blockNumber) * 2) < 0 || ((blockchain - events[5].blockNumber) * 2) === 0 ? "now" : ((blockchain - events[5].blockNumber) * 2) + " seconds ago"}
                                </>
                                :
                                ""
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {events[4] !== undefined
                                ?
                                <>
                                    {userdata4.name1 + " played " + (events[4].returnValues[1] / decimal) + " MATIC and"}
                                    {events[4].returnValues[2] === false ? " lost all " : ""}{events[4].returnValues[2] === true ? " doubled " : ""}
                                    {((blockchain - events[4].blockNumber) * 2) < 0 || ((blockchain - events[4].blockNumber) * 2) === 0 ? "now" : ((blockchain - events[4].blockNumber) * 2) + " seconds ago"}
                                </>
                                :
                                ""
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {events[3] !== undefined
                                ?
                                <>
                                    {userdata3.name1 + " played " + (events[3].returnValues[1] / decimal) + " MATIC and"}
                                    {events[3].returnValues[2] === false ? " lost all " : ""}{events[3].returnValues[2] === true ? " doubled " : ""}
                                    {((blockchain - events[3].blockNumber) * 2) < 0 || ((blockchain - events[3].blockNumber) * 2) === 0 ? "now" : ((blockchain - events[3].blockNumber) * 2) + " seconds ago"}
                                </>
                                :
                                ""
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {events[2] !== undefined
                                ?
                                <>
                                    {userdata2.name1 + " played " + (events[2].returnValues[1] / decimal) + " MATIC and"}
                                    {events[2].returnValues[2] === false ? " lost all " : ""}{events[2].returnValues[2] === true ? " doubled " : ""}
                                    {((blockchain - events[2].blockNumber) * 2) < 0 || ((blockchain - events[2].blockNumber) * 2) === 0 ? "now" : ((blockchain - events[2].blockNumber) * 2) + " seconds ago"}
                                </>
                                :
                                ""
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {events[1] !== undefined
                                ?
                                <>
                                    {userdata1.name1 + " played " + (events[1].returnValues[1] / decimal) + " MATIC and"}
                                    {events[1].returnValues[2] === false ? " lost all " : ""}{events[1].returnValues[2] === true ? " doubled " : ""}
                                    {((blockchain - events[1].blockNumber) * 2) < 0 || ((blockchain - events[1].blockNumber) * 2) === 0 ? "now" : ((blockchain - events[1].blockNumber) * 2) + " seconds ago"}
                                </>
                                :
                                ""
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {events[0] !== undefined
                                ?
                                <>
                                    {userdata0.name1 + " played " + (events[0].returnValues[1] / decimal) + " MATIC and"}
                                    {events[0].returnValues[2] === false ? " lost all " : ""}{events[0].returnValues[2] === true ? " doubled " : ""}
                                    {((blockchain - events[0].blockNumber) * 2) < 0 || ((blockchain - events[0].blockNumber) * 2) === 0 ? "now" : ((blockchain - events[0].blockNumber) * 2) + " seconds ago"}
                                </>
                                :
                                ""
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
