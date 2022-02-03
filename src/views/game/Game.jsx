import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import RpsGame from '../../abis/RpsGame/rpsGame.json'
import chains from '../../components/blockchain/AvailableChains'
import HistoryGames from '../../components/buttons/HistoryGames'
import ConnectChain from '../../components/buttons/ConnectChain'
import ConnectWallet from '../../components/buttons/ConnectWallet'
import Rock from '../../assets/imgs/rock.gif'
import Papper from '../../assets/imgs/papper.gif'
import Scissors from '../../assets/imgs/scissors.gif'

export default function Game() {
  const [rpsgame, setRpsgame] = useState({});
  const [web3, setWeb3] = useState({});
  const [usergame, setUsergame] = useState({
    hand: '',
    amount: 0
  });
  const [account, setAccount] = useState('');
  const [log, setLog] = useState('');
  const [decimal, setDecimal] = useState(1000000000000000000);
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
  const [result0, setResult0] = useState(undefined);
  const [gameresult, setGameresult] = useState(undefined);

  async function openGame() {
    setActive(true);
  }

  useEffect(() => {
    loadWeb3()
    loadBlockchainData()
  }, []);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('METAMASK BROWSER NOT DETECTED! PLEASE INSTALL METAMASK EXTENSION')
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3
    setWeb3(web3)
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
    let chainId = await web3.eth.getChainId()
    let chainInUse = null

    for (let chainIndex in chains) {
      if (chains[chainIndex].id === chainId) {
        chainInUse = chains[chainIndex]
      }
    }
    if (!chainInUse) {
      window.alert('INVALID NETWORK DETECTED')
    } else {
      const rpsgame = new web3.eth.Contract(RpsGame.abi, chainInUse.rpsGameAddress)
      setRpsgame(rpsgame)
      try {
        let walletBalance = await web3.eth.getBalance(accounts[0])
        setWalletbalances(walletBalance)
      } catch (e) {
        console.log('METAMASK NOT INSTALLED')
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
    }
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
      let calculateValue = await rpsgame.methods.calculateValue(window.web3.utils.toWei((usergame.amount).toString(), "ether")).call()
      setPlaying(true)
      rpsgame.methods
        .playCuatro(window.web3.utils.toWei((usergame.amount).toString(), "ether"))
        .send({
          from: account,
          value: calculateValue,
        })
        .on('receipt', (hash) => {
          web3.eth.getBlockNumber()
            .then(n => {
              n = n - 4
              rpsgame.getPastEvents(
                'Play',
                {
                  filter: { _to: account },
                  fromBlock: n,
                  toBlock: 'latest'
                }
              ).then(events => {
                setResult0(events[0].returnValues[2])
              }).then(events => {
                setGameresult(true)
                backGame()
              })
            })
        })
        .on('error', function (error) {
          setPlaying(false)
        });
    }
  }

  async function backGame() {
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    for (let count = 15; count > 0; count--) {
      setPause(count)
      await sleep(1000)
    }
    window.location.reload()
  }

  return (
    <>
      <img className="my-3 rounded-circle" src="https://random.imagecdn.app/256/256" alt="" width="256" height="256" />
      <ConnectChain />
      <ConnectWallet />
      <article>
        {active === true ?
          <div className="game-container bg-secondary">
            <h1>Rock Paper Scissors Game</h1>
            <HistoryGames />
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
                    {userhand === 'Rock' && result0 === true
                      ?
                      "Scissors | You Won: " + (useramount * 2) + " MATIC"
                      :
                      ""
                    }
                    {userhand === 'Papper' && result0 === true
                      ?
                      "Rock | You Won: " + (useramount * 2) + " MATIC"
                      :
                      ""
                    }
                    {userhand === 'Scissors' && result0 === true
                      ?
                      "Papper | You Won: " + (useramount * 2) + " MATIC"
                      :
                      ""
                    }
                    {userhand === 'Rock' && result0 === false
                      ?
                      "Papper | You Loss: " + useramount + " MATIC"
                      :
                      ""
                    }
                    {userhand === 'Papper' && result0 === false
                      ?
                      "Scissors | You Loss: " + useramount + " MATIC"
                      :
                      ""
                    }
                    {userhand === 'Scissors' && result0 === false
                      ?
                      "Rock | You Loss: " + useramount + " MATIC"
                      :
                      ""
                    }
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
                      <input type="radio" name="amount" id="amount1" onChange={handleInputChange} value="0.005" />
                      <span>0.005 MATIC</span>
                    </label>
                  </div>
                  <div className="col">
                    <label className="amount">
                      <input type="radio" name="amount" id="amount2" onChange={handleInputChange} value="0.01" />
                      <span>0.01 MATIC</span>
                    </label>
                  </div>
                  <div className="col">
                    <label className="amount">
                      <input type="radio" name="amount" id="amount3" onChange={handleInputChange} value="0.02" />
                      <span>0.02 MATIC</span>
                    </label>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <label className="amount">
                      <input type="radio" name="amount" id="amount4" onChange={handleInputChange} value="0.04" />
                      <span>0.04 MATIC</span>
                    </label>
                  </div>
                  <div className="col">
                    <label className="amount">
                      <input type="radio" name="amount" id="amount5" onChange={handleInputChange} value="0.08" />
                      <span>0.08 MATIC</span>
                    </label>
                  </div>
                  <div className="col">
                    <label className="amount">
                      <input type="radio" name="amount" id="amount6" onChange={handleInputChange} value="0.16" />
                      <span>0.16 MATIC</span>
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
            <button className="btn-hover btn-start" onClick={openGame}>START</button>
          </div>
        }
      </article >
    </>
  );

}
