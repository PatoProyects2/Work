import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import { doc, setDoc, getDoc } from "firebase/firestore";
import RpsGame from '../../abis/RpsGame/rpsGame.json'
import RouterSwap from '../../abis/Swap/PancakeRouter.json'
import {
  rpsGameContract,
  polygonSwapContract,
  maticContract,
  usdcContract
} from '../../components/blockchain/Contracts'
import HistoryGames from '../../components/buttons/HistoryGames'
import ConnectChain from '../../components/buttons/ConnectChain'
import ConnectWallet from '../../components/buttons/ConnectWallet'
import Rock from '../../assets/imgs/rock.gif'
import Papper from '../../assets/imgs/papper.gif'
import Scissors from '../../assets/imgs/scissors.gif'
import MaticLogo from '../../assets/imgs/maticLogo.png'
import db from '../../firebase/firesbaseConfig'

export default function Game() {
  const [rpsgame, setRpsgame] = useState({});
  const [quickswap, setQuickswap] = useState({});
  const [web3, setWeb3] = useState({});
  const [usergame, setUsergame] = useState({
    hand: '',
    amount: 0
  });
  const [userdata, setUserdata] = useState({
    name1: 'guest',
    pic1: 'QmQ1cjPaQr8oCRvQk5KDDWfTRuoBgNnZVhQo1VzTF7S6c8?filename=nft%20bored%20ape.jpg'
  });
  const [account, setAccount] = useState('');
  const [chain, setChain] = useState('');
  const [network, setNetwork] = useState('');
  const [log, setLog] = useState('');
  const [decimal, setDecimal] = useState(1000000000000000000);
  const [maticprice, setMaticprice] = useState(0);
  const [walletBalances, setWalletbalances] = useState(0);
  const [userhand, setUserhand] = useState(0);
  const [useramount, setUseramount] = useState(0);
  const [loss, setLoss] = useState(0);
  const [won, setWon] = useState(0);
  const [userloses, setUserloses] = useState(0);
  const [userwins, setUserwins] = useState(0);
  const [pause, setPause] = useState('Waiting Metamask');
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [gameresult0, setGameresult0] = useState(undefined);
  const [gameresult, setGameresult] = useState(undefined);
  const [blockchain, setBlockchain] = useState(0);
  const [events, setEvents] = useState({});

  useEffect(() => {
    loadWeb3()
  }, []);

  async function loadWeb3() {
    const provider = await detectEthereumProvider();
    if (provider) {

    } else {
      window.alert('Please install MetaMask!')
      return false
    }
    if (provider !== window.ethereum) {
      window.alert('Do you have multiple wallets installed?')
    }
    const web3 = new Web3(new Web3(window.ethereum), provider)
    setWeb3(web3)
    const chainId = await ethereum.request({ method: 'eth_chainId' })
    handleChainChanged(chainId)
    ethereum.on('chainChanged', handleChainChanged)
    const accounts = await ethereum.request({ method: 'eth_accounts' })
    handleAccountsChanged(accounts)
    ethereum.on('accountsChanged', handleAccountsChanged)
    if (chainId === '0x89') {
      setNetwork('POLYGON')
    }
    if (chainId === '0x13881') {
      setNetwork('MUMBAI')
      const rpsgame = new web3.eth.Contract(RpsGame.abi, rpsGameContract)
      setRpsgame(rpsgame)
      const quickswap = new web3.eth.Contract(RouterSwap.abi, polygonSwapContract)
      setQuickswap(quickswap)
      try {
        let walletBalance = await web3.eth.getBalance(accounts[0])
        setWalletbalances(walletBalance)
      } catch (e) {
        console.log('Cant read balance!')
      }
      try {
        let totalLoses = await rpsgame.methods.totalLoses().call()
        setLoss(parseInt(totalLoses))
        let totalWins = await rpsgame.methods.totalWins().call()
        setWon(parseInt(totalWins))
        // let userLoses = await rpsgame.methods.winLosesPerUser(accounts[0], 0).call()
        // setUserloses(userLoses)
        // let userWins = await rpsgame.methods.winLosesPerUser(accounts[0], 1).call()
        // setUserwins(userWins)
      } catch (e) {
        console.log('RPSGAME CONTRACT NOT DEPLOYED TO DETECTED NETWORK')
      }
      try {
        let maticPrice = await quickswap.methods.getAmountsOut(1000000000000000, [maticContract, usdcContract]).call()
        setMaticprice(maticPrice[1])
      } catch (e) {
        console.log('SWAP CONTRACT NOT DEPLOYED TO DETECTED NETWORK')
      }
      try {
        const query = doc(db, "users", accounts[0])
        const document = await getDoc(query)
        const userData = document.data()
        if (userData) {
          setUserdata(userData)
        } else {
          setDoc(doc(db, "users", accounts[0]), userdata)
        }
      } catch (e) {
        console.log("Cant read profile")
      }
      const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      }
      for (let count = 0; count < 1000; count++) {
        web3.eth.getBlockNumber()
          .then(n => {
            setBlockchain(n)
            n = n - 28
            rpsgame.getPastEvents(
              'Play',
              {
                // filter: { _to: account.toString() },
                fromBlock: n,
                toBlock: 'latest'
              }
            )
              .then(events => {
                setEvents(events)

              }).catch(error => {
                console.log(error)
              })
          })
        await sleep(1000);
      }
    } else {
      console.log('Please connect to mumbai network!')
    }
  }

  function handleChainChanged(_chainId) {
    setChain(_chainId)
    console.log("Chain loaded!")
  }

  function handleAccountsChanged(accounts) {
    console.log("Account loaded!")
    if (accounts.length === 0) {
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== null) {
      setAccount(accounts[0])
    }
  }

  async function openGame() {
    setActive(true);
  }

  const handleInputChange = (event) => {
    setUsergame({
      ...usergame,
      [event.target.name]: event.target.value
    })
  }

  async function startGame() {
    if (document.getElementById('rock').checked || document.getElementById('papper').checked || document.getElementById('scissors').checked) {
      setUserhand(usergame.hand)
      setLog('')
    } else {
      setLog('Select hand')
      return false
    }
    if (document.getElementById('amount1').checked || document.getElementById('amount2').checked || document.getElementById('amount3').checked || document.getElementById('amount4').checked || document.getElementById('amount5').checked || document.getElementById('amount6').checked) {
      setUseramount(usergame.amount)
      setLog('')
    } else {
      setLog('Select amount')
      return false
    }

    if (usergame.hand !== '' && usergame.amount !== 0) {
      let calculateValue = await rpsgame.methods.calculateValue((web3.utils.toWei((usergame.amount).toString(), "ether"))).call()
      setPlaying(true)
      rpsgame.methods
        .playCuatro(web3.utils.toWei((usergame.amount).toString(), "ether"))
        .send({
          from: account,
          value: calculateValue,
        })
        .on('receipt', (hash) => {
          setTimeout(readUserGame, 1000)
        })
        .on('error', function (error) {
          setPlaying(false)
        });
    }
  }

  async function readUserGame() {
    web3.eth.getBlockNumber()
      .then(n => {
        n = n - 10
        rpsgame.getPastEvents(
          'Play',
          {
            filter: { _to: account },
            fromBlock: n,
            toBlock: 'latest'
          }
        )
          .then(events => {
            setGameresult0(events[0].returnValues[2])
            setGameresult(true)
          })
          .catch(error => {
            console.log("USER GAME NOT FOUND!")
          })
      })
      .catch(error => {
        console.log("BLOCK NOT FOUND!")
      })
  }

  async function backGame() {
    setPlaying(false)
    setGameresult(undefined)
    setGameresult0(undefined)
  }

  return (
    <>
      <img className="my-3 rounded-circle" src="https://random.imagecdn.app/256/256" alt="" width="256" height="256" />
      <ConnectChain network={network} />
      <ConnectWallet account={account} data={userdata} />
      <article>
        <img src={MaticLogo} width="25" height="25" alt="" />{(maticprice / 1000).toFixed(2) + "$"}
        {active === true && chain === '0x13881' ?
          <div className="game-container bg-secondary">
            <h1>Rock Paper Scissors Game</h1>
            <HistoryGames
              blockchain={blockchain}
              events={events}
            />
            <div className="row">
              <div className="col fs-4">{`Total Games: ${won + loss}`}</div>
            </div>
            <div className="row">
              <div className="col">{`Total Won: ${won}`}</div>
              <div className="col">{`Your Won: ${userwins}`}</div>
            </div>
            <div className="row">
              <div className="col">{`Total Loss: ${loss}`}</div>
              <div className="col">{`Your Loss: ${userloses}`}</div>
            </div>
            <h3 className="my-2">Balance: {(walletBalances / decimal).toFixed(4) + " MATIC"}</h3>
            {log && (<span className="alert alert-danger mx-5">{log}</span>)}
            {playing === true ?
              <div className="mt-3">
                <h3>Playing... {pause}</h3>
                <br></br>
                {userhand + " | Amount: " + useramount + " MATIC"}
                <br></br>
                {gameresult === true
                  ?
                  <>
                    {userhand === 'Rock' && gameresult0 === true
                      ?
                      "Scissors | You Won: " + (useramount * 2) + " MATIC"
                      :
                      ""
                    }
                    {userhand === 'Papper' && gameresult0 === true
                      ?
                      "Rock | You Won: " + (useramount * 2) + " MATIC"
                      :
                      ""
                    }
                    {userhand === 'Scissors' && gameresult0 === true
                      ?
                      "Papper | You Won: " + (useramount * 2) + " MATIC"
                      :
                      ""
                    }
                    {userhand === 'Rock' && gameresult0 === false
                      ?
                      "Papper | You Loss: " + useramount + " MATIC"
                      :
                      ""
                    }
                    {userhand === 'Papper' && gameresult0 === false
                      ?
                      "Scissors | You Loss: " + useramount + " MATIC"
                      :
                      ""
                    }
                    {userhand === 'Scissors' && gameresult0 === false
                      ?
                      "Rock | You Loss: " + useramount + " MATIC"
                      :
                      ""
                    }
                    <br></br>
                    <button onClick={backGame}>BACK</button>
                  </>
                  :
                  ""
                }
              </div>
              :
              <div>
                <h6 className="mt-2">I choose</h6>
                <label className="hand">
                  <input type="radio" name="hand" id="rock" onChange={handleInputChange} value="Rock"></input>
                  <img width="120" height="120" src={Rock} alt="" />
                </label>
                <label className="hand">
                  <input type="radio" name="hand" id="papper" onChange={handleInputChange} value="Papper"></input>
                  <img width="120" height="120" src={Papper} alt="" />
                </label>
                <label className="hand">
                  <input type="radio" name="hand" id="scissors" onChange={handleInputChange} value="Scissors"></input>
                  <img width="120" height="120" src={Scissors} alt="" />
                </label>
                <br></br>
                <br></br>
                <h6>For</h6>
                <div className="row mb-3">
                  <div className="col">
                    <label className="amount">
                      <input type="radio" name="amount" id="amount1" onChange={handleInputChange} value="0.1" />
                      <span>1 MATIC</span>
                    </label>
                  </div>
                  <div className="col">
                    <label className="amount">
                      <input type="radio" name="amount" id="amount2" onChange={handleInputChange} value="0.2" />
                      <span>2 MATIC</span>
                    </label>
                  </div>
                  <div className="col">
                    <label className="amount">
                      <input type="radio" name="amount" id="amount3" onChange={handleInputChange} value="0.4" />
                      <span>4 MATIC</span>
                    </label>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <label className="amount">
                      <input type="radio" name="amount" id="amount4" onChange={handleInputChange} value="0.8" />
                      <span>8 MATIC</span>
                    </label>
                  </div>
                  <div className="col">
                    <label className="amount">
                      <input type="radio" name="amount" id="amount5" onChange={handleInputChange} value="1.6" />
                      <span>16 MATIC</span>
                    </label>
                  </div>
                  <div className="col">
                    <label className="amount">
                      <input type="radio" name="amount" id="amount6" onChange={handleInputChange} value="3.2" />
                      <span>32 MATIC</span>
                    </label>
                  </div>
                </div>
                <br></br>
                <button onClick={startGame} className="btn-hover btn-green">DOUBLE OR NOTHING</button>
              </div>
            }
          </div>
          :
          <div>
            {account !== ''
              ?
              <button className="btn-hover btn-start" onClick={openGame}>START</button>
              :
              ""
            }
          </div>
        }
      </article >
    </>
  );
}
