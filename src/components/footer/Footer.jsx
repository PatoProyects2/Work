import React from 'react'
const Footer = () => {
  return (
    <>
      <div className="social-icons">
        <a href="https://twitter.com/RPSGamesClub" className="twitter-icon me-2" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-2x fa-twitter"></i>
        </a>
        <a href="https://discord.gg/AM65VtvP2Q" className="discord-icon" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-2x fa-discord"></i>
        </a>
      </div>
      <div className="version-info">
        <span className="text-white">
          v1.0.0
        </span>
      </div>
    </>
  )
}
export default Footer;