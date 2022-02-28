import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/firesbaseConfig'
import ChatRoom from './components/chat/ChatRoom'

const Footer = () => {
  const [user] = useAuthState(auth)

  return (
    <>
      {user ? <ChatRoom /> : ""}
      <div className="social-icons">
        <a href="https://twitter.com/RPSGameClub" className="twitter-icon me-2" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-2x fa-twitter"></i>
        </a>
        <a href="https://discord.gg/Ygk58VR4" className="discord-icon" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-2x fa-discord"></i>
        </a>
      </div>
    </>
  )
}

export default Footer;