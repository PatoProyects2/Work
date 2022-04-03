import React, { useState } from 'react'
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

export default function Demo() {

  const [usergame, setUsergame] = useState({});
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
    if (userGameResult) {
      toast.success("You doubled your money, congrats!")
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
        <>
          <div className="game-container">
            {playing === true ?
              <div className="mt-3">
                {animation === true ?
                  <>
                    <img src={RPSAnimation} width="240" height="240" alt="Rock-Paper-Scissors" />
                    <h3>PLAYING</h3>
                    <h3>{userhand + " FOR " + useramount + " MATIC"}</h3>
                  </> : ""}
                {showGameResult === true ? <button className="btn-hover btn-green" onClick={showResult}>SEE RESULT</button> : ""}
                {gameResult === true &&
                  <>
                    {userGameStreak > 1 &&
                      <div className="mb-5">
                        <h3>Congrats!</h3>
                        <h3>{"You're on a " + userGameStreak + " win streak"}</h3>
                      </div>
                    }
                    {userhand === 'ROCK' && userGameResult === true &&
                      <div className="d-flex justify-content-center mt-4">
                        <img className="result-rps-image" src={RockWin} alt="Rock Wins" />
                      </div>
                    }
                    {userhand === 'PAPER' && userGameResult === true &&
                      <div className="d-flex justify-content-center mt-4">
                        <img className="result-rps-image" src={PaperWin} alt="Paper Wins" />
                      </div>
                    }
                    {userhand === 'SCISSORS' && userGameResult === true &&
                      <div className="d-flex justify-content-center mt-4">
                        <img className="result-rps-image" src={ScissorsWin} alt="Scissors Wins" />
                      </div>
                    }
                    {userhand === 'ROCK' && userGameResult === false &&
                      <div className="d-flex justify-content-center mt-4">
                        <img className="result-rps-image" src={RockLose} alt="Rock Loses" />
                      </div>
                    }
                    {userhand === 'PAPER' && userGameResult === false &&
                      <div className="d-flex justify-content-center mt-4">
                        <img className="result-rps-image" src={PaperLose} alt="Paper Loses" />
                      </div>
                    }
                    {userhand === 'SCISSORS' && userGameResult === false &&
                      <div className="d-flex justify-content-center mt-4">
                        <img className="result-rps-image" src={ScissorsLose} alt="Scissors Loses" />
                      </div>
                    }
                    <div className="d-flex flex-column flex-md-row justify-content-between w-50 mx-auto mt-4">
                      <div className="d-flex flex-column justify-content-center">
                        <span className="rps-result-title">{userGameResult === true ? " YOU WON " : ""}{userGameResult === false ? " YOU LOST " : ""}</span>
                        <span className="rps-result-amount" style={{ color: userGameResult ? "mediumseagreen" : "crimson" }}>
                          {userGameResult === true ? useramount : ""}{userGameResult === false ? useramount : ""}{" MATIC"}
                        </span>
                      </div>
                      <div>
                        {userGameResult === true ?
                          <button className="btn-hover btn-green" onClick={backGame}>CLAIM REWARD</button>
                          :
                          <>
                            <p>Try again?</p>
                            <button className="btn-hover btn-start" onClick={backGame}>DOUBLE OR NOTHING</button>
                          </>
                        }
                      </div>
                    </div>
                  </>
                }
              </div>
              :
              <div>
                <div className="d-flex justify-content-center">
                  <label>
                    <input type="radio" name="hand" id="rock" onChange={handleInputChange} value="ROCK"></input>
                    <div className="rps-img rock-img"></div>
                    <i className="fa-regular fa-circle-check fa-2xl fa-beat selected-option"></i>
                  </label>
                  <label>
                    <input type="radio" name="hand" id="paper" onChange={handleInputChange} value="PAPER"></input>
                    <div className="rps-img paper-img"></div>
                    <i className="fa-regular fa-circle-check fa-2xl fa-beat selected-option"></i>
                  </label>
                  <label>
                    <input type="radio" name="hand" id="scissors" onChange={handleInputChange} value="SCISSORS"></input>
                    <div className="rps-img scissors-img"></div>
                    <i className="fa-regular fa-circle-check fa-2xl fa-beat selected-option"></i>
                  </label>
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
        </>
        :
        <>
          <div className="row g-0 my-5 justify-content-center">
            <div className="col-3 col-md-2">
              <img className="my-3 img-fluid" src={Rock} alt="Rock" />
            </div>
            <div className="col-3 col-md-2">
              <img className="my-3 img-fluid" src={Paper} alt="Paper" />
            </div>
            <div className="col-3 col-md-2">
              <img className="my-3 img-fluid" src={Scissors} alt="Scissors" />
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
            <button className="btn-hover btn-start" onClick={openGame}>DOUBLE OR NOTHING</button>
          </div>
        </>
      }
    </>
  );
}