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

        return () => {
            setActive(0);
        };
    }, [user])

    const readData = async (user) => {
        var unixTimeStamp = Math.round((new Date()).getTime() / 1000);
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
        let lastDay = unixTimeStamp - 86400
        const q1 = query(collection(db, 'status'), where('state', '==', 'online'), where('time', '>', lastDay))
        const d1 = await getDocs(q1)
        setActive(d1._snapshot.docChanges.length)
    }

    return (
        <>
            <span className="d-flex align-items-center ms-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="20" height="20">
                    <g fill="white">
                        <path d="M12 50L48 50L48 48.5L47.9167 46.9444L47.5 45.0278L46.5 43.2222L44.9167 41.6944L43.9722 41.0278L43 40.3889L41 39.25L39 38.1389L38.0278 37.5278L37.1389 36.75L36.0278 34.9722L35.9722 34L36.2222 33L37.3056 31L38.3611 29L38.8889 27L38.9722 26L39 24L39 22L39 21L39 20L38.8889 18L38.6667 17.0278L38.2778 16.0833L37.6667 15.2222L35.9722 13.7222L35 13.1111L33 12.3056L32 12.1111L30 12L28 12.0278L27 12.0833L25.0278 12.5L23.25 13.5L22.5 14.25L21.9444 15.0833L21.5 16.0278L21.0833 18L21 20L21 21L21 22L21 24L21.0278 26L21.1111 27L21.6389 29L22.6944 31L23.7778 33L23.9722 34.9722L23.5556 35.9167L22.8611 36.75L21.9722 37.5278L20 38.75L19 39.25L18 39.8333L16.0278 41.0278L14.25 42.4167L13.5 43.2222L12.5 45.0278L12.0833 46.9444L12 48.5L12 50M11 36L9.5 37.4722L7.94444 38.8056L7 39.5278L5 40.75L4.02778 41.25L2.25 42.4722L0.944444 44.0833L0.5 45.0278L0.0833333 46.9444L0 48.5L0 50L9 50L9.02778 48.5L9.25 46.9444L9.5 46L10.5 44L12.0833 42L14 40.0833L15 39.25L16 38.4722L17.9722 37.1667L18.8889 36.5278L20.25 34.9167L20.5833 33.9722L20.4722 32L19.6111 30L19.0833 29L18.3056 27L18.0278 25L18 24L18 22L18 20L18 16L15.9444 16L14.9444 16.0278L14 16.1111L13 16.3056L12 16.6389L11.0278 17.1111L9.25 18.4167L8.5 19.2222L7.5 21.0278L7.25 22L7.08333 23L7 25L7 27L7.11111 29L7.61111 31L8.02778 32L8.97222 33.8889L9.55556 34.6944L9.83333 35.2222L11 36M42 16L42 20L42 22L42 24L41.9722 25L41.6944 27L40.9167 29L40.3889 30L39.5278 32L39.4167 33.9722L39.75 34.9167L41.1111 36.5278L42.0278 37.1667L44 38.4722L45 39.25L46 40.0833L47.9167 42L49.5 44L50.5 46L50.75 46.9444L50.9722 48.5L51 50L60 50L60 48.5L59.9167 46.9444L59.5 45.0278L59.0556 44.0833L57.75 42.4722L55.9722 41.25L55 40.75L53 39.5556L51.0556 38.2222L50.5 37.75L49 37L50.1667 35.5L50.4444 34.9444L51.0278 33.9444L51.9722 32L52.3889 31L52.8889 29L52.9722 28L53 26L53 25L52.9167 23L52.75 22L52.5 21.0278L51.5 19.2222L50.75 18.4167L49.9167 17.7222L48 16.6389L46 16.1111L45.0556 16.0278L43.5 16L42 16z" />
                    </g>
                </svg>
                &nbsp;
                {active}
            </span>
        </>
    );
}