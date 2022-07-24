import { useState, useEffect } from 'react'
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from '../../config/firesbaseConfig'

export const useAllUsers = () => {
    const [allUsers, setAllUsers] = useState(false);

    useEffect(() => {
        const time = Math.round((new Date()).getTime() / 1000)
        const lastDay = time - 86400
        const q = query(collection(db, 'status'), where('state', '==', 'online'), where('time', '>', lastDay))
        const unsub = onSnapshot(q, async (doc) => {
            setAllUsers(doc.docs.length);
        });
        return () => unsub()
    }, [])

    return allUsers;
}
