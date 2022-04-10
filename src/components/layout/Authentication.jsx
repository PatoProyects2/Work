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
        scope: "identify email",
        grantType: "authorization_code",
        redirectUri: "https://0689-81-32-7-32.ngrok.io/",
      })
      if (res) {
        window.localStorage.setItem('loggedUser', res.access_token)
        setAccessToken(res.access_token)
      }
    } catch (e) {

    }
  }

  useEffect(() => {
    readUserData()
    return () => setBaseData(false)
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
    const ouathLink = 'https://discord.com/api/oauth2/authorize?client_id=961656991149875232&redirect_uri=https%3A%2F%2F0689-81-32-7-32.ngrok.io%2F&response_type=code&scope=identify%20email'
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