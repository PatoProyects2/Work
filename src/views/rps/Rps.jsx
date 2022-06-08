import React, { useState, useEffect, useContext } from 'react'
import { doc, getDoc, setDoc, updateDoc, collection, addDoc } from "firebase/firestore";
import { useMixpanel } from 'react-mixpanel-browser';
import { Progress } from 'reactstrap';
import toast from 'react-hot-toast';
import ConnectWallet from '../../components/WalletButton/WalletButton'
import Games from '../../firebase/Games'
import { db } from '../../config/firesbaseConfig'
import { useMatchMedia } from '../../hooks/useMatchMedia'
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
import imageScissors from '../../assets/imgs/Bet Screen/imageScissors.png'
import imageRock from '../../assets/imgs/Bet Screen/imageRock.png'
import imagePaper from '../../assets/imgs/Bet Screen/imagePaper.png'
import matic from '../../assets/imgs/Bet Screen/matic.png'

const RPS = () => {
  const { discordId, balance, soundToggle, gas } = useContext(Context);
  const { web3, rpsgame, network, account, maticPrice, readBlockchainData, disconnectWallet } = useWeb3()
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
    if (network !== 137) {
      toast.error("Network not supported, please select Polygon network")
      return false
    }
    if (balance === '') {
      toast.error("We cannot connect to the polygon network, please try changing your network RPC in your wallet")
      return false
    }

    const inputAmount = web3.utils.toWei(usergame.amount.toString(), "ether")

    const feeValue = await rpsgame.methods
      .calculateValue(inputAmount)
      .call()

    doubleOrNothing(inputAmount, feeValue)
    setGameLog('WAITING FOR DEPOSIT')
    setDoubleOrNothingStatus(true)
    setPlaying(true)
    setAnimation(true)
  }

  const doubleOrNothing = async (inputAmount, feeValue) => {
    const actuallBlock = await web3.eth.getBlockNumber()

    if (actuallBlock) {
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

        const playEvent = await rpsgame.methods
          .play(inputAmount)
          .send({
            from: account,
            value: feeValue,
            gasPrice: web3.utils.toWei(gas.value.toString(), 'gwei'),
            gasLimit: 500000
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

                setBusyNetwork(false)
                toast.dismiss(warningBlockchain);
              }
            }
          })
        if (playEvent) {
          let gameId = playEvent.events.BetPlaced.returnValues.betId
          let gameBlock = playEvent.blockNumber

          for (let i = 0; i < 1000; i++) {
            try {
              const betGame = await rpsgame.methods
                .bets(gameId)
                .call();
              if (parseInt(betGame[0]) !== 0 && parseInt(betGame[1]) === gameBlock) {
                saveBlockchainEvents(betGame, playerDocument)
                break;
              }
            } catch (err) {

            }
            await sleep(1000)
          }
        }
      } else {
        toast.error("We have an issue reading the blockchain or you are playing too fast, please try again in a few seconds")
        setDoubleOrNothingStatus(false)
        setPlaying(false)
        setAnimation(false)
        return false
      }
    }
  }

  const saveBlockchainEvents = async (betGame, playerDocument) => {
    setSave(true)

    const userResult = parseInt(betGame[0]) > 50 ? true : false
    const userStreak = userResult ? playerDocument.rps.winStreak + 1 : 0
    const gameBlock = parseInt(betGame[1])
    const maticAmount = parseInt(web3.utils.fromWei(betGame[2].toString(), 'ether'))
    const usdAmount = maticAmount * maticPrice
    const account = betGame[4].toLowerCase()

    if (discordId !== '') {
      const level = playerDocument.level
      const totalGames = playerDocument.rps.totalGames + 1
      const totalAmount = playerDocument.rps.totalAmount + usdAmount
      const userGame = userResult ? playerDocument.rps.gameWon + 1 : playerDocument.rps.gameLoss + 1
      const userAmount = userResult ? playerDocument.rps.amountWon + usdAmount : playerDocument.rps.amountLoss + usdAmount
      const profit = playerDocument.rps.amountWon - playerDocument.rps.amountLoss
      const userProfit = userResult ? profit + usdAmount : profit - usdAmount
      const rockHand = usergame.hand === 'ROCK' && playerDocument.rps.rock + 1
      const paperHand = usergame.hand === 'PAPER' && playerDocument.rps.paper + 1
      const scissorsHand = usergame.hand === 'SCISSORS' && playerDocument.rps.scissors + 1

      useStats({ level, totalGames, discordId })

      if (userResult) {
        updateDoc(doc(db, "clubUsers", discordId), {
          "rps.totalGames": totalGames,
          "rps.gameWon": userGame,
          "rps.totalAmount": totalAmount,
          "rps.amountWon": userAmount,
          "rps.lastGameBlock": gameBlock,
          "rps.winStreak": userStreak,
          "rps.winStreakTime": unixTime,
        })
      } else {
        updateDoc(doc(db, "clubUsers", discordId), {
          "rps.totalGames": totalGames,
          "rps.gameLoss": userGame,
          "rps.totalAmount": totalAmount,
          "rps.amountLoss": userAmount,
          "rps.lastGameBlock": gameBlock,
          "rps.winStreak": userStreak,
        })
      }
      if (userStreak > playerDocument.rps.topWinStreak) {
        updateDoc(doc(db, "clubUsers", discordId), {
          "rps.topWinStreakTime": userStreak,
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
        account: account,
        amount: usdAmount,
        maticAmount: maticAmount,
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
        account: account,
        amount: usdAmount,
        maticAmount: maticAmount,
        streak: userStreak,
        result: userResult,
        game: 'RPS',
      })
    }
    mixpanel.track(
      "rps",
      {
        "account": account,
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
          <ConnectWallet
            web3={web3}
            account={account}
            balance={balance}
            disconnectWallet={disconnectWallet}
            userData={userData}
            user={discordId}
            toast={toast}
          />
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
                      <label className='labelImage'>
                        <input type="radio" name="hand" id="rock" onChange={handleInputChange} value="ROCK"></input>
                        <img className="imageOptions my-3 img-fluid" src={imageRock} alt="Rock" />
                        <p>Rock</p>
                      </label>
                      <label className='labelImage'>
                        <input type="radio" name="hand" id="paper" onChange={handleInputChange} value="PAPER"></input>
                        <img className="imageOptions my-3 img-fluid" src={imagePaper} alt="Paper" />
                        <p>Paper</p>
                      </label>
                      <label className='labelImage'>
                        <input type="radio" name="hand" id="scissors" onChange={handleInputChange} value="SCISSORS"></input>
                        <img className="imageOptions my-3 img-fluid" src={imageScissors} alt="Scissors" />
                        <p>Scissors</p>
                      </label>
                    </>
                  }
                  {randomItem === 'b' &&
                    <>
                      <label className='labelImage'>
                        <input type="radio" name="hand" id="scissors" onChange={handleInputChange} value="ROCK"></input>
                        <img className="imageOptions my-3 img-fluid" src={imageRock} alt="Rock" />
                        <p>Rock</p>
                      </label>
                      <label className='labelImage'>
                        <input type="radio" name="hand" id="paper" onChange={handleInputChange} value="SCISSORS"></input>
                        <img className="imageOptions my-3 img-fluid" src={imageScissors} alt="Scissors" />
                        <p>Scissors</p>
                      </label>
                      <label className='labelImage'>
                        <input type="radio" name="hand" id="rock" onChange={handleInputChange} value="PAPER"></input>
                        <img className="imageOptions my-3 img-fluid" src={imagePaper} alt="Paper" />
                        <p>Paper</p>
                      </label>
                    </>
                  }
                  {randomItem === 'c' &&
                    <>
                      <label className='labelImage'>
                        <input type="radio" name="hand" id="rock" onChange={handleInputChange} value="PAPER"></input>
                        <img className="imageOptions my-3 img-fluid" src={imagePaper} alt="Paper" />
                        <p>Paper</p>
                      </label>
                      <label className='labelImage'>
                        <input type="radio" name="hand" id="paper" onChange={handleInputChange} value="SCISSORS"></input>
                        <img className="imageOptions my-3 img-fluid" src={imageScissors} alt="Scissors" />
                        <p>Scissors</p>
                      </label>
                      <label className='labelImage'>
                        <input type="radio" name="hand" id="scissors" onChange={handleInputChange} value="ROCK"></input>
                        <img className="imageOptions my-3 img-fluid" src={imageRock} alt="Rock" />
                        <p>Rock</p>
                      </label>
                    </>
                  }
                  {randomItem === 'd' &&
                    <>
                      <label className='labelImage'>
                        <input type="radio" name="hand" id="rock" onChange={handleInputChange} value="PAPER"></input>
                        <img className="imageOptions my-3 img-fluid" src={imagePaper} alt="Paper" />
                        <p>Paper</p>
                      </label>
                      <label className='labelImage'>
                        <input type="radio" name="hand" id="scissors" onChange={handleInputChange} value="ROCK"></input>
                        <img className="imageOptions my-3 img-fluid" src={imageRock} alt="Rock" />
                        <p>Rock</p>
                      </label>
                      <label className='labelImage'>
                        <input type="radio" name="hand" id="paper" onChange={handleInputChange} value="SCISSORS"></input>
                        <img className="imageOptions my-3 img-fluid" src={imageScissors} alt="Scissors" />
                        <p>Scissors</p>
                      </label>
                    </>
                  }
                  {randomItem === 'e' &&
                    <>
                      <label className='labelImage'>
                        <input type="radio" name="hand" id="rock" onChange={handleInputChange} value="SCISSORS"></input>
                        <img className="imageOptions my-3 img-fluid" src={imageScissors} alt="Scissors" />
                        <p>Scissors</p>
                      </label>
                      <label className='labelImage'>
                        <input type="radio" name="hand" id="paper" onChange={handleInputChange} value="ROCK"></input>
                        <img className="imageOptions my-3 img-fluid" src={imageRock} alt="Rock" />
                        <p>Rock</p>
                      </label>
                      <label className='labelImage'>
                        <input type="radio" name="hand" id="scissors" onChange={handleInputChange} value="PAPER"></input>
                        <img className="imageOptions my-3 img-fluid" src={imagePaper} alt="Paper" />
                        <p>Paper</p>
                      </label>
                    </>
                  }
                  {randomItem === 'f' &&
                    <>
                      <label className='labelImage'>
                        <input type="radio" name="hand" id="paper" onChange={handleInputChange} value="SCISSORS"></input>
                        <img className="imageOptions my-3 img-fluid" src={imageScissors} alt="Scissors" />
                        <p>Scissors</p>
                      </label>
                      <label className='labelImage'>
                        <input type="radio" name="hand" id="rock" onChange={handleInputChange} value="PAPER"></input>
                        <img className="imageOptions my-3 img-fluid" src={imagePaper} alt="Paper" />
                        <p>Paper</p>
                      </label>
                      <label className='labelImage'>
                        <input type="radio" name="hand" id="scissors" onChange={handleInputChange} value="ROCK"></input>
                        <img className="imageOptions my-3 img-fluid" src={imageRock} alt="Rock" />
                        <p>Rock</p>
                      </label>
                    </>
                  }
                </div>
                <div className="MaticGeneral d-flex align-items-center justify-content-center">
                  <img className="imgMatic" src={matic} alt="Matic" />
                  <label className="amount">
                    <input type="radio" name="amount" id="amount1" onChange={handleInputChange} value="1" />
                    <p>1</p>
                  </label>
                  <label className="amount">
                    <input type="radio" name="amount" id="amount2" onChange={handleInputChange} value="2" />
                    <p>2</p>
                  </label>
                  <label className="amount">
                    <input type="radio" name="amount" id="amount3" onChange={handleInputChange} value="5" />
                    <p>5</p>
                  </label>
                  <label className="amount">
                    <input type="radio" name="amount" id="amount4" onChange={handleInputChange} value="10" />
                    <p>10</p>
                  </label>
                  <label className="amount">
                    <input type="radio" name="amount" id="amount5" onChange={handleInputChange} value="25" />
                    <p>25</p>
                  </label>
                  <label className="amount">
                    <input type="radio" name="amount" id="amount6" onChange={handleInputChange} value="50" />
                    <p>50</p>
                  </label>
                </div>
                <button onClick={verifyGame} className="DoubleOrNothing" disabled={doubleOrNothingStatus}>DOUBLE OR NOTHING</button>
              </>
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
            <ConnectWallet toast={toast} readBlockchainData={readBlockchainData} web3={web3} account={account} />
            <Games isMobileResolution={isMobileResolution} />
          </>
        }
      </article >
    </>
  );
}

export default RPS;