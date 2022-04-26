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
      {/* <div className="social-icons">
        <a href="https://twitter.com/RPSGamesClub" className="twitter-icon me-2" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-2x fa-twitter"></i>
        </a>
        <a href="https://discord.gg/AM65VtvP2Q" className="discord-icon" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-2x fa-discord"></i>
        </a>
      </div> */}
      <div className="version-info">
        <span className="text-white">Version: 1.0.0</span>
        <br />
        <span className="text-white">Gas: <span className={gasClass}>{gasTrack.fastest}</span> Gwei</span>
      </div>
      <div className="sound-toggle">
        {soundToggle
          ?
          <button onClick={gameSound}>           
            <i className="fa-solid fa-volume-high"></i>
          </button>
          :
          <button onClick={gameSound}>           
            <i className="fa-solid fa-volume-xmark"></i>
          </button>
        }
      </div>
    </>
  )
}
export default Footer;