import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Web3 from 'web3'
import Web3Modal from "web3modal";
import { useAuthState } from 'react-firebase-hooks/auth'
import WalletConnectProvider from "@walletconnect/web3-provider";
import Torus from "@toruslabs/torus-embed";
import Portis from "@portis/web3";
import ethProvider from "eth-provider";
import WalletLink from "walletlink";
import { doc, getDoc, setDoc, updateDoc, collection, query, limit, addDoc, serverTimestamp, onSnapshot, orderBy } from "firebase/firestore";
import { useToasts } from 'react-toast-notifications';
import RpsGame from '../../abis/rpsGame/rpsGame.json'
import { rpsGameContract } from '../../components/blockchain/Contracts'
import HistoryGamesModal from './components/HistoryGamesModal'
import HistoryGames from './components/HistoryGames'
import ConnectWallet from './components/ConnectWallet'
import ConnectChain from './components/ConnectChain'
import WinStreakLeaderboard from './components/WinStreakLeaderboard'
import { auth, db } from '../../firebase/firesbaseConfig'
import { useMatchMedia } from '../../hooks/useMatchMedia'
import Rock from '../../assets/imgs/rock.gif'
import Paper from '../../assets/imgs/paper.gif'
import Scissors from '../../assets/imgs/scissors.gif'
import RPSAnimation from '../../assets/imgs/animation.gif'


export default function Rps() {
  const { addToast } = useToasts();
  const [user] = useAuthState(auth)
  const [web3, setWeb3] = useState({});
  const [rpsgame, setRpsgame] = useState({});
  const [userData, setUserData] = useState({});
  const [web3ModalInfo, setWeb3ModalInfo] = useState({});
  const [historyPlays, setHistoryPlays] = useState({});
  const [usergame, setUsergame] = useState({
    hand: '',
    amount: 0
  });
  const [register, setRegister] = useState('');
  const [account, setAccount] = useState('0x000000000000000000000000000000000000dEaD');
  const [walletBalance, setWalletBalance] = useState(0);
  const [network, setNetwork] = useState(0);
  const [decimal, setDecimal] = useState(1000000000000000000);
  const [userGameStreak, setUserGameStreak] = useState(0);
  const [userhand, setUserhand] = useState(0);
  const [useramount, setUseramount] = useState(0);
  const [unixTimeStamp, setUnixTimeStamp] = useState(1000000000000000000);
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [userGameResult, setUserGameResult] = useState(undefined);
  const [gameResult, setGameResult] = useState(undefined);
  const [doubleOrNothingStatus, setDoubleOrNothingStatus] = useState(undefined);
  const [showGameResult, setShowGameResult] = useState(false);
  const isMobileResolution = useMatchMedia('(max-width:650px)', false);


  useEffect(() => {
    const timer = setInterval(() => { getUnixTime() }, 4000);
    return () => clearInterval(timer);
  }, [])

  const getUnixTime = async () => {
    fetch('https://showcase.api.linx.twenty57.net/UnixTime/tounixtimestamp?datetime=now')
      .then(response =>
        response.json()
      )
      .then(data =>
        setUnixTimeStamp(parseInt(data.UnixTimeStamp))
      );
  }

  useEffect(() => {
    const q = query(collection(db, "allGames"), orderBy("createdAt", "desc"), limit(12))
    const unsub = onSnapshot(q, (doc) => {
      const played = doc.docs.map(historyPlays => historyPlays.data())
      setHistoryPlays(played)
    });
    return unsub;
  }, [])

  useEffect(() => {
    loadUserGame(account, user)
  }, [account, user])

  const loadUserGame = async (account, user) => {
    const query0 = doc(db, "clubUsers", account)
    const userDocument0 = await getDoc(query0)
    const userData = userDocument0.data()
    if (userData) {
      setUserData(userData)
      try {
        fetch('https://showcase.api.linx.twenty57.net/UnixTime/fromunix?timestamp=' + `${userData.register.seconds}`)
          .then(response =>
            response.json()
          )
          .then(data => {
            setRegister(data)
          }
          );
      } catch (e) {

      }
      if (userData.rps.totalGames > 5 && userData.rps.totalGames < 10 && userData.level !== 2) {
        addToast('You go up to level 2!', { appearance: 'info' });
        updateDoc(doc(db, "clubUsers", account), {
          level: 2
        })
      }
      if (userData.rps.totalGames > 9 && userData.rps.totalGames < 20 && userData.level !== 3) {
        addToast('You go up to level 3!', { appearance: 'info' });
        updateDoc(doc(db, "clubUsers", account), {
          level: 3
        })
      }
      if (userData.rps.totalGames > 19 && userData.rps.totalGames < 30 && userData.level !== 4) {
        addToast('You go up to level 4!', { appearance: 'info' });
        updateDoc(doc(db, "clubUsers", account), {
          level: 4
        })
      }
      if (userData.rps.totalGames > 29 && userData.rps.totalGames < 40 && userData.level !== 5) {
        addToast('You go up to level 5!', { appearance: 'info' });
        updateDoc(doc(db, "clubUsers", account), {
          level: 5
        })
      }
      if (userData.rps.totalGames > 39 && userData.rps.totalGames < 50 && userData.level !== 6) {
        addToast('You go up to level 6!', { appearance: 'info' });
        updateDoc(doc(db, "clubUsers", account), {
          level: 6
        })
      }
      if (userData.rps.totalGames > 49 && userData.rps.totalGames < 60 && userData.level !== 7) {
        addToast('You go up to level 7!', { appearance: 'info' });
        updateDoc(doc(db, "clubUsers", account), {
          level: 7
        })
      }
      if (userData.rps.totalGames > 59 && userData.rps.totalGames < 70 && userData.level !== 8) {
        addToast('You go up to level 8!', { appearance: 'info' });
        updateDoc(doc(db, "clubUsers", account), {
          level: 8
        })
      }
      if (userData.rps.totalGames > 69 && userData.rps.totalGames < 90 && userData.level !== 9) {
        addToast('You go up to level 9!', { appearance: 'info' });
        updateDoc(doc(db, "clubUsers", account), {
          level: 9
        })
      }
      if (userData.rps.totalGames > 89 && userData.rps.totalGames < 110 && userData.level !== 10) {
        addToast('You go up to level 10!', { appearance: 'info' });
        updateDoc(doc(db, "clubUsers", account), {
          level: 10
        })
      }
      if (userData.rps.totalGames > 109 && userData.rps.totalGames < 140 && userData.level !== 11) {
        addToast('You go up to level 11!', { appearance: 'info' });
        updateDoc(doc(db, "clubUsers", account), {
          level: 11
        })
      }
      if (userData.rps.totalGames > 139 && userData.rps.totalGames < 170 && userData.level !== 12) {
        addToast('You go up to level 12!', { appearance: 'info' });
        updateDoc(doc(db, "clubUsers", account), {
          level: 12
        })
      }
      if (userData.rps.totalGames > 169 && userData.rps.totalGames < 200 && userData.level !== 13) {
        addToast('You go up to level 13!', { appearance: 'info' });
        updateDoc(doc(db, "clubUsers", account), {
          level: 13
        })
      }
      if (userData.rps.totalGames > 199 && userData.level !== 14) {
        addToast('You go up to level 14!', { appearance: 'info' });
        updateDoc(doc(db, "clubUsers", account), {
          level: 14
        })
      }
    } else {
      if (user && account !== '0x000000000000000000000000000000000000dEaD') {
        if (user.displayName) {
          setDoc(doc(db, "clubUsers", account), {
            uid: user.uid,
            register: serverTimestamp(),
            name: user.displayName,
            photo: 'https://gateway.ipfs.io/ipfs/QmP7jTCiimXHJixUNAVBkb7z7mCZQK3vwfFiULf5CgzUDh',
            account: account,
            games: ['RPS'],
            level: 1,
            rps: {
              rock: 0,
              paper: 0,
              scissors: 0,
              dayWinStreak: 0,
              winStreakTime: 0,
              gameWon: 0,
              gameLoss: 0,
              amountWon: 0,
              amountLoss: 0,
              totalGames: 0,
              totalMaticAmount: 0,
              lastGameTime: 0,
              lastGameBlock: 0,
            },
          })
        } else {
          setDoc(doc(db, "clubUsers", account), {
            uid: user.uid,
            register: serverTimestamp(),
            name: 'Username',
            photo: 'https://gateway.ipfs.io/ipfs/QmP7jTCiimXHJixUNAVBkb7z7mCZQK3vwfFiULf5CgzUDh',
            account: account,
            games: ['RPS'],
            level: 1,
            rps: {
              rock: 0,
              paper: 0,
              scissors: 0,
              dayWinStreak: 0,
              winStreakTime: 0,
              gameWon: 0,
              gameLoss: 0,
              amountWon: 0,
              amountLoss: 0,
              totalGames: 0,
              totalMaticAmount: 0,
              lastGameTime: 0,
              lastGameBlock: 0,
            },
          })
        }
        loadUserGame(account, user)
      }
    }
  }

  const connectWeb3Modal = async () => {
    const providerOptions = {
      walletconnect: {
        display: {
          description: " ",
        },
        package: WalletConnectProvider,
        options: {
          rpc: {
            80001: "https://polygon-mumbai.infura.io/v3/270caadf97b048ec8823dff39e612c46",
          },
        }
      },
      torus: {
        display: {
          description: " ",
        },
        package: Torus,
        options: {
          networkParams: {
            host: "https://polygon-mumbai.infura.io/v3/270caadf97b048ec8823dff39e612c46",
            chainId: 80001,
            networkId: 80001,
            blockExplorer: "https://mumbai.polygonscan.com/",
            ticker: "MATIC",
            tickerName: "MATIC",
          },
        }
      },
      portis: {
        display: {
          description: " ",
        },
        package: Portis,
        options: {
          id: "fc6fd5a9-493b-4806-858d-ff67918ea1dc",
          network: "maticMumbai",
        },
      },
      walletlink: {
        display: {
          description: " ",
        },
        package: WalletLink,
        options: {
          appName: "RPS",
          rpc: "https://polygon-mumbai.infura.io/v3/270caadf97b048ec8823dff39e612c46",
          chainId: 80001,
          appLogoUrl: null,
          darkMode: false
        },
      },
      frame: {
        display: {
          description: " ",
        },
        package: ethProvider
      },
    };
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions,
      //theme: theme
    });
    setWeb3ModalInfo(web3Modal)
    try {
      const provider = await web3Modal.connect();
      if (provider._portis) {
        provider._portis.showPortis();
      }
      const web3 = new Web3(provider);
      setWeb3(web3)
      const rpsgame = new web3.eth.Contract(RpsGame.abi, rpsGameContract)
      setRpsgame(rpsgame)
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0].toLowerCase())
      ethereum.on('accountsChanged', () => {
        window.location.reload()
      });
      const balance = await web3.eth.getBalance(accounts[0]);
      setWalletBalance(balance)
      const chainId = await web3.eth.getChainId();
      setNetwork(chainId)
      ethereum.on('chainChanged', () => {
        window.location.reload()
      });
      if (chainId !== 80001) {
        try {
          await ethereum.sendAsync({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: "0x13881",
              chainName: "Mumbai Testnet",
              rpcUrls: ["https://rpc-mumbai.matic.today"],
              iconUrls: [""],
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
              },
              blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
            }],
          });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (e) {
    }
  }

  const disconnectWallet = async () => {
    web3ModalInfo.clearCachedProvider();
    setActive(false)
    setAccount('0x000000000000000000000000000000000000dEaD')
  }

  const openGame = () => {
    if (document.getElementById('age').checked === false) {
      addToast('Confirm that your are at least 18 years old', { appearance: 'warning' });
      return false
    }
    if (!userData.uid) {
      addToast('Your are a new player, please sign in or sign up', { appearance: 'warning' });
      return false
    }
    if (network !== 80001) {
      addToast('Network not supported, please connect to Mumbai network', { appearance: 'error' });
      return false
    }
    setActive(true)
  }

  const handleInputChange = (event) => {
    setUsergame({
      ...usergame,
      [event.target.name]: event.target.value
    })
  }

  const doubleOrNothing = async () => {
    setDoubleOrNothingStatus(true)
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    if (document.getElementById('rock').checked || document.getElementById('paper').checked || document.getElementById('scissors').checked) {
      setUserhand(usergame.hand)
    } else {
      addToast('Select your betting hand', { appearance: 'warning' });
      setDoubleOrNothingStatus(false)
      return false
    }
    if (document.getElementById('amount1').checked || document.getElementById('amount2').checked || document.getElementById('amount3').checked || document.getElementById('amount4').checked || document.getElementById('amount5').checked || document.getElementById('amount6').checked) {
      setUseramount(usergame.amount)
    } else {
      addToast('Select your betting amount', { appearance: 'warning' });
      setDoubleOrNothingStatus(false)
      return false
    }
    setPlaying(true)
    setAnimation(true)
    let myEvents = null
    const query0 = doc(db, "clubUsers", account)
    const userDocument0 = await getDoc(query0)
    const userDocument = userDocument0.data()
    const actuallBlock = await web3.eth.getBlockNumber()
    const dayBlock = actuallBlock - 43200
    if (userDocument.rps.lastGameBlock < actuallBlock) {
      const inputAmount = web3.utils.toWei(usergame.amount.toString(), "ether")
      let calculateValue = await rpsgame.methods.calculateValue(inputAmount).call()
      rpsgame.methods
        .play(inputAmount)
        .send({
          from: account,
          value: calculateValue,
          gasLimit: 400000
        })
        .catch((err) => {
          if (err.code === 4001) {
            setPlaying(false)
            myEvents[0] = false

          } else {
            console.error(err);
            setPlaying(false)
            myEvents[0] = false
          }
        });
      do {
        myEvents = await rpsgame.getPastEvents('Play', { filter: { _to: account }, fromBlock: actuallBlock, toBlock: 'latest' })
        await sleep(1000)
      } while (myEvents[0] === undefined);
      if (myEvents[0]) {
        if (myEvents[0].blockNumber > userDocument.rps.lastGameBlock) {
          const userAmount = web3.utils.fromWei(myEvents[0].returnValues[1], 'ether')
          updateDoc(doc(db, "clubUsers", account), {
            "rps.totalGames": userDocument.rps.totalGames + 1,
            "rps.totalMaticAmount": userDocument.rps.totalMaticAmount + parseInt(userAmount),
            "rps.lastGameTime": serverTimestamp(),
            "rps.lastGameBlock": myEvents[0].blockNumber
          })
          addDoc(collection(db, "allGames"), {
            createdAt: serverTimestamp(),
            uid: userDocument.uid,
            block: myEvents[0].blockNumber,
            name: userDocument.name,
            photo: userDocument.photo,
            account: myEvents[0].returnValues[0],
            maticAmount: parseInt(userAmount),
            streak: myEvents[0].returnValues[2],
            result: myEvents[0].returnValues[3],
            game: 'RPS'
          })
          if (myEvents[0].returnValues[3] === true) {
            updateDoc(doc(db, "clubUsers", account), {
              "rps.gameWon": userDocument.rps.gameWon + 1,
              "rps.amountWon": userDocument.rps.amountWon + parseInt(userAmount),
            })
          }
          if (myEvents[0].returnValues[3] === false) {
            updateDoc(doc(db, "clubUsers", account), {
              "rps.gameLoss": userDocument.rps.gameLoss + 1,
              "rps.amountLoss": userDocument.rps.amountLoss + parseInt(userAmount)
            })
          }
          if (myEvents[0].returnValues[2] > userDocument.rps.dayWinStreak || dayBlock > userDocument.rps.winStreakTime) {
            updateDoc(doc(db, "clubUsers", account), {
              "rps.dayWinStreak": myEvents[0].returnValues[2],
              "rps.winStreakTime": serverTimestamp()
            })
          }
          if (usergame.hand === 'ROCK') {
            updateDoc(doc(db, "clubUsers", account), {
              "rps.rock": userDocument.rps.rock + 1,
            })
          }
          if (usergame.hand === 'PAPER') {
            updateDoc(doc(db, "clubUsers", account), {
              "rps.paper": userDocument.rps.paper + 1,
            })
          }
          if (usergame.hand === 'SCISSORS') {
            updateDoc(doc(db, "clubUsers", account), {
              "rps.scissors": userDocument.rps.scissors + 1,
            })
          }
          setUserGameResult(myEvents[0].returnValues[3])
          setUserGameStreak(myEvents[0].returnValues[2])
          setShowGameResult(true)
          setDoubleOrNothingStatus(false)
        }
      }
    } else {
      addToast('Wait some seconds to play again', { appearance: 'warning' });
      setDoubleOrNothingStatus(false)
      setPlaying(false)
      setAnimation(false)
    }
  }

  const showResult = async () => {
    if (userGameResult) {
      addToast('You doubled your money, congrats!', { appearance: 'info' });
    }
    loadUserGame(account, user)
    setAnimation(false)
    setShowGameResult(false)
    setGameResult(true)
    const balance = await web3.eth.getBalance(account)
    setWalletBalance(balance)
  }

  const backGame = () => {
    setPlaying(false)
    setUserGameStreak(0)
    setUserGameResult(undefined)
    setGameResult(undefined)
  }

  return (
    <>
      {isMobileResolution
        ?
        <div className="d-flex flex-row justify-content-around gap-1">
          {account !== '0x000000000000000000000000000000000000dEaD' ?
            <>
              <HistoryGames
                isMobileVersion={true}
                historyPlays={historyPlays}
                unixTimeStamp={unixTimeStamp}
              />
              <WinStreakLeaderboard
                isMobileVersion={true}
                unixTimeStamp={unixTimeStamp}
              />
              <NavLink className="btn btn-danger" to="/leaderboard">LEADERBOARD</NavLink>
              <ConnectWallet
                decimal={decimal}
                web3={web3}
                account={account}
                walletBalance={walletBalance}
                disconnectWallet={disconnectWallet}
                userData={userData}
                register={register}
                user={user}
              />
            </>
            :
            ""
          }
        </div>
        :
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div className="d-flex flex-row gap-3 mt-3">
            {account !== '0x000000000000000000000000000000000000dEaD' ?
              <>
                <HistoryGames
                  isMobileVersion={false}
                  historyPlays={historyPlays}
                  unixTimeStamp={unixTimeStamp}
                />
                <WinStreakLeaderboard
                  isMobileVersion={false}
                  unixTimeStamp={unixTimeStamp}
                />
                <NavLink className="btn btn-danger" to="/leaderboard">LEADERBOARD <i className="d-none d-sm-inline-flex fas fa-external-link-alt fa-xs"></i></NavLink>
                <ConnectWallet
                  decimal={decimal}
                  web3={web3}
                  account={account}
                  walletBalance={walletBalance}
                  disconnectWallet={disconnectWallet}
                  userData={userData}
                  register={register}
                  user={user}
                />
              </>
              :
              ""
            }
          </div>
        </div>
      }
      <article>
        {active === true ?
          <>
            <h5 className="my-4 text-end me-3 me-lg-0">MATIC {(walletBalance / decimal).toFixed(4)}</h5>
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
                  {gameResult === true
                    ?
                    <>
                      {userGameStreak > 1 ?
                        <>
                          <h3>Congrats!</h3>
                          <br></br>
                          <h3>{"You're on a " + userGameStreak + " win streak"}</h3>
                          <br></br>
                        </>
                        :
                        ""
                      }
                      {userhand === 'ROCK' && userGameResult === true ? <img width="240" height="240" src={Scissors} alt="" /> : ""}
                      {userhand === 'PAPER' && userGameResult === true ? <img width="240" height="240" src={Rock} alt="" /> : ""}
                      {userhand === 'SCISSORS' && userGameResult === true ? <img width="240" height="240" src={Paper} alt="" /> : ""}
                      {userhand === 'ROCK' && userGameResult === false ? <img width="240" height="240" src={Paper} alt="" /> : ""}
                      {userhand === 'PAPER' && userGameResult === false ? <img width="240" height="240" src={Scissors} alt="" /> : ""}
                      {userhand === 'SCISSORS' && userGameResult === false ? <img width="240" height="240" src={Rock} alt="" /> : ""}
                      <br></br>
                      <br></br>
                      <h3>{userGameResult === true ? " YOU WON " : ""}{userGameResult === false ? " YOU LOST " : ""}</h3>
                      <h3 style={{ color: userGameResult ? "mediumseagreen" : "crimson" }}>{userGameResult === true ? useramount : ""}{userGameResult === false ? useramount : ""}{" MATIC"}</h3>
                      <br></br>
                      <h3>
                        {userGameResult === true ?
                          <button className="btn-hover btn-green" onClick={backGame}>CLAIM REWARD</button>
                          :
                          <>
                            <p>Try again?</p>
                            <button className="btn-hover btn-start" onClick={backGame}>DOUBLE OR NOTHING</button>
                          </>
                        }
                      </h3>
                    </>
                    :
                    ""
                  }
                </div>
                :
                <div>
                  <div className="d-flex justify-content-center">
                    <label>
                      <input type="radio" name="hand" id="rock" onChange={handleInputChange} value="ROCK"></input>
                      <div className="rps-img rock-img"></div>
                    </label>
                    <label>
                      <input type="radio" name="hand" id="paper" onChange={handleInputChange} value="PAPER"></input>
                      <div className="rps-img paper-img"></div>
                    </label>
                    <label>
                      <input type="radio" name="hand" id="scissors" onChange={handleInputChange} value="SCISSORS"></input>
                      <div className="rps-img scissors-img"></div>
                    </label>
                  </div>
                  <h5 className="mt-5">FOR</h5>
                  <div className="d-flex justify-content-center my-4">
                    <label className="amount">
                      <input type="radio" name="amount" id="amount1" onChange={handleInputChange} value="1" />
                      <span>2 MATIC</span>
                    </label>
                    <label className="amount">
                      <input type="radio" name="amount" id="amount2" onChange={handleInputChange} value="4" />
                      <span>4 MATIC</span>
                    </label>
                    <label className="amount">
                      <input type="radio" name="amount" id="amount3" onChange={handleInputChange} value="10" />
                      <span>10 MATIC</span>
                    </label>
                  </div>
                  <div className="d-flex justify-content-center mb-4">
                    <label className="amount">
                      <input type="radio" name="amount" id="amount4" onChange={handleInputChange} value="20" />
                      <span>20 MATIC</span>
                    </label>
                    <label className="amount">
                      <input type="radio" name="amount" id="amount5" onChange={handleInputChange} value="50" />
                      <span>50 MATIC</span>
                    </label>
                    <label className="amount">
                      <input type="radio" name="amount" id="amount6" onChange={handleInputChange} value="100" />
                      <span>100 MATIC</span>
                    </label>
                  </div>
                  <button onClick={doubleOrNothing} className="btn-hover btn-green" disabled={doubleOrNothingStatus}>DOUBLE OR NOTHING</button>
                </div>
              }
            </div>
          </>
          :
          <div>
            <br></br>
            <br></br>
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
            {account !== '0x000000000000000000000000000000000000dEaD' ?
              <>
                <ConnectChain network={network} />
                <br></br>
                <p>
                  <input id="age" type="checkbox"></input>&nbsp;
                  <label htmlFor="age">I confirm that I am at least 18 years old</label>
                </p>
                <button className="btn-hover btn-start" onClick={openGame}>DOUBLE OR NOTHING</button>
                <p>CLICK TO SEE OPTIONS</p>
                <HistoryGamesModal
                  historyPlays={historyPlays}
                  unixTimeStamp={unixTimeStamp}
                />
              </>
              :
              <>
                <ConnectWallet connectWeb3Modal={connectWeb3Modal} decimal={decimal} web3={web3} account={account} />
              </>
            }
          </div>
        }
      </article >
    </>
  );
}