import React, { useState, useEffect, useContext } from 'react'
import { doc, getDoc, setDoc, updateDoc, collection, addDoc } from "firebase/firestore";
import { useMixpanel } from 'react-mixpanel-browser';
import { Progress } from 'reactstrap';
import toast from 'react-hot-toast';
import HistoryGames from './components/HistoryGames'
import ConnectWallet from './components/ConnectWallet'
import ReadAllGames from '../../firebase/ReadAllGames'
import { db } from '../../firebase/firesbaseConfig'
import { useMatchMedia } from '../../hooks/useMatchMedia'
import Rock from '../../assets/imgs/rock.gif'
import Paper from '../../assets/imgs/paper.gif'
import Scissors from '../../assets/imgs/scissors.gif'
// import Rock from '../../assets/imgs/Bet Screen/imageRock.png'
// import Paper from '../../assets/imgs/Bet Screen/imagePaper.png'
// import Scissors from '../../assets/imgs/Bet Screen/imageScissors.png'
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
import winSound from '../../assets/audio/win_sound.mpeg'
import { Context } from '../../context/Context'
import { useWeb3 } from '../../hooks/useWeb3'
import { useTime } from '../../hooks/useTime'
import { useLoad } from '../../hooks/useLoad'
import { useStats } from '../../hooks/useStats'
import { useGasTracker } from '../../hooks/useGasTracker'

export default function Rps() {
  const { discordId } = useContext(Context);
  const { balance } = useContext(Context);
  const { soundToggle } = useContext(Context);

  const { web3, rpsgame, network, account, maticPrice, readBlockchainData, disconnectWallet } = useWeb3()
  const gasTrack = useGasTracker();
  const mixpanel = useMixpanel();
  const unixTime = useTime()
  const dotLog = useLoad()
  const isMobileResolution = useMatchMedia('(max-width:650px)', false);

  const [userData, setUserData] = useState({});
  const [usergame, setUsergame] = useState({ hand: '', amount: 0 });
  const [gameLog, setGameLog] = useState('');
  const [userGameStreak, setUserGameStreak] = useState(0);
  const [userGameBlock, setUserGameBlock] = useState(0);
  const [randomItem, setRandomItem] = useState('');
  const [userhand, setUserhand] = useState(0);
  const [useramount, setUseramount] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [userGameResult, setUserGameResult] = useState(undefined);
  const [gameResult, setGameResult] = useState(undefined);
  const [doubleOrNothingStatus, setDoubleOrNothingStatus] = useState(undefined);
  const [showGameResult, setShowGameResult] = useState(false);
  const [save, setSave] = useState(false);
  const [busyNetwork, setBusyNetwork] = useState(false);

  const music = new Audio(winSound);
  const local = window.localStorage.getItem('token')

  const sleep = (milliseconds) => { return new Promise(resolve => setTimeout(resolve, milliseconds)) }

  useEffect(() => {
    if (local === null) {
      toast('Log in if you want to save you game stats and ahievements', {
        duration: 10000,
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
  }, [local])

  useEffect(() => {
    loadUserGame()
    return () => {
      setUserData({});
    };
  }, [account, discordId, rpsgame])

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
              rps: {
                lastGameBlock: 0,
                winStreak: 0
              }
            }
            setDoc(doc(db, "anonUsers", account), arrayData).then(loadUserGame())
          }
        }
      }
    }
  }

  useEffect(() => {
    let arrayOptions = ['a', 'b', 'c', 'd', 'e', 'f']
    var randomArray = Math.random() * arrayOptions.length | 0;
    var result = arrayOptions[randomArray]
    setRandomItem(result)
  }, [account])

  const handleInputChange = (event) => {
    setUsergame({
      ...usergame,
      [event.target.name]: event.target.value
    })
  }

  const verifyGame = async () => {
    if (account === '') {
      toast.error("We cannot detect your wallet, please reload the website")
      return false
    }
    if (document.getElementById('rock').checked || document.getElementById('paper').checked || document.getElementById('scissors').checked) {
      setUserhand(usergame.hand)
    } else {
      toast.error("Select a hand")
      return false
    }
    if (document.getElementById('amount1').checked || document.getElementById('amount2').checked || document.getElementById('amount3').checked || document.getElementById('amount4').checked || document.getElementById('amount5').checked || document.getElementById('amount6').checked) {
      setUseramount(usergame.amount)
    } else {
      toast.error("Select an amount")
      return false
    }
    // if (network !== 137) {
    //   toast.error("Invalid network detected, please select Polygon network")
    //   return false
    // }
    if (balance === '') {
      toast.error("We cannot establish communication with network RPC, please try changing your network RPC")
      return false
    }

    const inputAmount = web3.utils.toWei(usergame.amount.toString(), "ether")

    const feeValue = await rpsgame.methods
      .calculateValue(inputAmount)
      .call()
    if (feeValue) {
      doubleOrNothing(inputAmount, feeValue)
      setGameLog('WAITING FOR DEPOSIT')
      setDoubleOrNothingStatus(true)
      setPlaying(true)
      setAnimation(true)
    }
  }

  const doubleOrNothing = async (inputAmount, feeValue) => {
    const actuallBlock = await web3.eth.getBlockNumber()

    if (actuallBlock) {
      const usdAmount = parseInt(usergame.amount) * maticPrice
      const dayBlock = actuallBlock - 43200

      let playerDocument = {}
      if (discordId !== '') {
        const q0 = doc(db, "clubUsers", discordId)
        let doc1 = await getDoc(q0)
        playerDocument = doc1.data()
      } else {
        const q1 = doc(db, "anonUsers", account)
        let doc2 = await getDoc(q1)
        playerDocument = doc2.data()
      }

      const lastGame = playerDocument.rps.lastGameBlock
      if (actuallBlock > lastGame) {
        let myEvents = undefined
        let gas = 0
        if (gasTrack.fastest > 150) {
          gas = 150000000000
        }
        if (gasTrack.fastest < 50) {
          gas = 50000000000
        }
        if (gasTrack.fastest > 50 && gasTrack.fastest < 150) {
          gas = gasTrack.fastest * 1000000000
        }

        const playEvent = await rpsgame.methods
          .play(inputAmount)
          .send({
            from: account,
            value: feeValue,
            gasPrice: gas,
            gasLimit: 370800
          })
          .on('pending', async (hash) => {
            setGameLog('PLAYING')
          })
          .on('success', async (hash) => {
            setGameLog('PLAYING')
          })
          .on('error', async (err) => {
            if (err.code === -32603) {
              toast.error("This transaction needs more gas to be executed")
              setDoubleOrNothingStatus(false)
              setPlaying(false)
              setAnimation(false)
              return false
            }
            if (err.code === 4001) {
              toast.error("You denied transaction signature")
              setDoubleOrNothingStatus(false)
              setPlaying(false)
              setAnimation(false)
              return false
            }
            if (err.code !== -32603 && err.code !== 4001) {
              setBusyNetwork(true)
              let playEvent = undefined
              var warningBlockchain = toast.loading("This transaction is taking too long because the network is busy, please check the status of your transaction in your wallet")
              const options = {
                filter: {
                  _to: account
                },
                fromBlock: actuallBlock,
                toBlock: 'latest'
              };
              for (let i = 0; i < 1000; i++) {
                try {
                  playEvent = await rpsgame.getPastEvents('Play', options)
                } catch (err) {

                }
                await sleep(1000)
                if (playEvent[0]) break;
              }
              if (playEvent[0]) {
                let myEvent = playEvent[0].returnValues
                let gameBlock = playEvent[0].blockNumber
                saveBlockchainEvents(usdAmount, playerDocument, myEvent, gameBlock)
                setBusyNetwork(false)
                toast.dismiss(warningBlockchain);
              }
            }
          })
        console.log(playEvent)
        if (playEvent) {
          let myEvent = playEvent.events.Play.returnValues
          let gameBlock = playEvent.blockNumber
          saveBlockchainEvents(usdAmount, playerDocument, myEvent, gameBlock)
        }
        else {
          toast.error("We have an issue reading the blockchain or you are playing too fast, please try again in a few seconds")
          setDoubleOrNothingStatus(false)
          setPlaying(false)
          setAnimation(false)
          return false
        }
      }
    }
  }

  const saveBlockchainEvents = async (usdAmount, playerDocument, myEvent, gameBlock) => {
    setSave(true)
    const userStreak = myEvent[3] > 50 ? playerDocument.rps.winStreak + 1 : 0
    const userResult = myEvent[3] > 50 ? true : false
    if (discordId !== '') {
      const level = playerDocument.level
      const totalGames = playerDocument.rps.totalGames + 1
      const totalAmount = playerDocument.rps.totalAmount + usdAmount
      const userGame = userResult ? playerDocument.rps.gameWon + 1 : playerDocument.rps.gameLoss + 1
      const userAmount = userResult ? playerDocument.rps.amountWon + usdAmount + 1 : playerDocument.rps.amountLoss + usdAmount
      const userProfit = userResult ? profit = (playerDocument.rps.amountWon - playerDocument.rps.amountLoss) + usdAmount : profit = (playerDocument.rps.amountWon - playerDocument.rps.amountLoss) - usdAmount
      const rockHand = usergame.hand === 'ROCK' && playerDocument.rps.rock + 1
      const paperHand = usergame.hand === 'PAPER' && playerDocument.rps.paper + 1
      const scissorsHand = usergame.hand === 'SCISSORS' && playerDocument.rps.scissors + 1
      useStats({ level, totalGames, discordId })
      if (userResult) {
        updateDoc(doc(db, "clubUsers", discordId), {
          "rps.totalGames": totalGames,
          "rps.gameWon": totalGames,
          "rps.amountWon": userGame,
          "rps.totalAmount": totalAmount,
          "rps.lastGameBlock": gameBlock,
          "rps.winStreak": userStreak,
          "rps.winStreakTime": unixTime
        })
      } else {
        updateDoc(doc(db, "clubUsers", discordId), {
          "rps.totalGames": totalGames,
          "rps.gameLoss": totalGames,
          "rps.amountLoss": userGame,
          "rps.totalAmount": totalAmount,
          "rps.lastGameBlock": gameBlock,
          "rps.winStreak": userStreak,
        })
      }
      if (usergame.hand === 'ROCK') {
        updateDoc(doc(db, "clubUsers", discordId), {
          "rps.rock": rockHand
        })
      }
      if (usergame.hand === 'PAPER') {
        updateDoc(doc(db, "clubUsers", discordId), {
          "rps.paper": paperHand
        })
      }
      if (usergame.hand === 'SCISSORS') {
        updateDoc(doc(db, "clubUsers", discordId), {
          "rps.scissors": scissorsHand
        })
      }
      addDoc(collection(db, "allGames"), {
        createdAt: unixTime,
        uid: playerDocument.uid,
        block: gameBlock,
        name: playerDocument.name,
        photo: playerDocument.photo,
        account: myEvent[1].toLowerCase(),
        amount: userAmount,
        maticAmount: parseInt(usergame.amount),
        streak: userStreak,
        result: userResult,
        game: 'RPS',
        profit: userProfit
      })
    } else {
      if (userResult) {
        updateDoc(doc(db, "anonUsers", account), {
          "rps.winStreak": playerDocument.rps.winStreak + 1,
          "rps.winStreakTime": unixTime,
          "rps.lastGameBlock": gameBlock
        })
      } else {
        updateDoc(doc(db, "anonUsers", account), {
          "rps.winStreak": 0,
          "rps.lastGameBlock": gameBlock
        })
      }
      addDoc(collection(db, "allGames"), {
        createdAt: unixTime,
        uid: playerDocument.uid,
        block: gameBlock,
        name: playerDocument.name,
        photo: playerDocument.photo,
        account: myEvent[0].toLowerCase(),
        amount: usdAmount,
        maticAmount: parseInt(usergame.amount),
        streak: userStreak,
        result: userResult,
        game: 'RPS',
      })
    }
    mixpanel.track(
      "rps",
      {
        "account": myEvent[1].toLowerCase(),
        "streak": userStreak,
        "result": userResult
      }
    );
    setUserGameStreak(userStreak)
    setUserGameResult(userResult)
    setUserGameBlock(gameBlock)
    setShowGameResult(true)
    setDoubleOrNothingStatus(false)
  }

  const showResult = async () => {
    setAnimation(false)
    setShowGameResult(false)
    setGameResult(true)

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

    for (let i = 0; i < 1000; i++) {
      let actuallBlock = await web3.eth.getBlockNumber()
      if (actuallBlock > userGameBlock) {
        setSave(false)
        break;
      }
      await sleep(1000)
    }
  }

  const backGame = () => {
    setPlaying(false)
    setUserGameStreak(0)
    setUserGameResult(undefined)
    setGameResult(undefined)
  }

  return (
    <>
      <div className="g-btn-historygames">
        {account !== undefined && account !== '0x000000000000000000000000000000000000dEaD' &&
          <>
            <HistoryGames
              isMobileResolution={isMobileResolution}
            />
            <ConnectWallet
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
      <article>
        {account !== undefined && account !== '0x000000000000000000000000000000000000dEaD' ?
          <div className="game-container">
            {playing ?
              <div className="game-playing-container">
                {animation &&
                  <>
                    <img src={RPSAnimation} width="240" height="240" alt="Rock-Paper-Scissors" />
                    {showGameResult ?
                      <span className='processing-title'>{gameLog}</span>
                      :
                      <div className="processing-title">
                        {gameLog}<span className="loading-dot">{dotLog}</span>
                      </div>
                    }
                    <h3>
                      <span className='text-warning'>{userhand}</span>
                      <span >{" FOR "}</span>
                      <span className='text-decoration-underline text-warning'>{useramount + " MATIC"}</span>
                    </h3>
                  </>
                }
                {busyNetwork &&
                  <>
                    <div className="processing-title">
                      SEARCHING YOUR GAME<span className="loading-dot">{dotLog}</span>
                    </div>
                    <h4 className='text-yellow'>DON'T CLOSE THIS WINDOW!</h4>
                  </>
                }
                {showGameResult && <button className="btn-hover btn-green" onClick={showResult}>SHOW RESULT</button>}
                {gameResult &&
                  <>
                    {userGameStreak > 1 &&
                      <div className="my-3">
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
                    <div className="d-flex flex-column justify-content-between mx-auto mt-4">
                      <div className="d-flex flex-column justify-content-center">
                        <span className="rps-result-title">{userGameResult ? " YOU WON " : " YOU LOST "}</span>
                        <span className="rps-result-amount" style={{ color: userGameResult ? "mediumseagreen" : "crimson" }}>
                          {userGameResult ? useramount * 2 : useramount} MATIC
                        </span>
                      </div>
                      <div className="d-flex justify-content-center">
                        <div className="d-flex flex-column align-items-center">
                          {
                            save ?
                              <>
                                <div className="processing-title">
                                  POLYGON IS PROCESSING YOUR GAME<span className="loading-dot">{dotLog}</span>
                                </div>
                                <button className="btn-hover btn-loading" disabled={true}>
                                  PLEASE WAIT
                                  <Progress
                                    value={100}
                                    animated={true}
                                    color='dark'>
                                  </Progress>
                                </button>
                              </>
                              :
                              <>
                                {userGameResult ?
                                  <button className="btn-hover btn-green" onClick={backGame}>CLAIM REWARD</button>
                                  :
                                  <>
                                    <span className="processing-title">TRY AGAIN?</span>
                                    <button className="btn-hover btn-start" onClick={backGame}>DOUBLE OR NOTHING</button>
                                  </>
                                }
                              </>
                          }
                        </div>
                      </div>
                    </div>
                  </>
                }
              </div>
              :
              <>
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
                <button onClick={verifyGame} className="btn-hover btn-green" disabled={doubleOrNothingStatus}>DOUBLE OR NOTHING</button>
              </>
            }
          </div>
          :
          <>
            <div className="game-gifs-wrapper">
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
            <ConnectWallet toast={toast} readBlockchainData={readBlockchainData} web3={web3} account={account} />
            <ReadAllGames isMobileResolution={isMobileResolution} />
          </>
        }
      </article >
    </>
  );
}