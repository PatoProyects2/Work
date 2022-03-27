import React, { useState, useEffect } from 'react'
import { collection, query, limit, onSnapshot, orderBy } from "firebase/firestore";
import { db } from './firesbaseConfig'
import { ReadUnixTime } from './ReadUnixTime'
export default function ReadAllGames(props) {
    const [historyPlays, setHistoryPlays] = useState({});
    const [day0, setDay0] = useState(0);
    const [day1, setDay1] = useState(0);
    const [day2, setDay2] = useState(0);
    const [day3, setDay3] = useState(0);
    const [day4, setDay4] = useState(0);
    const [day5, setDay5] = useState(0);
    const [day6, setDay6] = useState(0);
    const [day7, setDay7] = useState(0);
    const [day8, setDay8] = useState(0);
    const [day9, setDay9] = useState(0);
    const [day10, setDay10] = useState(0);
    const [day11, setDay11] = useState(0);
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
        const q = query(collection(db, "allGames"), orderBy("createdAt", "desc"), limit(12))
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
                setDay0(day)
                setHour0(hour)
                setMinute0(minute)
                setSecond0(seg)
            }
            if (historyPlays[1]) {
                var seg = unixTimeStamp - historyPlays[1].createdAt
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setDay1(day)
                setHour1(hour)
                setMinute1(minute)
                setSecond1(seg)
            }
            if (historyPlays[2]) {
                var seg = unixTimeStamp - historyPlays[2].createdAt
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setDay2(day)
                setHour2(hour)
                setMinute2(minute)
                setSecond2(seg)
            }
            if (historyPlays[3]) {
                var seg = unixTimeStamp - historyPlays[3].createdAt
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setDay3(day)
                setHour3(hour)
                setMinute3(minute)
                setSecond3(seg)
            }
            if (historyPlays[4]) {
                var seg = unixTimeStamp - historyPlays[4].createdAt
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setDay4(day)
                setHour4(hour)
                setMinute4(minute)
                setSecond4(seg)
            }
            if (historyPlays[5]) {
                var seg = unixTimeStamp - historyPlays[5].createdAt
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setDay5(day)
                setHour5(hour)
                setMinute5(minute)
                setSecond5(seg)
            }
            if (historyPlays[6]) {
                var seg = unixTimeStamp - historyPlays[6].createdAt
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setDay6(day)
                setHour6(hour)
                setMinute6(minute)
                setSecond6(seg)
            }
            if (historyPlays[7]) {
                var seg = unixTimeStamp - historyPlays[7].createdAt
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setDay7(day)
                setHour7(hour)
                setMinute7(minute)
                setSecond7(seg)
            }
            if (historyPlays[8]) {
                var seg = unixTimeStamp - historyPlays[8].createdAt
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setDay8(day)
                setHour8(hour)
                setMinute8(minute)
                setSecond8(seg)
            }
            if (historyPlays[9]) {
                var seg = unixTimeStamp - historyPlays[9].createdAt
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setDay9(day)
                setHour9(hour)
                setMinute9(minute)
                setSecond9(seg)
            }
            if (historyPlays[10]) {
                var seg = unixTimeStamp - historyPlays[10].createdAt
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setDay10(day)
                setHour10(hour)
                setMinute10(minute)
                setSecond10(seg)
            }
            if (historyPlays[11]) {
                var seg = unixTimeStamp - historyPlays[11].createdAt
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setDay11(day)
                setHour11(hour)
                setMinute11(minute)
                setSecond11(seg)
            }
        }
        readActuallTime(unixTimeStamp)
        return () => {
            setDay0(0);
            setDay1(0);
            setDay2(0);
            setDay3(0);
            setDay4(0);
            setDay5(0);
            setDay6(0);
            setDay7(0);
            setDay8(0);
            setDay9(0);
            setDay10(0);
            setDay11(0);
            setHour0(0);
            setHour1(0);
            setHour2(0);
            setHour3(0);
            setHour4(0);
            setHour5(0);
            setHour6(0);
            setHour7(0);
            setHour8(0);
            setHour9(0);
            setHour10(0);
            setHour11(0);
            setMinute0(0);
            setMinute1(0);
            setMinute2(0);
            setMinute3(0);
            setMinute4(0);
            setMinute5(0);
            setMinute6(0);
            setMinute7(0);
            setMinute8(0);
            setMinute9(0);
            setMinute10(0);
            setMinute11(0);
            setSecond0(0);
            setSecond1(0);
            setSecond2(0);
            setSecond3(0);
            setSecond4(0);
            setSecond5(0);
            setSecond6(0);
            setSecond7(0);
            setSecond8(0);
            setSecond9(0);
            setSecond10(0);
            setSecond11(0);
        };
    }, [unixTimeStamp])

    return (
        <>
            <p className="d-flex justify-content-end me-4">{historyPlays.length !== undefined ? historyPlays.length : 0}{" Total bets"}</p>
            <div className="container">
                <div className="play-list mt-2">
                    <ul className="list-group">
                        {historyPlays[0] !== undefined && historyPlays[0].createdAt ?
                            <>
                                <li className='d-flex list-group-item list-group-item-action'>
                                    <div className="title mb-auto ms-2">
                                        <img width="25" height="25" className="rounded-circle" alt="" src={`${historyPlays[0].photo}`} />
                                        &nbsp;
                                        {historyPlays[0].name !== 'Username' ?
                                            <>
                                                {props.isMobileVersion && historyPlays[0].name.length > 5 ? historyPlays[0].name.substring(0, 5) + "..." : historyPlays[0].name}
                                            </>
                                            :
                                            historyPlays[0].name.substring(0, 5).toLowerCase() + "..."
                                        }
                                        {" played " + historyPlays[0].amount + " MATIC and"}
                                        <span style={{ color: historyPlays[0].result ? "mediumseagreen" : "crimson" }}>
                                            {historyPlays[0].result === false ? " lost all " : ""}{historyPlays[0].result === true ? " doubled " : ""}
                                        </span>
                                        {historyPlays[0].streak > 1 ? historyPlays[0].streak + " times " : ""}
                                    </div>
                                    <small className="ms-auto mt-auto time-in-row">
                                        {second0 < 0 || second0 === 0 ? "now" : ""}
                                        {second0 > 0 && second0 < 60 ? second0 + " seconds ago" : ""}
                                        {second0 > 59 && second0 < 120 ? minute0 + " minute ago" : ""}
                                        {second0 > 119 && second0 < 3600 ? minute0 + " minutes ago" : ""}
                                        {second0 > 3599 && second0 < 7200 ? hour0 + " hour ago" : ""}
                                        {second0 > 7199 && second0 < 86400 ? hour0 + " hours ago" : ""}
                                        {second0 > 86399 && second0 < 172800 ? day0 + " day ago" : ""}
                                        {second0 > 172799 ? day0 + " days ago" : ""}
                                    </small>
                                </li>
                            </>
                            : ""}
                        {historyPlays[1] !== undefined && historyPlays[1].createdAt ?
                            <>
                                <li className='d-flex list-group-item list-group-item-action'>
                                    <div className="title mb-auto ms-2">
                                        <img width="25" height="25" className="rounded-circle" alt="" src={`${historyPlays[1].photo}`} />
                                        &nbsp;
                                        {historyPlays[1].name !== 'Username' ?
                                            <>
                                                {props.isMobileVersion && historyPlays[1].name.length > 5 ? historyPlays[1].name.substring(0, 5) + "..." : historyPlays[1].name}
                                            </>
                                            :
                                            historyPlays[1].name.substring(0, 5).toLowerCase() + "..."
                                        }
                                        {" played " + historyPlays[1].amount + " MATIC and"}
                                        <span style={{ color: historyPlays[1].result ? "mediumseagreen" : "crimson" }}>
                                            {historyPlays[1].result === false ? " lost all " : ""}{historyPlays[1].result === true ? " doubled " : ""}
                                        </span>
                                        {historyPlays[1].streak > 1 ? historyPlays[1].streak + " times " : ""}
                                    </div>
                                    <small className="ms-auto mt-auto time-in-row">
                                        {second1 < 0 || second1 === 0 ? "now" : ""}
                                        {second1 > 0 && second1 < 60 ? second1 + " seconds ago" : ""}
                                        {second1 > 59 && second1 < 120 ? minute1 + " minute ago" : ""}
                                        {second1 > 119 && second1 < 3600 ? minute1 + " minutes ago" : ""}
                                        {second1 > 3599 && second1 < 7200 ? hour1 + " hour ago" : ""}
                                        {second1 > 7199 && second1 < 86400 ? hour1 + " hours ago" : ""}
                                        {second1 > 86399 && second1 < 172800 ? day1 + " day ago" : ""}
                                        {second1 > 172799 ? day1 + " days ago" : ""}
                                    </small>
                                </li>
                            </>
                            : ""}
                        {historyPlays[2] !== undefined && historyPlays[2].createdAt ?
                            <>
                                <li className='d-flex list-group-item list-group-item-action'>
                                    <div className="title mb-auto ms-2">
                                        <img width="25" height="25" className="rounded-circle" alt="" src={`${historyPlays[2].photo}`} />
                                        &nbsp;
                                        {historyPlays[2].name !== 'Username' ?
                                            <>
                                                {props.isMobileVersion && historyPlays[2].name.length > 5 ? historyPlays[2].name.substring(0, 5) + "..." : historyPlays[2].name}
                                            </>
                                            :
                                            historyPlays[2].name.substring(0, 5).toLowerCase() + "..."
                                        }
                                        {" played " + historyPlays[2].amount + " MATIC and"}
                                        <span style={{ color: historyPlays[2].result ? "mediumseagreen" : "crimson" }}>
                                            {historyPlays[2].result === false ? " lost all " : ""}{historyPlays[2].result === true ? " doubled " : ""}
                                        </span>
                                        {historyPlays[2].streak > 1 ? historyPlays[2].streak + " times " : ""}
                                    </div>
                                    <small className="ms-auto mt-auto time-in-row">
                                        {second2 < 0 || second2 === 0 ? "now" : ""}
                                        {second2 > 0 && second2 < 60 ? second2 + " seconds ago" : ""}
                                        {second2 > 59 && second2 < 120 ? minute2 + " minute ago" : ""}
                                        {second2 > 119 && second2 < 3600 ? minute2 + " minutes ago" : ""}
                                        {second2 > 3599 && second2 < 7200 ? hour2 + " hour ago" : ""}
                                        {second2 > 7199 && second2 < 86400 ? hour2 + " hours ago" : ""}
                                        {second2 > 86399 && second2 < 172800 ? day2 + " day ago" : ""}
                                        {second2 > 172799 ? day2 + " days ago" : ""}
                                    </small>
                                </li>
                            </>
                            : ""}
                        {historyPlays[3] !== undefined && historyPlays[3].createdAt ?
                            <>
                                <li className='d-flex list-group-item list-group-item-action'>
                                    <div className="title mb-auto ms-2">
                                        <img width="25" height="25" className="rounded-circle" alt="" src={`${historyPlays[3].photo}`} />
                                        &nbsp;
                                        {historyPlays[3].name !== 'Username' ?
                                            <>
                                                {props.isMobileVersion && historyPlays[3].name.length > 5 ? historyPlays[3].name.substring(0, 5) + "..." : historyPlays[3].name}
                                            </>
                                            :
                                            historyPlays[3].name.substring(0, 5).toLowerCase() + "..."
                                        }
                                        {" played " + historyPlays[3].amount + " MATIC and"}
                                        <span style={{ color: historyPlays[3].result ? "mediumseagreen" : "crimson" }}>
                                            {historyPlays[3].result === false ? " lost all " : ""}{historyPlays[3].result === true ? " doubled " : ""}
                                        </span>
                                        {historyPlays[3].streak > 1 ? historyPlays[3].streak + " times " : ""}
                                    </div>
                                    <small className="ms-auto mt-auto time-in-row">
                                        {second3 < 0 || second3 === 0 ? "now" : ""}
                                        {second3 > 0 && second3 < 60 ? second3 + " seconds ago" : ""}
                                        {second3 > 59 && second3 < 120 ? minute3 + " minute ago" : ""}
                                        {second3 > 119 && second3 < 3600 ? minute3 + " minutes ago" : ""}
                                        {second3 > 3599 && second3 < 7200 ? hour3 + " hour ago" : ""}
                                        {second3 > 7199 && second3 < 86400 ? hour3 + " hours ago" : ""}
                                        {second3 > 86399 && second3 < 172800 ? day3 + " day ago" : ""}
                                        {second3 > 172799 ? day3 + " days ago" : ""}
                                    </small>
                                </li>
                            </>
                            : ""}
                        {historyPlays[4] !== undefined && historyPlays[4].createdAt ?
                            <>
                                <li className='d-flex list-group-item list-group-item-action'>
                                    <div className="title mb-auto ms-2">
                                        <img width="25" height="25" className="rounded-circle" alt="" src={`${historyPlays[4].photo}`} />
                                        &nbsp;
                                        {historyPlays[4].name !== 'Username' ?
                                            <>
                                                {props.isMobileVersion && historyPlays[4].name.length > 5 ? historyPlays[4].name.substring(0, 5) + "..." : historyPlays[4].name}
                                            </>
                                            :
                                            historyPlays[4].name.substring(0, 5).toLowerCase() + "..."
                                        }
                                        {" played " + historyPlays[4].amount + " MATIC and"}
                                        <span style={{ color: historyPlays[4].result ? "mediumseagreen" : "crimson" }}>
                                            {historyPlays[4].result === false ? " lost all " : ""}{historyPlays[4].result === true ? " doubled " : ""}
                                        </span>
                                        {historyPlays[4].streak > 1 ? historyPlays[4].streak + " times " : ""}
                                    </div>
                                    <small className="ms-auto mt-auto time-in-row">
                                        {second4 < 0 || second4 === 0 ? "now" : ""}
                                        {second4 > 0 && second4 < 60 ? second4 + " seconds ago" : ""}
                                        {second4 > 59 && second4 < 120 ? minute4 + " minute ago" : ""}
                                        {second4 > 119 && second4 < 3600 ? minute4 + " minutes ago" : ""}
                                        {second4 > 3599 && second4 < 7200 ? hour4 + " hour ago" : ""}
                                        {second4 > 7199 && second4 < 86400 ? hour4 + " hours ago" : ""}
                                        {second4 > 86399 && second4 < 172800 ? day4 + " day ago" : ""}
                                        {second4 > 172799 ? day4 + " days ago" : ""}
                                    </small>
                                </li>
                            </>
                            : ""}
                        {historyPlays[5] !== undefined && historyPlays[5].createdAt ?
                            <>
                                <li className='d-flex list-group-item list-group-item-action'>
                                    <div className="title mb-auto ms-2">
                                        <img width="25" height="25" className="rounded-circle" alt="" src={`${historyPlays[5].photo}`} />
                                        &nbsp;
                                        {historyPlays[5].name !== 'Username' ?
                                            <>
                                                {props.isMobileVersion && historyPlays[5].name.length > 5 ? historyPlays[5].name.substring(0, 5) + "..." : historyPlays[5].name}
                                            </>
                                            :
                                            historyPlays[5].name.substring(0, 5).toLowerCase() + "..."
                                        }
                                        {" played " + historyPlays[5].amount + " MATIC and"}
                                        <span style={{ color: historyPlays[5].result ? "mediumseagreen" : "crimson" }}>
                                            {historyPlays[5].result === false ? " lost all " : ""}{historyPlays[5].result === true ? " doubled " : ""}
                                        </span>
                                        {historyPlays[5].streak > 1 ? historyPlays[5].streak + " times " : ""}
                                    </div>
                                    <small className="ms-auto mt-auto time-in-row">
                                        {second5 < 0 || second5 === 0 ? "now" : ""}
                                        {second5 > 0 && second5 < 60 ? second0 + " seconds ago" : ""}
                                        {second5 > 59 && second5 < 120 ? minute5 + " minute ago" : ""}
                                        {second5 > 119 && second5 < 3600 ? minute5 + " minutes ago" : ""}
                                        {second5 > 3599 && second5 < 7200 ? hour5 + " hour ago" : ""}
                                        {second5 > 7199 && second5 < 86400 ? hour5 + " hours ago" : ""}
                                        {second5 > 86399 && second5 < 172800 ? day5 + " day ago" : ""}
                                        {second5 > 172799 ? day5 + " days ago" : ""}
                                    </small>
                                </li>
                            </>
                            : ""}
                        {historyPlays[6] !== undefined && historyPlays[6].createdAt ?
                            <>
                                <li className='d-flex list-group-item list-group-item-action'>
                                    <div className="title mb-auto ms-2">
                                        <img width="25" height="25" className="rounded-circle" alt="" src={`${historyPlays[6].photo}`} />
                                        &nbsp;
                                        {historyPlays[6].name !== 'Username' ?
                                            <>
                                                {props.isMobileVersion && historyPlays[6].name.length > 5 ? historyPlays[6].name.substring(0, 5) + "..." : historyPlays[6].name}
                                            </>
                                            :
                                            historyPlays[6].name.substring(0, 5).toLowerCase() + "..."
                                        }
                                        {" played " + historyPlays[6].amount + " MATIC and"}
                                        <span style={{ color: historyPlays[6].result ? "mediumseagreen" : "crimson" }}>
                                            {historyPlays[6].result === false ? " lost all " : ""}{historyPlays[6].result === true ? " doubled " : ""}
                                        </span>
                                        {historyPlays[6].streak > 1 ? historyPlays[6].streak + " times " : ""}
                                    </div>
                                    <small className="ms-auto mt-auto time-in-row">
                                        {second6 < 0 || second6 === 0 ? "now" : ""}
                                        {second6 > 0 && second6 < 60 ? second6 + " seconds ago" : ""}
                                        {second6 > 59 && second6 < 120 ? minute6 + " minute ago" : ""}
                                        {second6 > 119 && second6 < 3600 ? minute6 + " minutes ago" : ""}
                                        {second6 > 3599 && second6 < 7200 ? hour6 + " hour ago" : ""}
                                        {second6 > 7199 && second6 < 86400 ? hour6 + " hours ago" : ""}
                                        {second6 > 86399 && second6 < 172800 ? day6 + " day ago" : ""}
                                        {second6 > 172799 ? day6 + " days ago" : ""}
                                    </small>
                                </li>
                            </>
                            : ""}
                        {historyPlays[7] !== undefined && historyPlays[7].createdAt ?
                            <>
                                <li className='d-flex list-group-item list-group-item-action'>
                                    <div className="title mb-auto ms-2">
                                        <img width="25" height="25" className="rounded-circle" alt="" src={`${historyPlays[7].photo}`} />
                                        &nbsp;
                                        {historyPlays[7].name !== 'Username' ?
                                            <>
                                                {props.isMobileVersion && historyPlays[7].name.length > 5 ? historyPlays[7].name.substring(0, 5) + "..." : historyPlays[7].name}
                                            </>
                                            :
                                            historyPlays[7].name.substring(0, 5).toLowerCase() + "..."
                                        }
                                        {" played " + historyPlays[7].amount + " MATIC and"}
                                        <span style={{ color: historyPlays[7].result ? "mediumseagreen" : "crimson" }}>
                                            {historyPlays[7].result === false ? " lost all " : ""}{historyPlays[7].result === true ? " doubled " : ""}
                                        </span>
                                        {historyPlays[7].streak > 1 ? historyPlays[7].streak + " times " : ""}
                                    </div>
                                    <small className="ms-auto mt-auto time-in-row">
                                        {second7 < 0 || second7 === 0 ? "now" : ""}
                                        {second7 > 0 && second7 < 60 ? second7 + " seconds ago" : ""}
                                        {second7 > 59 && second7 < 120 ? minute7 + " minute ago" : ""}
                                        {second7 > 119 && second7 < 3600 ? minute7 + " minutes ago" : ""}
                                        {second7 > 3599 && second7 < 7200 ? hour7 + " hour ago" : ""}
                                        {second7 > 7199 && second7 < 86400 ? hour7 + " hours ago" : ""}
                                        {second7 > 86399 && second7 < 172800 ? day7 + " day ago" : ""}
                                        {second7 > 172799 ? day7 + " days ago" : ""}
                                    </small>
                                </li>
                            </>
                            : ""}
                        {historyPlays[8] !== undefined && historyPlays[8].createdAt ?
                            <>
                                <li className='d-flex list-group-item list-group-item-action'>
                                    <div className="title mb-auto ms-2">
                                        <img width="25" height="25" className="rounded-circle" alt="" src={`${historyPlays[8].photo}`} />
                                        &nbsp;
                                        {historyPlays[8].name !== 'Username' ?
                                            <>
                                                {props.isMobileVersion && historyPlays[8].name.length > 5 ? historyPlays[8].name.substring(0, 5) + "..." : historyPlays[8].name}
                                            </>
                                            :
                                            historyPlays[8].name.substring(0, 5).toLowerCase() + "..."
                                        }
                                        {" played " + historyPlays[8].amount + " MATIC and"}
                                        <span style={{ color: historyPlays[8].result ? "mediumseagreen" : "crimson" }}>
                                            {historyPlays[8].result === false ? " lost all " : ""}{historyPlays[8].result === true ? " doubled " : ""}
                                        </span>
                                        {historyPlays[8].streak > 1 ? historyPlays[8].streak + " times " : ""}
                                    </div>
                                    <small className="ms-auto mt-auto time-in-row">
                                        {second8 < 0 || second8 === 0 ? "now" : ""}
                                        {second8 > 0 && second8 < 60 ? second8 + " seconds ago" : ""}
                                        {second8 > 59 && second8 < 120 ? minute8 + " minute ago" : ""}
                                        {second8 > 119 && second8 < 3600 ? minute8 + " minutes ago" : ""}
                                        {second8 > 3599 && second8 < 7200 ? hour8 + " hour ago" : ""}
                                        {second8 > 7199 && second8 < 86400 ? hour8 + " hours ago" : ""}
                                        {second8 > 86399 && second8 < 172800 ? day8 + " day ago" : ""}
                                        {second8 > 172799 ? day8 + " days ago" : ""}
                                    </small>
                                </li>
                            </>
                            : ""}
                        {historyPlays[9] !== undefined && historyPlays[9].createdAt ?
                            <>
                                <li className='d-flex list-group-item list-group-item-action'>
                                    <div className="title mb-auto ms-2">
                                        <img width="25" height="25" className="rounded-circle" alt="" src={`${historyPlays[9].photo}`} />
                                        &nbsp;
                                        {historyPlays[9].name !== 'Username' ?
                                            <>
                                                {props.isMobileVersion && historyPlays[9].name.length > 5 ? historyPlays[9].name.substring(0, 5) + "..." : historyPlays[9].name}
                                            </>
                                            :
                                            historyPlays[9].name.substring(0, 5).toLowerCase() + "..."
                                        }
                                        {" played " + historyPlays[9].amount + " MATIC and"}
                                        <span style={{ color: historyPlays[9].result ? "mediumseagreen" : "crimson" }}>
                                            {historyPlays[9].result === false ? " lost all " : ""}{historyPlays[9].result === true ? " doubled " : ""}
                                        </span>
                                        {historyPlays[9].streak > 1 ? historyPlays[9].streak + " times " : ""}
                                    </div>
                                    <small className="ms-auto mt-auto time-in-row">
                                        {second9 < 0 || second9 === 0 ? "now" : ""}
                                        {second9 > 0 && second9 < 60 ? second9 + " seconds ago" : ""}
                                        {second9 > 59 && second9 < 120 ? minute9 + " minute ago" : ""}
                                        {second9 > 119 && second9 < 3600 ? minute9 + " minutes ago" : ""}
                                        {second9 > 3599 && second9 < 7200 ? hour9 + " hour ago" : ""}
                                        {second9 > 7199 && second9 < 86400 ? hour9 + " hours ago" : ""}
                                        {second9 > 86399 && second9 < 172800 ? day9 + " day ago" : ""}
                                        {second9 > 172799 ? day9 + " days ago" : ""}
                                    </small>
                                </li>
                            </>
                            : ""}
                        {historyPlays[10] !== undefined && historyPlays[10].createdAt ?
                            <>
                                <li className='d-flex list-group-item list-group-item-action'>
                                    <div className="title mb-auto ms-2">
                                        <img width="25" height="25" className="rounded-circle" alt="" src={`${historyPlays[10].photo}`} />
                                        {historyPlays[10].name !== 'Username' ? " " + historyPlays[10].name : " " + historyPlays[10].account.substring(0, 5).toLowerCase()}
                                        {" played " + historyPlays[10].amount + " MATIC and"}
                                        <span style={{ color: historyPlays[10].result ? "mediumseagreen" : "crimson" }}>
                                            {historyPlays[10].result === false ? " lost all " : ""}{historyPlays[10].result === true ? " doubled " : ""}
                                        </span>
                                        {historyPlays[10].streak > 1 ? historyPlays[10].streak + " times " : ""}
                                    </div>
                                    <small className="ms-auto mt-auto time-in-row">
                                        {second10 < 0 || second10 === 0 ? "now" : ""}
                                        {second10 > 0 && second10 < 60 ? second10 + " seconds ago" : ""}
                                        {second10 > 59 && second10 < 120 ? minute10 + " minute ago" : ""}
                                        {second10 > 119 && second10 < 3600 ? minute10 + " minutes ago" : ""}
                                        {second10 > 3599 && second10 < 7200 ? hour10 + " hour ago" : ""}
                                        {second10 > 7199 && second10 < 86400 ? hour10 + " hours ago" : ""}
                                        {second10 > 86399 && second10 < 172800 ? day10 + " day ago" : ""}
                                        {second10 > 172799 ? day10 + " days ago" : ""}
                                    </small>
                                </li>
                            </>
                            : ""}
                        {historyPlays[11] !== undefined && historyPlays[11].createdAt ?
                            <>
                                <li className='d-flex list-group-item list-group-item-action'>
                                    <div className="title mb-auto ms-2">
                                        <img width="25" height="25" className="rounded-circle" alt="" src={`${historyPlays[11].photo}`} />
                                        {historyPlays[11].name !== 'Username' ? " " + historyPlays[11].name : " " + historyPlays[11].account.substring(0, 5).toLowerCase()}
                                        {" played " + historyPlays[11].amount + " MATIC and"}
                                        <span style={{ color: historyPlays[11].result ? "mediumseagreen" : "crimson" }}>
                                            {historyPlays[11].result === false ? " lost all " : ""}{historyPlays[11].result === true ? " doubled " : ""}
                                        </span>
                                        {historyPlays[11].streak > 1 ? historyPlays[11].streak + " times " : ""}
                                    </div>
                                    <small className="ms-auto mt-auto time-in-row">
                                        {second11 < 0 || second11 === 0 ? "now" : ""}
                                        {second11 > 0 && second11 < 60 ? second11 + " seconds ago" : ""}
                                        {second11 > 59 && second11 < 120 ? minute11 + " minute ago" : ""}
                                        {second11 > 119 && second11 < 3600 ? minute11 + " minutes ago" : ""}
                                        {second11 > 3599 && second11 < 7200 ? hour11 + " hour ago" : ""}
                                        {second11 > 7199 && second11 < 86400 ? hour11 + " hours ago" : ""}
                                        {second11 > 86399 && second11 < 172800 ? day11 + " day ago" : ""}
                                        {second11 > 172799 ? day11 + " days ago" : ""}
                                    </small>
                                </li>
                            </>
                            : ""}
                    </ul>
                </div>
            </div>
        </>
    );
}