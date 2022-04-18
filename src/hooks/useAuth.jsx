import { useState, useEffect, useContext } from "react";
import { useSearchParams } from 'react-router-dom'
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firesbaseConfig"
import { Context } from "../context/Context"

export const useAuth = () => {
    const { setDiscordId } = useContext(Context)
    const [appStorage, setAppStorage] = useState('');
    const [baseData, setBaseData] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const clientId = process.env.REACT_APP_DISCORD_CLIENTID
    const clientSecret = process.env.REACT_APP_DISCORD_CLIENTSECRET

    const url = searchParams.get("code");

    useEffect(() => {
        getAccessToken()
        return () => {
            setAppStorage('');
            setDiscordId('');
            setBaseData('');
        }
    }, [url])

    const getAccessToken = async () => {
        const local = window.localStorage.getItem('discord')
        const storage = JSON.parse(local)
        setAppStorage(storage)
        if (!local && url) {
            const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
                method: 'POST',
                body: new URLSearchParams({
                    client_id: clientId,
                    client_secret: clientSecret,
                    code: url,
                    grant_type: 'authorization_code',
                    redirect_uri: `https://www.rpsgames.club/`,
                    scope: 'identify email',
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            const oauthData = await oauthResult.json();

            const userResult = await fetch('https://discord.com/api/users/@me', {
                headers: {
                    authorization: `${oauthData.token_type} ${oauthData.access_token}`,
                },
            });
            const userData = await userResult.json()

            window.localStorage.setItem('discord', JSON.stringify({ access_token: oauthData.access_token, id: userData.id }))
            setDiscordId(userData.id)
            setAppStorage({ access_token: oauthData.access_token, id: userData.id })

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
                        setDoc(doc(db, "clubUsers", userData.id), arrayData)
                            .then(getAccessToken())
                            .catch(console.log)
                    }
                })
                .catch(console.log)
        } else {
            if (storage !== null) {
                const userResult = await fetch('https://discord.com/api/users/@me', {
                    headers: {
                        authorization: `Bearer ${storage.access_token}`,
                    },
                });
                const userData = await userResult.json()
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
            }
        }
    }

    return {
        appStorage,
        baseData
    }
};