import { useState, useEffect, useContext } from "react";
import { useSearchParams } from 'react-router-dom'
import DiscordOauth2 from "discord-oauth2"
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firesbaseConfig"
import { Context } from "../context/Context"

export const useAuth = () => {
    const { setDiscordId } = useContext(Context)
    const [appStorage, setAppStorage] = useState('');
    const [baseData, setBaseData] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const url = searchParams.get("code");
    const oauth = new DiscordOauth2();

    useEffect(() => {
        getAccessToken()
    }, [url])

    const getAccessToken = () => {
        const local = window.localStorage.getItem('loggedUser')
        const storage = JSON.parse(local)
        setAppStorage(storage)
        if (!local) {
            let config = {
                clientId: process.env.REACT_APP_DISCORD_CLIENTID,
                clientSecret: process.env.REACT_APP_DISCORD_CLIENTSECRET,
                code: url,
                scope: "identify email",
                grantType: "authorization_code",
                redirectUri: "https://9e08-81-33-62-198.ngrok.io/",
            }
            oauth.tokenRequest(config)
                .then(res => {
                    oauth.getUser(res.access_token)
                        .then(userData => {
                            window.localStorage.setItem('loggedUser', JSON.stringify({ access_token: res.access_token, id: userData.id }))
                            setDiscordId(userData.id)
                            setAppStorage({ access_token: res.access_token, id: userData.id })
                            getDoc(doc(db, "clubUsers", userData.id))
                                .then(document => {
                                    const data = document.data()
                                    if (data) {
                                        setBaseData(data)
                                    } else {
                                        const unixTimeStamp = Math.round((new Date()).getTime() / 1000);
                                        const arrayData = {
                                            uid: userData.id,
                                            register: unixTimeStamp,
                                            name: userData.username,
                                            id: userData.discriminator,
                                            photo: userData.avatar ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}` : 'https://firebasestorage.googleapis.com/v0/b/games-club-dce4d.appspot.com/o/ClubLogo.png?alt=media&token=5dd64484-c99f-4ce9-a06b-0a3ee112b37b',
                                            banner: {
                                                file: userData.banner,
                                                color: userData.banner_color
                                            },
                                            email: userData.email,
                                            dsVerified: userData.verified,
                                            level: 1,
                                            games: ['RPS'],
                                            account: '',
                                            rps: {
                                                rock: 0,
                                                paper: 0,
                                                scissors: 0,
                                                dayWinStreak: 0,
                                                winStreakTime: 0,
                                                gameWon: 0,
                                                gameLoss: 0,
                                                amountWon: 0,
                                                amountLoss: 0,
                                                totalGames: 0,
                                                totalAmount: 0,
                                                lastGameBlock: 0
                                            }
                                        }
                                        setDoc(doc(db, "clubUsers", userData.id), arrayData).then(() => getAccessToken())
                                    }
                                })
                                .catch(err => console.log(err))
                        })
                })
                .catch(err => console.log(err))
        } else {
            oauth.getUser(storage.access_token)
                .then(userData => {
                    setDiscordId(userData.id)
                    const arrayUpdate = {
                        name: userData.username,
                        photo: userData.avatar ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}` : 'https://firebasestorage.googleapis.com/v0/b/games-club-dce4d.appspot.com/o/ClubLogo.png?alt=media&token=5dd64484-c99f-4ce9-a06b-0a3ee112b37b',
                    }
                    updateDoc(doc(db, "clubUsers", userData.id), arrayUpdate).then(() => {
                        getDoc(doc(db, "clubUsers", storage.id))
                            .then(document => {
                                const data = document.data()
                                if (data) {
                                    setBaseData(data)
                                }
                            })
                    })
                })
        }
    }

    return {
        appStorage,
        baseData
    }
};