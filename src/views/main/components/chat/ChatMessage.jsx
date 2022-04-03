import React, { useState, useEffect } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, FormGroup, Table, Button, ButtonGroup } from 'reactstrap'
import { query, where, collection, limit, onSnapshot, updateDoc, arrayUnion, doc } from "firebase/firestore";
import { db } from '../../../../firebase/firesbaseConfig'
import Chart from '../profile/Chart'
function ChatMessage({ text, uid, photo, name, level, auth, userClub }) {
    const [userData, setUserData] = useState({});
    const [dropdown, setDropdown] = useState(false);
    const [stats, setStats] = useState(false);
    const [rpsStats, setRpsStats] = useState(true);

    const toggleMenu = () => {
        setDropdown(!dropdown);
    }

    useEffect(() => {
        const readUserById = (uid) => {
            if (uid) {
                const q = query(collection(db, "clubUsers"), where("uid", "==", uid), limit(3))
                const unsub = onSnapshot(q, (doc) => {
                    const clubData = doc.docs.map(userData => userData.data())
                    setUserData(clubData)
                });
                return () => unsub()
            }
        }
        readUserById(uid)
        return () => {
            setUserData({});
        };
    }, [uid])



    const OpenStatModal = () => {
        if (!stats) {
            setStats(true)
        } else {
            setStats(false)
        }
    }

    const IgnoreUser = () => {
        if (uid && userClub.account) {
            updateDoc(doc(db, "clubUsers", userClub.account.stringValue), {
                ignored: arrayUnion(uid)
            })
        }
    }

    const xpClass = () => {
        if (level <= 4) {
            return 'xp-user-badge badge-white';
        } else if (level > 4 && level < 10) {
            return 'xp-user-badge badge-yellow';
        } else if (level > 9 && level < 15) {
            return 'xp-user-badge badge-orange';
        } else if (level > 14 && level < 20) {
            return 'xp-user-badge badge-green';
        } else if (level > 19 && level < 24) {
            return 'xp-user-badge badge-blue';
        } else {
            return 'xp-user-badge badge-brown';
        }
    }

    const rpsStatsModal = () => {
        if (!rpsStats) {
            setRpsStats(true)
        }
    }

    return (
        <>
            <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="xs" className="my-2">
                <li className={`message d-flex align-items-center mt-2`}>
                    <DropdownToggle>
                        <div className="d-flex">
                            <img className="chat_user_img" src={photo} alt={name} />
                            <div className={xpClass()}>
                                <div className="circle"><span>{level}</span></div>
                            </div>
                            <span className="chat_user_name">{name}:</span>
                        </div>
                    </DropdownToggle>
                    <div className="chat_cont">{text}</div>
                    <DropdownMenu >
                        <DropdownItem onClick={OpenStatModal}>Stats</DropdownItem>
                        {auth.currentUser ?
                            <>
                                {uid !== auth.currentUser.uid && userData[0] ? <DropdownItem onClick={IgnoreUser}>Ignore</DropdownItem> : <DropdownItem disabled={true}>Ignore</DropdownItem>}
                            </>
                            :
                            ""
                        }
                    </DropdownMenu>
                </li>
            </Dropdown>

            <Modal isOpen={stats} className="d-modal" size="lg">
                <ModalBody>
                    <div className='d-flex justify-content-end'>
                        <button type="button" className="btn-close" aria-label="Close" onClick={OpenStatModal}></button>
                    </div>
                    <h4 className="text-center">{name} Stats</h4>
                    <FormGroup className="pt-3 text-center">
                        <div>
                            <p>
                                <img className="rounded-circle" width="100" height="100" src={photo} alt={name} />
                            </p>
                            <span className="xp-user games-logo">
                                <span className="level_val">Lvl: {level}</span>
                            </span>
                        </div>
                        <ButtonGroup>
                            <Button onClick={rpsStatsModal} className={rpsStats ? 'active btn-rank' : 'btn-rank'}>RPS</Button>
                        </ButtonGroup>

                        {userData[0] ?
                            <>
                                {rpsStats &&
                                    <Table className="tbl-ranking" borderless responsive size="">
                                        <thead className="border-bottom">
                                            <tr>
                                                <th>
                                                    Day Streak
                                                </th>
                                                <th>
                                                    Rock
                                                </th>
                                                <th>
                                                    Paper
                                                </th>
                                                <th>
                                                    Scissors
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {userData[0].rps.dayWinStreak}
                                                </td>
                                                <td>
                                                    {userData[0].rps.rock}
                                                </td>
                                                <td>
                                                    {userData[0].rps.paper}
                                                </td>
                                                <td>
                                                    {userData[0].rps.scissors}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                }
                                {userData[0].rps.totalGames > 0 ?
                                    <Table className="tbl-ranking" borderless responsive size="">
                                        <thead className="border-bottom">
                                            <tr>
                                                <th>
                                                    Wallet
                                                </th>
                                                <th>
                                                    Total Games
                                                </th>
                                                <th>
                                                    Total Amount
                                                </th>
                                                <th>
                                                    Profit
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {userData[0].account.substring(0, 5) + "..." + userData[0].account.substring(38, 42)}
                                                </td>
                                                <td>
                                                    {userData[0].rps.totalGames}
                                                </td>
                                                <td>
                                                    {"$" + userData[0].rps.totalAmount}
                                                </td>
                                                <td>
                                                    {"$" + (userData[0].rps.amountWon - userData[0].rps.amountLoss).toFixed(2)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    : "No games found"}
                            </>
                            :
                            ""}
                    </FormGroup>
                    <FormGroup>
                        <Chart userData={userData[0]} />
                    </FormGroup>
                </ModalBody>
            </Modal>
        </>
    )
}
export default ChatMessage