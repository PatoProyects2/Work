import React, { useState, useEffect, useContext } from 'react'
import { doc, getDoc, setDoc, updateDoc, collection, addDoc } from "firebase/firestore";
import { useMixpanel } from 'react-mixpanel-browser';
import toast from 'react-hot-toast';
import HistoryGames from './components/HistoryGames'
import ConnectWallet from './components/ConnectWallet'
import ReadAllGames from '../../firebase/ReadAllGames'
import { db } from '../../firebase/firesbaseConfig'
import { useMatchMedia } from '../../hooks/useMatchMedia'
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
import win1 from '../../assets/imgs/result/win1.gif'
import win2 from '../../assets/imgs/result/win2.png'
import lose1 from '../../assets/imgs/result/lose1.gif'
import lose2 from '../../assets/imgs/result/lose2.png'
import { Context } from '../../context/Context'
import { useWeb3 } from '../../hooks/useWeb3'
import { useTime } from '../../hooks/useTime'
import { useLoad } from '../../hooks/useLoad'
import { useStats } from '../../hooks/useStats'
export default function Rps() {
  const { discordId } = useContext(Context);
  const { balance } = useContext(Context);
  const [userData, setUserData] = useState({});
  const [usergame, setUsergame] = useState({
    hand: '',
    amount: 0
  });
  const [gameLog, setGameLog] = useState('');
  const [userGameStreak, setUserGameStreak] = useState(0);
  const [randomItem, setRandomItem] = useState('');
  const [userhand, setUserhand] = useState(0);
  const [useramount, setUseramount] = useState(0);
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [userGameResult, setUserGameResult] = useState(undefined);
  const [gameResult, setGameResult] = useState(undefined);
  const [doubleOrNothingStatus, setDoubleOrNothingStatus] = useState(undefined);
  const [showGameResult, setShowGameResult] = useState(false);
  const isMobileResolution = useMatchMedia('(max-width:650px)', false);
  const decimal = 1000000000000000000
  const mixpanel = useMixpanel();
  const unixTime = useTime()
  const dotLog = useLoad()
  const {
    web3,
    rpsgame,
    network,
    account,
    maticPrice,
    readBlockchainData,
    disconnectWallet,
  } = useWeb3()

  useEffect(() => {
    const local = window.localStorage.getItem('discord')
    if (!local) {
      toast('Log in if you want to save you game stats and ahievements', {
        duration: 30000,
        position: 'top-right',
        // Styling
        style: {},
        className: 'pop-up toast-modal',
        // Custom Icon
        icon: <i className='fa-solid fa-circle-info text-primary'></i>,
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#000',
          secondary: '#fff',
        },
        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    }
  }, [])

  useEffect(() => {
    loadUserGame()
    return () => {
      setUserData({});
    };
  }, [account, discordId])

  const loadUserGame = async () => {
    mixpanel.init(process.env.REACT_APP_MIXPANEL_KEY, { debug: false });
    mixpanel.track('Sign up');
    if (discordId !== '') {
      const document = await getDoc(doc(db, "clubUsers", discordId))
      const data = document.data()
      if (data) {
        setUserData(data)
        if (data.account === '' && account !== '0x000000000000000000000000000000000000dEaD') {
          updateDoc(doc(db, "clubUsers", discordId), {
            account: account
          }).then(loadUserGame())
        }

      }
    } else {
      if (account !== undefined) {
        const anonDoc = await getDoc(doc(db, "anonUsers", account))
        const anonData = anonDoc.data()
        if (!anonData) {
          if (account !== '0x000000000000000000000000000000000000dEaD') {
            const arrayData = {
              uid: 'anonymous',
              account: account,
              name: '',
              photo: 'https://firebasestorage.googleapis.com/v0/b/games-club-dce4d.appspot.com/o/ClubLogo.png?alt=media&token=5dd64484-c99f-4ce9-a06b-0a3ee112b37b',
              level: 1,
              lastGameBlock: 0
            }
            setDoc(doc(db, "anonUsers", account), arrayData).then(loadUserGame())
          }
        }
      }
    }
  }

  const openGame = () => {
    let arrayOptions = ['a', 'b', 'c']
    var randomArray = Math.random() * arrayOptions.length | 0;
    var result = arrayOptions[randomArray]
    setRandomItem(result)
    if (network === 137) {
      setActive(true)
    } else {
      toast.error("Select a valid network")
      return false
    }
  }

  const handleInputChange = (event) => {
    setUsergame({
      ...usergame,
      [event.target.name]: event.target.value
    })
  }

  const verifyGame = async () => {
    if (document.getElementById('rock').checked || document.getElementById('paper').checked || document.getElementById('scissors').checked) {
      setUserhand(usergame.hand)
    } else {
      toast.error("Select the betting hand")
      setDoubleOrNothingStatus(false)
      return false
    }

    if (document.getElementById('amount1').checked || document.getElementById('amount2').checked || document.getElementById('amount3').checked || document.getElementById('amount4').checked || document.getElementById('amount5').checked || document.getElementById('amount6').checked) {
      setUseramount(usergame.amount)
    } else {
      toast.error("Select the bet amount")
      setDoubleOrNothingStatus(false)
      return false
    }

    setGameLog('WAITING FOR DEPOSIT')
    setDoubleOrNothingStatus(true)
    setPlaying(true)
    setAnimation(true)
    doubleOrNothing()
  }

  const doubleOrNothing = async () => {
    const sleep = (milliseconds) => { return new Promise(resolve => setTimeout(resolve, milliseconds)) }
    let myEvents = []
    let playerDocument = {}
    let actuallBlock = 0
    let inputAmount = 0
    let calculateValue = 0
    let lastGame = 0
    try {
      actuallBlock = await web3.eth.getBlockNumber()
      inputAmount = web3.utils.toWei(usergame.amount.toString(), "ether")
      calculateValue = await rpsgame.methods.calculateValue(inputAmount).call()
    } catch (err) {

    }
    const usdAmount = parseInt(usergame.amount) * maticPrice
    const dayBlock = actuallBlock - 43200
    const options = {
      filter: {
        _to: account
      },
      fromBlock: actuallBlock,
      toBlock: 'latest'
    };

    if (discordId !== '') {
      const q0 = doc(db, "clubUsers", discordId)
      let doc1 = await getDoc(q0)
      playerDocument = doc1.data()
    } else {
      const q1 = doc(db, "anonUsers", account)
      let doc2 = await getDoc(q1)
      playerDocument = doc2.data()
    }

    lastGame = playerDocument.rps.lastGameBlock
    if (actuallBlock > lastGame) {
      rpsgame.methods
        .play(inputAmount)
        .send({
          from: account,
          value: calculateValue,
          gasPrice: '40000000000'
        })
        .then(() => {
          setGameLog('PLAYING')
        })
        .catch((err) => {
          if (err.code === 4001) {
            toast.error("User denied transaction signature")
            myEvents[0] = false
            setDoubleOrNothingStatus(false)
            setPlaying(false)
            setAnimation(false)
            return false
          } else {
            toast.error("This transaction is taking too long, please wait")
          }
        });

      for (let i = 0; i < 1000; i++) {
        myEvents = await rpsgame.getPastEvents('Play', options)
        await sleep(1000)
        if (myEvents[0]) break;
      }
      if (myEvents[0]) readBlockchainEvents(usdAmount, dayBlock, playerDocument, myEvents)
    } else {
      toast.error("Wait some seconds to play again")
      setDoubleOrNothingStatus(false)
      setPlaying(false)
      setAnimation(false)
      return false
    }
  }

  const readBlockchainEvents = async (usdAmount, dayBlock, playerDocument, myEvents) => {
    if (discordId !== '') {
      let profit = 0
      if (myEvents[0]) {
        updateDoc(doc(db, "clubUsers", discordId), {
          "rps.totalGames": playerDocument.rps.totalGames + 1,
          "rps.totalAmount": playerDocument.rps.totalAmount + usdAmount,
          "rps.lastGameBlock": myEvents[0].blockNumber
        })
        if (myEvents[0].returnValues[3] === true) {
          updateDoc(doc(db, "clubUsers", discordId), {
            "rps.gameWon": playerDocument.rps.gameWon + 1,
            "rps.amountWon": playerDocument.rps.amountWon + usdAmount
          })
          profit = (playerDocument.rps.amountWon - playerDocument.rps.amountLoss) + usdAmount
        }
        if (myEvents[0].returnValues[3] === false) {
          updateDoc(doc(db, "clubUsers", discordId), {
            "rps.gameLoss": playerDocument.rps.gameLoss + 1,
            "rps.amountLoss": playerDocument.rps.amountLoss + usdAmount
          })
          profit = (playerDocument.rps.amountWon - playerDocument.rps.amountLoss) - usdAmount
        }
        if (myEvents[0].returnValues[2] > playerDocument.rps.dayWinStreak || dayBlock > playerDocument.rps.winStreakTime) {
          updateDoc(doc(db, "clubUsers", discordId), {
            "rps.dayWinStreak": parseInt(myEvents[0].returnValues[2]),
            "rps.winStreakTime": unixTime
          })
        }
        if (usergame.hand === 'ROCK') {
          updateDoc(doc(db, "clubUsers", discordId), {
            "rps.rock": playerDocument.rps.rock + 1,
          })
        }
        if (usergame.hand === 'PAPER') {
          updateDoc(doc(db, "clubUsers", discordId), {
            "rps.paper": playerDocument.rps.paper + 1,
          })
        }
        if (usergame.hand === 'SCISSORS') {
          updateDoc(doc(db, "clubUsers", discordId), {
            "rps.scissors": playerDocument.rps.scissors + 1,
          })
        }
        addDoc(collection(db, "allGames"), {
          createdAt: unixTime,
          uid: playerDocument.uid,
          block: myEvents[0].blockNumber,
          name: playerDocument.name,
          photo: playerDocument.photo,
          account: myEvents[0].returnValues[0].toLowerCase(),
          amount: usdAmount,
          maticAmount: parseInt(usergame.amount),
          streak: parseInt(myEvents[0].returnValues[2]),
          result: myEvents[0].returnValues[3],
          game: 'RPS',
          profit: profit
        })
        mixpanel.track(
          "rps",
          {
            "account": myEvents[0].returnValues[0].toLowerCase(),
            "result": myEvents[0].returnValues[3],
            "streak": parseInt(myEvents[0].returnValues[2])
          }
        );
        setUserGameResult(myEvents[0].returnValues[3])
        setUserGameStreak(myEvents[0].returnValues[2])
        setShowGameResult(true)
        setDoubleOrNothingStatus(false)
        const level = playerDocument.level
        const totalGames = playerDocument.rps.totalGames + 1
        useStats({ level, totalGames, discordId })
      }
    } else {
      if (myEvents[0]) {
        updateDoc(doc(db, "anonUsers", account), {
          "lastGameBlock": myEvents[0].blockNumber
        })
        addDoc(collection(db, "allGames"), {
          createdAt: unixTime,
          uid: playerDocument.uid,
          block: myEvents[0].blockNumber,
          name: playerDocument.name,
          photo: playerDocument.photo,
          account: myEvents[0].returnValues[0].toLowerCase(),
          amount: usdAmount,
          maticAmount: parseInt(usergame.amount),
          streak: parseInt(myEvents[0].returnValues[2]),
          result: myEvents[0].returnValues[3],
          game: 'RPS',
        })
        mixpanel.track(
          "rps",
          {
            "account": myEvents[0].returnValues[0].toLowerCase(),
            "result": myEvents[0].returnValues[3],
            "streak": parseInt(myEvents[0].returnValues[2])
          }
        );
        setUserGameResult(myEvents[0].returnValues[3])
        setUserGameStreak(myEvents[0].returnValues[2])
        setShowGameResult(true)
        setDoubleOrNothingStatus(false)
      }
    }
  }

  const showResult = () => {
    let arrayOptions = ['a', 'b']
    var randomArray = Math.random() * arrayOptions.length | 0;
    var result = arrayOptions[randomArray]

    if (userGameResult) {
      const winOptions = {
        duration: 3000,
        position: 'bottom-left',
        // Styling
        style: {},
        className: 'pop-up toast-modal',
        // Custom Icon
        icon: result === 'a' ? <img src={win1} width="25" height="25" alt=""></img> : <img src={win2} width="25" height="25" alt=""></img>,
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#000',
          secondary: '#fff',
        },
        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      }
      if (result === 'a') {
        toast('You doubled your money!!', winOptions);
      }
      if (result === 'b') {
        toast('You are doing some business here', winOptions);
      }
    } else {
      const loseOptions = {
        duration: 3000,
        position: 'bottom-left',
        // Styling
        style: {},
        className: 'pop-up toast-modal',
        // Custom Icon
        icon: result === 'a' ? <img src={lose1} width="25" height="25" alt=""></img> : <img src={lose2} width="25" height="25" alt=""></img>,
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#000',
          secondary: '#fff',
        },
        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      }
      if (result === 'a') {
        toast('Better luck next time.', loseOptions);
      }
      if (result === 'b') {
        toast('Wrong hand :P', loseOptions);
      }
    }

    setAnimation(false)
    setShowGameResult(false)
    setGameResult(true)
  }

  const backGame = () => {
    setPlaying(false)
    setUserGameStreak(0)
    setUserGameResult(undefined)
    setGameResult(undefined)
  }



  return (
    <>
      {isMobileResolution ?
        <div className="d-flex flex-row justify-content-start gap-1">
          {account !== undefined && account !== '0x000000000000000000000000000000000000dEaD' &&
            <>
              <HistoryGames
                isMobileResolution={isMobileResolution}
              />
              <ConnectWallet
                decimal={decimal}
                web3={web3}
                account={account}
                balance={balance}
                disconnectWallet={disconnectWallet}
                userData={userData}
                user={discordId}
                toast={toast}
              />
            </>
          }
        </div>
        :
        <div className="d-flex flex-row justify-content-between mt-3">
          {account !== undefined && account !== '0x000000000000000000000000000000000000dEaD' &&
            <>
              <div className="d-flex flex-row gap-3">
                <HistoryGames
                  isMobileResolution={isMobileResolution}
                />
                <ConnectWallet
                  decimal={decimal}
                  web3={web3}
                  account={account}
                  balance={balance}
                  disconnectWallet={disconnectWallet}
                  userData={userData}
                  user={discordId}
                  toast={toast}
                />
              </div>
            </>
          }
        </div>
      }
      <article>
        {active ?
          <>
            <div className="game-container">
              {playing ?
                <div className="mt-3">
                  {animation &&
                    <>
                      <img src={RPSAnimation} width="240" height="240" alt="Rock-Paper-Scissors" />
                      {!showGameResult ? <h3>{gameLog + dotLog}</h3> : <h3>{gameLog}</h3>}
                      <h3>
                        <span className='text-decoration-underline'>{userhand}</span>
                        <span >{" FOR "}</span>
                        <span className='text-decoration-underline'>{useramount + " MATIC"}</span>
                      </h3>
                    </>
                  }
                  {showGameResult && <button className="btn-hover btn-green" onClick={showResult}>SEE RESULT</button>}
                  {gameResult &&
                    <>
                      {userGameStreak > 1 &&
                        <div className="mb-5">
                          <h3>Congrats!</h3>
                          <h3>{"You're on a " + userGameStreak + " win streak"}</h3>
                        </div>
                      }
                      {userhand === 'ROCK' && userGameResult &&
                        <div className="d-flex justify-content-center mt-4">
                          <img className="result-rps-image" src={RockWin} alt="Rock Wins" />
                        </div>
                      }
                      {userhand === 'PAPER' && userGameResult &&
                        <div className="d-flex justify-content-center mt-4">
                          <img className="result-rps-image" src={PaperWin} alt="Paper Wins" />
                        </div>
                      }
                      {userhand === 'SCISSORS' && userGameResult &&
                        <div className="d-flex justify-content-center mt-4">
                          <img className="result-rps-image" src={ScissorsWin} alt="Scissors Wins" />
                        </div>
                      }
                      {userhand === 'ROCK' && !userGameResult &&
                        <div className="d-flex justify-content-center mt-4">
                          <img className="result-rps-image" src={RockLose} alt="Rock Loses" />
                        </div>
                      }
                      {userhand === 'PAPER' && !userGameResult &&
                        <div className="d-flex justify-content-center mt-4">
                          <img className="result-rps-image" src={PaperLose} alt="Paper Loses" />
                        </div>
                      }
                      {userhand === 'SCISSORS' && !userGameResult &&
                        <div className="d-flex justify-content-center mt-4">
                          <img className="result-rps-image" src={ScissorsLose} alt="Scissors Loses" />
                        </div>
                      }
                      <div className="d-flex flex-column flex-md-row justify-content-between w-50 mx-auto mt-4">
                        <div className="d-flex flex-column justify-content-center">
                          <span className="rps-result-title">{userGameResult === true ? " YOU WON " : ""}{userGameResult === false ? " YOU LOST " : ""}</span>
                          <span className="rps-result-amount" style={{ color: userGameResult ? "mediumseagreen" : "crimson" }}>
                            {userGameResult && useramount * 2}{!userGameResult && useramount}{" MATIC"}
                          </span>
                        </div>
                        <div className="d-flex justify-content-center">
                          {userGameResult ?
                            <button className="btn-hover btn-green" onClick={backGame}>CLAIM REWARD</button>
                            :
                            <div className="d-flex flex-column align-items-center">
                              <span className="rps-result-title">TRY AGAIN?</span>
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
                  <div className="d-flex justify-content-center">
                    {randomItem === 'a' &&
                      <>
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
                      </>
                    }
                    {randomItem === 'b' &&
                      <>
                        <label>
                          <input type="radio" name="hand" id="rock" onChange={handleInputChange} value="SCISSORS"></input>
                          <div className="rps-img scissors-img"></div>
                          <i className="fa-regular fa-circle-check fa-2xl fa-beat selected-option"></i>
                        </label>
                        <label>
                          <input type="radio" name="hand" id="paper" onChange={handleInputChange} value="ROCK"></input>
                          <div className="rps-img rock-img"></div>
                          <i className="fa-regular fa-circle-check fa-2xl fa-beat selected-option"></i>
                        </label>
                        <label>
                          <input type="radio" name="hand" id="scissors" onChange={handleInputChange} value="PAPER"></input>
                          <div className="rps-img paper-img"></div>
                          <i className="fa-regular fa-circle-check fa-2xl fa-beat selected-option"></i>
                        </label>
                      </>
                    }
                    {randomItem === 'c' &&
                      <>
                        <label>
                          <input type="radio" name="hand" id="rock" onChange={handleInputChange} value="PAPER"></input>
                          <div className="rps-img paper-img"></div>
                          <i className="fa-regular fa-circle-check fa-2xl fa-beat selected-option"></i>
                        </label>
                        <label>
                          <input type="radio" name="hand" id="paper" onChange={handleInputChange} value="SCISSORS"></input>
                          <div className="rps-img scissors-img"></div>
                          <i className="fa-regular fa-circle-check fa-2xl fa-beat selected-option"></i>
                        </label>
                        <label>
                          <input type="radio" name="hand" id="scissors" onChange={handleInputChange} value="ROCK"></input>
                          <div className="rps-img rock-img"></div>
                          <i className="fa-regular fa-circle-check fa-2xl fa-beat selected-option"></i>
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
                  <button onClick={verifyGame} className="btn-hover btn-green" disabled={doubleOrNothingStatus}>DOUBLE OR NOTHING</button>
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
            {account !== undefined && account !== '0x000000000000000000000000000000000000dEaD' ?
              <>
                <div className="text-center">
                  <button className="btn-hover btn-start" onClick={openGame}>DOUBLE OR NOTHING</button>
                </div>
                <ReadAllGames isMobileResolution={isMobileResolution} />
              </>
              :
              <>
                <ConnectWallet toast={toast} readBlockchainData={readBlockchainData} decimal={decimal} web3={web3} account={account} />
              </>
            }
          </>
        }
      </article >
    </>
  );
}