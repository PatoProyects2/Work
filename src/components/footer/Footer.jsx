import React from 'react'
import { useMatchMedia } from '../../hooks/useMatchMedia'
import Chat from './components/Chat/Chat'
import './Footer.css'

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
            <div>
              <a href="https://www.google.com" className="twitter-icon me-2" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-2x fa-twitter"></i>
              </a>
              <a href="https://www.google.com" className="discord-icon" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-2x fa-discord"></i>
              </a>
            </div>

            <div className='row g-0 m-3'>
              <div className="col-6"><Chat theme={theme} /></div>
              <div className="col-6">
                <button
                  type="button"
                  className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'}`}
                  title={theme === 'light' ? 'Dark Theme' : 'Light Theme'}
                  onClick={handleThemeChange}>
                  {theme === "light" ? "DARK " : "LIGHT "}<i className={`${theme === "light" ? "fa-solid fa-moon" : "fa-solid fa-sun"}`}></i>
                </button>
              </div>
            </div>
          </>
          :
          <>
            <Chat theme={theme} />
            <div>
              <a href="https://www.google.com" className="twitter-icon me-2" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-2x fa-twitter"></i>
              </a>
              <a href="https://www.google.com" className="discord-icon" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-2x fa-discord"></i>
              </a>
            </div>
          </>
      }
    </>
  )
}

export default Footer;