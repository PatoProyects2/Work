import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import RpsGame from '../../abis/RpsGame/rpsGame.json'
import chains from '../../components/Blockchain/AvailableChains'
import HistoryGames from '../../components/Buttons/HistoryGames'
import Rock from '../../images/ROCK.png'
import Papper from '../../images/PAPPER.png'
import Scissors from '../../images/SCISSORS.png'

export default function Game() {
  const [active, setActive] = useState(false);
  const [account, setAccount] = useState('');
  const [walletBalances, setWalletbalances] = useState(0);
  const [userhand, setUserhand] = useState(0);
  const [useramount, setUseramount] = useState(0);
  const [log, setLog] = useState('');
  const [usergame, setUsergame] = useState({
    hand: 0,
    amount: 0
  });
  const [decimal, setDecimal] = useState(1000000000000000000);
  const [rpsgame, setRpsgame] = useState({});
  const [loses, setLoses] = useState(0);
  const [wins, setWins] = useState(0);
  const [userloses, setUserloses] = useState(0);
  const [userwins, setUserwins] = useState(0);
  const [playing, setPlaying] = useState(false);

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
      try {
        let walletBalance = await web3.eth.getBalance(accounts[0])
        setWalletbalances(walletBalance)
      } catch (e) {
        console.log('METAMASK NOT INSTALLED')
      }
      try {
        const rpsgame = new web3.eth.Contract(RpsGame.abi, chainInUse.rpsGameAddress)
        setRpsgame(rpsgame)
        let totalLoses = await rpsgame.methods.totalLoses().call()
        setLoses(totalLoses)
        let totalWins = await rpsgame.methods.totalWins().call()
        setWins(totalWins)
        let userLoses = await rpsgame.methods.winLosesPerUser(accounts[0], 0).call()
        setUserloses(userLoses)
        let userWins = await rpsgame.methods.winLosesPerUser(accounts[0], 1).call()
        setUserwins(userWins)
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

    if (usergame.hand !== 0 && usergame.amount !== 0) {
      setPlaying(true)
      rpsgame.methods
        .playdos(usergame.hand)
        .send({
          from: account,
          value: window.web3.utils.toWei((usergame.amount).toString(), "ether"),
        })
        .on('receipt', (hash) => {
          window.location.reload()
        })
        .on('error', function (error) {
          setPlaying(false)
        });
    }
  }

  return (
    <article>
      {active === true ?
        <div>
          <HistoryGames />
          <br></br>
          <br></br>
          {"Total Loses: " + loses}
          <br></br>
          {"Total Wins: " + wins}
          <br></br>
          {"Your Loses: " + userloses}
          <br></br>
          {"Your Wins: " + userwins}
          <br></br>
          <br></br>
          {"BNB " + (walletBalances / decimal).toFixed(4)}
          <br></br>
          <br></br>
          {log}
          <h6>I choose</h6>
          <label>
            <input type="radio" name="hand" id="rock" onChange={handleInputChange} value="0"></input>
            <img width="50" height="50" src={Rock} alt="" />
          </label>
          <label>
            <input type="radio" name="hand" id="papper" onChange={handleInputChange} value="1"></input>
            <img width="50" height="50" src={Papper} alt="" />
          </label>
          <label>
            <input type="radio" name="hand" id="scissors" onChange={handleInputChange} value="2"></input>
            <img width="50" height="50" src={Scissors} alt="" />
          </label>
          <br></br>
          <br></br>
          <h6>For</h6>
          <label>
            <input type="radio" name="amount" id="amount1" onChange={handleInputChange} value="0.005" />
            <span>0.005 BNB</span>
          </label>
          <label>
            <input type="radio" name="amount" id="amount2" onChange={handleInputChange} value="0.01" />
            <span>0.01 BNB</span>
          </label>
          <label>
            <input type="radio" name="amount" id="amount3" onChange={handleInputChange} value="0.02" />
            <span>0.02 BNB</span>
          </label>
          <label>
            <input type="radio" name="amount" id="amount4" onChange={handleInputChange} value="0.05" />
            <span>0.05 BNB</span>
          </label>
          <label>
            <input type="radio" name="amount" id="amount5" onChange={handleInputChange} value="0.1" />
            <span>0.1 BNB</span>
          </label>
          <label>
            <input type="radio" name="amount" id="amount6" onChange={handleInputChange} value="0.2" />
            <span>0.2 BNB</span>
          </label>
          <br></br>
          <br></br>
          <button onClick={startGame}>DOUBLE OR NOTHING</button>
          <br></br>
          {"hand: " + userhand + " amount: " + useramount}
        </div>
        :
        <div>
          <button onClick={openGame}>START</button>
        </div>
      }
    </article >
  );

}
