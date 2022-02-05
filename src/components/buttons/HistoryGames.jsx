import React, { useState, useEffect } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { doc, getDoc } from "firebase/firestore";
import db from '../../firebase/firesbaseConfig'

export default function HistoryGames(props) {
    const [dropdown, setDropdown] = useState(false);
    const [decimal, setDecimal] = useState(1000000000000000000);
    const [userdata0, setUserdata0] = useState({});
    const [userdata1, setUserdata1] = useState({});
    const [userdata2, setUserdata2] = useState({});
    const [userdata3, setUserdata3] = useState({});
    const [userdata4, setUserdata4] = useState({});
    const [userdata5, setUserdata5] = useState({});
    const [userdata6, setUserdata6] = useState({});
    const [userdata7, setUserdata7] = useState({});

    useEffect(() => {
        readUserName(props.events)
    }, [props.events]);

    async function readUserName(events) {
        console.log(events)
        try {
            const userData0 = await getDoc(doc(db, "users", events[0].returnValues[0]))
            setUserdata0(userData0.data())
        } catch (e) {
            console.log("HistoryGame0 not found!")
        }
    }

    const toggleMenu = () => {
        setDropdown(!dropdown);
    }

    return (
        <>
            <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="sm">
                <DropdownToggle caret>
                    LIVEPLAYS
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>
                        {props.events[7] !== undefined
                            ?
                            <>
                                {userdata7.name1 + " played " + (props.events[7].returnValues[1] / decimal) + " MATIC and"}
                                {props.events[7].returnValues[2] === false ? " lost all " : ""}{props.events[7].returnValues[2] === true ? " doubled " : ""}
                                {((props.blockchain - props.events[7].blockNumber) * 2) + " seconds ago"}
                            </>
                            :
                            ""
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {props.events[6] !== undefined
                            ?
                            <>
                                {userdata6.name1 + " played " + (props.events[6].returnValues[1] / decimal) + " MATIC and"}
                                {props.events[6].returnValues[2] === false ? " lost all " : ""}{props.events[6].returnValues[2] === true ? " doubled " : ""}
                                {((props.blockchain - props.events[6].blockNumber) * 2) + " seconds ago"}
                            </>
                            :
                            ""
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {props.events[5] !== undefined
                            ?
                            <>
                                {userdata5.name1 + " played " + (props.events[5].returnValues[1] / decimal) + " MATIC and"}
                                {props.events[5].returnValues[2] === false ? " lost all " : ""}{props.events[5].returnValues[2] === true ? " doubled " : ""}
                                {((props.blockchain - props.events[5].blockNumber) * 2) + " seconds ago"}
                            </>
                            :
                            ""
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {props.events[4] !== undefined
                            ?
                            <>
                                {userdata4.name1 + " played " + (props.events[4].returnValues[1] / decimal) + " MATIC and"}
                                {props.events[4].returnValues[2] === false ? " lost all " : ""}{props.events[4].returnValues[2] === true ? " doubled " : ""}
                                {((props.blockchain - props.events[4].blockNumber) * 2) + " seconds ago"}
                            </>
                            :
                            ""
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {props.events[3] !== undefined
                            ?
                            <>
                                {userdata3.name1 + " played " + (props.events[3].returnValues[1] / decimal) + " MATIC and"}
                                {props.events[3].returnValues[2] === false ? " lost all " : ""}{props.events[3].returnValues[2] === true ? " doubled " : ""}
                                {((props.blockchain - props.events[3].blockNumber) * 2) + " seconds ago"}
                            </>
                            :
                            ""
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {props.events[2] !== undefined
                            ?
                            <>
                                {userdata2.name1 + " played " + (props.events[2].returnValues[1] / decimal) + " MATIC and"}
                                {props.events[2].returnValues[2] === false ? " lost all " : ""}{props.events[2].returnValues[2] === true ? " doubled " : ""}
                                {((props.blockchain - props.events[2].blockNumber) * 2) + " seconds ago"}
                            </>
                            :
                            ""
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {props.events[1] !== undefined
                            ?
                            <>
                                {userdata1.name1 + " played " + (props.events[1].returnValues[1] / decimal) + " MATIC and"}
                                {props.events[1].returnValues[2] === false ? " lost all " : ""}{props.events[1].returnValues[2] === true ? " doubled " : ""}
                                {((props.blockchain - props.events[1].blockNumber) * 2) + " seconds ago"}
                            </>
                            :
                            ""
                        }
                    </DropdownItem>
                    <DropdownItem header>
                        {props.events[0] !== undefined
                            ?
                            <>
                                {userdata0.name1 + " played " + (props.events[0].returnValues[1] / decimal) + " MATIC and"}
                                {props.events[0].returnValues[2] === false ? " lost all " : ""}{props.events[0].returnValues[2] === true ? " doubled " : ""}
                                {((props.blockchain - props.events[0].blockNumber) * 2) + " seconds ago"}
                            </>
                            :
                            ""
                        }
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}
