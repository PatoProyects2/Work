import React, { useState, useEffect, useCallback } from 'react'
import { collection, query, onSnapshot, orderBy, limit, where } from "firebase/firestore";
import { DropdownItem, DropdownMenu } from 'reactstrap'
import { db } from './firesbaseConfig'
import { useTime } from '../hooks/useTime'
export default function ReadRPSGames(props) {
    const [globalQuery, setGlobalQuery] = useState(false);
    const [historyPlays, setHistoryPlays] = useState(false);
    const unixTime = useTime()

    useEffect(() => {
        getRPSGames()
        return () => {
            setGlobalQuery(false)
        }
    }, [])

    const getRPSGames = useCallback(() => {
        const q = query(collection(db, "allGames"), where("game", "==", "RPS"), orderBy("createdAt", "desc"), limit(12))
        const unsub = onSnapshot(q, (doc) => {
            const played = doc.docs.map(document => document.data())
            setGlobalQuery(played)
        });
        return () => unsub()
    }, [])

    useEffect(() => {
        if (globalQuery) {
            const games = globalQuery.map(player => {
                const second = unixTime - player.createdAt
                const day = Math.floor(second / (24 * 3600));
                const hour = Math.floor((second - day * 24 * 3600) / 3600);
                const minute = Math.floor((second - day * 24 * 3600 - hour * 3600) / 60);
                const array = {
                    account: player.account,
                    name: player.name,
                    photo: player.photo,
                    maticAmount: player.maticAmount,
                    result: player.result,
                    streak: player.streak,
                    day: day,
                    hour: hour,
                    minute: minute,
                    second: second,
                }
                return array
            })
            setHistoryPlays(games)
        }
        return () => {
            setHistoryPlays(false)
        }
    }, [globalQuery, unixTime])


    return (
        <>
            <DropdownMenu className="dd-menu">
                {historyPlays &&
                    <>
                        {historyPlays.map((games, index) => {
                            return (
                                <DropdownItem className="dd-menu-item" key={index}>
                                    <img width="25" height="25" className="rounded-circle" alt="" src={`${games.photo}`} /> &nbsp;
                                    {games.name !== '' ?
                                        <>
                                            {props.isMobileResolution ?
                                                <>
                                                    {games.name.length > 5
                                                        ? games.name.substring(0, 5) + "..."
                                                        : games.name
                                                    }
                                                </>
                                                :
                                                <>
                                                    {games.name.length > 15
                                                        ? games.name.substring(0, 15) + "..."
                                                        : games.name
                                                    }
                                                </>
                                            }
                                        </>
                                        :
                                        <>
                                            {props.isMobileResolution
                                                ? games.account.substring(0, 5) + "..."
                                                : games.account.substring(0, 5) + "..." + games.account.substring(38, 42)
                                            }
                                        </>
                                    }
                                    {" played " + games.maticAmount + " MATIC and"}
                                    <span style={{ color: games.result ? "mediumseagreen" : "crimson" }}>
                                        {games.result === false ? " lost all " : ""}{games.result === true ? " doubled " : ""}
                                    </span>
                                    {games.streak > 1 ? games.streak + " times " : ""}
                                    <small className="d-flex justify-content-end">
                                        {games.second < 0 || games.second === 0 ? "now" : ""}
                                        {games.second > 0 && games.second < 60 ? games.second + " seconds ago" : ""}
                                        {games.second > 59 && games.second < 120 ? games.minute + " minute ago" : ""}
                                        {games.second > 119 && games.second < 3600 ? games.minute + " minutes ago" : ""}
                                        {games.second > 3599 && games.second < 7200 ? games.hour + " hour ago" : ""}
                                        {games.second > 7199 && games.second < 86400 ? games.hour + " hours ago" : ""}
                                        {games.second > 86399 && games.second < 172800 ? games.day + " day ago" : ""}
                                        {games.second > 172799 ? games.day + " days ago" : ""}
                                    </small>
                                </DropdownItem>
                            )
                        })
                        }
                    </>
                }
            </DropdownMenu>
        </>
    );
}