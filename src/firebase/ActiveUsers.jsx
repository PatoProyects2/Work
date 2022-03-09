import React, { useState, useEffect } from 'react'
import { set, ref, onValue } from "firebase/database";
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, query, getDocs, setDoc, where, doc, getDoc } from "firebase/firestore";
import { db, database, auth } from "./firesbaseConfig";
export default function Presence() {
    const [user] = useAuthState(auth)
    const [active, setActive] = useState(0);

    useEffect(() => {
        readData(user)
    }, [user])

    const readData = async (user) => {
        const response = await fetch('https://showcase.api.linx.twenty57.net/UnixTime/tounixtimestamp?datetime=now');
        const time = await response.json();
        var unixTimeStamp = parseInt(time.UnixTimeStamp)
        if (user) {
            var uid = user.uid;
            var isOfflineForDatabase = {
                state: 'offline',
                time: unixTimeStamp
            };
            var isOnlineForDatabase = {
                state: 'online',
                time: unixTimeStamp
            };

            var userStatusDatabaseRef = ref(database, 'status/' + uid, {
                state: 'undefined',
                time: unixTimeStamp
            });
            var status = ref(database, '.info/connected')
            onValue(status, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    set(userStatusDatabaseRef, isOnlineForDatabase)
                } else {
                    set(userStatusDatabaseRef, isOfflineForDatabase)
                }
            });
            const q0 = query(doc(db, 'status', user.uid))
            const d0 = await getDoc(q0)
            onValue(userStatusDatabaseRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setDoc(doc(db, "status", user.uid), data)
                }
            })
        }
        let lastHour = unixTimeStamp - 3600
        const q1 = query(collection(db, 'status'), where('state', '==', 'online'), where('time', '>', lastHour))
        const d1 = await getDocs(q1)
        setActive(d1._snapshot.docChanges.length)
    }

    return (
        <>
            {active > 0 && active + " online"}
        </>
    );
}