import React, { useState, useEffect } from 'react'
import { doc, getDoc } from "firebase/firestore";
import db from '../../../firebase/firesbaseConfig'
export default function HistoryGamesModal(props) {
    const [blockchain, setBlockchain] = useState(0);
    const [dropdown, setDropdown] = useState(false);
    const [eventsmodal, setEventsmodal] = useState({});
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
    const [userpic0, setUserpic0] = useState('');
    const [userpic1, setUserpic1] = useState('');
    const [userpic2, setUserpic2] = useState('');
    const [userpic3, setUserpic3] = useState('');
    const [userpic4, setUserpic4] = useState('');
    const [userpic5, setUserpic5] = useState('');
    const [userpic6, setUserpic6] = useState('');
    const [userpic7, setUserpic7] = useState('');
    const [userpic8, setUserpic8] = useState('');
    const [userpic9, setUserpic9] = useState('');
    const [userpic10, setUserpic10] = useState('');
    const [userpic11, setUserpic11] = useState('');

    useEffect(() => {
        const timer = setInterval(() => { loadHistoryUserPlays(props.web3, props.rpsgame) }, 5000);
        return () => clearTimeout(timer);
    }, [props.web3, props.rpsgame])

    const loadHistoryUserPlays = async (web3, rpsgame) => {
        try {
            const actuallBlock = await web3.eth.getBlockNumber()
            setBlockchain(actuallBlock)
            const lastMinuteBlock = actuallBlock - 25
            const eventsmodal = await rpsgame.getPastEvents('Play', { fromBlock: lastMinuteBlock, toBlock: 'latest' })
            setEventsmodal(eventsmodal)
            const userData0 = await getDoc(doc(db, "users", eventsmodal[0].returnValues[0].toLowerCase()))
            const picPath0 = userData0.data().pic1
            const profilePhoto0 = await import(`../../../assets/imgs/profile/${picPath0}`)
            setUserdata0(userData0.data())
            setUserpic0(profilePhoto0.default)
            const userData1 = await getDoc(doc(db, "users", eventsmodal[1].returnValues[0].toLowerCase()))
            const picPath1 = userData1.data().pic1
            const profilePhoto1 = await import(`../../../assets/imgs/profile/${picPath1}`)
            setUserdata1(userData1.data())
            setUserpic1(profilePhoto1.default)
            const userData2 = await getDoc(doc(db, "users", eventsmodal[2].returnValues[0].toLowerCase()))
            const picPath2 = userData2.data().pic1
            const profilePhoto2 = await import(`../../../assets/imgs/profile/${picPath2}`)
            setUserdata2(userData2.data())
            setUserpic2(profilePhoto2.default)
            const userData3 = await getDoc(doc(db, "users", eventsmodal[3].returnValues[0].toLowerCase()))
            const picPath3 = userData3.data().pic1
            const profilePhoto3 = await import(`../../../assets/imgs/profile/${picPath3}`)
            setUserdata3(userData3.data())
            setUserpic3(profilePhoto3.default)
            const userData4 = await getDoc(doc(db, "users", eventsmodal[4].returnValues[0].toLowerCase()))
            const picPath4 = userData4.data().pic1
            const profilePhoto4 = await import(`../../../assets/imgs/profile/${picPath4}`)
            setUserdata4(userData4.data())
            setUserpic4(profilePhoto4.default)
            const userData5 = await getDoc(doc(db, "users", eventsmodal[5].returnValues[0].toLowerCase()))
            const picPath5 = userData5.data().pic1
            const profilePhoto5 = await import(`../../../assets/imgs/profile/${picPath5}`)
            setUserdata5(userData5.data())
            setUserpic5(profilePhoto5.default)
            const userData6 = await getDoc(doc(db, "users", eventsmodal[6].returnValues[0].toLowerCase()))
            const picPath6 = userData6.data().pic1
            const profilePhoto6 = await import(`../../../assets/imgs/profile/${picPath6}`)
            setUserdata6(userData6.data())
            setUserpic6(profilePhoto6.default)
            const userData7 = await getDoc(doc(db, "users", eventsmodal[7].returnValues[0].toLowerCase()))
            const picPath7 = userData7.data().pic1
            const profilePhoto7 = await import(`../../../assets/imgs/profile/${picPath7}`)
            setUserdata7(userData7.data())
            setUserpic7(profilePhoto7.default)
            const userData8 = await getDoc(doc(db, "users", eventsmodal[8].returnValues[0].toLowerCase()))
            const picPath8 = userData8.data().pic1
            const profilePhoto8 = await import(`../../../assets/imgs/profile/${picPath8}`)
            setUserdata8(userData8.data())
            setUserpic8(profilePhoto8.default)
            const userData9 = await getDoc(doc(db, "users", eventsmodal[9].returnValues[0].toLowerCase()))
            const picPath9 = userData9.data().pic1
            const profilePhoto9 = await import(`../../../assets/imgs/profile/${picPath9}`)
            setUserdata9(userData9.data())
            setUserpic9(profilePhoto9.default)
            const userData10 = await getDoc(doc(db, "users", eventsmodal[10].returnValues[0].toLowerCase()))
            const picPath10 = userData10.data().pic1
            const profilePhoto10 = await import(`../../../assets/imgs/profile/${picPath10}`)
            setUserdata10(userData10.data())
            setUserpic10(profilePhoto10.default)
            const userData11 = await getDoc(doc(db, "users", eventsmodal[11].returnValues[0].toLowerCase()))
            const picPath11 = userData11.data().pic1
            const profilePhoto11 = await import(`../../../assets/imgs/profile/${picPath11}`)
            setUserdata11(userData11.data())
            setUserpic11(profilePhoto11.default)
        } catch (e) {

        }
    }
    return (
        <>
            <h3 className="text-center mt-2">Recent Plays</h3>
            <div className="container">
                <div className="play-list">
                    <ul className="list-group">
                        {eventsmodal[11] !== undefined
                            ?
                            <li className={`d-flex list-group-item list-group-item-action ${props.theme === 'dark' ? 'dark-list-item' : ''}`}>
                                <div className="title mb-auto ms-2">
                                    {userpic11 && <img width="35" height="35" className="rounded-circle" alt="" src={userpic11} />}
                                    {" " + userdata11.name1 + " played " + (eventsmodal[11].returnValues[1] / props.decimal) + " MATIC and"}
                                    <span style={{ color: eventsmodal[11].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                        {eventsmodal[11].returnValues[3] === false ? " lost all " : ""}{eventsmodal[11].returnValues[3] === true ? " doubled " : ""}
                                    </span>
                                    {eventsmodal[11].returnValues[2] > 1 ? eventsmodal[11].returnValues[2] + " times " : ""}
                                </div>
                                <small className="ms-auto mt-auto time-in-row">
                                    {((blockchain - eventsmodal[11].blockNumber) * 2) < 0 || ((blockchain - eventsmodal[11].blockNumber) * 2) === 0 ? "now" : ((blockchain - eventsmodal[11].blockNumber) * 2) + " seconds ago"}
                                </small>
                            </li>
                            :
                            ""
                        }
                        {eventsmodal[10] !== undefined
                            ?
                            <li className={`d-flex list-group-item list-group-item-action ${props.theme === 'dark' ? 'dark-list-item' : ''}`}>
                                <div className="title mb-auto ms-2">
                                    {userpic10 && <img width="35" height="35" className="rounded-circle" alt="" src={userpic10} />}
                                    {" " + userdata10.name1 + " played " + (eventsmodal[10].returnValues[1] / props.decimal) + " MATIC and"}
                                    <span style={{ color: eventsmodal[10].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                        {eventsmodal[10].returnValues[3] === false ? " lost all " : ""}{eventsmodal[10].returnValues[3] === true ? " doubled " : ""}
                                    </span>
                                    {eventsmodal[10].returnValues[2] > 1 ? eventsmodal[10].returnValues[2] + " times " : ""}
                                </div>
                                <small className="ms-auto mt-auto time-in-row">
                                    {((blockchain - eventsmodal[10].blockNumber) * 2) < 0 || ((blockchain - eventsmodal[10].blockNumber) * 2) === 0 ? "now" : ((blockchain - eventsmodal[10].blockNumber) * 2) + " seconds ago"}
                                </small>
                            </li>
                            :
                            ""
                        }
                        {eventsmodal[9] !== undefined
                            ?
                            <li className={`d-flex list-group-item list-group-item-action ${props.theme === 'dark' ? 'dark-list-item' : ''}`}>
                                <div className="title mb-auto ms-2">
                                    {userpic9 && <img width="35" height="35" className="rounded-circle" alt="" src={userpic9} />}
                                    {" " + userdata9.name1 + " played " + (eventsmodal[9].returnValues[1] / props.decimal) + " MATIC and"}
                                    <span style={{ color: eventsmodal[9].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                        {eventsmodal[9].returnValues[3] === false ? " lost all " : ""}{eventsmodal[9].returnValues[3] === true ? " doubled " : ""}
                                    </span>
                                    {eventsmodal[9].returnValues[2] > 1 ? eventsmodal[9].returnValues[2] + " times " : ""}
                                </div>
                                <small className="ms-auto mt-auto time-in-row">
                                    {((blockchain - eventsmodal[9].blockNumber) * 2) < 0 || ((blockchain - eventsmodal[9].blockNumber) * 2) === 0 ? "now" : ((blockchain - eventsmodal[9].blockNumber) * 2) + " seconds ago"}
                                </small>
                            </li>
                            :
                            ""
                        }
                        {eventsmodal[8] !== undefined
                            ?
                            <li className={`d-flex list-group-item list-group-item-action ${props.theme === 'dark' ? 'dark-list-item' : ''}`}>
                                <div className="title mb-auto ms-2">
                                    {userpic8 && <img width="35" height="35" className="rounded-circle" alt="" src={userpic8} />}
                                    {" " + userdata8.name1 + " played " + (eventsmodal[8].returnValues[1] / props.decimal) + " MATIC and"}
                                    <span style={{ color: eventsmodal[8].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                        {eventsmodal[8].returnValues[3] === false ? " lost all " : ""}{eventsmodal[8].returnValues[3] === true ? " doubled " : ""}
                                    </span>
                                    {eventsmodal[8].returnValues[2] > 1 ? eventsmodal[8].returnValues[2] + " times " : ""}
                                </div>
                                <small className="ms-auto mt-auto time-in-row">
                                    {((blockchain - eventsmodal[8].blockNumber) * 2) < 0 || ((blockchain - eventsmodal[8].blockNumber) * 2) === 0 ? "now" : ((blockchain - eventsmodal[8].blockNumber) * 2) + " seconds ago"}
                                </small>
                            </li>
                            :
                            ""
                        }
                        {eventsmodal[7] !== undefined
                            ?
                            <li className={`d-flex list-group-item list-group-item-action ${props.theme === 'dark' ? 'dark-list-item' : ''}`}>
                                <div className="title mb-auto ms-2">
                                    {userpic7 && <img width="35" height="35" className="rounded-circle" alt="" src={userpic7} />}
                                    {" " + userdata7.name1 + " played " + (eventsmodal[7].returnValues[1] / props.decimal) + " MATIC and"}
                                    <span style={{ color: eventsmodal[7].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                        {eventsmodal[7].returnValues[3] === false ? " lost all " : ""}{eventsmodal[7].returnValues[3] === true ? " doubled " : ""}
                                    </span>
                                    {eventsmodal[7].returnValues[2] > 1 ? eventsmodal[7].returnValues[2] + " times " : ""}
                                </div>
                                <small className="ms-auto mt-auto time-in-row">
                                    {((blockchain - eventsmodal[7].blockNumber) * 2) < 0 || ((blockchain - eventsmodal[7].blockNumber) * 2) === 0 ? "now" : ((blockchain - eventsmodal[7].blockNumber) * 2) + " seconds ago"}
                                </small>
                            </li>
                            :
                            ""
                        }
                        {eventsmodal[6] !== undefined
                            ?
                            <li className={`d-flex list-group-item list-group-item-action ${props.theme === 'dark' ? 'dark-list-item' : ''}`}>
                                <div className="title mb-auto ms-2">
                                    {userpic6 && <img width="35" height="35" className="rounded-circle" alt="" src={userpic6} />}
                                    {" " + userdata6.name1 + " played " + (eventsmodal[6].returnValues[1] / props.decimal) + " MATIC and"}
                                    <span style={{ color: eventsmodal[6].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                        {eventsmodal[6].returnValues[3] === false ? " lost all " : ""}{eventsmodal[6].returnValues[3] === true ? " doubled " : ""}
                                    </span>
                                    {eventsmodal[6].returnValues[2] > 1 ? eventsmodal[6].returnValues[2] + " times " : ""}
                                </div>
                                <small className="ms-auto mt-auto time-in-row">
                                    {((blockchain - eventsmodal[6].blockNumber) * 2) < 0 || ((blockchain - eventsmodal[6].blockNumber) * 2) === 0 ? "now" : ((blockchain - eventsmodal[6].blockNumber) * 2) + " seconds ago"}
                                </small>
                            </li>
                            :
                            ""
                        }
                        {eventsmodal[5] !== undefined
                            ?
                            <li className={`d-flex list-group-item list-group-item-action ${props.theme === 'dark' ? 'dark-list-item' : ''}`}>
                                <div className="title mb-auto ms-2">
                                    {userpic5 && <img width="35" height="35" className="rounded-circle" alt="" src={userpic5} />}
                                    {" " + userdata5.name1 + " played " + (eventsmodal[5].returnValues[1] / props.decimal) + " MATIC and"}
                                    <span style={{ color: eventsmodal[5].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                        {eventsmodal[5].returnValues[3] === false ? " lost all " : ""}{eventsmodal[5].returnValues[3] === true ? " doubled " : ""}
                                    </span>
                                    {eventsmodal[5].returnValues[2] > 1 ? eventsmodal[5].returnValues[2] + " times " : ""}
                                </div>
                                <small className="ms-auto mt-auto time-in-row">
                                    {((blockchain - eventsmodal[5].blockNumber) * 2) < 0 || ((blockchain - eventsmodal[5].blockNumber) * 2) === 0 ? "now" : ((blockchain - eventsmodal[5].blockNumber) * 2) + " seconds ago"}
                                </small>
                            </li>
                            :
                            ""
                        }
                        {eventsmodal[4] !== undefined
                            ?
                            <li className={`d-flex list-group-item list-group-item-action ${props.theme === 'dark' ? 'dark-list-item' : ''}`}>
                                <div className="title mb-auto ms-2">
                                    {userpic4 && <img width="35" height="35" className="rounded-circle" alt="" src={userpic4} />}
                                    {" " + userdata4.name1 + " played " + (eventsmodal[4].returnValues[1] / props.decimal) + " MATIC and"}
                                    <span style={{ color: eventsmodal[4].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                        {eventsmodal[4].returnValues[3] === false ? " lost all " : ""}{eventsmodal[4].returnValues[3] === true ? " doubled " : ""}
                                    </span>
                                    {eventsmodal[4].returnValues[2] > 1 ? eventsmodal[4].returnValues[2] + " times " : ""}
                                </div>
                                <small className="ms-auto mt-auto time-in-row">
                                    {((blockchain - eventsmodal[4].blockNumber) * 2) < 0 || ((blockchain - eventsmodal[4].blockNumber) * 2) === 0 ? "now" : ((blockchain - eventsmodal[4].blockNumber) * 2) + " seconds ago"}
                                </small>
                            </li>
                            :
                            ""
                        }
                        {eventsmodal[3] !== undefined
                            ?
                            <li className={`d-flex list-group-item list-group-item-action ${props.theme === 'dark' ? 'dark-list-item' : ''}`}>
                                <div className="title mb-auto ms-2">
                                    {userpic3 && <img width="35" height="35" className="rounded-circle" alt="" src={userpic3} />}
                                    {" " + userdata3.name1 + " played " + (eventsmodal[3].returnValues[1] / props.decimal) + " MATIC and"}
                                    <span style={{ color: eventsmodal[3].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                        {eventsmodal[3].returnValues[3] === false ? " lost all " : ""}{eventsmodal[3].returnValues[3] === true ? " doubled " : ""}
                                    </span>
                                    {eventsmodal[3].returnValues[2] > 1 ? eventsmodal[3].returnValues[2] + " times " : ""}
                                </div>
                                <small className="ms-auto mt-auto time-in-row">
                                    {((blockchain - eventsmodal[3].blockNumber) * 2) < 0 || ((blockchain - eventsmodal[3].blockNumber) * 2) === 0 ? "now" : ((blockchain - eventsmodal[3].blockNumber) * 2) + " seconds ago"}
                                </small>
                            </li>
                            :
                            ""
                        }
                        {eventsmodal[2] !== undefined
                            ?
                            <li className={`d-flex list-group-item list-group-item-action ${props.theme === 'dark' ? 'dark-list-item' : ''}`}>
                                <div className="title mb-auto ms-2">
                                    {userpic2 && <img width="35" height="35" className="rounded-circle" alt="" src={userpic2} />}
                                    {" " + userdata2.name1 + " played " + (eventsmodal[2].returnValues[1] / props.decimal) + " MATIC and"}
                                    <span style={{ color: eventsmodal[2].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                        {eventsmodal[2].returnValues[3] === false ? " lost all " : ""}{eventsmodal[2].returnValues[3] === true ? " doubled " : ""}
                                    </span>
                                    {eventsmodal[2].returnValues[2] > 1 ? eventsmodal[2].returnValues[2] + " times " : ""}
                                </div>
                                <small className="ms-auto mt-auto time-in-row">
                                    {((blockchain - eventsmodal[2].blockNumber) * 2) < 0 || ((blockchain - eventsmodal[2].blockNumber) * 2) === 0 ? "now" : ((blockchain - eventsmodal[2].blockNumber) * 2) + " seconds ago"}
                                </small>
                            </li>
                            :
                            ""
                        }
                        {eventsmodal[1] !== undefined
                            ?
                            <li className={`d-flex list-group-item list-group-item-action ${props.theme === 'dark' ? 'dark-list-item' : ''}`}>
                                <div className="title mb-auto ms-2">
                                    {userpic1 && <img width="35" height="35" className="rounded-circle" alt="" src={userpic1} />}
                                    {" " + userdata1.name1 + " played " + (eventsmodal[1].returnValues[1] / props.decimal) + " MATIC and"}
                                    <span style={{ color: eventsmodal[1].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                        {eventsmodal[1].returnValues[3] === false ? " lost all " : ""}{eventsmodal[1].returnValues[3] === true ? " doubled " : ""}
                                    </span>
                                </div>
                                {eventsmodal[1].returnValues[2] > 1 ? eventsmodal[1].returnValues[2] + " times " : ""}
                                <small className="ms-auto mt-auto time-in-row">
                                    {((blockchain - eventsmodal[1].blockNumber) * 2) < 0 || ((blockchain - eventsmodal[1].blockNumber) * 2) === 0 ? "now" : ((blockchain - eventsmodal[1].blockNumber) * 2) + " seconds ago"}
                                </small>
                            </li>
                            :
                            ""
                        }
                        {eventsmodal[0] !== undefined
                            ?
                            <li className={`d-flex list-group-item list-group-item-action ${props.theme === 'dark' ? 'dark-list-item' : ''}`}>
                                <div className="title mb-auto ms-2">
                                    {userpic0 && <img width="35" height="35" className="rounded-circle" alt="" src={userpic0} />}
                                    {" " + userdata0.name1 + " played " + (eventsmodal[0].returnValues[1] / props.decimal) + " MATIC and"}
                                    <span style={{ color: eventsmodal[0].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                        {eventsmodal[0].returnValues[3] === false ? " lost all " : ""}{eventsmodal[0].returnValues[3] === true ? " doubled " : ""}
                                    </span>
                                    {eventsmodal[0].returnValues[2] > 1 ? eventsmodal[0].returnValues[2] + " times " : ""}
                                </div>
                                <small className="ms-auto mt-auto time-in-row">
                                    {((blockchain - eventsmodal[0].blockNumber) * 2) < 0 || ((blockchain - eventsmodal[0].blockNumber) * 2) === 0 ? "now" : ((blockchain - eventsmodal[0].blockNumber) * 2) + " seconds ago"}
                                </small>
                            </li>
                            :
                            ""
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}
