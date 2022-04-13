import React, { useState } from 'react'
import { Dropdown, DropdownToggle } from 'reactstrap'
import ReadRPSGames from '../../../firebase/ReadRPSGames'
import ReadStreakGames from '../../../firebase/ReadStreakGames'
export default function HistoryGames(props) {
    const [dropdown0, setDropdown0] = useState(false);
    const [dropdown1, setDropdown1] = useState(false);

    const toggleMenu0 = () => {
        setDropdown0(!dropdown0);
    }

    const toggleMenu1 = () => {
        setDropdown1(!dropdown1);
    }

    return (
        <>
            <Dropdown isOpen={dropdown0} toggle={toggleMenu0} direction="down" size="md">
                {
                    props.isMobileResolution ?
                        <DropdownToggle color='danger'>
                            PLAYS
                        </DropdownToggle>
                        :
                        <DropdownToggle caret color='danger'>
                            LIVEPLAYS
                        </DropdownToggle>
                }
                <ReadRPSGames isMobileResolution={props.isMobileResolution} />
            </Dropdown>

            <Dropdown isOpen={dropdown1} toggle={toggleMenu1} direction="down" size="md">
                {
                    props.isMobileResolution ?
                        <DropdownToggle color='danger'>
                            STREAKS
                        </DropdownToggle>
                        :
                        <DropdownToggle caret color='danger'>
                            <span>WINSTREAKS <i className="fa-solid fa-trophy fa-xs"></i></span>
                        </DropdownToggle>
                }
                <ReadStreakGames isMobileResolution={props.isMobileResolution} />
            </Dropdown>
        </>
    )
}
