import React, { useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
export default function WinStreakLeaderboard(props) {
    const [dropdown, setDropdown] = useState(false);
    const toggleMenu = () => {
        setDropdown(!dropdown);
    }
    return (
        <>
            <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="md">
                <DropdownToggle caret color='danger'>
                    WIN STREAK
                </DropdownToggle>
                <DropdownMenu className={props.theme === 'dark' ? 'bg-dark' : 'bg-light'}>
                    <DropdownItem className={`${props.theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                        {props.queryStreak[0] !== undefined ? props.nameStreak0 + " is on a " + props.streak0 + " streak" : ""}
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}
