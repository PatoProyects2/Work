import React, { useState, useContext } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Context } from '../../context/Context'
export default function AccountFirebase() {
  const { discordId } = useContext(Context);
  const [dropdown, setDropdown] = useState(false);
  const { baseData } = useAuth()

  let navigate = useNavigate()

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
    const ouathLink = 'https://discord.com/api/oauth2/authorize?client_id=961656991149875232&redirect_uri=https%3A%2F%2Fwww.rpsgames.club%2F&response_type=code&scope=identify%20email'
    location.href = ouathLink
  }

  const removeToken = () => {
    window.localStorage.removeItem('discord')
    window.location.reload()
  }

  return (
    <>
      {discordId !== '' && baseData !== '' ?
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