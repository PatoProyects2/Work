import React, { useState } from 'react'
import { Dropdown, DropdownToggle } from 'reactstrap'
import ReadRPSGames from '../../../firebase/ReadRPSGames'
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
                <ReadRPSGames />
            </Dropdown>
        </>
    )
}
