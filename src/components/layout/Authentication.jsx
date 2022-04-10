import React, { useState, useEffect, useContext } from 'react'
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import DiscordOauth2 from "discord-oauth2"
import { useSearchParams } from 'react-router-dom'
import { db } from "../../firebase/firesbaseConfig"
import { Context } from '../../context/Context';
export default function AccountFirebase() {
  const [baseData, setBaseData] = useState(false);
  const [accessToken, setAccessToken] = useState(false);
  const [url, setUrl] = useState('');
  const [userRole, setUserRole] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const { setDiscordId } = useContext(Context);
  let [searchParams, setSearchParams] = useSearchParams();
  let code = searchParams.get("code");
  const oauth = new DiscordOauth2();
  let navigate = useNavigate()

  const toggleMenu = () => {
    setDropdown(!dropdown);
  }

  useEffect(() => {
    setUrl(code)
  }, [])

  useEffect(() => {
    getAccessToken()
    return () => {
      setAccessToken(false)
    }
  }, [url])

  const getAccessToken = async () => {
    try {
      let res = await oauth.tokenRequest({
        clientId: process.env.REACT_APP_DISCORD_CLIENTID,
        clientSecret: process.env.REACT_APP_DISCORD_CLIENTSECRET,
        code: url,
        scope: "identify email guilds bot",
        grantType: "authorization_code",
        redirectUri: "https://e9b7-81-33-62-198.ngrok.io/",
      })
      if (res) {
        window.localStorage.setItem('loggedUser', res.access_token)
        setAccessToken(res.access_token)
        oauth.getUserGuilds(res.access_token).then(console.log);
      }
    } catch (e) {

    }
  }

  // useEffect(() => {
  //   const guildId = process.env.REACT_APP_DISCORD_GUILDID
  //   const api = `https://discord.com/api/v9/guilds/${guildId}/members/${baseData.uid}/role/${userRole}`

  //   const putMethod = {
  //     method: 'PUT', // Method itself
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8',
  //     },
  //     body: JSON.stringify('OTYxNjU2OTkxMTQ5ODc1MjMy.Yk8K3Q.dTANWuQKWUK48iNH58sv0W0r5S4')
  //   }
  //   console.log(baseData.uid)
  //   console.log(userRole)
  //   fetch(api, putMethod)
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  //     .catch(err => console.log(err))
  // }, [baseData, userRole])

  useEffect(() => {
    readUserData()
    return () => {
      setBaseData(false)
      setUserRole('')
    }
  }, [accessToken])

  const readUserData = async () => {
    let token = window.localStorage.getItem('loggedUser')
    if (token) {
      try {
        const userData = await oauth.getUser(token)
        if (userData) {
          const document = await getDoc(doc(db, "clubUsers", userData.id))
          const data = document.data()
          if (data) {
            if (userRole === '') {
              if (data.level > 4 && data.level < 10) {
                setUserRole('937092107632529531')
              }
              if (data.level > 9 && data.level < 15) {
                setUserRole('937092107632529532')
              }
              if (data.level > 14 && data.level < 20) {
                setUserRole('937092107632529533')
              }
              if (data.level > 19 && data.level < 24) {
                setUserRole('937092107632529534')
              }
              if (data.level === 25) {
                setUserRole('962764502615588924')
              }
            }
            updateDoc(doc(db, "clubUsers", userData.id), {
              name: userData.username,
              photo: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}`,
            })
            setBaseData(data)
          } else {
            var unixTimeStamp = Math.round((new Date()).getTime() / 1000);
            let arrayData = undefined
            if (userData.avatar) {
              arrayData = {
                account: '',
                uid: userData.id,
                register: unixTimeStamp,
                name: userData.username,
                id: userData.discriminator,
                photo: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}`,
                banner: {
                  file: userData.banner,
                  color: userData.banner_color
                },
                email: userData.email,
                dsVerified: userData.verified,
                level: 1,
                games: ['RPS'],
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
                  lastGameBlock: 0,
                }
              }
            } else {
              arrayData = {
                account: '',
                uid: userData.id,
                register: unixTimeStamp,
                name: userData.username,
                id: userData.discriminator,
                photo: 'https://firebasestorage.googleapis.com/v0/b/games-club-dce4d.appspot.com/o/ClubLogo.png?alt=media&token=5dd64484-c99f-4ce9-a06b-0a3ee112b37b',
                banner: {
                  file: userData.banner,
                  color: userData.banner_color
                },
                email: userData.email,
                dsVerified: userData.verified,
                level: 1,
                games: ['RPS'],
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
                  lastGameBlock: 0,
                }
              }
            }
            if (arrayData) {
              setDoc(doc(db, "clubUsers", userData.id), arrayData)
              setBaseData(arrayData)
            }
          }
        }
      } catch (e) {

      }
    }
  }

  useEffect(() => {
    if (baseData) {
      setDiscordId(baseData.uid)
    }
  }, [baseData])

  const xpClass = (level) => {
    if (level <= 4) {
      return 'xp-user-badge badge-white';
    } else if (level > 4 && level < 10) {
      return 'xp-user-badge badge-yellow';
    } else if (level > 9 && level < 15) {
      return 'xp-user-badge badge-orange';
    } else if (level > 14 && level < 20) {
      return 'xp-user-badge badge-green';
    } else if (level > 19 && level < 24) {
      return 'xp-user-badge badge-blue';
    } else {
      return 'xp-user-badge badge-brown';
    }
  }

  const getToken = () => {
    const ouathLink = 'https://discord.com/api/oauth2/authorize?client_id=961656991149875232&permissions=268435456&redirect_uri=https%3A%2F%2Fe9b7-81-33-62-198.ngrok.io%2F&response_type=code&scope=bot%20guilds%20email%20identify'
    location.href = ouathLink
  }

  const removeToken = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  return (
    <>
      {baseData ?
        <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="md" className="dd-profile">
          <DropdownToggle color='transparent' className='dd-toggle' caret>
            <div className="d-inline-flex">
              <div className={xpClass(baseData.level)}>
                <span className="circle">
                  <span>{baseData.level}</span>
                </span>
              </div>
              <span className="ms-2 fw-bold">{baseData.name}</span><span>#{baseData.id}</span>
            </div>
          </DropdownToggle>
          <DropdownMenu >
            <DropdownItem onClick={() => navigate('/profile')}><i className='fa-solid fa-user me-3'></i>My Profile</DropdownItem>
            <DropdownItem onClick={removeToken}><i className='fa-solid fa-right-from-bracket me-3 text-danger'></i>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        :
        <button onClick={getToken} className="btn-discord" title="Login with Discord">LOGIN with <i className='fa-brands fa-discord'></i></button>
      }
    </>
  );
}