import React, { useState, useEffect } from 'react'
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../config/firesbaseConfig";
import UsersIcon from '../assets/imgs/Home Page/usersIcon.png'
import styled from 'styled-components'

const StyledActive = styled.div`
        .Logo {
            width: 25px;
        }

        .ActiveText {
            color: #ffdb5b;
        }

        .LogoBackground {
            background-color: #21202e;
            padding-bottom: 2px;
            padding-top: 2px;
            padding-left: 5px;
            padding-right: 5px;
            border-radius: 5px;
        }
    `

const ActiveUsers = () => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const readData = async () => {
            const time = Math.round((new Date()).getTime() / 1000)
            const lastDay = time - 86400
            const q1 = query(collection(db, 'status'), where('state', '==', 'online'), where('time', '>', lastDay))
            const d1 = await getDocs(q1)
            setActive(d1._snapshot.docChanges.length)
        }
        readData()
        return () => {
            setActive(0);
        };
    }, [])

    return (
        <StyledActive>
            <span className="LogoBackground d-flex align-items-center ms-3">
                <img className="Logo" src={UsersIcon} alt='' />
                &nbsp;
                <div className="ActiveText">{active}</div>
            </span>
        </StyledActive>
    );
}

export default ActiveUsers;