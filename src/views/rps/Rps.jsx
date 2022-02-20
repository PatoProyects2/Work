import React, { useState, useEffect } from 'react'
import { NavLink, useOutletContext } from 'react-router-dom'
import Web3 from 'web3'
import Web3Modal from "web3modal";
import { useAuthState } from 'react-firebase-hooks/auth'
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Modal, ModalBody, FormGroup } from 'reactstrap'
import Torus from "@toruslabs/torus-embed";
import Portis from "@portis/web3";
import ethProvider from "eth-provider";
import WalletLink from "walletlink";
import { doc, getDoc, setDoc, updateDoc, collection, getDocs, where, query, orderBy, limit } from "firebase/firestore";
import RpsGame from '../../abis/RpsGame/rpsGame.json'
import { rpsGameContract } from '../../components/blockchain/Contracts'
import HistoryGamesModal from './components/HistoryGamesModal'
import HistoryGames from './components/HistoryGames'
import ConnectWallet from './components/ConnectWallet'
import ConnectChain from './components/ConnectChain'
import WinStreakLeaderboard from './components/WinStreakLeaderboard'
import SignIn, { SignOut } from '../../components/layout/Authentication';
import { auth, db } from '../../firebase/firesbaseConfig'
import { useMatchMedia } from '../../hooks/useMatchMedia'
export default function Rps() {
  const [user] = useAuthState(auth)
  const [theme, setTheme] = useOutletContext();
  const [web3, setWeb3] = useState({});
  const [rpsgame, setRpsgame] = useState({});
  const [usergame, setUsergame] = useState({
    hand: '',
    amount: 0
  });
  const [eventsmodal, setEventsmodal] = useState({});
  const [web3ModalInfo, setWeb3ModalInfo] = useState({});
  const [userdata0, setUserdata0] = useState({ name0: '' });
  const [userdata1, setUserdata1] = useState({ name0: '' });
  const [userdata2, setUserdata2] = useState({ name0: '' });
  const [userdata3, setUserdata3] = useState({ name0: '' });
  const [userdata4, setUserdata4] = useState({ name0: '' });
  const [userdata5, setUserdata5] = useState({ name0: '' });
  const [userdata6, setUserdata6] = useState({ name0: '' });
  const [userdata7, setUserdata7] = useState({ name0: '' });
  const [userdata8, setUserdata8] = useState({ name0: '' });
  const [userdata9, setUserdata9] = useState({ name0: '' });
  const [userdata10, setUserdata10] = useState({ name0: '' });
  const [userdata11, setUserdata11] = useState({ name0: '' });
  const [register, setRegister] = useState('');
  const [userpic, setUserpic] = useState('');
  const [username, setUsername] = useState('');
  const [userLevel, setUserLevel] = useState(0);
  const [account, setAccount] = useState('0x000000000000000000000000000000000000dEaD');
  const [log, setLog] = useState('');
  const [log0, setLog0] = useState('');
  const [walletLog, setWalletLog] = useState('CONNECT WALLET');
  const [walletBalance, setWalletBalance] = useState(0);
  const [network, setNetwork] = useState(0);
  const [decimal, setDecimal] = useState(1000000000000000000);
  const [userGameStreak, setUserGameStreak] = useState(0);
  const [userhand, setUserhand] = useState(0);
  const [useramount, setUseramount] = useState(0);
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [userGameResult, setUserGameResult] = useState(undefined);
  const [gameResult, setGameResult] = useState(undefined);
  const [showGameResult, setShowGameResult] = useState(false);
  const [login, setLogin] = useState(false);
  const [signIn, setSignIn] = useState(undefined);
  const isMobileResolution = useMatchMedia('(max-width:650px)', false);

  const [blockchain, setBlockchain] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => { loadHistoryUserPlays(web3, rpsgame, account, user) }, 3000);
    return () => clearInterval(timer);
  }, [web3, rpsgame, account, user])

  const loadHistoryUserPlays = async (web3, rpsgame, account, user) => {
    const query0 = doc(db, "rpsUsers", account)
    const userDocument0 = await getDoc(query0)
    const userData = userDocument0.data()
    if (userData) {
      setUsername(userData.name0)
      setRegister(userData.register)
      setUserpic(userData.pic0)
      setLogin(userData.uid)
      if (user && userData.uid === '') {
        updateDoc(doc(db, "rpsUsers", account), {
          uid: user.uid,
        })
      }
    } else {
      const globalDate = new Date();
      const year = globalDate.getUTCFullYear()
      const month = globalDate.getUTCMonth() + 1
      const day = globalDate.getUTCDate()
      if (user) {
        setDoc(doc(db, "rpsUsers", account), {
          uid: user.uid,
          game: 'RPS',
          account: account,
          name0: '',
          pic0: 'https://gateway.ipfs.io/ipfs/QmP7jTCiimXHJixUNAVBkb7z7mCZQK3vwfFiULf5CgzUDh',
          register: day.toString() + "/" + month.toString() + "/" + year.toString(),
          winStreak: 0,
          winStreakBlock: 0,
          gameWon: 0,
          gameLoss: 0,
          amountWon: 0,
          amountLoss: 0,
        })
      } else {
        setDoc(doc(db, "rpsUsers", account), {
          uid: '',
          game: 'RPS',
          account: account,
          name0: '',
          pic0: 'https://gateway.ipfs.io/ipfs/QmP7jTCiimXHJixUNAVBkb7z7mCZQK3vwfFiULf5CgzUDh',
          register: day.toString() + "/" + month.toString() + "/" + year.toString(),
          winStreak: 0,
          winStreakBlock: 0,
          gameWon: 0,
          gameLoss: 0,
          amountWon: 0,
          amountLoss: 0,
          rock: 0,
          paper: 0,
          scissors: 0,
        })
      }
    }
    try {
      const collectionRps = collection(db, "rpsUsers")
      const queryRps = query(collectionRps, where("uid", "==", userData.uid), limit(3))
      const documentsRps = await getDocs(queryRps)
      const queryData = documentsRps._snapshot.docChanges
      let totalGames0 = 0
      let totalGames1 = 0
      let totalGames2 = 0
      try {
        const data0 = queryData[0].doc.data.value.mapValue.fields
        if (data0 !== undefined) {
          totalGames0 = parseInt(data0.gameWon.integerValue) + parseInt(data0.gameLoss.integerValue)
        }
      } catch (e) {

      }
      try {
        const data1 = queryData[1].doc.data.value.mapValue.fields
        if (data1 !== undefined) {
          totalGames1 = (parseInt(data1.gameWon.integerValue) + parseInt(data1.gameLoss.integerValue))
        }
      } catch (e) {

      }
      try {
        const data2 = queryData[2].doc.data.value.mapValue.fields
        if (data2 !== undefined) {
          totalGames2 = (parseInt(data2.gameWon.integerValue) + parseInt(data2.gameLoss.integerValue))
        }
      } catch (e) {

      }
      let globalGames = totalGames0 + totalGames1 + totalGames2
      const queryClub = doc(db, "clubUsers", userData.uid)
      const userDocumentClub = await getDoc(queryClub)
      const userDataClub = userDocumentClub.data()
      if (userDataClub) {
        setUserLevel(userDataClub.rpsLevel)
        if (globalGames > 5 && globalGames < 10) {
          updateDoc(doc(db, "clubUsers", userData.uid), {
            rpsLevel: 2
          })
        }
        if (globalGames > 9 && globalGames < 20) {
          updateDoc(doc(db, "clubUsers", userData.uid), {
            rpsLevel: 3
          })
        }
        if (globalGames > 19 && globalGames < 30) {
          updateDoc(doc(db, "clubUsers", userData.uid), {
            rpsLevel: 4
          })
        }
        if (globalGames > 29 && globalGames < 40) {
          updateDoc(doc(db, "clubUsers", userData.uid), {
            rpsLevel: 5
          })
        }
        if (globalGames > 39 && globalGames < 50) {
          updateDoc(doc(db, "clubUsers", userData.uid), {
            rpsLevel: 6
          })
        }
        if (globalGames > 49 && globalGames < 60) {
          updateDoc(doc(db, "clubUsers", userData.uid), {
            rpsLevel: 7
          })
        }
        if (globalGames > 59 && globalGames < 70) {
          updateDoc(doc(db, "clubUsers", userData.uid), {
            rpsLevel: 8
          })
        }
        if (globalGames > 69) {
          updateDoc(doc(db, "clubUsers", userData.uid), {
            rpsLevel: 9
          })
        }
      } else {
        setDoc(doc(db, "clubUsers", userData.uid), {
          rpsLevel: 1
        })
      }
    } catch (e) {

    }
    try {
      const actuallBlock = await web3.eth.getBlockNumber()
      setBlockchain(actuallBlock)
      const lastMinuteBlock = actuallBlock - 25
      const eventsmodal = await rpsgame.getPastEvents('Play', { fromBlock: lastMinuteBlock, toBlock: 'latest' })
      setEventsmodal(eventsmodal)
      const userData0 = await getDoc(doc(db, "rpsUsers", eventsmodal[0].returnValues[0].toLowerCase()))
      setUserdata0(userData0.data())
      const userData1 = await getDoc(doc(db, "rpsUsers", eventsmodal[1].returnValues[0].toLowerCase()))
      setUserdata1(userData1.data())
      const userData2 = await getDoc(doc(db, "rpsUsers", eventsmodal[2].returnValues[0].toLowerCase()))
      setUserdata2(userData2.data())
      const userData3 = await getDoc(doc(db, "rpsUsers", eventsmodal[3].returnValues[0].toLowerCase()))
      setUserdata3(userData3.data())
      const userData4 = await getDoc(doc(db, "rpsUsers", eventsmodal[4].returnValues[0].toLowerCase()))
      setUserdata4(userData4.data())
      const userData5 = await getDoc(doc(db, "rpsUsers", eventsmodal[5].returnValues[0].toLowerCase()))
      setUserdata5(userData5.data())
      const userData6 = await getDoc(doc(db, "rpsUsers", eventsmodal[6].returnValues[0].toLowerCase()))
      setUserdata6(userData6.data())
      const userData7 = await getDoc(doc(db, "rpsUsers", eventsmodal[7].returnValues[0].toLowerCase()))
      setUserdata7(userData7.data())
      const userData8 = await getDoc(doc(db, "rpsUsers", eventsmodal[8].returnValues[0].toLowerCase()))
      setUserdata8(userData8.data())
      const userData9 = await getDoc(doc(db, "rpsUsers", eventsmodal[9].returnValues[0].toLowerCase()))
      setUserdata9(userData9.data())
      const userData10 = await getDoc(doc(db, "rpsUsers", eventsmodal[10].returnValues[0].toLowerCase()))
      setUserdata10(userData10.data())
      const userData11 = await getDoc(doc(db, "rpsUsers", eventsmodal[11].returnValues[0].toLowerCase()))
      setUserdata11(userData11.data())
    } catch (e) {

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
      theme: theme
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
      ethereum.on('chainChanged', () => {
        window.location.reload()
      });
      const chainId = await web3.eth.getChainId();
      setNetwork(chainId)
      if (chainId !== '0x13881') {
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
      const balance = await web3.eth.getBalance(accounts[0]);
      setWalletBalance(balance)
    } catch (e) {
    }
  }

  const disconnectWallet = async () => {
    web3ModalInfo.clearCachedProvider();
    setActive(false)
    setAccount('0x000000000000000000000000000000000000dEaD')
  }

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const openGame = () => {
    if (document.getElementById('age').checked === false) {
      setLog0('CONFIRM THAT YOU ARE AT LEAST 18 YEARS OLD')
      return false
    } else {
      setActive(true)
      setLog0('')
    }
    if (!login) {
      setSignIn(true)
      return false
    }
  }

  const handleInputChange = (event) => {
    setUsergame({
      ...usergame,
      [event.target.name]: event.target.value
    })
  }

  const doubleOrNothing = async () => {
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    let freeze = 5
    for (freeze; freeze > 0; freeze--) {
      setLog0('FREEZING TIME: ' + freeze.toString())
      await sleep(1000)
    }
    if (freeze === 0) {
      if (document.getElementById('rock').checked || document.getElementById('paper').checked || document.getElementById('scissors').checked) {
        setUserhand(usergame.hand)
        setLog0('')
      } else {
        setLog0('SELECT THE BETTING HAND')
        return false
      }
      if (document.getElementById('amount1').checked || document.getElementById('amount2').checked || document.getElementById('amount3').checked || document.getElementById('amount4').checked || document.getElementById('amount5').checked || document.getElementById('amount6').checked) {
        setUseramount(usergame.amount)
        setLog0('')
      } else {
        setLog0('SELECT THE BETTING AMOUNT')
        return false
      }
      let myEvents = null
      setPlaying(true)
      setAnimation(true)
      let calculateValue = await rpsgame.methods.calculateValue((web3.utils.toWei((usergame.amount).toString(), "ether"))).call()
      rpsgame.methods
        .play(web3.utils.toWei((usergame.amount).toString(), "ether"))
        .send({
          from: account,
          value: calculateValue,
          gasLimit: 400000
        })
        .catch((err) => {
          if (err.code === 4001) {
            setPlaying(false)
            myEvents[0] = true
          } else {
            console.error(err);
          }
        });
      const actuallBlock = await web3.eth.getBlockNumber()
      let userGameBlock = actuallBlock
      do {
        myEvents = await rpsgame.getPastEvents('Play', { filter: { _to: account }, fromBlock: userGameBlock, toBlock: 'latest' })
        await sleep(1000)
      } while (myEvents[0] === undefined);
      if (myEvents[0]) {
        try {
          setUserGameResult(myEvents[0].returnValues[3])
          setUserGameStreak(myEvents[0].returnValues[2])
          const dayBlock = actuallBlock - 43200
          const query = doc(db, "rpsUsers", account)
          const document = await getDoc(query)
          const userData = document.data()
          const userAmount = web3.utils.fromWei(myEvents[0].returnValues[1], 'ether')
          if (myEvents[0].returnValues[3] === true) {
            updateDoc(doc(db, "rpsUsers", account), {
              gameWon: userData.gameWon + 1,
              amountWon: userData.amountWon + parseInt(userAmount)
            })
          }
          if (myEvents[0].returnValues[3] === false) {
            updateDoc(doc(db, "rpsUsers", account), {
              gameLoss: userData.gameLoss + 1,
              amountLoss: userData.amountLoss + parseInt(userAmount)
            })
          }
          if (myEvents[0].returnValues[2] > userData.winStreak || dayBlock > userData.winStreakBlock) {
            updateDoc(doc(db, "rpsUsers", account), {
              winStreak: parseInt(myEvents[0].returnValues[2]),
              winStreakBlock: myEvents[0].blockNumber
            })
          }
          if (usergame.hand === 'ROCK') {
            updateDoc(doc(db, "rpsUsers", account), {
              rock: userData.rock + 1,
            })
          }
          if (usergame.hand === 'PAPER') {
            updateDoc(doc(db, "rpsUsers", account), {
              paper: userData.paper + 1,
            })
          }
          if (usergame.hand === 'SCISSORS') {
            updateDoc(doc(db, "rpsUsers", account), {
              scissors: userData.scissors + 1,
            })
          }
          setShowGameResult(true)
        } catch (e) {

        }
      }
    }

  }

  const showResult = async () => {
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
                theme={theme}
                isMobileVersion={true}
                web3={web3}
                rpsgame={rpsgame}
                decimal={decimal}
                eventsmodal={eventsmodal}
                blockchain={blockchain}
                userdata0={userdata0}
                userdata1={userdata1}
                userdata2={userdata2}
                userdata3={userdata3}
                userdata4={userdata4}
                userdata5={userdata5}
                userdata6={userdata6}
                userdata7={userdata7}
                userdata8={userdata8}
                userdata9={userdata9}
                userdata10={userdata10}
                userdata11={userdata11}
              />
              <WinStreakLeaderboard
                theme={theme}
                isMobileVersion={true}
                web3={web3}
              />
              <NavLink className="btn btn-danger" to="/leaderboard">LEADERBOARD</NavLink>
              <ConnectWallet decimal={decimal} web3={web3} account={account} theme={theme} walletBalance={walletBalance} username={username} userpic={userpic} register={register} userLevel={userLevel} disconnectWallet={disconnectWallet} />
            </>
            :
            ""
          }
        </div>
        :
        <div className="d-flex flex-row justify-content-between align-items-center">
          <button
            type="button"
            className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'}`}
            title={theme === 'light' ? 'Dark Theme' : 'Light Theme'}
            onClick={handleThemeChange}>
            {theme === "light" ? "DARK " : "LIGHT "}<i className={`${theme === "light" ? "fa-solid fa-moon" : "fa-solid fa-sun"}`}></i>
          </button>
          <div className="d-flex flex-row gap-3">
            {account !== '0x000000000000000000000000000000000000dEaD' ?
              <>
                <HistoryGames
                  theme={theme}
                  isMobileVersion={false}
                  web3={web3}
                  rpsgame={rpsgame}
                  decimal={decimal}
                  eventsmodal={eventsmodal}
                  blockchain={blockchain}
                  userdata0={userdata0}
                  userdata1={userdata1}
                  userdata2={userdata2}
                  userdata3={userdata3}
                  userdata4={userdata4}
                  userdata5={userdata5}
                  userdata6={userdata6}
                  userdata7={userdata7}
                  userdata8={userdata8}
                  userdata9={userdata9}
                  userdata10={userdata10}
                  userdata11={userdata11}
                />
                <WinStreakLeaderboard
                  theme={theme}
                  isMobileVersion={false}
                  web3={web3}
                />
                <NavLink className="btn btn-danger" to="/leaderboard">LEADERBOARD <i className="d-none d-sm-inline-flex fas fa-external-link-alt fa-xs"></i></NavLink>
                <ConnectWallet decimal={decimal} web3={web3} account={account} theme={theme} walletBalance={walletBalance} username={username} userpic={userpic} register={register} userLevel={userLevel} s disconnectWallet={disconnectWallet} />
              </>
              :
              ""
            }
          </div>
        </div>
      }
      <article>
        {log && (<span className="alert alert-danger mx-5">{log}</span>)}
        {active === true && log === '' && login !== '' ?
          <>
            {log0 && (<span className="alert alert-danger mx-5">{log0}</span>)}
            <h5 className="my-4 text-end me-3 me-lg-0">MATIC {(walletBalance / decimal).toFixed(4)}</h5>
            <div className="game-container">
              {playing === true ?
                <div className="mt-3">
                  {animation === true ?
                    <>
                      <img src="https://gateway.ipfs.io/ipfs/QmdBg6qrUPFNjW31deKT678RXZ2fs6fM5zncHFAWAZwFBd" width="240" height="240" alt="Rock-Paper-Scissors" />
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
                      {userhand === 'ROCK' && userGameResult === true ? <img width="240" height="240" src="https://gateway.ipfs.io/ipfs/QmfPWAiw4m5RmnZbhUUcizNDASA1kzYHuUWoZB7Y6MZdqd" alt="" /> : ""}
                      {userhand === 'PAPER' && userGameResult === true ? <img width="240" height="240" src="https://gateway.ipfs.io/ipfs/QmRssacnda9ZsbgtrUQSLTjdzFgiiCPgZ9o2hbZ5SRvT4m" alt="" /> : ""}
                      {userhand === 'SCISSORS' && userGameResult === true ? <img width="240" height="240" src="https://gateway.ipfs.io/ipfs/QmQDQBaCe7NcUDm2tjVsqbiKAHVkWApL7pje8wpnViQ6GR" alt="" /> : ""}
                      {userhand === 'ROCK' && userGameResult === false ? <img width="240" height="240" src="https://gateway.ipfs.io/ipfs/QmQDQBaCe7NcUDm2tjVsqbiKAHVkWApL7pje8wpnViQ6GR" alt="" /> : ""}
                      {userhand === 'PAPER' && userGameResult === false ? <img width="240" height="240" src="https://gateway.ipfs.io/ipfs/QmfPWAiw4m5RmnZbhUUcizNDASA1kzYHuUWoZB7Y6MZdqd" alt="" /> : ""}
                      {userhand === 'SCISSORS' && userGameResult === false ? <img width="240" height="240" src="https://gateway.ipfs.io/ipfs/QmRssacnda9ZsbgtrUQSLTjdzFgiiCPgZ9o2hbZ5SRvT4m" alt="" /> : ""}
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
                  <button onClick={doubleOrNothing} className="btn-hover btn-green">DOUBLE OR NOTHING</button>
                </div>
              }
            </div>
          </>
          :
          <div>
            <br></br>
            <br></br>
            {log0 && (<span className="alert alert-danger mx-5">{log0}</span>)}
            <div className="row g-0 my-5 justify-content-center">
              <div className="col-3 col-md-2">
                <img className="my-3 img-fluid" src="https://gateway.ipfs.io/ipfs/QmRssacnda9ZsbgtrUQSLTjdzFgiiCPgZ9o2hbZ5SRvT4m" alt="Rock" />
              </div>
              <div className="col-3 col-md-2">
                <img className="my-3 img-fluid" src="https://gateway.ipfs.io/ipfs/QmQDQBaCe7NcUDm2tjVsqbiKAHVkWApL7pje8wpnViQ6GR" alt="Paper" />
              </div>
              <div className="col-3 col-md-2">
                <img className="my-3 img-fluid" src="https://gateway.ipfs.io/ipfs/QmfPWAiw4m5RmnZbhUUcizNDASA1kzYHuUWoZB7Y6MZdqd" alt="Scissors" />
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
                  theme={theme}
                  decimal={decimal}
                  rpsgame={rpsgame}
                  web3={web3}
                  eventsmodal={eventsmodal}
                  blockchain={blockchain}
                  userdata0={userdata0}
                  userdata1={userdata1}
                  userdata2={userdata2}
                  userdata3={userdata3}
                  userdata4={userdata4}
                  userdata5={userdata5}
                  userdata6={userdata6}
                  userdata7={userdata7}
                  userdata8={userdata8}
                  userdata9={userdata9}
                  userdata10={userdata10}
                  userdata11={userdata11}
                />
                {!user ?
                  <Modal isOpen={signIn} contentClassName={theme === 'dark' ? 'dark dark-border' : ''} size="sm">
                    <ModalBody>
                      <h4 className="text-center">SIGN IN</h4>
                      <FormGroup>
                        <SignIn />
                      </FormGroup>
                    </ModalBody>
                  </Modal>
                  :
                  <SignOut />
                }

              </>
              :
              <>
                <ConnectWallet connectWeb3Modal={connectWeb3Modal} decimal={decimal} web3={web3} account={account} theme={theme} walletLog={walletLog} />
              </>
            }
          </div>
        }
      </article >

    </>
  );
}