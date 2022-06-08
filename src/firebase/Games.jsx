import React, { useState, useEffect, memo } from 'react'
import { collection, query, onSnapshot, orderBy, limit, getDocs, where } from "firebase/firestore";
import { db } from '../config/firesbaseConfig'
import { useTime } from '../hooks/useTime'
import styled from 'styled-components'

const StyledLiveBets = styled.div`
.Columna {
    justify-content: space-between;
    border: 1px solid #2c2640;
    padding-top: 12px;
    padding-bottom: 12px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}

.MasterColumna {
    background-color: #2c2640;
    border: 1px solid #554c77;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}
`

const Games = (props) => {
    const [globalQuery, setGlobalQuery] = useState(false);
    const [historyPlays, setHistoryPlays] = useState(false);
    const unixTime = useTime()

    useEffect(() => {
        const q = query(collection(db, "allGames"), orderBy("createdAt", "desc"), limit(12))
        const unsub = onSnapshot(q, async (doc) => {
            const played = doc.docs.map(document => document.data())
            const data = await Promise.all(played.map(async (user) => {
                const userQuery = query(collection(db, "clubUsers"), where("uid", "==", user.uid))
                const userDocs = await getDocs(userQuery)
                const userFields = userDocs._snapshot.docChanges[0].doc.data.value.mapValue.fields
                const userData = {
                    result: user.result,
                    streak: user.streak,
                    account: user.account,
                    maticAmount: user.maticAmount,
                    createdAt: user.createdAt,
                    name: userFields.name.stringValue,
                    photo: userFields.photo.stringValue,
                }
                return userData
            }))
            setGlobalQuery(data)
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
                    ...player,
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
        <StyledLiveBets>
            {historyPlays &&
                <div className="play-list">
                    <ul className="list-group MasterColumna">
                        {historyPlays.map((games, index) => {
                            return (
                                <li className='Columna px-2 d-flex' key={index}>
                                    <div className="title ">
                                        <img width="25" height="25" className="rounded-circle" alt="" src={`${games.photo}`} /> &nbsp;
                                        {games.name !== ''
                                            ? props.isMobileResolution
                                                ? games.name.length > 5 ? games.name.substring(0, 5) + "..." : games.name
                                                : games.name.length > 15 ? games.name.substring(0, 15) + "..." : games.name
                                            : props.isMobileResolution
                                                ? <span style={{ color: "#eece5d" }}>{games.account.substring(0, 5) + "..."}</span>
                                                : <span style={{ color: "#eece5d" }}>{games.account.substring(0, 5) + "..." + games.account.substring(38, 42)}</span>
                                        }
                                        {" played " + games.maticAmount + " MATIC and"}
                                        <span style={{ color: games.result && "mediumseagreen" }}>
                                            {games.result ? " doubled " : <span style={{ color: "#ca5c7f" }}> went bankrupt </span>}
                                        </span>
                                        {games.streak > 1 && games.streak + " times "}
                                    </div>
                                    <div className='Tiempo'>
                                        <small className="ms-auto me-2">
                                            {games.second < 0 || games.second === 0 && "now"}
                                            {games.second > 0 && games.second < 60 && games.second + " seconds ago"}
                                            {games.second > 59 && games.second < 120 && games.minute + " minute ago"}
                                            {games.second > 119 && games.second < 3600 && games.minute + " minutes ago"}
                                            {games.second > 3599 && games.second < 7200 && games.hour + " hour ago"}
                                            {games.second > 7199 && games.second < 86400 && games.hour + " hours ago"}
                                            {games.second > 86399 && games.second < 172800 && games.day + " day ago"}
                                            {games.second > 172799 && games.day + " days ago"}
                                        </small>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            }
        </StyledLiveBets>
    );
}

export default Games;