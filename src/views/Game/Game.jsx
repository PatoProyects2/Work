import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import RpsGame from '../../abis/RpsGame/rpsGame.json'
import chains from '../../components/Blockchain/AvailableChains'
import HistoryGames from '../../components/Buttons/HistoryGames'
import Rock from '../../images/ROCK.png'
import Papper from '../../images/PAPPER.png'
import Scissors from '../../images/SCISSORS.png'

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
    const buyed = false
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
        .playdos(window.web3.utils.toWei((usergame.amount).toString(), "ether"))
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
    <article>
      {active === true ?
        <div>
          {/* <HistoryGames /> */}
          <br></br>
          <br></br>
          {"Total Games: " + (won + loss)}
          <br></br>
          {"Total Won: " + won}
          <br></br>
          {"Total Loss: " + loss}
          <br></br>
          {"Your Won: " + userwins}
          <br></br>
          {"Your Loss: " + userloses}
          <br></br>
          <br></br>
          {"BNB " + (walletBalances / decimal).toFixed(4)}
          <br></br>
          <br></br>
          {playing === true ?
            <div>
              <h3>Playing... {pause}</h3>
              <br></br>
              {userhand + " | Amount: " + useramount + " BNB"}
              <br></br>
              {gameresult === true
                ?
                <>
                  {userhand === 'Rock' && result0 === true
                    ?
                    "Scissors | You Won: " + (useramount * 2) + " BNB"
                    :
                    ""
                  }
                  {userhand === 'Papper' && result0 === true
                    ?
                    "Rock | You Won: " + (useramount * 2) + " BNB"
                    :
                    ""
                  }
                  {userhand === 'Scissors' && result0 === true
                    ?
                    "Papper | You Won: " + (useramount * 2) + " BNB"
                    :
                    ""
                  }
                  {userhand === 'Rock' && result0 === false
                    ?
                    "Papper | You Loss: " + useramount + " BNB"
                    :
                    ""
                  }
                  {userhand === 'Papper' && result0 === false
                    ?
                    "Scissors | You Loss: " + useramount + " BNB"
                    :
                    ""
                  }
                  {userhand === 'Scissors' && result0 === false
                    ?
                    "Rock | You Loss: " + useramount + " BNB"
                    :
                    ""
                  }
                  <br></br>
                  <br></br>
                </>
                :
                ""
              }
            </div>
            :
            <div>
              {log}
              <h6>I choose</h6>
              <label>
                <input type="radio" name="hand" id="rock" onChange={handleInputChange} value="Rock"></input>
                <img width="50" height="50" src={Rock} alt="" />
              </label>
              <label>
                <input type="radio" name="hand" id="papper" onChange={handleInputChange} value="Papper"></input>
                <img width="50" height="50" src={Papper} alt="" />
              </label>
              <label>
                <input type="radio" name="hand" id="scissors" onChange={handleInputChange} value="Scissors"></input>
                <img width="50" height="50" src={Scissors} alt="" />
              </label>
              <br></br>
              <br></br>
              <h6>For</h6>
              <table>
                <tr>
                  <td>
                    <label>
                      <input type="radio" name="amount" id="amount1" onChange={handleInputChange} value="0.005" />
                      <span>0.005 BNB</span>
                    </label>
                  </td>
                  <td>
                    <label>
                      <input type="radio" name="amount" id="amount2" onChange={handleInputChange} value="0.01" />
                      <span>0.01 BNB</span>
                    </label>
                  </td>
                  <td>
                    <label>
                      <input type="radio" name="amount" id="amount3" onChange={handleInputChange} value="0.02" />
                      <span>0.02 BNB</span>
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>
                      <input type="radio" name="amount" id="amount4" onChange={handleInputChange} value="0.04" />
                      <span>0.04 BNB</span>
                    </label>
                  </td>
                  <td>
                    <label>
                      <input type="radio" name="amount" id="amount5" onChange={handleInputChange} value="0.08" />
                      <span>0.08 BNB</span>
                    </label>
                  </td>
                  <td>
                    <label>
                      <input type="radio" name="amount" id="amount6" onChange={handleInputChange} value="0.16" />
                      <span>0.16 BNB</span>
                    </label>
                  </td>
                </tr>
              </table>
              <br></br>
              <button onClick={startGame}>DOUBLE OR NOTHING</button>
            </div>
          }
        </div>
        :
        <div>
          <button onClick={openGame}>START GAME</button>
        </div>
      }
    </article >
  );

}
