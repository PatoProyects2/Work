import { useState, useEffect, useContext } from 'react'
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from '../../config/firesbaseConfig'
import { Context } from '../../context/Context';

export const useGames = () => {
    const [myGames, setMyGames] = useState(false);
    const { discordId } = useContext(Context);

    useEffect(() => {
        if (discordId !== '') {
            console.log('Reading useGames...')
            const q = query(collection(db, "allGames"), where("uid", "==", discordId))
            const unsub = onSnapshot(q, async (doc) => {
                const games = doc.docs.map(document => document.data())
                if (games.length > 0) {
                    setMyGames(games)
                }
            });
            return () => unsub()
        }
    }, [discordId])

    return myGames;
}
