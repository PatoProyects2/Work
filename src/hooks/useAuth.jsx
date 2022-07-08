import {useEffect, useContext } from "react";
import { useSearchParams } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firesbaseConfig"
import { Context } from "../context/Context"

export const useAuth = () => {
    const { setDiscordId } = useContext(Context)
    const [searchParams] = useSearchParams();

    const clientId = process.env.REACT_APP_DISCORD_CLIENTID
    const clientSecret = process.env.REACT_APP_DISCORD_CLIENTSECRET

    const url = searchParams.get("code");

    const localToken = window.localStorage.getItem('token')
    const localUser = window.localStorage.getItem('user')

    window.localStorage.removeItem('discord')

    useEffect(() => {
        getAccessToken()
    }, [url])

    const getAccessToken = async () => {
        if (localToken === null && localUser === null && url !== null) {
            const apiConfig = {
                method: 'POST',
                body: new URLSearchParams({
                    client_id: clientId,
                    client_secret: clientSecret,
                    code: url,
                    grant_type: 'authorization_code',
                    redirect_uri: 'http://localhost:3000/',
                    scope: 'identify email',
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
            const oauthResult = await fetch('https://discord.com/api/oauth2/token', apiConfig);
            const oauthData = await oauthResult.json();
            const userResult = await fetch('https://discord.com/api/users/@me', {
                headers: {
                    authorization: `${oauthData.token_type} ${oauthData.access_token}`,
                },
            });
            const userData = await userResult.json()
            if (userData.id) {
                var encrypted = CryptoJS.AES.encrypt(oauthData.access_token, process.env.REACT_APP_SECRET_KEY).toString()
                window.localStorage.setItem('token', encrypted)
                setDiscordId(userData.id)
                getDoc(doc(db, "clubUsers", userData.id))
                    .then(document => {
                        const data = document.data()
                        if (data) {
                            window.localStorage.setItem('user', JSON.stringify({ id: data.id, name: data.name, photo: data.photo }))
                            window.localStorage.setItem('level', data.level)
                        } else {
                            window.localStorage.setItem('user', JSON.stringify({ id: userData.discriminator, name: userData.username, level: 1 }))
                            const unixTimeStamp = Math.round((new Date()).getTime() / 1000);
                            const arrayData = {
                                uid: userData.id,
                                register: unixTimeStamp,
                                name: userData.username,
                                id: userData.discriminator,
                                photo: userData.avatar ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}` : 'https://firebasestorage.googleapis.com/v0/b/rpsgame-c4a38.appspot.com/o/profile%2FuserAvatarEmpty.png?alt=media&token=092401c4-84b7-41b4-a956-ba3b5cadbfe7',
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
                                    winStreak: 0,
                                    topWinStreak: 0,
                                    winStreakTime: 0,
                                    gameWon: 0,
                                    gameLoss: 0,
                                    amountWon: 0,
                                    amountLoss: 0,
                                    lastGameBlock: 0
                                }
                            }
                            setDoc(doc(db, "clubUsers", userData.id), arrayData)
                        }
                    })
                    .catch(console.log)
            }
        }
    }

    useEffect(() => {
        loadActuallUser()
    }, [localUser])

    const loadActuallUser = async () => {
        if (localToken !== null && localUser !== null) {
            var decrypted = CryptoJS.AES.decrypt(localToken, process.env.REACT_APP_SECRET_KEY);
            var token = decrypted.toString(CryptoJS.enc.Utf8);
            const userResult = await fetch('https://discord.com/api/users/@me', {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            const userData = await userResult.json()
            if (userData) {
                setDiscordId(userData.id)
                const document = await getDoc(doc(db, "clubUsers", userData.id))
                const docData = document.data()
                if (docData) {
                    const avatar = userData.avatar ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}` : 'https://firebasestorage.googleapis.com/v0/b/games-club-dce4d.appspot.com/o/ClubLogo.png?alt=media&token=5dd64484-c99f-4ce9-a06b-0a3ee112b37b'
                    const arrayUpdate = {
                        name: userData.username,
                        photo: avatar,
                    }
                    updateDoc(doc(db, "clubUsers", userData.id), arrayUpdate)
                    window.localStorage.setItem('user', JSON.stringify({ id: userData.id, name: userData.username, photo: avatar }))
                    window.localStorage.setItem('level', docData.level)
                } else {
                    window.localStorage.removeItem('token')
                    window.localStorage.removeItem('user')
                    window.localStorage.removeItem('level')
                    window.location.reload()
                }
            }
        }
    }

    return (
        <>
        </>
    )
};