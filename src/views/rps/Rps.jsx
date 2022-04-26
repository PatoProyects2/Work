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
  const decimal = 1000000000000000000

  useEffect(() => {
    const local = window.localStorage.getItem('discord')
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
  }, [])

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
        // if (rpsgame) {
        //   rpsgame.events.Play({
        //     filter: {
        //       user: account
        //     },
        //     fromBlock: data.rps.lastGameBlock + 1
        //   }, function (error, event) { console.log(event); })
        //     .on("connected", function (subscriptionId) {

        //     })
        //     .on('data', async function (event) {

        //     })
        //     .on('changed', function (event) {

        //     })
        //     .on('error', function (error, receipt) {

        //     });
        // }
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
                lastGameBlock: 0
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

  const verifyGame = () => {
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
      toast.error("Invalid network detected, please select Polygon network")
      return false
    }
    if (balance === '') {
      toast.error("We cannot establish communication with network RPC, please try changing your network RPC")
      return false
    }

    const inputAmount = web3.utils.toWei(usergame.amount.toString(), "ether")

    rpsgame.methods.calculateValue(inputAmount).call()
      .then(calculateValue => {
        doubleOrNothing(inputAmount, calculateValue)
        setGameLog('WAITING FOR DEPOSIT')
        setDoubleOrNothingStatus(true)
        setPlaying(true)
        setAnimation(true)
      })
      .catch(() => {
        toast.error("We found some issue with the network, please try again")
        return false
      })
  }

  const doubleOrNothing = async (inputAmount, calculateValue) => {
    let playerDocument = {}
    let actuallBlock = 0
    try {
      actuallBlock = await web3.eth.getBlockNumber()
    } catch (err) {

    }
    const usdAmount = parseInt(usergame.amount) * maticPrice
    const dayBlock = actuallBlock - 43200

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
      try {
        myEvents = await rpsgame.methods
          .play(inputAmount)
          .send({
            from: account,
            value: calculateValue,
            gasPrice: gas,
            gasLimit: 370800
          })
      } catch (err) {
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
        if (err.code === -32005) {
          let myEvents2 = undefined
          const sleep = (milliseconds) => { return new Promise(resolve => setTimeout(resolve, milliseconds)) }
          setBusyNetwork(true)
          const warningBlockchain = toast.loading("This transaction is taking too long because the network is busy, please check the status of your transaction in your wallet")
          const options = {
            filter: {
              _to: account
            },
            fromBlock: actuallBlock,
            toBlock: 'latest'
          };
          for (let i = 0; i < 1000; i++) {
            try {
              myEvents2 = await rpsgame.getPastEvents('Play', options)
            } catch (err) {

            }
            await sleep(1000)
            if (myEvents2[0]) break;
          }
          if (myEvents2[0]) {
            toast.dismiss(warningBlockchain);
            setGameLog('PLAYING')
            setBusyNetwork(false)
            savePastEvents(usdAmount, dayBlock, playerDocument, myEvents2)
          }
        }
        if (err.code !== -32603 && err.code !== 4001 && err.code !== -32005) {
          toast.error("Something unusual has happened, please try again in a few seconds")
          setDoubleOrNothingStatus(false)
          setPlaying(false)
          setAnimation(false)
          return false
        }
      }
      if (myEvents) {
        setGameLog('PLAYING')
        let myEvent = myEvents.events.Play.returnValues
        let gameBlock = myEvents.blockNumber
        saveBlockchainEvents(usdAmount, dayBlock, playerDocument, myEvent, gameBlock)
      }
    } else {
      toast.error("We have an issue reading the blockchain or you are playing too fast, please try again in a few seconds")
      setDoubleOrNothingStatus(false)
      setPlaying(false)
      setAnimation(false)
      return false
    }
  }

  const savePastEvents = (usdAmount, dayBlock, playerDocument, myEvents2) => {
    setSave(true)
    let myEvent = myEvents2[0].returnValues
    mixpanel.track(
      "rps",
      {
        "account": myEvent[0].toLowerCase(),
        "result": myEvent[3],
        "streak": parseInt(myEvent[2])
      }
    );
    setUserGameResult(myEvent[3])
    setUserGameStreak(myEvent[2])
    setShowGameResult(true)
    setDoubleOrNothingStatus(false)

    if (discordId !== '') {
      let profit = 0
      const level = playerDocument.level
      const totalGames = playerDocument.rps.totalGames + 1
      useStats({ level, totalGames, discordId })
      updateDoc(doc(db, "clubUsers", discordId), {
        "rps.totalGames": playerDocument.rps.totalGames + 1,
        "rps.totalAmount": playerDocument.rps.totalAmount + usdAmount,
        "rps.lastGameBlock": myEvent[0].blockNumber
      })
      if (myEvent[3] === true) {
        updateDoc(doc(db, "clubUsers", discordId), {
          "rps.gameWon": playerDocument.rps.gameWon + 1,
          "rps.amountWon": playerDocument.rps.amountWon + usdAmount
        })
        profit = (playerDocument.rps.amountWon - playerDocument.rps.amountLoss) + usdAmount
      }
      if (myEvent[3] === false) {
        updateDoc(doc(db, "clubUsers", discordId), {
          "rps.gameLoss": playerDocument.rps.gameLoss + 1,
          "rps.amountLoss": playerDocument.rps.amountLoss + usdAmount
        })
        profit = (playerDocument.rps.amountWon - playerDocument.rps.amountLoss) - usdAmount
      }
      if (myEvent[2] > playerDocument.rps.dayWinStreak || dayBlock > playerDocument.rps.winStreakTime) {
        updateDoc(doc(db, "clubUsers", discordId), {
          "rps.dayWinStreak": parseInt(myEvent[2]),
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
        block: myEvent[0].blockNumber,
        name: playerDocument.name,
        photo: playerDocument.photo,
        account: myEvent[0].toLowerCase(),
        amount: usdAmount,
        maticAmount: parseInt(usergame.amount),
        streak: parseInt(myEvent[2]),
        result: myEvent[3],
        game: 'RPS',
        profit: profit
      })
    } else {
      updateDoc(doc(db, "anonUsers", account), {
        "rps.lastGameBlock": myEvent[0].blockNumber
      })
      addDoc(collection(db, "allGames"), {
        createdAt: unixTime,
        uid: playerDocument.uid,
        block: myEvent[0].blockNumber,
        name: playerDocument.name,
        photo: playerDocument.photo,
        account: myEvent[0].toLowerCase(),
        amount: usdAmount,
        maticAmount: parseInt(usergame.amount),
        streak: parseInt(myEvent[2]),
        result: myEvent[3],
        game: 'RPS',
      })
    }
  }

  const saveBlockchainEvents = async (usdAmount, dayBlock, playerDocument, myEvent, gameBlock) => {
    setSave(true)
    mixpanel.track(
      "rps",
      {
        "account": myEvent[0].toLowerCase(),
        "result": myEvent[3],
        "streak": parseInt(myEvent[2])
      }
    );
    setUserGameResult(myEvent[3])
    setUserGameStreak(myEvent[2])
    setUserGameBlock(gameBlock)
    setShowGameResult(true)
    setDoubleOrNothingStatus(false)
    if (discordId !== '') {
      let profit = 0
      const level = playerDocument.level
      const totalGames = playerDocument.rps.totalGames + 1
      useStats({ level, totalGames, discordId })
      updateDoc(doc(db, "clubUsers", discordId), {
        "rps.totalGames": playerDocument.rps.totalGames + 1,
        "rps.totalAmount": playerDocument.rps.totalAmount + usdAmount,
        "rps.lastGameBlock": gameBlock
      })
      if (myEvent[3] === true) {
        updateDoc(doc(db, "clubUsers", discordId), {
          "rps.gameWon": playerDocument.rps.gameWon + 1,
          "rps.amountWon": playerDocument.rps.amountWon + usdAmount
        })
        profit = (playerDocument.rps.amountWon - playerDocument.rps.amountLoss) + usdAmount
      }
      if (myEvent[3] === false) {
        updateDoc(doc(db, "clubUsers", discordId), {
          "rps.gameLoss": playerDocument.rps.gameLoss + 1,
          "rps.amountLoss": playerDocument.rps.amountLoss + usdAmount
        })
        profit = (playerDocument.rps.amountWon - playerDocument.rps.amountLoss) - usdAmount
      }
      if (myEvent[2] > playerDocument.rps.dayWinStreak || dayBlock > playerDocument.rps.winStreakTime) {
        updateDoc(doc(db, "clubUsers", discordId), {
          "rps.dayWinStreak": parseInt(myEvent[2]),
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
        block: gameBlock,
        name: playerDocument.name,
        photo: playerDocument.photo,
        account: myEvent[0].toLowerCase(),
        amount: usdAmount,
        maticAmount: parseInt(usergame.amount),
        streak: parseInt(myEvent[2]),
        result: myEvent[3],
        game: 'RPS',
        profit: profit
      })
    } else {
      updateDoc(doc(db, "anonUsers", account), {
        "rps.lastGameBlock": gameBlock
      })
      addDoc(collection(db, "allGames"), {
        createdAt: unixTime,
        uid: playerDocument.uid,
        block: gameBlock,
        name: playerDocument.name,
        photo: playerDocument.photo,
        account: myEvent[0].toLowerCase(),
        amount: usdAmount,
        maticAmount: parseInt(usergame.amount),
        streak: parseInt(myEvent[2]),
        result: myEvent[3],
        game: 'RPS',
      })
    }
  }

  const showResult = async () => {
    const sleep = (milliseconds) => { return new Promise(resolve => setTimeout(resolve, milliseconds)) }

    setAnimation(false)
    setShowGameResult(false)
    setGameResult(true)

    let arrayOptions = ['a', 'b']
    var randomArray = Math.random() * arrayOptions.length | 0;
    var result = arrayOptions[randomArray]

    if (userGameResult) {
      if (soundToggle) {
        music.play()
      }
      const winOptions = {
        duration: 5000,
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
        duration: 5000,
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
      {isMobileResolution ?
        <div className="g-btn-historygames">
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
        <div className="g-btn-historygames">
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
      }
      <article>
        {account !== undefined && account !== '0x000000000000000000000000000000000000dEaD' ?
          <>
            <div className="game-container">

              {playing ?
                <div className="d-flex flex-column align-items-center">
                  {animation &&
                    <>
                      <img src={RPSAnimation} width="240" height="240" alt="Rock-Paper-Scissors" />
                      {
                        !showGameResult ?
                          <div className="row w-100">
                            <h5 className='col-9 text-end p-0'>{gameLog}</h5>
                            <h5 className='col-3 text-start p-0'>{dotLog}</h5>
                          </div>
                          : <h5>{gameLog}</h5>
                      }
                      <h3>
                        <span className='text-warning'>{userhand}</span>
                        <span >{" FOR "}</span>
                        <span className='text-decoration-underline text-warning'>{useramount + " MATIC"}</span>
                      </h3>
                    </>
                  }
                  {busyNetwork &&
                    <div className='row w-100'>
                      <div className='col-9 text-end p-0'>SEARCHING YOUR GAME</div>
                      <div className='col-3 text-start p-0'>{dotLog}</div>
                      <h4 className='text-yellow'>DON'T CLOSE THIS WINDOW!</h4>
                    </div>
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
                      <div className="d-flex flex-column justify-content-between w-50 mx-auto mt-4">
                        <div className="d-flex flex-column justify-content-center">
                          <span className="rps-result-title">{userGameResult === true ? " YOU WON " : ""}{userGameResult === false ? " YOU LOST " : ""}</span>
                          <span className="rps-result-amount" style={{ color: userGameResult ? "mediumseagreen" : "crimson" }}>
                            {userGameResult && useramount * 2}{!userGameResult && useramount}{" MATIC"}
                          </span>
                        </div>
                        <div className="d-flex justify-content-center">
                          {userGameResult ?
                            <div className="d-flex flex-column align-items-center">
                              {
                                save ?
                                  <>
                                    <span className="processing-title">POLYGON IS PROCESSING</span>
                                    <div className="row w-100 processing-title">
                                      <span className='col-9 text-end p-0'>YOUR GAME</span>
                                      <span className='col-3 text-start p-0'>{dotLog}</span>
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
                                  <button className="btn-hover btn-green" onClick={backGame} disabled={save}>CLAIM REWARD</button>
                              }
                            </div>
                            :
                            <div className="d-flex flex-column align-items-center">
                              {save ?
                                <>
                                  <span className="processing-title">POLYGON IS PROCESSING</span>
                                  <div className="row w-100 processing-title">
                                    <span className='col-9 text-end p-0'>YOUR GAME</span>
                                    <span className='col-3 text-start p-0'>{dotLog}</span>
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
                                  <span className="processing-title">TRY AGAIN?</span>
                                  <button className="btn-hover btn-start" onClick={backGame} disabled={save}>DOUBLE OR NOTHING</button>
                                </>
                              }
                            </div>
                          }
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
          </>
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
            <ConnectWallet toast={toast} readBlockchainData={readBlockchainData} decimal={decimal} web3={web3} account={account} />
            <ReadAllGames isMobileResolution={isMobileResolution} />
          </>
        }
      </article >
    </>
  );
}