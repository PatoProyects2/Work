import React, { useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, FormGroup, Table } from 'reactstrap'
import { query, where, collection, limit, onSnapshot, updateDoc, arrayUnion, doc } from "firebase/firestore";
import { db } from '../../../../firebase/firesbaseConfig'
function ChatMessage({ text, uid, photo, name, level, auth, userClub }) {
    const [userData, setUserData] = useState({});
    const [dropdown, setDropdown] = useState(false);
    const [messageClass, setMessageClass] = useState(undefined);
    const [stats, setStats] = useState(false);

    const toggleMenu = () => {
        setDropdown(!dropdown);
    }

    const OpenStatModal = () => {
        if (!stats) {
            setStats(true)
        } else {
            setStats(false)
        }
        if (uid) {
            const q = query(collection(db, "clubUsers"), where("uid", "==", uid), limit(3))
            const unsub = onSnapshot(q, (doc) => {
                const clubData = doc.docs.map(userData => userData.data())
                setUserData(clubData)
            });
            return unsub;
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
            return 'xp-user-white games-logo';
        } else if (level > 4 && level < 10) {
            return 'xp-user-yellow games-logo';
        } else if (level > 9 && level < 15) {
            return 'xp-user-orange games-logo';
        } else if (level > 14 && level < 20) {
            return 'xp-user-green games-logo';
        } else if (level > 19 && level < 24) {
            return 'xp-user-blue games-logo';
        } else {
            return 'xp-user-brown games-logo';
        }
    }
    return (
        <>
            <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="xs" className="my-2">
                <li className={`message ${messageClass} d-flex align-items-center mt-2`}>
                    <DropdownToggle>
                        <img className="chat_user_img" src={photo} alt={name} />
                        <span className={xpClass()}>
                            <span className="level_val">Lvl: {level}</span>
                        </span>
                        <span className="chat_user_name">{name}:</span>
                    </DropdownToggle>
                    <div className="chat_cont">{text}</div>
                    <DropdownMenu >
                        <DropdownItem onClick={OpenStatModal}>Stats</DropdownItem>
                        {auth.currentUser ?
                            <>
                                {uid !== auth.currentUser.uid && userClub ? <DropdownItem onClick={IgnoreUser}>Ignore</DropdownItem> : <DropdownItem disabled={true}>Ignore</DropdownItem>}
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
                        {userData[0] ?
                            <>
                                {userData[0].rps.totalGames > 0 ?
                                    <Table className="tbl-ranking" borderless responsive size="">
                                        <thead className="border-bottom">
                                            <tr>
                                                <th>
                                                    Wallet
                                                </th>
                                                <th>
                                                    Games Won
                                                </th>
                                                <th>
                                                    Games Loss
                                                </th>
                                                <th>
                                                    Total Games
                                                </th>
                                                <th>
                                                    Amount Won
                                                </th>
                                                <th>
                                                    Amount Loss
                                                </th>
                                                <th>
                                                    Total Amount
                                                </th>
                                                <th>
                                                    Win Streak
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
                                                    {userData[0].account.substring(0, 5) + "..." + userData[0].account.substring(38, 42)}
                                                </td>
                                                <td>
                                                    {userData[0].rps.gameWon}
                                                </td>
                                                <td>
                                                    {userData[0].rps.gameLoss}
                                                </td>
                                                <td>
                                                    {userData[0].rps.totalGames}
                                                </td>
                                                <td>
                                                    {userData[0].rps.amountWon}
                                                </td>
                                                <td>
                                                    {userData[0].rps.amountLoss}
                                                </td>
                                                <td>
                                                    {userData[0].rps.totalMaticAmount}
                                                </td>
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
                                    : ""}
                            </>
                            :
                            <>
                                <br></br>
                                {"No games found"}
                            </>}
                    </FormGroup>
                </ModalBody>
            </Modal>



        </>
    )
}
export default ChatMessage