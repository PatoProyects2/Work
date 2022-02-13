import React, { useState, useEffect } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
export default function WinStreakLeaderboard(props) {
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
    const [dropdown, setDropdown] = useState(false);
    const toggleMenu = () => {
        setDropdown(!dropdown);
    }

    useEffect(() => {
        blockTime(props.blockchain, props.blockStreak0, props.blockStreak1, props.blockStreak2, props.blockStreak3, props.blockStreak4, props.blockStreak5, props.blockStreak6, props.blockStreak7)
    }, [props.blockchain, props.blockStreak0, props.blockStreak1, props.blockStreak2, props.blockStreak3, props.blockStreak4, props.blockStreak5, props.blockStreak6, props.blockStreak7]);

    const blockTime = (blockchain, blockStreak0, blockStreak1, blockStreak2, blockStreak3, blockStreak4, blockStreak5, blockStreak6, blockStreak7) => {
        try {
            var seg = (blockchain - blockStreak0) * 2;
            var day = Math.floor(seg / (24 * 3600));
            var hour = Math.floor((seg - day * 24 * 3600) / 3600);
            var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
            setHour0(hour)
            setMinute0(minute)
            setSecond0(seg)
        } catch (e) {

        }
        try {
            var seg = (blockchain - blockStreak1) * 2;
            var day = Math.floor(seg / (24 * 3600));
            var hour = Math.floor((seg - day * 24 * 3600) / 3600);
            var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
            setHour1(hour)
            setMinute1(minute)
            setSecond1(seg)
        } catch (e) {

        }
        try {
            var seg = (blockchain - blockStreak2) * 2;
            var day = Math.floor(seg / (24 * 3600));
            var hour = Math.floor((seg - day * 24 * 3600) / 3600);
            var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
            setHour2(hour)
            setMinute2(minute)
            setSecond2(seg)
        } catch (e) {

        }
        try {
            var seg = (blockchain - blockStreak3) * 2;
            var day = Math.floor(seg / (24 * 3600));
            var hour = Math.floor((seg - day * 24 * 3600) / 3600);
            var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
            setHour3(hour)
            setMinute3(minute)
            setSecond3(seg)
        } catch (e) {

        }
        try {
            var seg = (blockchain - blockStreak4) * 2;
            var day = Math.floor(seg / (24 * 3600));
            var hour = Math.floor((seg - day * 24 * 3600) / 3600);
            var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
            setHour4(hour)
            setMinute4(minute)
            setSecond4(seg)
        } catch (e) {

        }
        try {
            var seg = (blockchain - blockStreak5) * 2;
            var day = Math.floor(seg / (24 * 3600));
            var hour = Math.floor((seg - day * 24 * 3600) / 3600);
            var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
            setHour5(hour)
            setMinute5(minute)
            setSecond5(seg)
        } catch (e) {

        }
        try {
            var seg = (blockchain - blockStreak6) * 2;
            var day = Math.floor(seg / (24 * 3600));
            var hour = Math.floor((seg - day * 24 * 3600) / 3600);
            var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
            setHour6(hour)
            setMinute6(minute)
            setSecond6(seg)
        } catch (e) {

        }
        try {
            var seg = (blockchain - blockStreak7) * 2;
            var day = Math.floor(seg / (24 * 3600));
            var hour = Math.floor((seg - day * 24 * 3600) / 3600);
            var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
            setHour7(hour)
            setMinute7(minute)
            setSecond7(seg)
        } catch (e) {

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
                <DropdownMenu className={props.theme === 'dark' ? 'bg-dark' : 'bg-light'}>
                    {props.winStreak7 > 0 && props.blockStreak7 > props.dayBlock ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            {props.picStreak7 && <img width="35" height="35" className="rounded-circle" alt="" src={props.picStreak7} />}
                            {" " + props.nameStreak7 + " is on a " + props.winStreak7 + " win streak"}
                            <small className="d-flex justify-content-end">
                                {second7 < 0 || second7 === 0 ? "now" : ""}
                                {second7 < 60 ? second7 + " seconds ago" : ""}
                                {second7 > 59 && second7 < 3600 ? minute7 + " minutes ago" : ""}
                                {second7 > 3599 && second7 < 7200 ? hour7 + " hour ago" : ""}
                                {second7 > 7199 ? hour7 + " hours ago" : ""}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {props.winStreak6 > 0 && props.blockStreak6 > props.dayBlock ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            {props.picStreak6 && <img width="35" height="35" className="rounded-circle" alt="" src={props.picStreak6} />}
                            {" " + props.nameStreak6 + " is on a " + props.winStreak6 + " win streak"}
                            <small className="d-flex justify-content-end">
                                {second6 < 0 || second6 === 0 ? "now" : ""}
                                {second6 < 60 ? second6 + " seconds ago" : ""}
                                {second6 > 59 && second6 < 3600 ? minute6 + " minutes ago" : ""}
                                {second6 > 3599 && second6 < 7200 ? hour6 + " hour ago" : ""}
                                {second6 > 7199 ? hour6 + " hours ago" : ""}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {props.winStreak5 > 0 && props.blockStreak5 > props.dayBlock ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            {props.picStreak5 && <img width="35" height="35" className="rounded-circle" alt="" src={props.picStreak5} />}
                            {" " + props.nameStreak5 + " is on a " + props.winStreak5 + " win streak"}
                            <small className="d-flex justify-content-end">
                                {second5 < 0 || second5 === 0 ? "now" : ""}
                                {second5 < 60 ? second5 + " seconds ago" : ""}
                                {second5 > 59 && second5 < 3600 ? minute5 + " minutes ago" : ""}
                                {second5 > 3599 && second5 < 7200 ? hour5 + " hour ago" : ""}
                                {second5 > 7199 ? hour5 + " hours ago" : ""}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {props.winStreak4 > 0 && props.blockStreak4 > props.dayBlock ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            {props.picStreak4 && <img width="35" height="35" className="rounded-circle" alt="" src={props.picStreak4} />}
                            {" " + props.nameStreak4 + " is on a " + props.winStreak4 + " win streak"}
                            <small className="d-flex justify-content-end">
                                {second4 < 0 || second4 === 0 ? "now" : ""}
                                {second4 < 60 ? second4 + " seconds ago" : ""}
                                {second4 > 59 && second4 < 3600 ? minute4 + " minutes ago" : ""}
                                {second4 > 3599 && second4 < 7200 ? hour4 + " hour ago" : ""}
                                {second4 > 7199 ? hour4 + " hours ago" : ""}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {props.winStreak3 > 0 && props.blockStreak3 > props.dayBlock ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            {props.picStreak3 && <img width="35" height="35" className="rounded-circle" alt="" src={props.picStreak3} />}
                            {" " + props.nameStreak3 + " is on a " + props.winStreak3 + " win streak"}
                            <small className="d-flex justify-content-end">
                                {second3 < 0 || second3 === 0 ? "now" : ""}
                                {second3 < 60 ? second3 + " seconds ago" : ""}
                                {second3 > 59 && second3 < 3600 ? minute3 + " minutes ago" : ""}
                                {second3 > 3599 && second3 < 7200 ? hour3 + " hour ago" : ""}
                                {second3 > 7199 ? hour3 + " hours ago" : ""}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {props.winStreak2 > 0 && props.blockStreak2 > props.dayBlock ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            {props.picStreak2 && <img width="35" height="35" className="rounded-circle" alt="" src={props.picStreak2} />}
                            {" " + props.nameStreak2 + " is on a " + props.winStreak2 + " win streak"}
                            <small className="d-flex justify-content-end">
                                {second2 < 0 || second2 === 0 ? "now" : ""}
                                {second2 < 60 ? second2 + " seconds ago" : ""}
                                {second2 > 59 && second2 < 3600 ? minute2 + " minutes ago" : ""}
                                {second2 > 3599 && second2 < 7200 ? hour2 + " hour ago" : ""}
                                {second2 > 7199 ? hour2 + " hours ago" : ""}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {props.winStreak1 > 0 && props.blockStreak1 > props.dayBlock ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            {props.picStreak1 && <img width="35" height="35" className="rounded-circle" alt="" src={props.picStreak1} />}
                            {" " + props.nameStreak1 + " is on a " + props.winStreak1 + " win streak"}
                            <small className="d-flex justify-content-end">
                                {second1 < 0 || second1 === 0 ? "now" : ""}
                                {second1 < 60 ? second1 + " seconds ago" : ""}
                                {second1 > 59 && second1 < 3600 ? minute1 + " minutes ago" : ""}
                                {second1 > 3599 && second1 < 7200 ? hour1 + " hour ago" : ""}
                                {second1 > 7199 ? hour1 + " hours ago" : ""}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {props.winStreak0 > 0 && props.blockStreak0 > props.dayBlock ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            {props.picStreak0 && <img width="35" height="35" className="rounded-circle" alt="" src={props.picStreak0} />}
                            {" " + props.nameStreak0 + " is on a " + props.winStreak0 + " win streak"}
                            <small className="d-flex justify-content-end">
                                {second0 < 0 || second0 === 0 ? "now" : ""}
                                {second0 < 60 ? second0 + " seconds ago" : ""}
                                {second0 > 59 && second0 < 3600 ? minute0 + " minutes ago" : ""}
                                {second0 > 3599 && second0 < 7200 ? hour0 + " hour ago" : ""}
                                {second0 > 7199 ? hour0 + " hours ago" : ""}
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
