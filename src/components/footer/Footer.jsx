import React from 'react'
import { useMatchMedia } from '../../hooks/useMatchMedia'
import ChatRoom from './components/chat/ChatRoom'
const Footer = ({ theme, setTheme }) => {

  const isMobileResolution = useMatchMedia('(max-width:650px)', false);

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      {
        isMobileResolution
          ?
          <>
            <div className='d-flex justify-content-center my-3'>
              <a href="https://twitter.com/RPSGameClub" className="twitter-icon me-2" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-2x fa-twitter"></i>
              </a>
              <a href="https://discord.gg/Ygk58VR4" className="discord-icon" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-2x fa-discord"></i>
              </a>
            </div>

            <ChatRoom />
            <div className="d-flex justify-content-center mb-5">
              <button
                type="button"
                className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'}`}
                title={theme === 'light' ? 'Dark Theme' : 'Light Theme'}
                onClick={handleThemeChange}>
                {theme === "light" ? "DARK " : "LIGHT "}<i className={`${theme === "light" ? "fa-solid fa-moon" : "fa-solid fa-sun"}`}></i>
              </button>
            </div>

          </>
          :
          <>
            <ChatRoom />
            <div className="social-icons">
              <a href="https://twitter.com/RPSGameClub" className="twitter-icon me-2" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-2x fa-twitter"></i>
              </a>
              <a href="https://discord.gg/Ygk58VR4" className="discord-icon" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-2x fa-discord"></i>
              </a>
            </div>
          </>
      }
    </>
  )
}

export default Footer;