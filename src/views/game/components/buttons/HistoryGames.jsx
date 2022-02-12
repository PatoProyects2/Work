import React, { useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
export default function HistoryGames(props) {
    const [dropdown, setDropdown] = useState(false);
    const toggleMenu = () => {
        setDropdown(!dropdown);
    }
    return (
        <>
            <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="md">
                {
                    props.isMobileVersion ?
                        <DropdownToggle color='danger'>
                            PLAYS
                        </DropdownToggle>
                        :
                        <DropdownToggle caret color='danger'>
                            LIVEPLAYS
                        </DropdownToggle>
                }
                <DropdownMenu className={props.theme === 'dark' ? 'bg-dark' : 'bg-light'}>
                    {props.eventsmodal[11] !== undefined ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            {props.userpic11 && <img width="25" height="25" alt="" src={props.userpic11} />}
                            {props.userdata11.name1 + " played " + (props.eventsmodal[11].returnValues[1] / props.decimal) + " MATIC and"}
                            <span style={{ color: props.eventsmodal[11].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                {props.eventsmodal[11].returnValues[3] === false ? " lost all " : ""}{props.eventsmodal[11].returnValues[3] === true ? " doubled " : ""}
                            </span>
                            {props.eventsmodal[11].returnValues[2] > 1 ? props.eventsmodal[11].returnValues[2] + " times " : ""}
                            <small className="d-flex justify-content-end">
                                {((props.blockchain - props.eventsmodal[11].blockNumber) * 2) < 0 || ((props.blockchain - props.eventsmodal[11].blockNumber) * 2) === 0 ? "now" : ((props.blockchain - props.eventsmodal[11].blockNumber) * 2) + " seconds ago"}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {props.eventsmodal[10] !== undefined ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            {props.userpic10 && <img width="25" height="25" alt="" src={props.userpic10} />}
                            {props.userdata10.name1 + " played " + (props.eventsmodal[10].returnValues[1] / props.decimal) + " MATIC and"}
                            <span style={{ color: props.eventsmodal[10].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                {props.eventsmodal[10].returnValues[3] === false ? " lost all " : ""}{props.eventsmodal[10].returnValues[3] === true ? " doubled " : ""}
                            </span>
                            {props.eventsmodal[10].returnValues[2] > 1 ? props.eventsmodal[10].returnValues[2] + " times " : ""}
                            <small className="d-flex justify-content-end">
                                {((props.blockchain - props.eventsmodal[10].blockNumber) * 2) < 0 || ((props.blockchain - props.eventsmodal[10].blockNumber) * 2) === 0 ? "now" : ((props.blockchain - props.eventsmodal[10].blockNumber) * 2) + " seconds ago"}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {props.eventsmodal[9] !== undefined ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            {props.userpic9 && <img width="25" height="25" alt="" src={props.userpic9} />}
                            {props.userdata9.name1 + " played " + (props.eventsmodal[9].returnValues[1] / props.decimal) + " MATIC and"}
                            <span style={{ color: props.eventsmodal[9].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                {props.eventsmodal[9].returnValues[3] === false ? " lost all " : ""}{props.eventsmodal[9].returnValues[3] === true ? " doubled " : ""}
                            </span>
                            {props.eventsmodal[9].returnValues[2] > 1 ? props.eventsmodal[9].returnValues[2] + " times " : ""}
                            <small className="d-flex justify-content-end">
                                {((props.blockchain - props.eventsmodal[9].blockNumber) * 2) < 0 || ((props.blockchain - props.eventsmodal[9].blockNumber) * 2) === 0 ? "now" : ((props.blockchain - props.eventsmodal[9].blockNumber) * 2) + " seconds ago"}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {props.eventsmodal[8] !== undefined ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            {props.userpic8 && <img width="25" height="25" alt="" src={props.userpic8} />}
                            {props.userdata8.name1 + " played " + (props.eventsmodal[8].returnValues[1] / props.decimal) + " MATIC and"}
                            <span style={{ color: props.eventsmodal[8].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                {props.eventsmodal[8].returnValues[3] === false ? " lost all " : ""}{props.eventsmodal[8].returnValues[3] === true ? " doubled " : ""}
                            </span>
                            {props.eventsmodal[8].returnValues[2] > 1 ? props.eventsmodal[8].returnValues[2] + " times " : ""}
                            <small className="d-flex justify-content-end">
                                {((props.blockchain - props.eventsmodal[8].blockNumber) * 2) < 0 || ((props.blockchain - props.eventsmodal[8].blockNumber) * 2) === 0 ? "now" : ((props.blockchain - props.eventsmodal[8].blockNumber) * 2) + " seconds ago"}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {props.eventsmodal[7] !== undefined ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            {props.userpic7 && <img width="25" height="25" alt="" src={props.userpic7} />}
                            {props.userdata7.name1 + " played " + (props.eventsmodal[7].returnValues[1] / props.decimal) + " MATIC and"}
                            <span style={{ color: props.eventsmodal[7].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                {props.eventsmodal[7].returnValues[3] === false ? " lost all " : ""}{props.eventsmodal[7].returnValues[3] === true ? " doubled " : ""}
                            </span>
                            {props.eventsmodal[7].returnValues[2] > 1 ? props.eventsmodal[7].returnValues[2] + " times " : ""}
                            <small className="d-flex justify-content-end">
                                {((props.blockchain - props.eventsmodal[7].blockNumber) * 2) < 0 || ((props.blockchain - props.eventsmodal[7].blockNumber) * 2) === 0 ? "now" : ((props.blockchain - props.eventsmodal[7].blockNumber) * 2) + " seconds ago"}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {props.eventsmodal[6] !== undefined ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            {props.userpic6 && <img width="25" height="25" alt="" src={props.userpic6} />}
                            {props.userdata6.name1 + " played " + (props.eventsmodal[6].returnValues[1] / props.decimal) + " MATIC and"}
                            <span style={{ color: props.eventsmodal[6].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                {props.eventsmodal[6].returnValues[3] === false ? " lost all " : ""}{props.eventsmodal[6].returnValues[3] === true ? " doubled " : ""}
                            </span>
                            {props.eventsmodal[6].returnValues[2] > 1 ? props.eventsmodal[6].returnValues[2] + " times " : ""}
                            <small className="d-flex justify-content-end">
                                {((props.blockchain - props.eventsmodal[6].blockNumber) * 2) < 0 || ((props.blockchain - props.eventsmodal[6].blockNumber) * 2) === 0 ? "now" : ((props.blockchain - props.eventsmodal[6].blockNumber) * 2) + " seconds ago"}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {props.eventsmodal[5] !== undefined ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            {props.userpic5 && <img width="25" height="25" alt="" src={props.userpic5} />}
                            {props.userdata5.name1 + " played " + (props.eventsmodal[5].returnValues[1] / props.decimal) + " MATIC and"}
                            <span style={{ color: props.eventsmodal[5].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                {props.eventsmodal[5].returnValues[3] === false ? " lost all " : ""}{props.eventsmodal[5].returnValues[3] === true ? " doubled " : ""}
                            </span>
                            {props.eventsmodal[5].returnValues[2] > 1 ? props.eventsmodal[5].returnValues[2] + " times " : ""}
                            <small className="d-flex justify-content-end">
                                {((props.blockchain - props.eventsmodal[5].blockNumber) * 2) < 0 || ((props.blockchain - props.eventsmodal[5].blockNumber) * 2) === 0 ? "now" : ((props.blockchain - props.eventsmodal[5].blockNumber) * 2) + " seconds ago"}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {props.eventsmodal[4] !== undefined ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            {props.userpic4 && <img width="25" height="25" alt="" src={props.userpic4} />}
                            {props.userdata4.name1 + " played " + (props.eventsmodal[4].returnValues[1] / props.decimal) + " MATIC and"}
                            <span style={{ color: props.eventsmodal[4].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                {props.eventsmodal[4].returnValues[3] === false ? " lost all " : ""}{props.eventsmodal[4].returnValues[3] === true ? " doubled " : ""}
                            </span>
                            {props.eventsmodal[4].returnValues[2] > 1 ? props.eventsmodal[4].returnValues[2] + " times " : ""}
                            <small className="d-flex justify-content-end">
                                {((props.blockchain - props.eventsmodal[4].blockNumber) * 2) < 0 || ((props.blockchain - props.eventsmodal[4].blockNumber) * 2) === 0 ? "now" : ((props.blockchain - props.eventsmodal[4].blockNumber) * 2) + " seconds ago"}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {props.eventsmodal[3] !== undefined ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            {props.userpic3 && <img width="25" height="25" alt="" src={props.userpic3} />}
                            {props.userdata3.name1 + " played " + (props.eventsmodal[3].returnValues[1] / props.decimal) + " MATIC and"}
                            <span style={{ color: props.eventsmodal[3].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                {props.eventsmodal[3].returnValues[3] === false ? " lost all " : ""}{props.eventsmodal[3].returnValues[3] === true ? " doubled " : ""}
                            </span>
                            {props.eventsmodal[3].returnValues[2] > 1 ? props.eventsmodal[3].returnValues[2] + " times " : ""}
                            <small className="d-flex justify-content-end">
                                {((props.blockchain - props.eventsmodal[3].blockNumber) * 2) < 0 || ((props.blockchain - props.eventsmodal[3].blockNumber) * 2) === 0 ? "now" : ((props.blockchain - props.eventsmodal[3].blockNumber) * 2) + " seconds ago"}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {props.eventsmodal[2] !== undefined ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            {props.userpic2 && <img width="25" height="25" alt="" src={props.userpic2} />}
                            {props.userdata2.name1 + " played " + (props.eventsmodal[2].returnValues[1] / props.decimal) + " MATIC and"}
                            <span style={{ color: props.eventsmodal[2].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                {props.eventsmodal[2].returnValues[3] === false ? " lost all " : ""}{props.eventsmodal[2].returnValues[3] === true ? " doubled " : ""}
                            </span>
                            {props.eventsmodal[2].returnValues[2] > 1 ? props.eventsmodal[2].returnValues[2] + " times " : ""}
                            <small className="d-flex justify-content-end">
                                {((props.blockchain - props.eventsmodal[2].blockNumber) * 2) < 0 || ((props.blockchain - props.eventsmodal[2].blockNumber) * 2) === 0 ? "now" : ((props.blockchain - props.eventsmodal[2].blockNumber) * 2) + " seconds ago"}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {props.eventsmodal[1] !== undefined ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            {props.userpic1 && <img width="25" height="25" alt="" src={props.userpic1} />}
                            {props.userdata1.name1 + " played " + (props.eventsmodal[1].returnValues[1] / props.decimal) + " MATIC and"}
                            <span style={{ color: props.eventsmodal[1].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                {props.eventsmodal[1].returnValues[3] === false ? " lost all " : ""}{props.eventsmodal[1].returnValues[3] === true ? " doubled " : ""}
                            </span>
                            {props.eventsmodal[1].returnValues[2] > 1 ? props.eventsmodal[1].returnValues[2] + " times " : ""}
                            <small className="d-flex justify-content-end">
                                {((props.blockchain - props.eventsmodal[1].blockNumber) * 2) < 0 || ((props.blockchain - props.eventsmodal[1].blockNumber) * 2) === 0 ? "now" : ((props.blockchain - props.eventsmodal[1].blockNumber) * 2) + " seconds ago"}
                            </small>
                        </DropdownItem>
                        :
                        ""
                    }
                    {props.eventsmodal[0] !== undefined ?
                        <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            {props.userpic0 && <img width="25" height="25" alt="" src={props.userpic0} />}
                            {props.userdata0.name1 + " played " + (props.eventsmodal[0].returnValues[1] / props.decimal) + " MATIC and"}
                            <span style={{ color: props.eventsmodal[0].returnValues[3] ? "mediumseagreen" : "crimson" }}>
                                {props.eventsmodal[0].returnValues[3] === false ? " lost all " : ""}{props.eventsmodal[0].returnValues[3] === true ? " doubled " : ""}
                            </span>
                            {props.eventsmodal[0].returnValues[2] > 1 ? props.eventsmodal[0].returnValues[2] + " times " : ""}
                            <small className="d-flex justify-content-end">
                                {((props.blockchain - props.eventsmodal[0].blockNumber) * 2) < 0 || ((props.blockchain - props.eventsmodal[0].blockNumber) * 2) === 0 ? "now" : ((props.blockchain - props.eventsmodal[0].blockNumber) * 2) + " seconds ago"}
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
