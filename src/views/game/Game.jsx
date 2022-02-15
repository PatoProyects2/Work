import React, { useState, useEffect } from 'react'
import { NavLink, useOutletContext } from 'react-router-dom'
import Web3 from 'web3'
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Torus from "@toruslabs/torus-embed";
import Portis from "@portis/web3";
import WalletLink from "walletlink";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import RpsGame from '../../abis/RpsGame/rpsGame.json'
import { rpsGameContract } from '../../components/blockchain/Contracts'
import HistoryGamesModal from './components/HistoryGamesModal'
import HistoryGames from './components/buttons/HistoryGames'
import ConnectWallet from './components/buttons/ConnectWallet'
import WinStreakLeaderboard from './components/buttons/WinStreakLeaderboard'
import Rock from '../../assets/imgs/rock.gif'
import Paper from '../../assets/imgs/paper.gif'
import Scissors from '../../assets/imgs/scissors.gif'
import RPSAnimated from '../../assets/imgs/RPS.gif'
import db from '../../firebase/firesbaseConfig'
import { useMatchMedia } from '../../hooks/useMatchMedia'
export default function Game() {
  const [theme, setTheme] = useOutletContext();
  const [web3, setWeb3] = useState({});
  const [rpsgame, setRpsgame] = useState({});
  const [usergame, setUsergame] = useState({
    hand: '',
    amount: 0
  });
  const [register, setRegister] = useState('');
  const [userpic, setUserpic] = useState('');
  const [username, setUsername] = useState('');
  const [account, setAccount] = useState('0x000000000000000000000000000000000000dEaD');
  const [chain, setChain] = useState('');
  const [log, setLog] = useState('');
  const [log0, setLog0] = useState('');
  const [walletLog, setWalletLog] = useState('Select Wallet');
  const [walletBalance, setWalletBalance] = useState(0);
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
  const isMobileResolution = useMatchMedia('(max-width:650px)', false);
  const [disconnect, setDisconnect] = useState(false)
  const [blockchain, setBlockchain] = useState(0);
  const [eventsmodal, setEventsmodal] = useState({});
  const [userdata0, setUserdata0] = useState({ name1: '' });
  const [userdata1, setUserdata1] = useState({ name1: '' });
  const [userdata2, setUserdata2] = useState({ name1: '' });
  const [userdata3, setUserdata3] = useState({ name1: '' });
  const [userdata4, setUserdata4] = useState({ name1: '' });
  const [userdata5, setUserdata5] = useState({ name1: '' });
  const [userdata6, setUserdata6] = useState({ name1: '' });
  const [userdata7, setUserdata7] = useState({ name1: '' });
  const [userdata8, setUserdata8] = useState({ name1: '' });
  const [userdata9, setUserdata9] = useState({ name1: '' });
  const [userdata10, setUserdata10] = useState({ name1: '' });
  const [userdata11, setUserdata11] = useState({ name1: '' });
  const [userpic0, setUserpic0] = useState('');
  const [userpic1, setUserpic1] = useState('');
  const [userpic2, setUserpic2] = useState('');
  const [userpic3, setUserpic3] = useState('');
  const [userpic4, setUserpic4] = useState('');
  const [userpic5, setUserpic5] = useState('');
  const [userpic6, setUserpic6] = useState('');
  const [userpic7, setUserpic7] = useState('');
  const [userpic8, setUserpic8] = useState('');
  const [userpic9, setUserpic9] = useState('');
  const [userpic10, setUserpic10] = useState('');
  const [userpic11, setUserpic11] = useState('');

  useEffect(() => {
    connectWeb3Modal(disconnect)
  }, [disconnect])
  const disconnectWallet = async () => {
    setDisconnect(true)
  }

  useEffect(() => {
    const timer = setInterval(() => { loadHistoryUserPlays(web3, rpsgame) }, 3000);
    return () => clearInterval(timer);
  }, [web3, rpsgame])

  const loadHistoryUserPlays = async (web3, rpsgame) => {
    try {
      const actuallBlock = await web3.eth.getBlockNumber()
      setBlockchain(actuallBlock)
      const lastMinuteBlock = actuallBlock - 25
      const eventsmodal = await rpsgame.getPastEvents('Play', { fromBlock: lastMinuteBlock, toBlock: 'latest' })
      setEventsmodal(eventsmodal)
      const userData0 = await getDoc(doc(db, "users", eventsmodal[0].returnValues[0].toLowerCase()))
      const picPath0 = userData0.data().pic1
      const profilePhoto0 = await import(`../../assets/imgs/profile/${picPath0}`)
      setUserdata0(userData0.data())
      setUserpic0(profilePhoto0.default)
      const userData1 = await getDoc(doc(db, "users", eventsmodal[1].returnValues[0].toLowerCase()))
      const picPath1 = userData1.data().pic1
      const profilePhoto1 = await import(`../../assets/imgs/profile/${picPath1}`)
      setUserdata1(userData1.data())
      setUserpic1(profilePhoto1.default)
      const userData2 = await getDoc(doc(db, "users", eventsmodal[2].returnValues[0].toLowerCase()))
      const picPath2 = userData2.data().pic1
      const profilePhoto2 = await import(`../../assets/imgs/profile/${picPath2}`)
      setUserdata2(userData2.data())
      setUserpic2(profilePhoto2.default)
      const userData3 = await getDoc(doc(db, "users", eventsmodal[3].returnValues[0].toLowerCase()))
      const picPath3 = userData3.data().pic1
      const profilePhoto3 = await import(`../../assets/imgs/profile/${picPath3}`)
      setUserdata3(userData3.data())
      setUserpic3(profilePhoto3.default)
      const userData4 = await getDoc(doc(db, "users", eventsmodal[4].returnValues[0].toLowerCase()))
      const picPath4 = userData4.data().pic1
      const profilePhoto4 = await import(`../../assets/imgs/profile/${picPath4}`)
      setUserdata4(userData4.data())
      setUserpic4(profilePhoto4.default)
      const userData5 = await getDoc(doc(db, "users", eventsmodal[5].returnValues[0].toLowerCase()))
      const picPath5 = userData5.data().pic1
      const profilePhoto5 = await import(`../../assets/imgs/profile/${picPath5}`)
      setUserdata5(userData5.data())
      setUserpic5(profilePhoto5.default)
      const userData6 = await getDoc(doc(db, "users", eventsmodal[6].returnValues[0].toLowerCase()))
      const picPath6 = userData6.data().pic1
      const profilePhoto6 = await import(`../../assets/imgs/profile/${picPath6}`)
      setUserdata6(userData6.data())
      setUserpic6(profilePhoto6.default)
      const userData7 = await getDoc(doc(db, "users", eventsmodal[7].returnValues[0].toLowerCase()))
      const picPath7 = userData7.data().pic1
      const profilePhoto7 = await import(`../../assets/imgs/profile/${picPath7}`)
      setUserdata7(userData7.data())
      setUserpic7(profilePhoto7.default)
      const userData8 = await getDoc(doc(db, "users", eventsmodal[8].returnValues[0].toLowerCase()))
      const picPath8 = userData8.data().pic1
      const profilePhoto8 = await import(`../../assets/imgs/profile/${picPath8}`)
      setUserdata8(userData8.data())
      setUserpic8(profilePhoto8.default)
      const userData9 = await getDoc(doc(db, "users", eventsmodal[9].returnValues[0].toLowerCase()))
      const picPath9 = userData9.data().pic1
      const profilePhoto9 = await import(`../../assets/imgs/profile/${picPath9}`)
      setUserdata9(userData9.data())
      setUserpic9(profilePhoto9.default)
      const userData10 = await getDoc(doc(db, "users", eventsmodal[10].returnValues[0].toLowerCase()))
      const picPath10 = userData10.data().pic1
      const profilePhoto10 = await import(`../../assets/imgs/profile/${picPath10}`)
      setUserdata10(userData10.data())
      setUserpic10(profilePhoto10.default)
      const userData11 = await getDoc(doc(db, "users", eventsmodal[11].returnValues[0].toLowerCase()))
      const picPath11 = userData11.data().pic1
      const profilePhoto11 = await import(`../../assets/imgs/profile/${picPath11}`)
      setUserdata11(userData11.data())
      setUserpic11(profilePhoto11.default)
    } catch (e) {

    }
  }

  const connectWeb3Modal = async (disconnect) => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: {
            80001: "https://polygon-mumbai.infura.io/v3/270caadf97b048ec8823dff39e612c46",
          },
        }
      },
      torus: {
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
        package: Portis,
        options: {
          id: "fc6fd5a9-493b-4806-858d-ff67918ea1dc",
          network: "maticMumbai",
        },
      },
      walletlink: {
        package: WalletLink,
        options: {
          appName: "RPS",
          rpc: "https://polygon-mumbai.infura.io/v3/270caadf97b048ec8823dff39e612c46",
          chainId: 80001,
          appLogoUrl: null,
          darkMode: false
        },
      },
    };
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions
    });

    if (disconnect) {
      web3Modal.clearCachedProvider();
      setActive(false)
      setAccount('0x000000000000000000000000000000000000dEaD')
      setDisconnect(false)
    }
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
      const chainId = await web3.eth.getChainId();
      setChain(chainId)
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
      const query = doc(db, "users", accounts[0].toLowerCase())
      const userDocument = await getDoc(query)
      const userData = userDocument.data()
      if (userData) {
        setUsername(userData.name1)
        setRegister(userData.register)
        const picPath = userData.pic1
        const profilePhoto = await import(`../../assets/imgs/profile/${picPath}`)
        setUserpic(profilePhoto.default)
      } else {
        const globalDate = new Date();
        const year = globalDate.getUTCFullYear()
        const month = globalDate.getUTCMonth() + 1
        const day = globalDate.getUTCDate()
        setDoc(doc(db, "users", accounts[0].toLowerCase()), {
          name1: 'Guest',
          pic1: 'guest.jpg',
          register: day.toString() + "/" + month.toString() + "/" + year.toString(),
          winStreak: 0,
          winStreakBlock: 0
        })
      }

    } catch (e) {
    }
  }

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const openGame = () => {
    if (document.getElementById('age').checked === false && log === '') {
      setLog0('CONFIRM THAT YOU ARE AT LEAST 18 YEARS OLD')
    }
    if (document.getElementById('age').checked === true && log === '') {
      setActive(true)
      setLog0('')
    }
  }

  const handleInputChange = (event) => {
    setUsergame({
      ...usergame,
      [event.target.name]: event.target.value
    })
  }

  const doubleOrNothing = async () => {
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
      .on('receipt', (hash) => {
        readAccountEvent()
      })
      .on('error', function (error) {
        setPlaying(false)
      });
  }

  const readAccountEvent = async () => {
    try {
      setShowGameResult(true)
      const actuallBlock = await web3.eth.getBlockNumber()
      let userGameBlock = actuallBlock - 10
      let myEvents = await rpsgame.getPastEvents('Play', { filter: { _to: account }, fromBlock: userGameBlock, toBlock: 'latest' })
      setUserGameResult(myEvents[0].returnValues[3])
      setUserGameStreak(myEvents[0].returnValues[2])
      const dayBlock = actuallBlock - 43200
      const query = doc(db, "users", account)
      const document = await getDoc(query)
      const userData = document.data()
      if (myEvents[0].returnValues[2] > userData.winStreak || dayBlock > userData.winStreakBlock) {
        updateDoc(doc(db, "users", account), {
          winStreak: parseInt(myEvents[0].returnValues[2]),
          winStreakBlock: myEvents[0].blockNumber
        })
      }
    } catch (e) {
      console.log(e)
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
                setUserpic0={setUserpic0}
                setUserpic1={setUserpic1}
                setUserpic2={setUserpic2}
                setUserpic3={setUserpic3}
                setUserpic4={setUserpic4}
                setUserpic5={setUserpic5}
                setUserpic6={setUserpic6}
                setUserpic7={setUserpic7}
                setUserpic8={setUserpic8}
                setUserpic9={setUserpic9}
                setUserpic10={setUserpic10}
                setUserpic11={setUserpic11}
              />
              <WinStreakLeaderboard
                theme={theme}
                isMobileVersion={true}
                web3={web3}
              />
              <NavLink className="btn btn-danger" to="/leaderboard">LEADERBOARD</NavLink>
              <ConnectWallet decimal={decimal} web3={web3} account={account} theme={theme} walletBalance={walletBalance} username={username} userpic={userpic} register={register} disconnectWallet={disconnectWallet} />
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
                  setUserpic0={setUserpic0}
                  setUserpic1={setUserpic1}
                  setUserpic2={setUserpic2}
                  setUserpic3={setUserpic3}
                  setUserpic4={setUserpic4}
                  setUserpic5={setUserpic5}
                  setUserpic6={setUserpic6}
                  setUserpic7={setUserpic7}
                  setUserpic8={setUserpic8}
                  setUserpic9={setUserpic9}
                  setUserpic10={setUserpic10}
                  setUserpic11={setUserpic11}
                />
                <WinStreakLeaderboard
                  theme={theme}
                  isMobileVersion={false}
                  web3={web3}
                />
                <NavLink className="btn btn-danger" to="/leaderboard">LEADERBOARD</NavLink>
                <ConnectWallet decimal={decimal} web3={web3} account={account} theme={theme} walletBalance={walletBalance} username={username} userpic={userpic} register={register} disconnectWallet={disconnectWallet} />
              </>
              :
              ""
            }
          </div>
        </div>
      }
      <article>
        {log && (<span className="alert alert-danger mx-5">{log}</span>)}
        {active === true && log === '' ?
          <>
            {log0 && (<span className="alert alert-danger mx-5">{log0}</span>)}
            <h5 className="my-4 text-end me-3 me-lg-0">MATIC {(walletBalance / decimal).toFixed(4)}</h5>
            <div className="game-container">
              {playing === true ?
                <div className="mt-3">
                  {animation === true ?
                    <>
                      <img src={RPSAnimated} width="240" height="240" alt="Rock-Paper-Scissors" />
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
                      <h3>{userGameResult === true ? <button className="btn-hover btn-green" onClick={backGame}>CLAIM REWARD</button> : <button className="btn btn-success" onClick={backGame}>BACK</button>}</h3>
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
                      <input type="radio" name="amount" id="amount1" onChange={handleInputChange} value="0.1" />
                      <span>2 MATIC</span>
                    </label>
                    <label className="amount">
                      <input type="radio" name="amount" id="amount2" onChange={handleInputChange} value="0.2" />
                      <span>4 MATIC</span>
                    </label>
                    <label className="amount">
                      <input type="radio" name="amount" id="amount3" onChange={handleInputChange} value="0.3" />
                      <span>10 MATIC</span>
                    </label>
                  </div>
                  <div className="d-flex justify-content-center mb-4">
                    <label className="amount">
                      <input type="radio" name="amount" id="amount4" onChange={handleInputChange} value="0.4" />
                      <span>20 MATIC</span>
                    </label>
                    <label className="amount">
                      <input type="radio" name="amount" id="amount5" onChange={handleInputChange} value="0.5" />
                      <span>50 MATIC</span>
                    </label>
                    <label className="amount">
                      <input type="radio" name="amount" id="amount6" onChange={handleInputChange} value="0.6" />
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
            {log0 && (<span className="alert alert-danger mx-5">{log0}</span>)}
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
                  setUserpic0={setUserpic0}
                  setUserpic1={setUserpic1}
                  setUserpic2={setUserpic2}
                  setUserpic3={setUserpic3}
                  setUserpic4={setUserpic4}
                  setUserpic5={setUserpic5}
                  setUserpic6={setUserpic6}
                  setUserpic7={setUserpic7}
                  setUserpic8={setUserpic8}
                  setUserpic9={setUserpic9}
                  setUserpic10={setUserpic10}
                  setUserpic11={setUserpic11}
                />
              </>
              :
              <ConnectWallet connectWeb3Modal={connectWeb3Modal} decimal={decimal} web3={web3} account={account} theme={theme} walletLog={walletLog} />
            }
          </div>
        }
      </article >
    </>
  );
}