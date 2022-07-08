import { useState, useEffect } from 'react'
import { useTime } from '../../hooks/useTime'
import { useUserProfile } from '../../hooks/firebase/useUserProfile';

const TableGames = ({ uid, result, streak, maticAmount, createdAt, game, profit, account, isMobileResolution }) => {
    const unixTime = useTime()
    const userProfile = uid !== 'anonymous' ? useUserProfile(uid) : true
    const [gameTime, setGameTime] = useState(false);

    useEffect(() => {
        const second = unixTime - createdAt
        const day = Math.floor(second / (24 * 3600));
        const hour = Math.floor((second - day * 24 * 3600) / 3600);
        const minute = Math.floor((second - day * 24 * 3600 - hour * 3600) / 60);
        setGameTime({ day, hour, minute, second })
    }, [createdAt, unixTime])

    return (
        userProfile && gameTime
        &&
        <tr>
            <td>{game}</td>
            <td>
                <img
                    width="25"
                    height="25"
                    className="rounded-circle"
                    alt=""
                    src={uid !== 'anonymous' && userProfile[0] ? userProfile[0].photo : 'https://firebasestorage.googleapis.com/v0/b/games-club-dce4d.appspot.com/o/ClubLogo.png?alt=media&token=5dd64484-c99f-4ce9-a06b-0a3ee112b37b'}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = "https://firebasestorage.googleapis.com/v0/b/rpsgame-c4a38.appspot.com/o/profile%2FClubLogo.png?alt=media&token=7d14512f-c4a8-400f-a7ca-413239add111";
                    }}
                />
                &nbsp;
                {uid !== 'anonymous' && userProfile[0]
                    ? isMobileResolution
                        ? userProfile[0].name.length > 9 ? userProfile[0].name.substring(0, 9) + "..." : userProfile[0].name
                        : userProfile[0].name.length > 13 ? userProfile[0].name.substring(0, 13) + "..." : userProfile[0].name
                    : isMobileResolution
                        ? <span style={{ color: "#eece5d" }}>{account.substring(0, 5) + "..."}</span>
                        : <span style={{ color: "#eece5d" }}>{account.substring(0, 5) + "..." + account.substring(38, 42)}</span>
                }
            </td>
            {!isMobileResolution &&
                <>
                    <td>{maticAmount}</td>
                    <td>
                        <span style={{ color: result ? "mediumseagreen" : "#ca5c7f" }}>
                            {result ? "doubled " : "went bankrupt "}
                        </span>
                    </td>
                    <td>{streak}</td>
                </>
            }
            <td>
                <span style={{ color: profit > 0 ? "mediumseagreen" : "#ca5c7f" }}>
                    {"$" + parseFloat(profit.toFixed(2))}
                </span>
            </td>
            {!isMobileResolution &&
                <td>
                    <small className="ms-auto me-2">
                        {gameTime.second < 0 || gameTime.second === 0 && "now"}
                        {gameTime.second > 0 && gameTime.second < 60 && gameTime.second + " seconds ago"}
                        {gameTime.second > 59 && gameTime.second < 120 && gameTime.minute + " minute ago"}
                        {gameTime.second > 119 && gameTime.second < 3600 && gameTime.minute + " minutes ago"}
                        {gameTime.second > 3599 && gameTime.second < 7200 && gameTime.hour + " hour ago"}
                        {gameTime.second > 7199 && gameTime.second < 86400 && gameTime.hour + " hours ago"}
                        {gameTime.second > 86399 && gameTime.second < 172800 && gameTime.day + " day ago"}
                        {gameTime.second > 172799 && gameTime.day + " days ago"}
                    </small>
                </td>
            }
        </tr>
    );
}

export default TableGames;