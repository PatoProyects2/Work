import React, { useState, useContext, useEffect } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Context } from '../../context/Context'
import DiscordButton from '../../assets/imgs/Home Page/discordButton.png'
export default function AccountFirebase() {
  const { discordId } = useContext(Context);
  const [dropdown, setDropdown] = useState(false);
  const [user, setUser] = useState(false);
  useAuth()
  let navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => { getLocalStorage() }, 1000);
    return () => {
      clearInterval(timer);
      setUser(false);
    }
  }, [])

  const getLocalStorage = () => {
    const userData = window.localStorage.getItem('user')
    const data = JSON.parse(userData)
    if (data) {
      const userLevel = window.localStorage.getItem('level')
      if (userLevel) {
        const level = {
          level: userLevel
        }
        const rpsUser = Object.assign(data, level)
        setUser(rpsUser)
      }
    }
  }

  const toggleMenu = () => {
    setDropdown(!dropdown);
  }

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
    const ouathLink = 'https://discord.com/api/oauth2/authorize?client_id=961656991149875232&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&scope=identify%20email'
    location.href = ouathLink
  }

  const removeToken = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
    window.location.reload()
  }

  const handleClickProfile = () => {
    navigate('/profile')
  }

  return (
    <>
      {discordId !== '' && user ?
        <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="md" className="dd-profile">
          <DropdownToggle color='transparent' className='dd-toggle' caret>
            <div className="d-inline-flex">
              <div className={xpClass(user.level)}>
                <span className="circle">
                  <span>{user.level}</span>
                </span>
              </div>
              <span className="ms-2 fw-bold">{user.name}</span><span>#{user.id}</span>
            </div>
          </DropdownToggle>
          <DropdownMenu >
            <DropdownItem onClick={handleClickProfile}><i className='fa-solid fa-user me-3'></i>My Profile</DropdownItem>
            <DropdownItem onClick={removeToken}><i className='fa-solid fa-right-from-bracket me-3 text-danger'></i>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        :
        <img role='button' onClick={getToken} src={DiscordButton} alt='discord-button' />
      }
    </>
  );
}