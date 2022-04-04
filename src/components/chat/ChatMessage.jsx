import React, { useState, useEffect } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, FormGroup, Table, Button, ButtonGroup } from 'reactstrap'
import { query, where, collection, limit, onSnapshot, updateDoc, arrayUnion, doc } from "firebase/firestore";
import { db } from '../../firebase/firesbaseConfig'
import Chart from '../../views/main/components/profile/Chart'
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
                    <DropdownMenu className="dd-menu">
                        <DropdownItem className="dd-menu-item" onClick={OpenStatModal}>Stats</DropdownItem>
                        {auth.currentUser ?
                            <>
                                {uid !== auth.currentUser.uid && userData[0] ? <DropdownItem className="dd-menu-item" onClick={IgnoreUser}>Ignore</DropdownItem> : <DropdownItem className="dd-menu-item" disabled={true}>Ignore</DropdownItem>}
                            </>
                            :
                            ""
                        }
                    </DropdownMenu>
                </li>
            </Dropdown>
            {userData[0] &&
                <Modal isOpen={stats} className="d-modal" size="lg">
                    <ModalBody>
                        <div className='d-flex justify-content-end'>
                            <button type="button" className="btn-close" aria-label="Close" onClick={OpenStatModal}></button>
                        </div>
                        <div className="user-stats-info">
                            <div className="user-stats-profile">
                                <img className="rounded-circle user-stats-image" width="100" height="100" src={photo} alt={name} />
                                <div className="user-stats-lvl">
                                    <span className="chat_user_name">{name}</span>
                                    <div className={xpClass()}>
                                        <div className="circle"><span>{level}</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="user-daily-stats">
                                <h5>USER DAILY RESULTS</h5>
                                <div className="user-daily-stats-container">
                                    <div className="game-list-stats">
                                        <button onClick={rpsStatsModal} className={`btn-game-stats mt-1 ${rpsStats ? 'active' : ''}`}>RPS</button>
                                    </div>
                                    {(userData[0] && rpsStats) &&
                                        <div className="game-stats">
                                            <div className="row header-row text-center mb-2">
                                                <div className='col-4'>Win Streak</div>
                                                <div className='col-2'>Rock</div>
                                                <div className='col-3'>Paper</div>
                                                <div className='col-3'>Scissors</div>
                                            </div>
                                            <div className='row content-row text-center'>
                                                <div className='col-4'>{userData[0].rps.dayWinStreak}</div>
                                                <div className='col-2'>{userData[0].rps.rock}</div>
                                                <div className='col-3'>{userData[0].rps.paper}</div>
                                                <div className='col-3'>{userData[0].rps.scissors}</div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="user-stats-profit">
                            {userData[0].rps.totalGames > 0 ?
                                <>
                                    <div className="d-flex flex-column align-items-center profit-border">
                                        <span className="header-row">Wallet</span>
                                        <span className="content-row">{userData[0].account.substring(0, 5) + "..." + userData[0].account.substring(38, 42)}</span>
                                    </div>
                                    <div className="d-flex flex-column align-items-center profit-border">
                                        <span className="header-row">Total Games</span>
                                        <span className="content-row">{userData[0].rps.totalGames}</span>
                                    </div>
                                    <div className="d-flex flex-column align-items-center profit-border">
                                        <span className="header-row">Total Amount</span>
                                        <span className="content-row">{"$" + userData[0].rps.totalAmount}</span>
                                    </div>
                                    <div className="d-flex flex-column align-items-center profit-border">
                                        <span className="header-row">Profit</span>
                                        <span className={`content-row ${(userData[0].rps.amountWon - userData[0].rps.amountLoss) > 0 ? 'profit-plus' : 'profit-minus'}`}>{"$" + (userData[0].rps.amountWon - userData[0].rps.amountLoss).toFixed(2)}</span>
                                    </div>
                                </>

                                : "No games found"
                            }
                        </div>
                        <FormGroup>
                            <Chart userData={userData[0]} />
                        </FormGroup>
                    </ModalBody>
                </Modal>
            }
        </>
    )
}
export default ChatMessage