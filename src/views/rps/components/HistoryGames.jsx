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
                    {props.historyPlays[0] !== undefined && props.historyPlays[0].createdAt ?
                        <>
                            {(props.unixTimeStamp - props.historyPlays[0].createdAt.seconds) < 60 ?
                                <>
                                    <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                                        <img width="35" height="35" className="rounded-circle" alt="" src={`${props.historyPlays[0].photo}`} />
                                        {props.historyPlays[0].name !== '' ? props.historyPlays[0].name : props.historyPlays[0].account.substring(0, 5).toLowerCase()}
                                        {" played " + props.historyPlays[0].maticAmount + " MATIC and"}
                                        <span style={{ color: props.historyPlays[0].result ? "mediumseagreen" : "crimson" }}>
                                            {props.historyPlays[0].result === false ? " lost all " : ""}{props.historyPlays[0].result === true ? " doubled " : ""}
                                        </span>
                                        {props.historyPlays[0].streak > 1 ? props.historyPlays[0].streak + " times " : ""}
                                        <small className="d-flex justify-content-end">
                                            {(props.unixTimeStamp - props.historyPlays[0].createdAt.seconds) <= 0 ?
                                                " now" : (props.unixTimeStamp - props.historyPlays[0].createdAt.seconds) + " seconds ago"}
                                        </small>
                                    </DropdownItem>
                                </>
                                : ""}
                        </>
                        : ""}
                    {props.historyPlays[1] !== undefined && props.historyPlays[1].createdAt ?
                        <>
                            {(props.unixTimeStamp - props.historyPlays[1].createdAt.seconds) < 60 ?
                                <>
                                    <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                                        <img width="35" height="35" className="rounded-circle" alt="" src={`${props.historyPlays[1].photo}`} />
                                        {props.historyPlays[1].name !== '' ? props.historyPlays[1].name : props.historyPlays[1].account.substring(0, 5).toLowerCase()}
                                        {" played " + props.historyPlays[1].maticAmount + " MATIC and"}
                                        <span style={{ color: props.historyPlays[1].result ? "mediumseagreen" : "crimson" }}>
                                            {props.historyPlays[1].result === false ? " lost all " : ""}{props.historyPlays[1].result === true ? " doubled " : ""}
                                        </span>
                                        {props.historyPlays[1].streak > 1 ? props.historyPlays[1].streak + " times " : ""}
                                        <small className="d-flex justify-content-end">
                                            {(props.unixTimeStamp - props.historyPlays[1].createdAt.seconds) <= 0 ?
                                                " now" : (props.unixTimeStamp - props.historyPlays[1].createdAt.seconds) + " seconds ago"}
                                        </small>
                                    </DropdownItem>
                                </>
                                : ""}
                        </>
                        : ""}
                    {props.historyPlays[2] !== undefined && props.historyPlays[2].createdAt ?
                        <>
                            {(props.unixTimeStamp - props.historyPlays[2].createdAt.seconds) < 60 ?
                                <>
                                    <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                                        <img width="35" height="35" className="rounded-circle" alt="" src={`${props.historyPlays[2].photo}`} />
                                        {props.historyPlays[2].name !== '' ? props.historyPlays[2].name : props.historyPlays[2].account.substring(0, 5).toLowerCase()}
                                        {" played " + props.historyPlays[2].maticAmount + " MATIC and"}
                                        <span style={{ color: props.historyPlays[2].result ? "mediumseagreen" : "crimson" }}>
                                            {props.historyPlays[2].result === false ? " lost all " : ""}{props.historyPlays[2].result === true ? " doubled " : ""}
                                        </span>
                                        {props.historyPlays[2].streak > 1 ? props.historyPlays[2].streak + " times " : ""}
                                        <small className="d-flex justify-content-end">
                                            {(props.unixTimeStamp - props.historyPlays[2].createdAt.seconds) <= 0 ?
                                                " now" : (props.unixTimeStamp - props.historyPlays[2].createdAt.seconds) + " seconds ago"}
                                        </small>
                                    </DropdownItem>
                                </>
                                : ""}
                        </>
                        : ""}
                    {props.historyPlays[3] !== undefined && props.historyPlays[3].createdAt ?
                        <>
                            {(props.unixTimeStamp - props.historyPlays[3].createdAt.seconds) < 60 ?
                                <>
                                    <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                                        <img width="35" height="35" className="rounded-circle" alt="" src={`${props.historyPlays[3].photo}`} />
                                        {props.historyPlays[3].name !== '' ? props.historyPlays[3].name : props.historyPlays[3].account.substring(0, 5).toLowerCase()}
                                        {" played " + props.historyPlays[3].maticAmount + " MATIC and"}
                                        <span style={{ color: props.historyPlays[3].result ? "mediumseagreen" : "crimson" }}>
                                            {props.historyPlays[3].result === false ? " lost all " : ""}{props.historyPlays[3].result === true ? " doubled " : ""}
                                        </span>
                                        {props.historyPlays[3].streak > 1 ? props.historyPlays[3].streak + " times " : ""}
                                        <small className="d-flex justify-content-end">
                                            {(props.unixTimeStamp - props.historyPlays[3].createdAt.seconds) <= 0 ?
                                                " now" : (props.unixTimeStamp - props.historyPlays[3].createdAt.seconds) + " seconds ago"}
                                        </small>
                                    </DropdownItem>
                                </>
                                : ""}
                        </>
                        : ""}
                    {props.historyPlays[4] !== undefined && props.historyPlays[4].createdAt ?
                        <>
                            {(props.unixTimeStamp - props.historyPlays[4].createdAt.seconds) < 60 ?
                                <>
                                    <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                                        <img width="35" height="35" className="rounded-circle" alt="" src={`${props.historyPlays[4].photo}`} />
                                        {props.historyPlays[4].name !== '' ? props.historyPlays[4].name : props.historyPlays[4].account.substring(0, 5).toLowerCase()}
                                        {" played " + props.historyPlays[4].maticAmount + " MATIC and"}
                                        <span style={{ color: props.historyPlays[4].result ? "mediumseagreen" : "crimson" }}>
                                            {props.historyPlays[4].result === false ? " lost all " : ""}{props.historyPlays[4].result === true ? " doubled " : ""}
                                        </span>
                                        {props.historyPlays[4].streak > 1 ? props.historyPlays[4].streak + " times " : ""}
                                        <small className="d-flex justify-content-end">
                                            {(props.unixTimeStamp - props.historyPlays[4].createdAt.seconds) <= 0 ?
                                                " now" : (props.unixTimeStamp - props.historyPlays[4].createdAt.seconds) + " seconds ago"}
                                        </small>
                                    </DropdownItem>
                                </>
                                : ""}
                        </>
                        : ""}
                    {props.historyPlays[5] !== undefined && props.historyPlays[5].createdAt ?
                        <>
                            {(props.unixTimeStamp - props.historyPlays[5].createdAt.seconds) < 60 ?
                                <>
                                    <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                                        <img width="35" height="35" className="rounded-circle" alt="" src={`${props.historyPlays[5].photo}`} />
                                        {props.historyPlays[5].name !== '' ? props.historyPlays[5].name : props.historyPlays[5].account.substring(0, 5).toLowerCase()}
                                        {" played " + props.historyPlays[5].maticAmount + " MATIC and"}
                                        <span style={{ color: props.historyPlays[5].result ? "mediumseagreen" : "crimson" }}>
                                            {props.historyPlays[5].result === false ? " lost all " : ""}{props.historyPlays[5].result === true ? " doubled " : ""}
                                        </span>
                                        {props.historyPlays[5].streak > 1 ? props.historyPlays[5].streak + " times " : ""}
                                        <small className="d-flex justify-content-end">
                                            {(props.unixTimeStamp - props.historyPlays[5].createdAt.seconds) <= 0 ?
                                                " now" : (props.unixTimeStamp - props.historyPlays[5].createdAt.seconds) + " seconds ago"}
                                        </small>
                                    </DropdownItem>
                                </>
                                : ""}
                        </>
                        : ""}
                    {props.historyPlays[6] !== undefined && props.historyPlays[6].createdAt ?
                        <>
                            {(props.unixTimeStamp - props.historyPlays[6].createdAt.seconds) < 60 ?
                                <>
                                    <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                                        <img width="35" height="35" className="rounded-circle" alt="" src={`${props.historyPlays[6].photo}`} />
                                        {props.historyPlays[6].name !== '' ? props.historyPlays[6].name : props.historyPlays[6].account.substring(0, 5).toLowerCase()}
                                        {" played " + props.historyPlays[6].maticAmount + " MATIC and"}
                                        <span style={{ color: props.historyPlays[6].result ? "mediumseagreen" : "crimson" }}>
                                            {props.historyPlays[6].result === false ? " lost all " : ""}{props.historyPlays[6].result === true ? " doubled " : ""}
                                        </span>
                                        {props.historyPlays[6].streak > 1 ? props.historyPlays[6].streak + " times " : ""}
                                        <small className="d-flex justify-content-end">
                                            {(props.unixTimeStamp - props.historyPlays[6].createdAt.seconds) <= 0 ?
                                                " now" : (props.unixTimeStamp - props.historyPlays[6].createdAt.seconds) + " seconds ago"}
                                        </small>
                                    </DropdownItem>
                                </>
                                : ""}
                        </>
                        : ""}
                    {props.historyPlays[7] !== undefined && props.historyPlays[7].createdAt ?
                        <>
                            {(props.unixTimeStamp - props.historyPlays[7].createdAt.seconds) < 60 ?
                                <>
                                    <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                                        <img width="35" height="35" className="rounded-circle" alt="" src={`${props.historyPlays[7].photo}`} />
                                        {props.historyPlays[7].name !== '' ? props.historyPlays[7].name : props.historyPlays[7].account.substring(0, 5).toLowerCase()}
                                        {" played " + props.historyPlays[7].maticAmount + " MATIC and"}
                                        <span style={{ color: props.historyPlays[7].result ? "mediumseagreen" : "crimson" }}>
                                            {props.historyPlays[7].result === false ? " lost all " : ""}{props.historyPlays[7].result === true ? " doubled " : ""}
                                        </span>
                                        {props.historyPlays[7].streak > 1 ? props.historyPlays[7].streak + " times " : ""}
                                        <small className="d-flex justify-content-end">
                                            {(props.unixTimeStamp - props.historyPlays[7].createdAt.seconds) <= 0 ?
                                                " now" : (props.unixTimeStamp - props.historyPlays[7].createdAt.seconds) + " seconds ago"}
                                        </small>
                                    </DropdownItem>
                                </>
                                : ""}
                        </>
                        : ""}
                    {props.historyPlays[8] !== undefined && props.historyPlays[8].createdAt ?
                        <>
                            {(props.unixTimeStamp - props.historyPlays[8].createdAt.seconds) < 60 ?
                                <>
                                    <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                                        <img width="35" height="35" className="rounded-circle" alt="" src={`${props.historyPlays[8].photo}`} />
                                        {props.historyPlays[8].name !== '' ? props.historyPlays[8].name : props.historyPlays[8].account.substring(0, 5).toLowerCase()}
                                        {" played " + props.historyPlays[8].maticAmount + " MATIC and"}
                                        <span style={{ color: props.historyPlays[8].result ? "mediumseagreen" : "crimson" }}>
                                            {props.historyPlays[8].result === false ? " lost all " : ""}{props.historyPlays[8].result === true ? " doubled " : ""}
                                        </span>
                                        {props.historyPlays[8].streak > 1 ? props.historyPlays[8].streak + " times " : ""}
                                        <small className="d-flex justify-content-end">
                                            {(props.unixTimeStamp - props.historyPlays[8].createdAt.seconds) <= 0 ?
                                                " now" : (props.unixTimeStamp - props.historyPlays[8].createdAt.seconds) + " seconds ago"}
                                        </small>
                                    </DropdownItem>
                                </>
                                : ""}
                        </>
                        : ""}
                    {props.historyPlays[9] !== undefined && props.historyPlays[9].createdAt ?
                        <>
                            {(props.unixTimeStamp - props.historyPlays[9].createdAt.seconds) < 60 ?
                                <>
                                    <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                                        <img width="35" height="35" className="rounded-circle" alt="" src={`${props.historyPlays[9].photo}`} />
                                        {props.historyPlays[9].name !== '' ? props.historyPlays[9].name : props.historyPlays[9].account.substring(0, 5).toLowerCase()}
                                        {" played " + props.historyPlays[9].maticAmount + " MATIC and"}
                                        <span style={{ color: props.historyPlays[9].result ? "mediumseagreen" : "crimson" }}>
                                            {props.historyPlays[9].result === false ? " lost all " : ""}{props.historyPlays[9].result === true ? " doubled " : ""}
                                        </span>
                                        {props.historyPlays[9].streak > 1 ? props.historyPlays[9].streak + " times " : ""}
                                        <small className="d-flex justify-content-end">
                                            {(props.unixTimeStamp - props.historyPlays[9].createdAt.seconds) <= 0 ?
                                                " now" : (props.unixTimeStamp - props.historyPlays[9].createdAt.seconds) + " seconds ago"}
                                        </small>
                                    </DropdownItem>
                                </>
                                : ""}
                        </>
                        : ""}
                    {props.historyPlays[10] !== undefined && props.historyPlays[10].createdAt ?
                        <>
                            {(props.unixTimeStamp - props.historyPlays[10].createdAt.seconds) < 60 ?
                                <>
                                    <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                                        <img width="35" height="35" className="rounded-circle" alt="" src={`${props.historyPlays[10].photo}`} />
                                        {props.historyPlays[10].name !== '' ? props.historyPlays[10].name : props.historyPlays[10].account.substring(0, 5).toLowerCase()}
                                        {" played " + props.historyPlays[10].maticAmount + " MATIC and"}
                                        <span style={{ color: props.historyPlays[10].result ? "mediumseagreen" : "crimson" }}>
                                            {props.historyPlays[10].result === false ? " lost all " : ""}{props.historyPlays[10].result === true ? " doubled " : ""}
                                        </span>
                                        {props.historyPlays[10].streak > 1 ? props.historyPlays[10].streak + " times " : ""}
                                        <small className="d-flex justify-content-end">
                                            {(props.unixTimeStamp - props.historyPlays[10].createdAt.seconds) <= 0 ?
                                                " now" : (props.unixTimeStamp - props.historyPlays[10].createdAt.seconds) + " seconds ago"}
                                        </small>
                                    </DropdownItem>
                                </>
                                : ""}
                        </>
                        : ""}
                    {props.historyPlays[11] !== undefined && props.historyPlays[11].createdAt ?
                        <>
                            {(props.unixTimeStamp - props.historyPlays[11].createdAt.seconds) < 60 ?
                                <>
                                    <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                                        <img width="35" height="35" className="rounded-circle" alt="" src={`${props.historyPlays[11].photo}`} />
                                        {props.historyPlays[11].name !== '' ? props.historyPlays[11].name : props.historyPlays[11].account.substring(0, 5).toLowerCase()}
                                        {" played " + props.historyPlays[11].maticAmount + " MATIC and"}
                                        <span style={{ color: props.historyPlays[11].result ? "mediumseagreen" : "crimson" }}>
                                            {props.historyPlays[11].result === false ? " lost all " : ""}{props.historyPlays[11].result === true ? " doubled " : ""}
                                        </span>
                                        {props.historyPlays[11].streak > 1 ? props.historyPlays[11].streak + " times " : ""}
                                        <small className="d-flex justify-content-end">
                                            {(props.unixTimeStamp - props.historyPlays[11].createdAt.seconds) <= 0 ?
                                                " now" : (props.unixTimeStamp - props.historyPlays[11].createdAt.seconds) + " seconds ago"}
                                        </small>
                                    </DropdownItem>
                                </>
                                : ""}
                        </>
                        : ""}
                </DropdownMenu>
            </Dropdown>
        </>
    )
}
