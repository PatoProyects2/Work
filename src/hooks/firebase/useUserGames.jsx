import { useState, useEffect } from 'react'
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from '../../config/firesbaseConfig'

export const useUserGames = (uid) => {
    const [userGames, setUserGames] = useState(false);

    useEffect(() => {
        console.log('Reading useUserGames...')
        const q = query(collection(db, "allGames"), where("uid", "==", uid))
        const unsub = onSnapshot(q, async (doc) => {
            const games = doc.docs.map(document => document.data())
            setUserGames(games)
        });
        return () => unsub()
    }, [])

    return userGames;
}