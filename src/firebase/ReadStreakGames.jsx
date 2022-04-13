import React, { useState, useEffect, useContext } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { collection, where, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from './firesbaseConfig'
import { Context } from '../context/Context'
export default function ReadStreakGames(props) {
    const { unixTime } = useContext(Context);
    const [dropdown, setDropdown] = useState(false);
    const [historyPlays, setHistoryPlays] = useState(false);

    const toggleMenu = () => {
        setDropdown(!dropdown);
    }

    useEffect(() => {
        const q = query(collection(db, "clubUsers"), where("rps.dayWinStreak", ">", 2), orderBy("rps.dayWinStreak", "desc"))
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
            <DropdownMenu className="dd-menu">
                {historyPlays &&
                    <>
                        {historyPlays.map(games => {
                            return (
                                <DropdownItem className="dd-menu-item" key={games.gameKey}>
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
                                    {" is on a " + games.streak + " win streak"}
                                    <small className="d-flex justify-content-end" key={games.second}>
                                        {games.second < 0 || games.second === 0 ? "now" : ""}
                                        {games.second > 0 && games.second < 60 ? games.second + " seconds ago" : ""}
                                        {games.second > 59 && games.second < 120 ? games.minute + " minute ago" : ""}
                                        {games.second > 119 && games.second < 3600 ? games.minute + " minutes ago" : ""}
                                        {games.second > 3599 && games.second < 7200 ? games.hour + " hour ago" : ""}
                                        {games.second > 7199 && games.second < 86400 ? games.hour + " hours ago" : ""}
                                        {games.second > 86399 && games.second < 172800 ? games.day + " day ago" : ""}
                                        {games.second > 172799 ? day0 + " days ago" : ""}
                                    </small>
                                </DropdownItem>
                            )
                        })
                        }
                    </>
                }
            </DropdownMenu>
        </>
    )
}
