import React, { useState, useEffect } from 'react'
import { collection, query, limit, onSnapshot, orderBy } from "firebase/firestore";
import { DropdownItem, DropdownMenu } from 'reactstrap'
import { db } from './firesbaseConfig'
import { ReadUnixTime } from './ReadUnixTime'
export default function ReadRPSGames() {
    const [historyPlays, setHistoryPlays] = useState({});
    const unixTimeStamp = ReadUnixTime();

    useEffect(() => {
        const q = query(collection(db, "allGames"), orderBy("createdAt", "desc"), limit(12))
        const unsub = onSnapshot(q, (doc) => {
            const played = doc.docs.map(amountLeaderboard => amountLeaderboard.data())
            setHistoryPlays(played)
        });
        return unsub;
    }, [])

    return (
        <>
            <DropdownMenu className="dd-menu">
                {historyPlays[0] !== undefined && historyPlays[0].createdAt ?
                    <>
                        <DropdownItem className="dd-menu-item">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${historyPlays[0].photo}`} />
                            {historyPlays[0].name !== 'Username' ? " " + historyPlays[0].name : " " + historyPlays[0].account.substring(0, 5).toLowerCase()}
                            {" played " + historyPlays[0].maticAmount + " MATIC and"}
                            <span style={{ color: historyPlays[0].result ? "mediumseagreen" : "crimson" }}>
                                {historyPlays[0].result === false ? " lost all " : ""}{historyPlays[0].result === true ? " doubled " : ""}
                            </span>
                            {historyPlays[0].streak > 1 ? historyPlays[0].streak + " times " : ""}
                            <small className="d-flex justify-content-end">
                                {(unixTimeStamp - historyPlays[0].createdAt) <= 0 ?
                                    " now" : (unixTimeStamp - historyPlays[0].createdAt) + " seconds ago"}
                            </small>
                        </DropdownItem>
                    </>
                    : ""}
                {historyPlays[1] !== undefined && historyPlays[1].createdAt ?
                    <>
                        <DropdownItem className="dd-menu-item">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${historyPlays[1].photo}`} />
                            {historyPlays[1].name !== 'Username' ? " " + historyPlays[1].name : " " + historyPlays[1].account.substring(0, 5).toLowerCase()}
                            {" played " + historyPlays[1].maticAmount + " MATIC and"}
                            <span style={{ color: historyPlays[1].result ? "mediumseagreen" : "crimson" }}>
                                {historyPlays[1].result === false ? " lost all " : ""}{historyPlays[1].result === true ? " doubled " : ""}
                            </span>
                            {historyPlays[1].streak > 1 ? historyPlays[1].streak + " times " : ""}
                            <small className="d-flex justify-content-end">
                                {(unixTimeStamp - historyPlays[1].createdAt) <= 0 ?
                                    " now" : (unixTimeStamp - historyPlays[1].createdAt) + " seconds ago"}
                            </small>
                        </DropdownItem>
                    </>
                    : ""}
                {historyPlays[2] !== undefined && historyPlays[2].createdAt ?
                    <>
                        <DropdownItem className="dd-menu-item">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${historyPlays[2].photo}`} />
                            {historyPlays[2].name !== 'Username' ? " " + historyPlays[2].name : " " + historyPlays[2].account.substring(0, 5).toLowerCase()}
                            {" played " + historyPlays[2].maticAmount + " MATIC and"}
                            <span style={{ color: historyPlays[2].result ? "mediumseagreen" : "crimson" }}>
                                {historyPlays[2].result === false ? " lost all " : ""}{historyPlays[2].result === true ? " doubled " : ""}
                            </span>
                            {historyPlays[2].streak > 1 ? historyPlays[2].streak + " times " : ""}
                            <small className="d-flex justify-content-end">
                                {(unixTimeStamp - historyPlays[2].createdAt) <= 0 ?
                                    " now" : (unixTimeStamp - historyPlays[2].createdAt) + " seconds ago"}
                            </small>
                        </DropdownItem>
                    </>
                    : ""}
                {historyPlays[3] !== undefined && historyPlays[3].createdAt ?
                    <>
                        <DropdownItem className="dd-menu-item">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${historyPlays[3].photo}`} />
                            {historyPlays[3].name !== 'Username' ? " " + historyPlays[3].name : " " + historyPlays[3].account.substring(0, 5).toLowerCase()}
                            {" played " + historyPlays[3].maticAmount + " MATIC and"}
                            <span style={{ color: historyPlays[3].result ? "mediumseagreen" : "crimson" }}>
                                {historyPlays[3].result === false ? " lost all " : ""}{historyPlays[3].result === true ? " doubled " : ""}
                            </span>
                            {historyPlays[3].streak > 1 ? historyPlays[3].streak + " times " : ""}
                            <small className="d-flex justify-content-end">
                                {(unixTimeStamp - historyPlays[3].createdAt) <= 0 ?
                                    " now" : (unixTimeStamp - historyPlays[3].createdAt) + " seconds ago"}
                            </small>
                        </DropdownItem>
                    </>
                    : ""}
                {historyPlays[4] !== undefined && historyPlays[4].createdAt ?
                    <>
                        <DropdownItem className="dd-menu-item">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${historyPlays[4].photo}`} />
                            {historyPlays[4].name !== 'Username' ? " " + historyPlays[4].name : " " + historyPlays[4].account.substring(0, 5).toLowerCase()}
                            {" played " + historyPlays[4].maticAmount + " MATIC and"}
                            <span style={{ color: historyPlays[4].result ? "mediumseagreen" : "crimson" }}>
                                {historyPlays[4].result === false ? " lost all " : ""}{historyPlays[4].result === true ? " doubled " : ""}
                            </span>
                            {historyPlays[4].streak > 1 ? historyPlays[4].streak + " times " : ""}
                            <small className="d-flex justify-content-end">
                                {(unixTimeStamp - historyPlays[4].createdAt) <= 0 ?
                                    " now" : (unixTimeStamp - historyPlays[4].createdAt) + " seconds ago"}
                            </small>
                        </DropdownItem>
                    </>
                    : ""}
                {historyPlays[5] !== undefined && historyPlays[5].createdAt ?
                    <>
                        <DropdownItem className="dd-menu-item">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${historyPlays[5].photo}`} />
                            {historyPlays[5].name !== 'Username' ? " " + historyPlays[5].name : " " + historyPlays[5].account.substring(0, 5).toLowerCase()}
                            {" played " + historyPlays[5].maticAmount + " MATIC and"}
                            <span style={{ color: historyPlays[5].result ? "mediumseagreen" : "crimson" }}>
                                {historyPlays[5].result === false ? " lost all " : ""}{historyPlays[5].result === true ? " doubled " : ""}
                            </span>
                            {historyPlays[5].streak > 1 ? historyPlays[5].streak + " times " : ""}
                            <small className="d-flex justify-content-end">
                                {(unixTimeStamp - historyPlays[5].createdAt) <= 0 ?
                                    " now" : (unixTimeStamp - historyPlays[5].createdAt) + " seconds ago"}
                            </small>
                        </DropdownItem>
                    </>
                    : ""}
                {historyPlays[6] !== undefined && historyPlays[6].createdAt ?
                    <>
                        <DropdownItem className="dd-menu-item">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${historyPlays[6].photo}`} />
                            {historyPlays[6].name !== 'Username' ? " " + historyPlays[6].name : " " + historyPlays[6].account.substring(0, 5).toLowerCase()}
                            {" played " + historyPlays[6].maticAmount + " MATIC and"}
                            <span style={{ color: historyPlays[6].result ? "mediumseagreen" : "crimson" }}>
                                {historyPlays[6].result === false ? " lost all " : ""}{historyPlays[6].result === true ? " doubled " : ""}
                            </span>
                            {historyPlays[6].streak > 1 ? historyPlays[6].streak + " times " : ""}
                            <small className="d-flex justify-content-end">
                                {(unixTimeStamp - historyPlays[6].createdAt) <= 0 ?
                                    " now" : (unixTimeStamp - historyPlays[6].createdAt) + " seconds ago"}
                            </small>
                        </DropdownItem>
                    </>
                    : ""}
                {historyPlays[7] !== undefined && historyPlays[7].createdAt ?
                    <>
                        <DropdownItem className="dd-menu-item">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${historyPlays[7].photo}`} />
                            {historyPlays[7].name !== 'Username' ? " " + historyPlays[7].name : " " + historyPlays[7].account.substring(0, 5).toLowerCase()}
                            {" played " + historyPlays[7].maticAmount + " MATIC and"}
                            <span style={{ color: historyPlays[7].result ? "mediumseagreen" : "crimson" }}>
                                {historyPlays[7].result === false ? " lost all " : ""}{historyPlays[7].result === true ? " doubled " : ""}
                            </span>
                            {historyPlays[7].streak > 1 ? historyPlays[7].streak + " times " : ""}
                            <small className="d-flex justify-content-end">
                                {(unixTimeStamp - historyPlays[7].createdAt) <= 0 ?
                                    " now" : (unixTimeStamp - historyPlays[7].createdAt) + " seconds ago"}
                            </small>
                        </DropdownItem>
                    </>
                    : ""}
                {historyPlays[8] !== undefined && historyPlays[8].createdAt ?
                    <>
                        <DropdownItem className="dd-menu-item">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${historyPlays[8].photo}`} />
                            {historyPlays[8].name !== 'Username' ? " " + historyPlays[8].name : " " + historyPlays[8].account.substring(0, 5).toLowerCase()}
                            {" played " + historyPlays[8].maticAmount + " MATIC and"}
                            <span style={{ color: historyPlays[8].result ? "mediumseagreen" : "crimson" }}>
                                {historyPlays[8].result === false ? " lost all " : ""}{historyPlays[8].result === true ? " doubled " : ""}
                            </span>
                            {historyPlays[8].streak > 1 ? historyPlays[8].streak + " times " : ""}
                            <small className="d-flex justify-content-end">
                                {(unixTimeStamp - historyPlays[8].createdAt) <= 0 ?
                                    " now" : (unixTimeStamp - historyPlays[8].createdAt) + " seconds ago"}
                            </small>
                        </DropdownItem>
                    </>
                    : ""}
                {historyPlays[9] !== undefined && historyPlays[9].createdAt ?
                    <>
                        <DropdownItem className="dd-menu-item">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${historyPlays[9].photo}`} />
                            {historyPlays[9].name !== 'Username' ? " " + historyPlays[9].name : " " + historyPlays[9].account.substring(0, 5).toLowerCase()}
                            {" played " + historyPlays[9].maticAmount + " MATIC and"}
                            <span style={{ color: historyPlays[9].result ? "mediumseagreen" : "crimson" }}>
                                {historyPlays[9].result === false ? " lost all " : ""}{historyPlays[9].result === true ? " doubled " : ""}
                            </span>
                            {historyPlays[9].streak > 1 ? historyPlays[9].streak + " times " : ""}
                            <small className="d-flex justify-content-end">
                                {(unixTimeStamp - historyPlays[9].createdAt) <= 0 ?
                                    " now" : (unixTimeStamp - historyPlays[9].createdAt) + " seconds ago"}
                            </small>
                        </DropdownItem>
                    </>
                    : ""}
                {historyPlays[10] !== undefined && historyPlays[10].createdAt ?
                    <>
                        <DropdownItem className="dd-menu-item">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${historyPlays[10].photo}`} />
                            {historyPlays[10].name !== 'Username' ? " " + historyPlays[10].name : " " + historyPlays[10].account.substring(0, 5).toLowerCase()}
                            {" played " + historyPlays[10].maticAmount + " MATIC and"}
                            <span style={{ color: historyPlays[10].result ? "mediumseagreen" : "crimson" }}>
                                {historyPlays[10].result === false ? " lost all " : ""}{historyPlays[10].result === true ? " doubled " : ""}
                            </span>
                            {historyPlays[10].streak > 1 ? historyPlays[10].streak + " times " : ""}
                            <small className="d-flex justify-content-end">
                                {(unixTimeStamp - historyPlays[10].createdAt) <= 0 ?
                                    " now" : (unixTimeStamp - historyPlays[10].createdAt) + " seconds ago"}
                            </small>
                        </DropdownItem>
                    </>
                    : ""}
                {historyPlays[11] !== undefined && historyPlays[11].createdAt ?
                    <>
                        <DropdownItem className="dd-menu-item">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${historyPlays[11].photo}`} />
                            {historyPlays[11].name !== 'Username' ? " " + historyPlays[11].name : " " + historyPlays[11].account.substring(0, 5).toLowerCase()}
                            {" played " + historyPlays[11].maticAmount + " MATIC and"}
                            <span style={{ color: historyPlays[11].result ? "mediumseagreen" : "crimson" }}>
                                {historyPlays[11].result === false ? " lost all " : ""}{historyPlays[11].result === true ? " doubled " : ""}
                            </span>
                            {historyPlays[11].streak > 1 ? historyPlays[11].streak + " times " : ""}
                            <small className="d-flex justify-content-end">
                                {(unixTimeStamp - historyPlays[11].createdAt) <= 0 ?
                                    " now" : (unixTimeStamp - historyPlays[11].createdAt) + " seconds ago"}
                            </small>
                        </DropdownItem>
                    </>
                    : ""}
            </DropdownMenu>
        </>
    );
}