import React, { useState, useEffect } from 'react'
import { NavLink, useOutletContext } from 'react-router-dom'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import { doc, getDoc, getDocs, collection, query, where, updateDoc, orderBy, limit } from "firebase/firestore";
import RpsGame from '../../abis/RpsGame/rpsGame.json'
import { rpsGameContract } from '../../components/blockchain/Contracts'
import HistoryGames from './components/buttons/HistoryGames'
import ConnectWallet from './components/buttons/ConnectWallet'
import WinStreakLeaderboard from './components/buttons/WinStreakLeaderboard'
import Rock from '../../assets/imgs/rock.gif'
import Paper from '../../assets/imgs/paper.gif'
import Scissors from '../../assets/imgs/scissors.gif'
import RPSAnimated from '../../assets/imgs/RPS.gif'
import HistoryGamesModal from './components/HistoryGamesModal'
import db from '../../firebase/firesbaseConfig'
import { useMatchMedia } from '../../hooks/useMatchMedia'

export default function Game() {
  const [theme, setTheme] = useOutletContext();
  const [web3, setWeb3] = useState({});
  const [rpsgame, setRpsgame] = useState({});
  const [eventsmodal, setEventsmodal] = useState({});
  const [usergame, setUsergame] = useState({
    hand: '',
    amount: 0
  });
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
  const [account, setAccount] = useState('');
  const [chain, setChain] = useState('');
  const [network, setNetwork] = useState('');
  const [log0, setLog0] = useState('');
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
  const [picStreak0, setPicStreak0] = useState('')
  const [picStreak1, setPicStreak1] = useState('')
  const [picStreak2, setPicStreak2] = useState('')
  const [picStreak3, setPicStreak3] = useState('')
  const [picStreak4, setPicStreak4] = useState('')
  const [picStreak5, setPicStreak5] = useState('')
  const [picStreak6, setPicStreak6] = useState('')
  const [picStreak7, setPicStreak7] = useState('')
  const [nameStreak0, setNameStreak0] = useState('')
  const [nameStreak1, setNameStreak1] = useState('')
  const [nameStreak2, setNameStreak2] = useState('')
  const [nameStreak3, setNameStreak3] = useState('')
  const [nameStreak4, setNameStreak4] = useState('')
  const [nameStreak5, setNameStreak5] = useState('')
  const [nameStreak6, setNameStreak6] = useState('')
  const [nameStreak7, setNameStreak7] = useState('')
  const [blockchain, setBlockchain] = useState(0);
  const [dayBlock, setDayBlock] = useState(0)
  const [blockStreak0, setBlockStreak0] = useState(0)
  const [blockStreak1, setBlockStreak1] = useState(0)
  const [blockStreak2, setBlockStreak2] = useState(0)
  const [blockStreak3, setBlockStreak3] = useState(0)
  const [blockStreak4, setBlockStreak4] = useState(0)
  const [blockStreak5, setBlockStreak5] = useState(0)
  const [blockStreak6, setBlockStreak6] = useState(0)
  const [blockStreak7, setBlockStreak7] = useState(0)
  const [winStreak0, setWinStreak0] = useState(0)
  const [winStreak1, setWinStreak1] = useState(0)
  const [winStreak2, setWinStreak2] = useState(0)
  const [winStreak3, setWinStreak3] = useState(0)
  const [winStreak4, setWinStreak4] = useState(0)
  const [winStreak5, setWinStreak5] = useState(0)
  const [winStreak6, setWinStreak6] = useState(0)
  const [winStreak7, setWinStreak7] = useState(0)
  const [decimal, setDecimal] = useState(1000000000000000000);
  const [userGameStreak, setUserGameStreak] = useState(0);
  const [walletbalance, setWalletbalance] = useState(0);
  const [userhand, setUserhand] = useState(0);
  const [useramount, setUseramount] = useState(0);
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [userGameResult, setUserGameResult] = useState(undefined);
  const [gameResult, setGameResult] = useState(undefined);
  const [showGameResult, setShowGameResult] = useState(false);
  const isMobileResolution = useMatchMedia('(max-width:650px)', false);

  useEffect(() => {
    loadWeb3()
  }, []);

  async function loadWeb3() {
    try {
      const provider = await detectEthereumProvider();
      if (provider) {

      } else {
        window.alert('Please install Metamask!')
      }
      const web3 = new Web3(new Web3(window.ethereum), provider)
      setWeb3(web3)
      const chainId = await ethereum.request({ method: 'eth_chainId' })
      handleChainChanged(chainId)
      ethereum.on('chainChanged', handleChainChanged)
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      handleAccountsChanged(accounts)
      ethereum.on('accountsChanged', handleAccountsChanged)
      if (chainId === '0x13881') {
        const rpsgame = new web3.eth.Contract(RpsGame.abi, rpsGameContract)
        setRpsgame(rpsgame)
        const walletBalance = await web3.eth.getBalance(accounts[0])
        setWalletbalance(walletBalance)
        const actuallBlock = await web3.eth.getBlockNumber()
        setBlockchain(actuallBlock)
        try {
          const lastMinuteBlock = actuallBlock - 26
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
        try {
          const dayBlock = actuallBlock - 43200
          setDayBlock(dayBlock)
          const userCollection = collection(db, "users")
          const queryStreakBlock = query(userCollection, where("winStreak", ">", 0), orderBy("winStreak"), limit(8))
          const queryDocuments = await getDocs(queryStreakBlock)
          const queryStreak = queryDocuments._snapshot.docChanges
          const dataStreak0 = queryStreak[0].doc.data.value.mapValue.fields
          const pic0 = dataStreak0.pic1.stringValue
          const picStreak0 = await import(`../../assets/imgs/profile/${pic0}`)
          setPicStreak0(picStreak0.default)
          setNameStreak0(dataStreak0.name1.stringValue)
          setWinStreak0(dataStreak0.winStreak.integerValue)
          setBlockStreak0(dataStreak0.winStreakBlock.integerValue)
          const dataStreak1 = queryStreak[1].doc.data.value.mapValue.fields
          const pic1 = dataStreak1.pic1.stringValue
          const picStreak1 = await import(`../../assets/imgs/profile/${pic1}`)
          setPicStreak1(picStreak1.default)
          setNameStreak1(dataStreak1.name1.stringValue)
          setWinStreak1(dataStreak1.winStreak.integerValue)
          setBlockStreak1(dataStreak1.winStreakBlock.integerValue)
          const dataStreak2 = queryStreak[2].doc.data.value.mapValue.fields
          const pic2 = dataStreak2.pic1.stringValue
          const picStreak2 = await import(`../../assets/imgs/profile/${pic2}`)
          setPicStreak2(picStreak2.default)
          setNameStreak2(dataStreak2.name1.stringValue)
          setWinStreak2(dataStreak2.winStreak.integerValue)
          setBlockStreak2(dataStreak2.winStreakBlock.integerValue)
          const dataStreak3 = queryStreak[3].doc.data.value.mapValue.fields
          const pic3 = dataStreak3.pic1.stringValue
          const picStreak3 = await import(`../../assets/imgs/profile/${pic3}`)
          setPicStreak3(picStreak3.default)
          setNameStreak3(dataStreak3.name1.stringValue)
          setWinStreak3(dataStreak3.winStreak.integerValue)
          setBlockStreak3(dataStreak3.winStreakBlock.integerValue)
          const dataStreak4 = queryStreak[4].doc.data.value.mapValue.fields
          const pic4 = dataStreak4.pic1.stringValue
          const picStreak4 = await import(`../../assets/imgs/profile/${pic4}`)
          setPicStreak4(picStreak4.default)
          setNameStreak4(dataStreak4.name1.stringValue)
          setWinStreak4(dataStreak4.winStreak.integerValue)
          setBlockStreak4(dataStreak4.winStreakBlock.integerValue)
          const dataStreak5 = queryStreak[5].doc.data.value.mapValue.fields
          const pic5 = dataStreak5.pic1.stringValue
          const picStreak5 = await import(`../../assets/imgs/profile/${pic5}`)
          setPicStreak5(picStreak5.default)
          setNameStreak5(dataStreak5.name1.stringValue)
          setWinStreak5(dataStreak5.winStreak.integerValue)
          setBlockStreak5(dataStreak5.winStreakBlock.integerValue)
          const dataStreak6 = queryStreak[6].doc.data.value.mapValue.fields
          const pic6 = dataStreak6.pic1.stringValue
          const picStreak6 = await import(`../../assets/imgs/profile/${pic6}`)
          setPicStreak6(picStreak6.default)
          setNameStreak6(dataStreak6.name1.stringValue)
          setWinStreak6(dataStreak6.winStreak.integerValue)
          setBlockStreak6(dataStreak6.winStreakBlock.integerValue)
          const dataStreak7 = queryStreak[7].doc.data.value.mapValue.fields
          const pic7 = dataStreak7.pic1.stringValue
          const picStreak7 = await import(`../../assets/imgs/profile/${pic7}`)
          setPicStreak7(picStreak7.default)
          setNameStreak7(dataStreak7.name1.stringValue)
          setWinStreak7(dataStreak7.winStreak.integerValue)
          setBlockStreak7(dataStreak7.winStreakBlock.integerValue)
        } catch (e) {

        }
      } else {
        window.alert('Please connect to mumbai network!')
      }
    } catch (err) {

    }
    setTimeout(loadWeb3, 2000)
  }

  async function handleChainChanged(_chainId) {
    setChain(_chainId)
    if (_chainId === '0x89') {
      setNetwork('POLYGON')
    }
    if (_chainId === '0x13881') {
      setNetwork('MUMBAI')
    }
  }

  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {

    } else if (accounts[0] !== null) {
      setAccount(accounts[0])
    }
  }

  const handleInputChange = (event) => {
    setUsergame({
      ...usergame,
      [event.target.name]: event.target.value
    })
  }

  async function openGame() {
    if (document.getElementById('age').checked) {
      setActive(true)
      loadWeb3()
      setLog0('')
    } else {
      setLog0('CONFIRM THAT YOU ARE AT LEAST 18 YEARS OLD')
      return false
    }
  }

  async function doubleOrNothing() {
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
    if (usergame.hand !== '' && usergame.amount !== 0) {
      let calculateValue = await rpsgame.methods.calculateValue((web3.utils.toWei((usergame.amount).toString(), "ether"))).call()
      setPlaying(true)
      setAnimation(true)
      rpsgame.methods
        .play(web3.utils.toWei((usergame.amount).toString(), "ether"))
        .send({
          from: account,
          value: calculateValue,
        })
        .on('receipt', (hash) => {
          readAccountEvent()
        })
        .on('error', function (error) {
          setPlaying(false)
        });
    }
  }

  async function readAccountEvent() {
    let userGameBlock = blockchain - 3
    let myEvents = await rpsgame.getPastEvents('Play', { filter: { _to: account }, fromBlock: userGameBlock, toBlock: 'latest' })
    setShowGameResult(true)
    setAnimation(false)
    setUserGameResult(myEvents[0].returnValues[3])
    setUserGameStreak(myEvents[0].returnValues[2])
    const query = doc(db, "users", account)
    const document = await getDoc(query)
    const userData = document.data()
    if (myEvents[0].returnValues[2] > userData.winStreak) {
      updateDoc(doc(db, "users", account), {
        winStreak: parseInt(myEvents[0].returnValues[2]),
        winStreakBlock: myEvents[0].blockNumber
      })
    }
  }

  async function showResult() {
    setShowGameResult(false)
    setGameResult(true)
  }

  async function backGame() {
    setPlaying(false)
    setUserGameStreak(0)
    setUserGameResult(undefined)
    setGameResult(undefined)
  }

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      {isMobileResolution
        ?
        <div className="d-flex flex-row gap-1">
          <HistoryGames
            theme={theme}
            isMobileVersion={true}
            blockchain={blockchain}
            eventsmodal={eventsmodal}
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
            userpic0={userpic0}
            userpic1={userpic1}
            userpic2={userpic2}
            userpic3={userpic3}
            userpic4={userpic4}
            userpic5={userpic5}
            userpic6={userpic6}
            userpic7={userpic7}
            userpic8={userpic8}
            userpic9={userpic9}
            userpic10={userpic10}
            userpic11={userpic11}
            decimal={decimal}
          />
          <WinStreakLeaderboard
            theme={theme}
            isMobileVersion={true}
            blockchain={blockchain}
            dayBlock={dayBlock}
            blockStreak0={blockStreak0}
            blockStreak1={blockStreak1}
            blockStreak2={blockStreak2}
            blockStreak3={blockStreak3}
            blockStreak4={blockStreak4}
            blockStreak5={blockStreak5}
            blockStreak6={blockStreak6}
            blockStreak7={blockStreak7}
            picStreak0={picStreak0}
            picStreak1={picStreak1}
            picStreak2={picStreak2}
            picStreak3={picStreak3}
            picStreak4={picStreak4}
            picStreak5={picStreak5}
            picStreak6={picStreak6}
            picStreak7={picStreak7}
            nameStreak0={nameStreak0}
            nameStreak1={nameStreak1}
            nameStreak2={nameStreak2}
            nameStreak3={nameStreak3}
            nameStreak4={nameStreak4}
            nameStreak5={nameStreak5}
            nameStreak6={nameStreak6}
            nameStreak7={nameStreak7}
            winStreak0={winStreak0}
            winStreak1={winStreak1}
            winStreak2={winStreak2}
            winStreak3={winStreak3}
            winStreak4={winStreak4}
            winStreak5={winStreak5}
            winStreak6={winStreak6}
            winStreak7={winStreak7}
          />
          <NavLink className="btn btn-danger" to="/leaderboard">LEADERBOARD</NavLink>
          {account !== '' ? <ConnectWallet decimal={decimal} web3={web3} account={account} theme={theme} /> : ""}
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
              blockchain={blockchain}
              eventsmodal={eventsmodal}
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
              userpic0={userpic0}
              userpic1={userpic1}
              userpic2={userpic2}
              userpic3={userpic3}
              userpic4={userpic4}
              userpic5={userpic5}
              userpic6={userpic6}
              userpic7={userpic7}
              userpic8={userpic8}
              userpic9={userpic9}
              userpic10={userpic10}
              userpic11={userpic11}
              decimal={decimal}
            />
            <WinStreakLeaderboard
              theme={theme}
              isMobileVersion={false}
              blockchain={blockchain}
              dayBlock={dayBlock}
              blockStreak0={blockStreak0}
              blockStreak1={blockStreak1}
              blockStreak2={blockStreak2}
              blockStreak3={blockStreak3}
              blockStreak4={blockStreak4}
              blockStreak5={blockStreak5}
              blockStreak6={blockStreak6}
              blockStreak7={blockStreak7}
              picStreak0={picStreak0}
              picStreak1={picStreak1}
              picStreak2={picStreak2}
              picStreak3={picStreak3}
              picStreak4={picStreak4}
              picStreak5={picStreak5}
              picStreak6={picStreak6}
              picStreak7={picStreak7}
              nameStreak0={nameStreak0}
              nameStreak1={nameStreak1}
              nameStreak2={nameStreak2}
              nameStreak3={nameStreak3}
              nameStreak4={nameStreak4}
              nameStreak5={nameStreak5}
              nameStreak6={nameStreak6}
              nameStreak7={nameStreak7}
              winStreak0={winStreak0}
              winStreak1={winStreak1}
              winStreak2={winStreak2}
              winStreak3={winStreak3}
              winStreak4={winStreak4}
              winStreak5={winStreak5}
              winStreak6={winStreak6}
              winStreak7={winStreak7}
            />
            <NavLink className="btn btn-outline-danger" to="/leaderboard">LEADERBOARD <i className="fa-solid fa-up-right-from-square fa-xs"></i></NavLink>
            {account !== '' ? <ConnectWallet decimal={decimal} web3={web3} account={account} theme={theme} /> : ""}
          </div>
        </div>
      }
      <article>
        {active === true && chain === '0x13881' ?
          <>
            <h5 className="my-4 text-end me-3 me-lg-0">MATIC {(walletbalance / decimal).toFixed(4)}</h5>
            <div className="game-container">
              {log0 && (<span className="alert alert-danger mx-5">{log0}</span>)}
              {playing === true ?
                <div className="mt-3">
                  {animation === true ? <img src={RPSAnimated} width="160" height="160" alt="Rock-Paper-Scissors" /> : ""}
                  {showGameResult === true ? <button className="btn-hover btn-green" onClick={showResult}>SHOW RESULT</button> : ""}
                  {gameResult === true
                    ?
                    <>
                      <h3>
                        {userGameResult === true ? "You won " + (useramount * 2) + " MATIC " : ""}
                        {userGameResult === false ? "You lost " + useramount + " MATIC " : ""}
                        {userGameStreak > 1 ? "on a " + userGameStreak + " win streak!" : ""}
                      </h3>
                      {userhand === 'Rock' && userGameResult === true ? <img width="120" height="120" src={Scissors} alt="" /> : ""}
                      {userhand === 'Paper' && userGameResult === true ? <img width="120" height="120" src={Rock} alt="" /> : ""}
                      {userhand === 'Scissors' && userGameResult === true ? <img width="120" height="120" src={Paper} alt="" /> : ""}
                      {userhand === 'Rock' && userGameResult === false ? <img width="120" height="120" src={Paper} alt="" /> : ""}
                      {userhand === 'Paper' && userGameResult === false ? <img width="120" height="120" src={Scissors} alt="" /> : ""}
                      {userhand === 'Scissors' && userGameResult === false ? <img width="120" height="120" src={Rock} alt="" /> : ""}
                      <br></br>
                      {userGameResult === true ? <button className="btn-hover btn-green" onClick={backGame}>CLAIM REWARD</button> : <button className="btn btn-success" onClick={backGame}>BACK</button>}

                    </>
                    :
                    ""
                  }
                </div>
                :
                <div>
                  <h5 className="mt-2">I LIKE</h5>
                  <div className="d-flex justify-content-center">
                    <label>
                      <input type="radio" name="hand" id="rock" onChange={handleInputChange} value="Rock"></input>
                      <div className="rps-img rock-img"></div>
                    </label>
                    <label>
                      <input type="radio" name="hand" id="paper" onChange={handleInputChange} value="Paper"></input>
                      <div className="rps-img paper-img"></div>
                    </label>
                    <label>
                      <input type="radio" name="hand" id="scissors" onChange={handleInputChange} value="Scissors"></input>
                      <div className="rps-img scissors-img"></div>
                    </label>
                  </div>
                  <h5 className="mt-2">FOR</h5>
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
            {account !== '' ?
              <>
                <p>
                  <input id="age" type="checkbox"></input>&nbsp;
                  <label htmlFor="age">I confirm that I am at least 18 years old</label>
                </p>
                <button className="btn-hover btn-start" onClick={openGame}>DOUBLE OR NOTHING</button>
                <p>CLICK TO SEE OPTIONS</p>
              </>
              :
              <ConnectWallet decimal={decimal} web3={web3} account={account} theme={theme} />
            }
            <HistoryGamesModal
              theme={theme}
              blockchain={blockchain}
              eventsmodal={eventsmodal}
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
              userpic0={userpic0}
              userpic1={userpic1}
              userpic2={userpic2}
              userpic3={userpic3}
              userpic4={userpic4}
              userpic5={userpic5}
              userpic6={userpic6}
              userpic7={userpic7}
              userpic8={userpic8}
              userpic9={userpic9}
              userpic10={userpic10}
              userpic11={userpic11}
              decimal={decimal}
            />
          </div>
        }
      </article >
    </>
  );
}
