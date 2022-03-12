import React, { useState, useEffect } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from '../../../firebase/firesbaseConfig'
export default function dayWinStreakLeaderboard(props) {
    const [dropdown, setDropdown] = useState(false);
    const [dayWinStreak, setDayWinStreak] = useState(0);
    const [hour0, setHour0] = useState(0);
    const [hour1, setHour1] = useState(0);
    const [hour2, setHour2] = useState(0);
    const [hour3, setHour3] = useState(0);
    const [hour4, setHour4] = useState(0);
    const [hour5, setHour5] = useState(0);
    const [hour6, setHour6] = useState(0);
    const [hour7, setHour7] = useState(0);
    const [minute0, setMinute0] = useState(0);
    const [minute1, setMinute1] = useState(0);
    const [minute2, setMinute2] = useState(0);
    const [minute3, setMinute3] = useState(0);
    const [minute4, setMinute4] = useState(0);
    const [minute5, setMinute5] = useState(0);
    const [minute6, setMinute6] = useState(0);
    const [minute7, setMinute7] = useState(0);
    const [second0, setSecond0] = useState(0);
    const [second1, setSecond1] = useState(0);
    const [second2, setSecond2] = useState(0);
    const [second3, setSecond3] = useState(0);
    const [second4, setSecond4] = useState(0);
    const [second5, setSecond5] = useState(0);
    const [second6, setSecond6] = useState(0);
    const [second7, setSecond7] = useState(0);
    const toggleMenu = () => {
        setDropdown(!dropdown);
    }
    useEffect(() => {
        readActuallTime(props.unixTimeStamp)
        return () => {
            setHour0(0);
            setHour1(0);
            setHour2(0);
            setHour3(0);
            setHour4(0);
            setHour5(0);
            setHour6(0);
            setHour7(0);
            setMinute0(0);
            setMinute1(0);
            setMinute2(0);
            setMinute3(0);
            setMinute4(0);
            setMinute5(0);
            setMinute6(0);
            setMinute7(0);
            second0(0);
            second1(0);
            second2(0);
            second3(0);
            second4(0);
            second5(0);
            second6(0);
            second7(0);
          };
    }, [props.unixTimeStamp])

    const readActuallTime = async (unixTimeStamp) => {
        let winStreakDay = []
        const unixSeconds = parseInt(unixTimeStamp)
        let lastDay = unixSeconds - 86400
        const clubCollection = collection(db, "clubUsers")
        const queryGames = query(clubCollection, orderBy("rps.dayWinStreak", "desc"))
        const documentGames = await getDocs(queryGames)
        documentGames.forEach((doc) => {
            if (doc.data().rps.winStreakTime > lastDay && doc.data().rps.dayWinStreak > 1) {
                winStreakDay.push([doc.data().photo, doc.data().name, doc.data().account, doc.data().rps.dayWinStreak, doc.data().rps.winStreakTime.seconds])
            }
        });
        setDayWinStreak(winStreakDay)
        if (winStreakDay[0]) {
            var seg = unixSeconds - winStreakDay[0][4]
            var day = Math.floor(seg / (24 * 3600));
            var hour = Math.floor((seg - day * 24 * 3600) / 3600);
            var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
            setHour0(hour)
            setMinute0(minute)
            setSecond0(seg)
        }
        if (winStreakDay[1]) {
            var seg = unixSeconds - winStreakDay[1][4]
            var day = Math.floor(seg / (24 * 3600));
            var hour = Math.floor((seg - day * 24 * 3600) / 3600);
            var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
            setHour1(hour)
            setMinute1(minute)
            setSecond1(seg)
        }
        if (winStreakDay[2]) {
            var seg = unixSeconds - winStreakDay[2][4]
            var day = Math.floor(seg / (24 * 3600));
            var hour = Math.floor((seg - day * 24 * 3600) / 3600);
            var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
            setHour2(hour)
            setMinute2(minute)
            setSecond2(seg)
        }
        if (winStreakDay[3]) {
            var seg = unixSeconds - winStreakDay[3][4]
            var day = Math.floor(seg / (24 * 3600));
            var hour = Math.floor((seg - day * 24 * 3600) / 3600);
            var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
            setHour3(hour)
            setMinute3(minute)
            setSecond3(seg)
        }
        if (winStreakDay[4]) {
            var seg = unixSeconds - winStreakDay[4][4]
            var day = Math.floor(seg / (24 * 3600));
            var hour = Math.floor((seg - day * 24 * 3600) / 3600);
            var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
            setHour4(hour)
            setMinute4(minute)
            setSecond4(seg)
        }
        if (winStreakDay[5]) {
            var seg = unixSeconds - winStreakDay[5][4]
            var day = Math.floor(seg / (24 * 3600));
            var hour = Math.floor((seg - day * 24 * 3600) / 3600);
            var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
            setHour5(hour)
            setMinute5(minute)
            setSecond5(seg)
        }
        if (winStreakDay[6]) {
            var seg = unixSeconds - winStreakDay[6][4]
            var day = Math.floor(seg / (24 * 3600));
            var hour = Math.floor((seg - day * 24 * 3600) / 3600);
            var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
            setHour6(hour)
            setMinute6(minute)
            setSecond6(seg)
        }
        if (winStreakDay[7]) {
            var seg = unixSeconds - winStreakDay[7][4]
            var day = Math.floor(seg / (24 * 3600));
            var hour = Math.floor((seg - day * 24 * 3600) / 3600);
            var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
            setHour7(hour)
            setMinute7(minute)
            setSecond7(seg)
        }

    }
    return (
        <>
            <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="md">
                {
                    props.isMobileVersion ?
                        <DropdownToggle color='danger'>
                            STREAKS
                        </DropdownToggle>
                        :
                        <DropdownToggle color='danger'>
                            <span>WINSTREAKS <i className="fa-solid fa-trophy fa-xs"></i></span>
                        </DropdownToggle>
                }
                <DropdownMenu className="dd-menu">
                    {dayWinStreak[0] ?
                        <DropdownItem className="dd-menu-item">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${dayWinStreak[0][0]}`} />
                            {dayWinStreak[0][1] !== 'Username' ? dayWinStreak[0][1] : dayWinStreak[0][2].substring(0, 5)}
                            {" is on a " + dayWinStreak[0][3] + " win streak"}
                            <small className="d-flex justify-content-end">
                                {second0 < 0 || second0 === 0 ? "now" : ""}
                                {second0 > 0 && second0 < 60 ? second0 + " seconds ago" : ""}
                                {second0 > 59 && second0 < 120 ? minute0 + " minute ago" : ""}
                                {second0 > 119 && second0 < 3600 ? minute0 + " minutes ago" : ""}
                                {second0 > 3599 && second0 < 7200 ? hour0 + " hour ago" : ""}
                                {second0 > 7199 ? hour0 + " hours ago" : ""}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {dayWinStreak[1] ?
                        <DropdownItem className="dd-menu-item">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${dayWinStreak[1][0]}`} />
                            {dayWinStreak[1][1] !== 'Username' ? " " + dayWinStreak[1][1] : " " + dayWinStreak[1][2].substring(0, 5)}
                            {" is on a " + dayWinStreak[1][3] + " win streak"}
                            <small className="d-flex justify-content-end">
                                {second1 < 0 || second1 === 0 ? "now" : ""}
                                {second1 > 0 && second1 < 60 ? second1 + " seconds ago" : ""}
                                {second1 > 59 && second1 < 120 ? minute1 + " minute ago" : ""}
                                {second1 > 119 && second1 < 3600 ? minute1 + " minutes ago" : ""}
                                {second1 > 3599 && second1 < 7200 ? hour1 + " hour ago" : ""}
                                {second1 > 7199 ? hour1 + " hours ago" : ""}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {dayWinStreak[2] ?
                        <DropdownItem className="dd-menu-item">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${dayWinStreak[2][0]}`} />
                            {dayWinStreak[2][1] !== 'Username' ? " " + dayWinStreak[2][1] : " " + dayWinStreak[2][2].substring(0, 5)}
                            {" is on a " + dayWinStreak[2][3] + " win streak"}
                            <small className="d-flex justify-content-end">
                                {second2 < 0 || second2 === 0 ? "now" : ""}
                                {second2 > 0 && second2 < 60 ? second2 + " seconds ago" : ""}
                                {second2 > 59 && second2 < 120 ? minute2 + " minute ago" : ""}
                                {second2 > 119 && second2 < 3600 ? minute2 + " minutes ago" : ""}
                                {second2 > 3599 && second2 < 7200 ? hour2 + " hour ago" : ""}
                                {second2 > 7199 ? hour2 + " hours ago" : ""}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {dayWinStreak[3] ?
                        <DropdownItem className="dd-menu-item">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${dayWinStreak[3][0]}`} />
                            {dayWinStreak[3][1] !== 'Username' ? " " + dayWinStreak[3][1] : " " + dayWinStreak[3][2].substring(0, 5)}
                            {" is on a " + dayWinStreak[3][3] + " win streak"}
                            <small className="d-flex justify-content-end">
                                {second3 < 0 || second3 === 0 ? "now" : ""}
                                {second3 > 0 && second3 < 60 ? second3 + " seconds ago" : ""}
                                {second3 > 59 && second3 < 120 ? minute3 + " minute ago" : ""}
                                {second3 > 119 && second3 < 3600 ? minute3 + " minutes ago" : ""}
                                {second3 > 3599 && second3 < 7200 ? hour3 + " hour ago" : ""}
                                {second3 > 7199 ? hour3 + " hours ago" : ""}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {dayWinStreak[4] ?
                        <DropdownItem className="dd-menu-item">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${dayWinStreak[4][0]}`} />
                            {dayWinStreak[4][1] !== 'Username' ? " " + dayWinStreak[4][1] : " " + dayWinStreak[4][2].substring(0, 5)}
                            {" is on a " + dayWinStreak[4][3] + " win streak"}
                            <small className="d-flex justify-content-end">
                                {second4 < 0 || second4 === 0 ? "now" : ""}
                                {second4 > 0 && second4 < 60 ? second4 + " seconds ago" : ""}
                                {second4 > 59 && second4 < 120 ? minute4 + " minute ago" : ""}
                                {second4 > 119 && second4 < 3600 ? minute4 + " minutes ago" : ""}
                                {second4 > 3599 && second4 < 7200 ? hour4 + " hour ago" : ""}
                                {second4 > 7199 ? hour4 + " hours ago" : ""}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {dayWinStreak[5] ?
                        <DropdownItem className="dd-menu-item">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${dayWinStreak[5][0]}`} />
                            {dayWinStreak[5][1] !== 'Username' ? " " + dayWinStreak[5][1] : " " + dayWinStreak[5][2].substring(0, 5)}
                            {" is on a " + dayWinStreak[5][3] + " win streak"}
                            <small className="d-flex justify-content-end">
                                {second5 < 0 || second5 === 0 ? "now" : ""}
                                {second5 > 0 && second5 < 60 ? second5 + " seconds ago" : ""}
                                {second5 > 59 && second5 < 120 ? minute5 + " minute ago" : ""}
                                {second5 > 119 && second5 < 3600 ? minute5 + " minutes ago" : ""}
                                {second5 > 3599 && second5 < 7200 ? hour5 + " hour ago" : ""}
                                {second5 > 7199 ? hour5 + " hours ago" : ""}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {dayWinStreak[6] ?
                        <DropdownItem className="dd-menu-item">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${dayWinStreak[6][0]}`} />
                            {dayWinStreak[6][1] !== 'Username' ? " " + dayWinStreak[6][1] : " " + dayWinStreak[6][2].substring(0, 5)}
                            {" is on a " + dayWinStreak[6][3] + " win streak"}
                            <small className="d-flex justify-content-end">
                                {second6 < 0 || second6 === 0 ? "now" : ""}
                                {second6 > 0 && second6 < 60 ? second6 + " seconds ago" : ""}
                                {second6 > 59 && second6 < 120 ? minute6 + " minute ago" : ""}
                                {second6 > 119 && second6 < 3600 ? minute6 + " minutes ago" : ""}
                                {second6 > 3599 && second6 < 7200 ? hour6 + " hour ago" : ""}
                                {second6 > 7199 ? hour6 + " hours ago" : ""}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {dayWinStreak[7] ?
                        <DropdownItem className="dd-menu-item">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${dayWinStreak[7][0]}`} />
                            {dayWinStreak[7][1] !== 'Username' ? " " + dayWinStreak[7][1] : " " + dayWinStreak[7][2].substring(0, 5)}
                            {" is on a " + dayWinStreak[7][3] + " win streak"}
                            <small className="d-flex justify-content-end">
                                {second7 < 0 || second7 === 0 ? "now" : ""}
                                {second7 > 0 && second7 < 60 ? second7 + " seconds ago" : ""}
                                {second7 > 59 && second7 < 120 ? minute7 + " minute ago" : ""}
                                {second7 > 119 && second7 < 3600 ? minute7 + " minutes ago" : ""}
                                {second7 > 3599 && second7 < 7200 ? hour7 + " hour ago" : ""}
                                {second7 > 7199 ? hour7 + " hours ago" : ""}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                </DropdownMenu>
            </Dropdown>
        </>
    )
}
