import React, { useState, useContext } from 'react'
import toast from 'react-hot-toast';
import Rock from '../../assets/imgs/rock.gif'
import Paper from '../../assets/imgs/paper.gif'
import Scissors from '../../assets/imgs/scissors.gif'
import RPSAnimation from '../../assets/imgs/animation.gif'
import RockLose from '../../assets/imgs/animations/RockLose.gif'
import RockWin from '../../assets/imgs/animations/RockWin.gif'
import PaperLose from '../../assets/imgs/animations/PaperLose.gif'
import PaperWin from '../../assets/imgs/animations/PaperWin.gif'
import ScissorsLose from '../../assets/imgs/animations/ScissorsLose.gif'
import ScissorsWin from '../../assets/imgs/animations/ScissorsWin.gif'
import winSound from '../../assets/audio/win_sound.mpeg'
import win1 from '../../assets/imgs/result/win1.gif'
import win2 from '../../assets/imgs/result/win2.png'
import lose1 from '../../assets/imgs/result/lose1.gif'
import lose2 from '../../assets/imgs/result/lose2.png'
import { Context } from '../../context/Context'
import imageScissors from '../../assets/imgs/Bet Screen/imageScissors.png'
import imageRock from '../../assets/imgs/Bet Screen/imageRock.png'
import imagePaper from '../../assets/imgs/Bet Screen/imagePaper.png'

const RPSDemo = () => {
  const { soundToggle } = useContext(Context);
  const [usergame, setUsergame] = useState({});
  const [randomItem, setRandomItem] = useState('');
  const [userGameStreak, setUserGameStreak] = useState(0);
  const [userhand, setUserhand] = useState(0);
  const [useramount, setUseramount] = useState(0);
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [userGameResult, setUserGameResult] = useState(undefined);
  const [gameResult, setGameResult] = useState(undefined);
  const [doubleOrNothingStatus, setDoubleOrNothingStatus] = useState(undefined);
  const [showGameResult, setShowGameResult] = useState(false);
  const music = new Audio(winSound);

  const handleInputChange = (event) => {
    setUsergame({
      ...usergame,
      [event.target.name]: event.target.value
    })
  }

  const openGame = () => {
    if (document.getElementById('age').checked === false) {
      toast.error("Confirm that your are at least 18 years old")
      return false
    }
    let arrayOptions = ['a', 'b', 'c', 'd', 'e', 'f']
    var randomArray = Math.random() * arrayOptions.length | 0;
    var result = arrayOptions[randomArray]
    setRandomItem(result)
    setActive(true)
  }

  const doubleOrNothing = async () => {
    setDoubleOrNothingStatus(true)
    if (document.getElementById('rock').checked || document.getElementById('paper').checked || document.getElementById('scissors').checked) {
      setUserhand(usergame.hand)
    } else {
      toast.error("Select your betting hand")
      setDoubleOrNothingStatus(false)
      return false
    }
    if (document.getElementById('amount1').checked || document.getElementById('amount2').checked || document.getElementById('amount3').checked || document.getElementById('amount4').checked || document.getElementById('amount5').checked || document.getElementById('amount6').checked) {
      setUseramount(usergame.amount)
    } else {
      toast.error("Select your betting amount")
      setDoubleOrNothingStatus(false)
      return false
    }
    setPlaying(true)
    setAnimation(true)
    setUserGameResult(true)
    setUserGameStreak(userGameStreak + 1)
    setShowGameResult(true)
    setDoubleOrNothingStatus(false)
  }

  const showResult = async () => {
    let arrayOptions = ['a', 'b']
    var randomArray = Math.random() * arrayOptions.length | 0;
    var result = arrayOptions[randomArray]

    const toastOptions = {
      duration: 5000,
      position: 'bottom-left',
      style: {},
      className: 'pop-up toast-modal',
      icon: result === 'a' ? <img src={userGameResult ? win1 : lose1} width="25" height="25" alt=""></img> : <img src={userGameResult ? win2 : lose2} width="25" height="25" alt=""></img>,
      iconTheme: {
        primary: '#000',
        secondary: '#fff',
      },
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    }

    if (userGameResult) {
      if (soundToggle) {
        music.play()
      }
      if (result === 'a') {
        toast('You doubled your money!!', toastOptions);
      }
      if (result === 'b') {
        toast('You are doing some business here', toastOptions);
      }
    } else {
      if (result === 'a') {
        toast('Better luck next time.', toastOptions);
      }
      if (result === 'b') {
        toast('Wrong hand :P', toastOptions);
      }
    }

    setAnimation(false)
    setShowGameResult(false)
    setGameResult(true)
  }

  const backGame = () => {
    setPlaying(false)
    setUserGameResult(undefined)
    setGameResult(undefined)
  }

  return (
    <>
      {active ?
        <div className="game-container">
          {playing ?
            <div className="game-playing-container">
              {animation &&
                <>
                  <img src={RPSAnimation} width="240" height="240" alt="Rock-Paper-Scissors" />
                  {showGameResult && <span className='processing-title'>{'PLAYING'}</span>}
                  <h3>
                    <span className='text-warning'>{userhand}</span>
                    <span >{" FOR "}</span>
                    <span className='text-decoration-underline text-warning'>{useramount + " MATIC"}</span>
                  </h3>
                </>
              }
              {showGameResult && <button className="btn-hover btn-green" onClick={showResult}>SHOW RESULT</button>}
              {gameResult &&
                <>
                  {userGameStreak > 1 &&
                    <div className="mb-5">
                      <h3>Congrats!</h3>
                      <h3>{"You're on a " + userGameStreak + " win streak"}</h3>
                    </div>
                  }
                  {userhand === 'ROCK' && userGameResult &&
                    <div className="anim-win-lose">
                      <img className="result-rps-image" src={RockWin} alt="Rock Wins" />
                    </div>
                  }
                  {userhand === 'PAPER' && userGameResult &&
                    <div className="anim-win-lose">
                      <img className="result-rps-image" src={PaperWin} alt="Paper Wins" />
                    </div>
                  }
                  {userhand === 'SCISSORS' && userGameResult &&
                    <div className="anim-win-lose">
                      <img className="result-rps-image" src={ScissorsWin} alt="Scissors Wins" />
                    </div>
                  }
                  {userhand === 'ROCK' && !userGameResult &&
                    <div className="anim-win-lose">
                      <img className="result-rps-image" src={RockLose} alt="Rock Loses" />
                    </div>
                  }
                  {userhand === 'PAPER' && !userGameResult &&
                    <div className="anim-win-lose">
                      <img className="result-rps-image" src={PaperLose} alt="Paper Loses" />
                    </div>
                  }
                  {userhand === 'SCISSORS' && !userGameResult &&
                    <div className="anim-win-lose">
                      <img className="result-rps-image" src={ScissorsLose} alt="Scissors Loses" />
                    </div>
                  }
                  <div className="d-flex flex-column justify-content-between w-50 mx-auto mt-4">
                    <div className="d-flex flex-column justify-content-center">
                      <span className="rps-result-title">{userGameResult ? " YOU WON " : " YOU LOST "}</span>
                      <span className="rps-result-amount" style={{ color: userGameResult ? "mediumseagreen" : "crimson" }}>
                        {userGameResult ? useramount * 2 : useramount} MATIC
                      </span>
                    </div>
                    <div className="d-flex justify-content-center">
                      {userGameResult === true ?
                        <button className="btn-hover btn-green" onClick={backGame}>CLAIM REWARD</button>
                        :
                        <div className="d-flex flex-column align-items-center">
                          <span className="rps-result-title">Try again?</span>
                          <button className="btn-hover btn-start" onClick={backGame}>DOUBLE OR NOTHING</button>
                        </div>
                      }
                    </div>
                  </div>
                </>
              }
            </div>
            :
            <div>
              <div className="game-selection-hand">
                {randomItem === 'a' &&
                  <>
                    <label>
                      <input type="radio" name="hand" id="rock" onChange={handleInputChange} value="ROCK"></input>
                      <div className="rps-img rock-img"></div>
                      <i className="fa-regular fa-circle-check fa-2xl selected-option"></i>
                    </label>
                    <label>
                      <input type="radio" name="hand" id="paper" onChange={handleInputChange} value="PAPER"></input>
                      <div className="rps-img paper-img"></div>
                      <i className="fa-regular fa-circle-check fa-2xl selected-option"></i>
                    </label>
                    <label>
                      <input type="radio" name="hand" id="scissors" onChange={handleInputChange} value="SCISSORS"></input>
                      <div className="rps-img scissors-img"></div>
                      <i className="fa-regular fa-circle-check fa-2xl selected-option"></i>
                    </label>
                  </>
                }
                {randomItem === 'b' &&
                  <>
                    <label>
                      <input type="radio" name="hand" id="scissors" onChange={handleInputChange} value="ROCK"></input>
                      <div className="rps-img rock-img"></div>
                      <i className="fa-regular fa-circle-check fa-2xl selected-option"></i>
                    </label>
                    <label>
                      <input type="radio" name="hand" id="paper" onChange={handleInputChange} value="SCISSORS"></input>
                      <div className="rps-img scissors-img"></div>
                      <i className="fa-regular fa-circle-check fa-2xl selected-option"></i>
                    </label>
                    <label>
                      <input type="radio" name="hand" id="rock" onChange={handleInputChange} value="PAPER"></input>
                      <div className="rps-img paper-img"></div>
                      <i className="fa-regular fa-circle-check fa-2xl selected-option"></i>
                    </label>
                  </>
                }
                {randomItem === 'c' &&
                  <>
                    <label>
                      <input type="radio" name="hand" id="rock" onChange={handleInputChange} value="PAPER"></input>
                      <div className="rps-img paper-img"></div>
                      <i className="fa-regular fa-circle-check fa-2xl selected-option"></i>
                    </label>
                    <label>
                      <input type="radio" name="hand" id="paper" onChange={handleInputChange} value="SCISSORS"></input>
                      <div className="rps-img scissors-img"></div>
                      <i className="fa-regular fa-circle-check fa-2xl selected-option"></i>
                    </label>
                    <label>
                      <input type="radio" name="hand" id="scissors" onChange={handleInputChange} value="ROCK"></input>
                      <div className="rps-img rock-img"></div>
                      <i className="fa-regular fa-circle-check fa-2xl selected-option"></i>
                    </label>
                  </>
                }
                {randomItem === 'd' &&
                  <>
                    <label>
                      <input type="radio" name="hand" id="rock" onChange={handleInputChange} value="PAPER"></input>
                      <div className="rps-img paper-img"></div>
                      <i className="fa-regular fa-circle-check fa-2xl selected-option"></i>
                    </label>
                    <label>
                      <input type="radio" name="hand" id="scissors" onChange={handleInputChange} value="ROCK"></input>
                      <div className="rps-img rock-img"></div>
                      <i className="fa-regular fa-circle-check fa-2xl selected-option"></i>
                    </label>
                    <label>
                      <input type="radio" name="hand" id="paper" onChange={handleInputChange} value="SCISSORS"></input>
                      <div className="rps-img scissors-img"></div>
                      <i className="fa-regular fa-circle-check fa-2xl selected-option"></i>
                    </label>
                  </>
                }
                {randomItem === 'e' &&
                  <>
                    <label>
                      <input type="radio" name="hand" id="rock" onChange={handleInputChange} value="SCISSORS"></input>
                      <div className="rps-img scissors-img"></div>
                      <i className="fa-regular fa-circle-check fa-2xl selected-option"></i>
                    </label>
                    <label>
                      <input type="radio" name="hand" id="paper" onChange={handleInputChange} value="ROCK"></input>
                      <div className="rps-img rock-img"></div>
                      <i className="fa-regular fa-circle-check fa-2xl selected-option"></i>
                    </label>
                    <label>
                      <input type="radio" name="hand" id="scissors" onChange={handleInputChange} value="PAPER"></input>
                      <div className="rps-img paper-img"></div>
                      <i className="fa-regular fa-circle-check fa-2xl selected-option"></i>
                    </label>
                  </>
                }
                {randomItem === 'f' &&
                  <>
                    <label>
                      <input type="radio" name="hand" id="paper" onChange={handleInputChange} value="SCISSORS"></input>
                      <div className="rps-img scissors-img"></div>
                      <i className="fa-regular fa-circle-check fa-2xl selected-option"></i>
                    </label>
                    <label>
                      <input type="radio" name="hand" id="rock" onChange={handleInputChange} value="PAPER"></input>
                      <div className="rps-img paper-img"></div>
                      <i className="fa-regular fa-circle-check fa-2xl selected-option"></i>
                    </label>
                    <label>
                      <input type="radio" name="hand" id="scissors" onChange={handleInputChange} value="ROCK"></input>
                      <div className="rps-img rock-img"></div>
                      <i className="fa-regular fa-circle-check fa-2xl selected-option"></i>
                    </label>
                  </>
                }
              </div>
              <h5 className="mt-5">FOR</h5>
              <div className="d-flex justify-content-center my-4">
                <label className="amount">
                  <input type="radio" name="amount" id="amount1" onChange={handleInputChange} value="1" />
                  <span>1 MATIC</span>
                </label>
                <label className="amount">
                  <input type="radio" name="amount" id="amount2" onChange={handleInputChange} value="2" />
                  <span>2 MATIC</span>
                </label>
                <label className="amount">
                  <input type="radio" name="amount" id="amount3" onChange={handleInputChange} value="5" />
                  <span>5 MATIC</span>
                </label>
              </div>
              <div className="d-flex justify-content-center mb-4">
                <label className="amount">
                  <input type="radio" name="amount" id="amount4" onChange={handleInputChange} value="10" />
                  <span>10 MATIC</span>
                </label>
                <label className="amount">
                  <input type="radio" name="amount" id="amount5" onChange={handleInputChange} value="25" />
                  <span>25 MATIC</span>
                </label>
                <label className="amount">
                  <input type="radio" name="amount" id="amount6" onChange={handleInputChange} value="50" />
                  <span>50 MATIC</span>
                </label>
              </div>
              <button onClick={doubleOrNothing} className="btn-hover btn-green" disabled={doubleOrNothingStatus}>DOUBLE OR NOTHING</button>
            </div>
          }
        </div>
        :
        <>
          <div className="game-gifs-wrapper">
            <div className="gameAntes col-3 col-md-2">
              <img className="my-3 img-fluid" src={imageRock} alt="Rock" />
              <p>Rock</p>
            </div>
            <div className="gameAntes col-3 col-md-2">
              <img className="my-3 img-fluid" src={imagePaper} alt="Paper" />
              <p>Paper</p>
            </div>
            <div className="gameAntes col-3 col-md-2">
              <img className="my-3 img-fluid" src={imageScissors} alt="Scissors" />
              <p>Scissors</p>
            </div>
          </div>
          <p className="text-center mt-3">
            <label className="switch">
              <input id="age" type="checkbox"></input>&nbsp;
              <span className="slider round"></span>
            </label>
            &nbsp;
            I confirm that I am at least 18 years old
          </p>
          <div className="text-center">
            <button className="DoubleOrNothing" onClick={openGame}>DOUBLE OR NOTHING</button>
          </div>
        </>
      }
    </>
  );
}

export default RPSDemo;