import React, { useState, useEffect } from 'react'
import { collection, query, limit, onSnapshot, orderBy, where } from "firebase/firestore";
import { DropdownItem, DropdownMenu } from 'reactstrap'
import { db } from './firesbaseConfig'
import { ReadUnixTime } from './ReadUnixTime'
export default function ReadRPSGames() {
    const [historyPlays, setHistoryPlays] = useState({});
    const [hour0, setHour0] = useState(0);
    const [hour1, setHour1] = useState(0);
    const [hour2, setHour2] = useState(0);
    const [hour3, setHour3] = useState(0);
    const [hour4, setHour4] = useState(0);
    const [hour5, setHour5] = useState(0);
    const [hour6, setHour6] = useState(0);
    const [hour7, setHour7] = useState(0);
    const [hour8, setHour8] = useState(0);
    const [hour9, setHour9] = useState(0);
    const [hour10, setHour10] = useState(0);
    const [hour11, setHour11] = useState(0);
    const [minute0, setMinute0] = useState(0);
    const [minute1, setMinute1] = useState(0);
    const [minute2, setMinute2] = useState(0);
    const [minute3, setMinute3] = useState(0);
    const [minute4, setMinute4] = useState(0);
    const [minute5, setMinute5] = useState(0);
    const [minute6, setMinute6] = useState(0);
    const [minute7, setMinute7] = useState(0);
    const [minute8, setMinute8] = useState(0);
    const [minute9, setMinute9] = useState(0);
    const [minute10, setMinute10] = useState(0);
    const [minute11, setMinute11] = useState(0);
    const [second0, setSecond0] = useState(0);
    const [second1, setSecond1] = useState(0);
    const [second2, setSecond2] = useState(0);
    const [second3, setSecond3] = useState(0);
    const [second4, setSecond4] = useState(0);
    const [second5, setSecond5] = useState(0);
    const [second6, setSecond6] = useState(0);
    const [second7, setSecond7] = useState(0);
    const [second8, setSecond8] = useState(0);
    const [second9, setSecond9] = useState(0);
    const [second10, setSecond10] = useState(0);
    const [second11, setSecond11] = useState(0);
    const unixTimeStamp = ReadUnixTime();

    useEffect(() => {
        const q = query(collection(db, "allGames"), where("game", "==", "RPS"), orderBy("createdAt", "desc"), limit(12))
        const unsub = onSnapshot(q, (doc) => {
            const played = doc.docs.map(amountLeaderboard => amountLeaderboard.data())
            setHistoryPlays(played)
        });
        return unsub;
    }, [])

    useEffect(() => {
        const readActuallTime = (unixTimeStamp) => {
            if (historyPlays[0]) {
                var seg = unixTimeStamp - historyPlays[0].createdAt
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setHour0(hour)
                setMinute0(minute)
                setSecond0(seg)
            }
            if (historyPlays[1]) {
                var seg = unixTimeStamp - historyPlays[1].createdAt
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setHour1(hour)
                setMinute1(minute)
                setSecond1(seg)
            }
            if (historyPlays[2]) {
                var seg = unixTimeStamp - historyPlays[2].createdAt
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setHour2(hour)
                setMinute2(minute)
                setSecond2(seg)
            }
            if (historyPlays[3]) {
                var seg = unixTimeStamp - historyPlays[3].createdAt
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setHour3(hour)
                setMinute3(minute)
                setSecond3(seg)
            }
            if (historyPlays[4]) {
                var seg = unixTimeStamp - historyPlays[4].createdAt
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setHour4(hour)
                setMinute4(minute)
                setSecond4(seg)
            }
            if (historyPlays[5]) {
                var seg = unixTimeStamp - historyPlays[5].createdAt
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setHour5(hour)
                setMinute5(minute)
                setSecond5(seg)
            }
            if (historyPlays[6]) {
                var seg = unixTimeStamp - historyPlays[6].createdAt
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setHour6(hour)
                setMinute6(minute)
                setSecond6(seg)
            }
            if (historyPlays[7]) {
                var seg = unixTimeStamp - historyPlays[7].createdAt
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setHour7(hour)
                setMinute7(minute)
                setSecond7(seg)
            }
            if (historyPlays[8]) {
                var seg = unixTimeStamp - historyPlays[8].createdAt
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setHour8(hour)
                setMinute8(minute)
                setSecond8(seg)
            }
            if (historyPlays[9]) {
                var seg = unixTimeStamp - historyPlays[9].createdAt
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setHour9(hour)
                setMinute9(minute)
                setSecond9(seg)
            }
            if (historyPlays[10]) {
                var seg = unixTimeStamp - historyPlays[10].createdAt
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setHour10(hour)
                setMinute10(minute)
                setSecond10(seg)
            }
            if (historyPlays[11]) {
                var seg = unixTimeStamp - historyPlays[11].createdAt
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setHour11(hour)
                setMinute11(minute)
                setSecond11(seg)
            }
        }
        readActuallTime(unixTimeStamp)
    }, [unixTimeStamp])

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
                                {second0 < 0 || second0 === 0 ? "now" : ""}
                                {second0 > 0 && second0 < 60 ? second0 + " seconds ago" : ""}
                                {second0 > 59 && second0 < 120 ? minute0 + " minute ago" : ""}
                                {second0 > 119 && second0 < 3600 ? minute0 + " minutes ago" : ""}
                                {second0 > 3599 && second0 < 7200 ? hour0 + " hour ago" : ""}
                                {second0 > 7199 ? hour0 + " hours ago" : ""}
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
                                {second1 < 0 || second1 === 0 ? "now" : ""}
                                {second1 > 0 && second1 < 60 ? second1 + " seconds ago" : ""}
                                {second1 > 59 && second1 < 120 ? minute1 + " minute ago" : ""}
                                {second1 > 119 && second1 < 3600 ? minute1 + " minutes ago" : ""}
                                {second1 > 3599 && second1 < 7200 ? hour1 + " hour ago" : ""}
                                {second1 > 7199 ? hour1 + " hours ago" : ""}
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
                                {second2 < 0 || second2 === 0 ? "now" : ""}
                                {second2 > 0 && second2 < 60 ? second2 + " seconds ago" : ""}
                                {second2 > 59 && second2 < 120 ? minute2 + " minute ago" : ""}
                                {second2 > 119 && second2 < 3600 ? minute2 + " minutes ago" : ""}
                                {second2 > 3599 && second2 < 7200 ? hour2 + " hour ago" : ""}
                                {second2 > 7199 ? hour2 + " hours ago" : ""}
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
                                {second3 < 0 || second3 === 0 ? "now" : ""}
                                {second3 > 0 && second3 < 60 ? second3 + " seconds ago" : ""}
                                {second3 > 59 && second3 < 120 ? minute3 + " minute ago" : ""}
                                {second3 > 119 && second3 < 3600 ? minute3 + " minutes ago" : ""}
                                {second3 > 3599 && second3 < 7200 ? hour3 + " hour ago" : ""}
                                {second3 > 7199 ? hour3 + " hours ago" : ""}
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
                                {second4 < 0 || second4 === 0 ? "now" : ""}
                                {second4 > 0 && second4 < 60 ? second4 + " seconds ago" : ""}
                                {second4 > 59 && second4 < 120 ? minute4 + " minute ago" : ""}
                                {second4 > 119 && second4 < 3600 ? minute4 + " minutes ago" : ""}
                                {second4 > 3599 && second4 < 7200 ? hour4 + " hour ago" : ""}
                                {second4 > 7199 ? hour4 + " hours ago" : ""}
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
                                {second5 < 0 || second5 === 0 ? "now" : ""}
                                {second5 > 0 && second5 < 60 ? second5 + " seconds ago" : ""}
                                {second5 > 59 && second5 < 120 ? minute5 + " minute ago" : ""}
                                {second5 > 119 && second5 < 3600 ? minute5 + " minutes ago" : ""}
                                {second5 > 3599 && second5 < 7200 ? hour5 + " hour ago" : ""}
                                {second5 > 7199 ? hour5 + " hours ago" : ""}
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
                                {second6 < 0 || second6 === 0 ? "now" : ""}
                                {second6 > 0 && second6 < 60 ? second6 + " seconds ago" : ""}
                                {second6 > 59 && second6 < 120 ? minute6 + " minute ago" : ""}
                                {second6 > 119 && second6 < 3600 ? minute6 + " minutes ago" : ""}
                                {second6 > 3599 && second6 < 7200 ? hour6 + " hour ago" : ""}
                                {second6 > 7199 ? hour6 + " hours ago" : ""}
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
                                {second7 < 0 || second7 === 0 ? "now" : ""}
                                {second7 > 0 && second7 < 60 ? second7 + " seconds ago" : ""}
                                {second7 > 59 && second7 < 120 ? minute7 + " minute ago" : ""}
                                {second7 > 119 && second7 < 3600 ? minute7 + " minutes ago" : ""}
                                {second7 > 3599 && second7 < 7200 ? hour7 + " hour ago" : ""}
                                {second7 > 7199 ? hour7 + " hours ago" : ""}
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
                                {second8 < 0 || second8 === 0 ? "now" : ""}
                                {second8 > 0 && second8 < 60 ? second8 + " seconds ago" : ""}
                                {second8 > 59 && second8 < 120 ? minute8 + " minute ago" : ""}
                                {second8 > 119 && second8 < 3600 ? minute8 + " minutes ago" : ""}
                                {second8 > 3599 && second8 < 7200 ? hour8 + " hour ago" : ""}
                                {second8 > 7199 ? hour8 + " hours ago" : ""}
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
                                {second9 < 0 || second9 === 0 ? "now" : ""}
                                {second9 > 0 && second9 < 60 ? second9 + " seconds ago" : ""}
                                {second9 > 59 && second9 < 120 ? minute9 + " minute ago" : ""}
                                {second9 > 119 && second9 < 3600 ? minute9 + " minutes ago" : ""}
                                {second9 > 3599 && second9 < 7200 ? hour9 + " hour ago" : ""}
                                {second9 > 7199 ? hour9 + " hours ago" : ""}
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
                                {second10 < 0 || second10 === 0 ? "now" : ""}
                                {second10 > 0 && second10 < 60 ? second10 + " seconds ago" : ""}
                                {second10 > 59 && second10 < 120 ? minute10 + " minute ago" : ""}
                                {second10 > 119 && second10 < 3600 ? minute10 + " minutes ago" : ""}
                                {second10 > 3599 && second10 < 7200 ? hour10 + " hour ago" : ""}
                                {second10 > 7199 ? hour10 + " hours ago" : ""}
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
                                {second11 < 0 || second11 === 0 ? "now" : ""}
                                {second11 > 0 && second11 < 60 ? second11 + " seconds ago" : ""}
                                {second11 > 59 && second11 < 120 ? minute11 + " minute ago" : ""}
                                {second11 > 119 && second11 < 3600 ? minute11 + " minutes ago" : ""}
                                {second11 > 3599 && second11 < 7200 ? hour11 + " hour ago" : ""}
                                {second11 > 7199 ? hour11 + " hours ago" : ""}
                            </small>
                        </DropdownItem>
                    </>
                    : ""}
            </DropdownMenu>
        </>
    );
}