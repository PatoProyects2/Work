import React, { useState, useEffect } from 'react'
import { getDocs, query, where, orderBy, limit, collection } from "firebase/firestore";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { db } from '../../../firebase/firesbaseConfig'
export default function WinStreakLeaderboard(props) {
    const [blockchain, setBlockchain] = useState(0);
    const [dayBlock, setDayBlock] = useState(0)
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
    const [picStreak0, setPicStreak0] = useState('')
    const [picStreak1, setPicStreak1] = useState('')
    const [picStreak2, setPicStreak2] = useState('')
    const [picStreak3, setPicStreak3] = useState('')
    const [picStreak4, setPicStreak4] = useState('')
    const [picStreak5, setPicStreak5] = useState('')
    const [picStreak6, setPicStreak6] = useState('')
    const [picStreak7, setPicStreak7] = useState('')
    const [nameStreak0, setNameStreak0] = useState('')
    const [nameStreak1, setNameStreak1] = useState('')
    const [nameStreak2, setNameStreak2] = useState('')
    const [nameStreak3, setNameStreak3] = useState('')
    const [nameStreak4, setNameStreak4] = useState('')
    const [nameStreak5, setNameStreak5] = useState('')
    const [nameStreak6, setNameStreak6] = useState('')
    const [nameStreak7, setNameStreak7] = useState('')
    const [blockStreak0, setBlockStreak0] = useState(0)
    const [blockStreak1, setBlockStreak1] = useState(0)
    const [blockStreak2, setBlockStreak2] = useState(0)
    const [blockStreak3, setBlockStreak3] = useState(0)
    const [blockStreak4, setBlockStreak4] = useState(0)
    const [blockStreak5, setBlockStreak5] = useState(0)
    const [blockStreak6, setBlockStreak6] = useState(0)
    const [blockStreak7, setBlockStreak7] = useState(0)
    const [winStreak0, setWinStreak0] = useState(0)
    const [winStreak1, setWinStreak1] = useState(0)
    const [winStreak2, setWinStreak2] = useState(0)
    const [winStreak3, setWinStreak3] = useState(0)
    const [winStreak4, setWinStreak4] = useState(0)
    const [winStreak5, setWinStreak5] = useState(0)
    const [winStreak6, setWinStreak6] = useState(0)
    const [winStreak7, setWinStreak7] = useState(0)
    const [dropdown, setDropdown] = useState(false);
    const toggleMenu = () => {
        setDropdown(!dropdown);
    }

    useEffect(() => {
        const timer = setInterval(() => { loadUserStreaks(props.web3) }, 5000);
        return () => clearTimeout(timer);
    }, [props.web3]);

    const loadUserStreaks = async (web3) => {
        try {
            const actuallBlock = await web3.eth.getBlockNumber()
            setBlockchain(actuallBlock)
            const dayBlock = actuallBlock - 43200
            setDayBlock(dayBlock)
            const userCollection = collection(db, "users")
            const queryStreakBlock = query(userCollection, where("winStreak", ">", 0), orderBy("winStreak"), limit(8))
            const queryDocuments = await getDocs(queryStreakBlock)
            const queryStreak = queryDocuments._snapshot.docChanges
            try {
                const dataStreak0 = queryStreak[0].doc.data.value.mapValue.fields
                setPicStreak0(dataStreak0.pic1.stringValue)
                setNameStreak0(dataStreak0.name1.stringValue)
                setWinStreak0(dataStreak0.winStreak.integerValue)
                setBlockStreak0(dataStreak0.winStreakBlock.integerValue)
                var seg = (actuallBlock - dataStreak0.winStreakBlock.integerValue) * 2;
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setHour0(hour)
                setMinute0(minute)
                setSecond0(seg)
            } catch (e) {

            }
            try {
                const dataStreak1 = queryStreak[1].doc.data.value.mapValue.fields
                setPicStreak1(dataStreak1.pic1.stringValue)
                setNameStreak1(dataStreak1.name1.stringValue)
                setWinStreak1(dataStreak1.winStreak.integerValue)
                setBlockStreak1(dataStreak1.winStreakBlock.integerValue)
                var seg = (actuallBlock - dataStreak1.winStreakBlock.integerValue) * 2;
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setHour1(hour)
                setMinute1(minute)
                setSecond1(seg)
            } catch (e) {

            }
            try {
                const dataStreak2 = queryStreak[2].doc.data.value.mapValue.fields
                setPicStreak2(dataStreak2.pic1.stringValue)
                setNameStreak2(dataStreak2.name1.stringValue)
                setWinStreak2(dataStreak2.winStreak.integerValue)
                setBlockStreak2(dataStreak2.winStreakBlock.integerValue)
                var seg = (actuallBlock - dataStreak2.winStreakBlock.integerValue) * 2;
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setHour2(hour)
                setMinute2(minute)
                setSecond2(seg)
            } catch (e) {

            }
            try {
                const dataStreak3 = queryStreak[3].doc.data.value.mapValue.fields
                setPicStreak3(dataStreak3.pic1.stringValue)
                setNameStreak3(dataStreak3.name1.stringValue)
                setWinStreak3(dataStreak3.winStreak.integerValue)
                setBlockStreak3(dataStreak3.winStreakBlock.integerValue)
                var seg = (actuallBlock - dataStreak3.winStreakBlock.integerValue) * 2;
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setHour3(hour)
                setMinute3(minute)
                setSecond3(seg)
            } catch (e) {

            }
            try {
                const dataStreak4 = queryStreak[4].doc.data.value.mapValue.fields
                setPicStreak4(dataStreak4.pic1.stringValue)
                setNameStreak4(dataStreak4.name1.stringValue)
                setWinStreak4(dataStreak4.winStreak.integerValue)
                setBlockStreak4(dataStreak4.winStreakBlock.integerValue)
                var seg = (actuallBlock - dataStreak4.winStreakBlock.integerValue) * 2;
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setHour4(hour)
                setMinute4(minute)
                setSecond4(seg)
            } catch (e) {

            }
            try {
                const dataStreak5 = queryStreak[5].doc.data.value.mapValue.fields
                setPicStreak5(dataStreak5.pic1.stringValue)
                setNameStreak5(dataStreak5.name1.stringValue)
                setWinStreak5(dataStreak5.winStreak.integerValue)
                setBlockStreak5(dataStreak5.winStreakBlock.integerValue)
                var seg = (actuallBlock - dataStreak5.winStreakBlock.integerValue) * 2;
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setHour5(hour)
                setMinute5(minute)
                setSecond5(seg)
            } catch (e) {

            }
            try {
                const dataStreak6 = queryStreak[6].doc.data.value.mapValue.fields
                setPicStreak6(dataStreak6.pic1.stringValue)
                setNameStreak6(dataStreak6.name1.stringValue)
                setWinStreak6(dataStreak6.winStreak.integerValue)
                setBlockStreak6(dataStreak6.winStreakBlock.integerValue)
                var seg = (actuallBlock - dataStreak6.winStreakBlock.integerValue) * 2;
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setHour6(hour)
                setMinute6(minute)
                setSecond6(seg)
            } catch (e) {

            }
            try {
                const dataStreak7 = queryStreak[7].doc.data.value.mapValue.fields
                setPicStreak7(dataStreak7.pic1.stringValue)
                setNameStreak7(dataStreak7.name1.stringValue)
                setWinStreak7(dataStreak7.winStreak.integerValue)
                setBlockStreak7(dataStreak7.winStreakBlock.integerValue)
                var seg = (actuallBlock - dataStreak7.winStreakBlock.integerValue) * 2;
                var day = Math.floor(seg / (24 * 3600));
                var hour = Math.floor((seg - day * 24 * 3600) / 3600);
                var minute = Math.floor((seg - day * 24 * 3600 - hour * 3600) / 60);
                setHour7(hour)
                setMinute7(minute)
                setSecond7(seg)
            } catch (e) {

            }
        } catch (e) {

        }
        setTimeout(loadUserStreaks, 2000)
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
                    {winStreak7 > 0 && blockStreak7 > dayBlock ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${picStreak7}`} />
                            
                            {" " + nameStreak7 + " is on a " + winStreak7 + " win streak"}
                            <small className="d-flex justify-content-end">
                                {second7 < 0 || second7 === 0 ? "now" : ""}
                                {second7 < 60 ? second7 + " seconds ago" : ""}
                                {second7 > 59 && second7 < 120 ? minute7 + " minute ago" : ""}
                                {second7 > 119 && second7 < 3600 ? minute7 + " minutes ago" : ""}
                                {second7 > 3599 && second7 < 7200 ? hour7 + " hour ago" : ""}
                                {second7 > 7199 ? hour7 + " hours ago" : ""}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {winStreak6 > 0 && blockStreak6 > dayBlock ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${picStreak6}`} />
                            {" " + nameStreak6 + " is on a " + winStreak6 + " win streak"}
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
                    {winStreak5 > 0 && blockStreak5 > dayBlock ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${picStreak5}`} />
                            {" " + nameStreak5 + " is on a " + winStreak5 + " win streak"}
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
                    {winStreak4 > 0 && blockStreak4 > dayBlock ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${picStreak4}`} />
                            {" " + nameStreak4 + " is on a " + winStreak4 + " win streak"}
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
                    {winStreak3 > 0 && blockStreak3 > dayBlock ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${picStreak3}`} />
                            {" " + nameStreak3 + " is on a " + winStreak3 + " win streak"}
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
                    {winStreak2 > 0 && blockStreak2 > dayBlock ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${picStreak2}`} />
                            {" " + nameStreak2 + " is on a " + winStreak2 + " win streak"}
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
                    {winStreak1 > 0 && blockStreak1 > dayBlock ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${picStreak1}`} />
                            {" " + nameStreak1 + " is on a " + winStreak1 + " win streak"}
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
                    {winStreak0 > 0 && blockStreak0 > dayBlock ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${picStreak0}`} />
                            {" " + nameStreak0 + " is on a " + winStreak0 + " win streak"}
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
