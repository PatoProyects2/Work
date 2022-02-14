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

  useEffect(() => {
    connectWeb3Modal(disconnect)
  }, [disconnect])
  const disconnectWallet = async () => {
    setDisconnect(true)
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
          <HistoryGames
            theme={theme}
            isMobileVersion={true}
            web3={web3}
            rpsgame={rpsgame}
            decimal={decimal}
          />
          <WinStreakLeaderboard
            theme={theme}
            isMobileVersion={true}
            web3={web3}
          />
          <NavLink className="btn btn-danger" to="/leaderboard">LEADERBOARD</NavLink>
          {account !== '0x000000000000000000000000000000000000dEaD' ? <ConnectWallet decimal={decimal} web3={web3} account={account} theme={theme} walletBalance={walletBalance} username={username} userpic={userpic} register={register} disconnectWallet={disconnectWallet} /> : ""}
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
            <HistoryGames
              theme={theme}
              isMobileVersion={false}
              web3={web3}
              rpsgame={rpsgame}
              decimal={decimal}
            />
            <WinStreakLeaderboard
              theme={theme}
              isMobileVersion={false}
              web3={web3}
            />
            <NavLink className="btn btn-outline-danger" to="/leaderboard">LEADERBOARD <i className="fa-solid fa-up-right-from-square fa-xs"></i></NavLink>
            {account !== '0x000000000000000000000000000000000000dEaD' ? <ConnectWallet decimal={decimal} web3={web3} account={account} theme={theme} walletBalance={walletBalance} username={username} userpic={userpic} register={register} disconnectWallet={disconnectWallet} /> : ""}
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
              </>
              :
              <ConnectWallet connectWeb3Modal={connectWeb3Modal} decimal={decimal} web3={web3} account={account} theme={theme} walletLog={walletLog} />
            }
            <HistoryGamesModal
              theme={theme}
              decimal={decimal}
              rpsgame={rpsgame}
              web3={web3}
            />
          </div>
        }
      </article >
    </>
  );
}