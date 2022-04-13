import React, { useState, useEffect, useContext } from 'react'
import { collection, query, onSnapshot, orderBy, limit } from "firebase/firestore";
import { db } from './firesbaseConfig'
import { Context } from '../context/Context'
export default function ReadAllGames(props) {
    const { unixTime } = useContext(Context);
    const [historyPlays, setHistoryPlays] = useState(false);

    useEffect(() => {
        const q = query(collection(db, "allGames"), orderBy("createdAt", "desc"), limit(12))
        const unsub = onSnapshot(q, (doc) => {
            const played = doc.docs.map(document => {
                const newData = {
                    key: document._key.path.segments[6],
                    data: document.data()
                } 
                return newData
            })
            const games = played.map(game => {
                const player = game.data
                const second = unixTime - player.createdAt
                const day = Math.floor(second / (24 * 3600));
                const hour = Math.floor((second - day * 24 * 3600) / 3600);
                const minute = Math.floor((second - day * 24 * 3600 - hour * 3600) / 60);
                const array = {
                    name: player.name,
                    photo: player.photo,
                    maticAmount: player.maticAmount,
                    result: player.result,
                    streak: player.streak,
                    createdAt: player.createdAt,
                    day: day,
                    hour: hour,
                    minute: minute,
                    second: second,
                    gameKey: game.key
                }
                return array
            })
            setHistoryPlays(games)
        });
        return () => unsub()
    }, [])

    return (
        <>
            {historyPlays &&
                <div className="play-list mt-4">
                    <ul className="list-group">
                        {historyPlays.map(games => {
                            return (
                                <li className='d-flex flex-column py-2' key={games.gameKey}>
                                    <div className="title mb-auto ms-2">
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
                                                    ? games.account.substring(0, 5).toLowerCase() + "..."
                                                    : games.account.substring(0, 5).toLowerCase() + "..." + games.account.substring(38, 42).toLowerCase()
                                                }
                                            </>
                                        }
                                        {" played " + games.maticAmount + " MATIC and"}
                                        <span style={{ color: games.result ? "mediumseagreen" : "crimson" }}>
                                            {games.result === false ? " lost all " : ""}{games.result === true ? " doubled " : ""}
                                        </span>
                                        {games.streak > 1 ? games.streak + " times " : ""}
                                    </div>
                                    <small className="ms-auto me-2 time-in-row" key={games.second}>
                                        {games.second < 0 || games.second === 0 ? "now" : ""}
                                        {games.second > 0 && games.second < 60 ? games.second + " seconds ago" : ""}
                                        {games.second > 59 && games.second < 120 ? games.minute + " minute ago" : ""}
                                        {games.second > 119 && games.second < 3600 ? games.minute + " minutes ago" : ""}
                                        {games.second > 3599 && games.second < 7200 ? games.hour + " hour ago" : ""}
                                        {games.second > 7199 && games.second < 86400 ? games.hour + " hours ago" : ""}
                                        {games.second > 86399 && games.second < 172800 ? games.day + " day ago" : ""}
                                        {games.second > 172799 ? day0 + " days ago" : ""}
                                    </small>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            }
        </>
    );
}