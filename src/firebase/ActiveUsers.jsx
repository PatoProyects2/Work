import React, { useState, useEffect } from 'react'
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "./firesbaseConfig";
import UsersIcon from '../assets/imgs/Home Page/usersIcon.png'

export default function Presence() {
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
        <>
            <span className="d-flex align-items-center ms-3">
                <img src={UsersIcon} alt='' />
                &nbsp;
                {active}
            </span>
        </>
    );
}