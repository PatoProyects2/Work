import { useState, useEffect } from 'react'
import { collection, query, onSnapshot, orderBy, limit } from "firebase/firestore";
import { db } from '../../config/firesbaseConfig'

export const useAllGames = () => {
    const [allGames, setAllGames] = useState(false);

    useEffect(() => {
        console.log('Reading useAllGames...')
        const q = query(collection(db, "allGames"), orderBy("createdAt", "desc"), limit(10))
        const unsub = onSnapshot(q, async (doc) => {
            const games = doc.docs.map(document => document.data())
            setAllGames(games);
        });
        return () => unsub()
    }, [])

    return allGames;
}
