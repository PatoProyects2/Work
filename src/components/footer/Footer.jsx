import React, { useContext, useEffect, useState } from 'react'
import { useGasTracker } from '../../hooks/useGasTracker'
import { Context } from '../../context/Context'

const Footer = () => {
  const { soundToggle, setSoundToggle } = useContext(Context);
  const [gasClass, setGasClass] = useState("");

  const gasTrack = useGasTracker()

  const gameSound = () => {
    if (soundToggle) {
      setSoundToggle(false)
    } else {
      setSoundToggle(true)
    }
  }  

  useEffect(() => {
    if(gasTrack.fastest < 40){
      setGasClass('text-success');
    } else if (gasTrack.fastest >= 40 && gasTrack.fastest < 80){
      setGasClass('text-warning');
    } else {
      setGasClass('text-danger');
    }
  }, [gasTrack.fastest])

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
        <span className="text-white">Version: 1.0.0</span>
        <br />
        <span className="text-white">Gas: <span className={gasClass}>{gasTrack.fastest}</span> Gwei</span>
      </div>
      <div className="sound-toggle">
        {soundToggle
          ?
          <button onClick={gameSound}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-volume-up" viewBox="0 0 16 16">
              <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
              <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
              <path d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z" />
            </svg>
          </button>
          :
          <button onClick={gameSound}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-volume-mute" viewBox="0 0 16 16">
              <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z" />
            </svg>
          </button>
        }
      </div>
    </>
  )
}
export default Footer;