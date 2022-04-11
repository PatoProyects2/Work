import React, { useState, useEffect, useContext } from 'react'
import Web3 from 'web3'
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Torus from "@toruslabs/torus-embed";
import Portis from "@portis/web3";
import ethProvider from "eth-provider";
import WalletLink from "walletlink";
import { doc, getDoc, setDoc, updateDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useMixpanel } from 'react-mixpanel-browser';
import toast from 'react-hot-toast';
import RpsGamePolygon from '../../abis/rpsGamePolygon/rpsGame.json'
import swapV2 from '../../abis/swap/IUniswapV2Router02.json'
import { polygonSwapContract, maticContract, usdcContract, rpsGamePolygonContract } from '../../components/blockchain/Contracts'
import HistoryGames from './components/HistoryGames'
import ConnectWallet from './components/ConnectWallet'
import WinStreakLeaderboard from './components/WinStreakLeaderboard'
import ReadAllGames from '../../firebase/ReadAllGames'
import { ReadUnixTime } from '../../firebase/ReadUnixTime'
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
import { Context } from '../../context/Context'
export default function Rps() {
  const { discordId } = useContext(Context);
  const { setBalance } = useContext(Context);
  const [web3, setWeb3] = useState({});
  const [rpsgame, setRpsgame] = useState({});
  const [swapPolygon, setSwapPolygon] = useState({});
  const [userData, setUserData] = useState({});
  const [web3ModalInfo, setWeb3ModalInfo] = useState({});
  const [usergame, setUsergame] = useState({
    hand: '',
    amount: 0
  });
  const [account, setAccount] = useState('0x000000000000000000000000000000000000dEaD');
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
  const [doubleOrNothingStatus, setDoubleOrNothingStatus] = useState(undefined);
  const [showGameResult, setShowGameResult] = useState(false);
  const isMobileResolution = useMatchMedia('(max-width:650px)', false);
  const unixTimeStamp = ReadUnixTime();
  const mixpanel = useMixpanel();

  useEffect(() => {
    let token = window.localStorage.getItem('loggedUser')
    if (!token) {
      toast('Log in if you want to save you game stats and ahievements', {
        duration: 30000,
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
  }, [discordId])

  useEffect(() => {
    loadUserGame()
    return () => {
      setUserData({});
    };
  }, [account, discordId])

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
        if (data.rps.totalGames > 9 && data.rps.totalGames < 20 && data.level < 2) {
          updateDoc(doc(db, "clubUsers", discordId), {
            level: 2
          })
          toast('You reach level 2, congrats!', {
            icon: '🆙',
          });
        }
        if (data.rps.totalGames > 19 && data.rps.totalGames < 30 && data.level < 3) {
          updateDoc(doc(db, "clubUsers", discordId), {
            level: 3
          })
          toast('You reach level 3, congrats!', {
            icon: '🆙',
          });
        }
        if (data.rps.totalGames > 29 && data.rps.totalGames < 40 && data.level < 4) {
          updateDoc(doc(db, "clubUsers", discordId), {
            level: 4
          })
          toast('You reach level 4, congrats!', {
            icon: '🆙',
          });
        }
        if (data.rps.totalGames > 39 && data.rps.totalGames < 50 && data.level < 5) {
          updateDoc(doc(db, "clubUsers", discordId), {
            level: 5
          })
          toast('You reach level 5, congrats!', {
            icon: '🆙',
          });
        }
        if (data.rps.totalGames > 49 && data.rps.totalGames < 65 && data.level < 6) {
          updateDoc(doc(db, "clubUsers", discordId), {
            level: 6
          })
          toast('You reach level 6, congrats!', {
            icon: '🆙',
          });
        }
        if (data.rps.totalGames > 64 && data.rps.totalGames < 80 && data.level < 7) {
          updateDoc(doc(db, "clubUsers", discordId), {
            level: 7
          })
          toast('You reach level 7, congrats!', {
            icon: '🆙',
          });
        }
        if (data.rps.totalGames > 79 && data.rps.totalGames < 95 && data.level < 8) {
          updateDoc(doc(db, "clubUsers", discordId), {
            level: 8
          })
          toast('You reach level 8, congrats!', {
            icon: '🆙',
          });
        }
        if (data.rps.totalGames > 94 && data.rps.totalGames < 110 && data.level < 9) {
          updateDoc(doc(db, "clubUsers", discordId), {
            level: 9
          })
          toast('You reach level 9, congrats!', {
            icon: '🆙',
          });
        }
        if (data.rps.totalGames > 109 && data.rps.totalGames < 125 && data.level < 10) {
          updateDoc(doc(db, "clubUsers", discordId), {
            level: 10
          })
          toast('You reach level 10, congrats!', {
            icon: '🆙',
          });
        }
        if (data.rps.totalGames > 124 && data.rps.totalGames < 150 && data.level < 11) {
          updateDoc(doc(db, "clubUsers", discordId), {
            level: 11
          })
          toast('You reach level 11, congrats!', {
            icon: '🆙',
          });
        }
        if (data.rps.totalGames > 149 && data.rps.totalGames < 200 && data.level < 12) {
          updateDoc(doc(db, "clubUsers", discordId), {
            level: 12
          })
          toast('You reach level 12, congrats!', {
            icon: '🆙',
          });
        }
        if (data.rps.totalGames > 199 && data.rps.totalGames < 250 && data.level < 13) {
          updateDoc(doc(db, "clubUsers", discordId), {
            level: 13
          })
          toast('You reach level 13, congrats!', {
            icon: '🆙',
          });
        }
        if (data.rps.totalGames > 249 && data.rps.totalGames < 300 && data.level < 14) {
          updateDoc(doc(db, "clubUsers", discordId), {
            level: 14
          })
          toast('You reach level 14, congrats!', {
            icon: '🆙',
          });
        }
        if (data.rps.totalGames > 299 && data.rps.totalGames < 350 && data.level < 15) {
          updateDoc(doc(db, "clubUsers", discordId), {
            level: 15
          })
          toast('You reach level 15, congrats!', {
            icon: '🆙',
          });
        }
        if (data.rps.totalGames > 349 && data.rps.totalGames < 390 && data.level < 16) {
          updateDoc(doc(db, "clubUsers", discordId), {
            level: 16
          })
          toast('You reach level 16, congrats!', {
            icon: '🆙',
          });
        }
        if (data.rps.totalGames > 389 && data.rps.totalGames < 430 && data.level < 17) {
          updateDoc(doc(db, "clubUsers", discordId), {
            level: 17
          })
          toast('You reach level 17, congrats!', {
            icon: '🆙',
          });
        }
        if (data.rps.totalGames > 429 && data.rps.totalGames < 470 && data.level < 18) {
          updateDoc(doc(db, "clubUsers", discordId), {
            level: 18
          })
          toast('You reach level 18, congrats!', {
            icon: '🆙',
          });
        }
        if (data.rps.totalGames > 469 && data.rps.totalGames < 510 && data.level < 19) {
          updateDoc(doc(db, "clubUsers", discordId), {
            level: 19
          })
          toast('You reach level 19, congrats!', {
            icon: '🆙',
          });
        }
        if (data.rps.totalGames > 509 && data.rps.totalGames < 550 && data.level < 20) {
          updateDoc(doc(db, "clubUsers", discordId), {
            level: 20
          })
          toast('You reach level 20, congrats!', {
            icon: '🆙',
          });
        }
        if (data.rps.totalGames > 549 && data.rps.totalGames < 600 && data.level < 21) {
          updateDoc(doc(db, "clubUsers", discordId), {
            level: 21
          })
          toast('You reach level 21, congrats!', {
            icon: '🆙',
          });
        }
        if (data.rps.totalGames > 599 && data.rps.totalGames < 650 && data.level < 22) {
          updateDoc(doc(db, "clubUsers", discordId), {
            level: 22
          })
          toast('You reach level 22, congrats!', {
            icon: '🆙',
          });
        }
        if (data.rps.totalGames > 649 && data.rps.totalGames < 700 && data.level < 23) {
          updateDoc(doc(db, "clubUsers", discordId), {
            level: 23
          })
          toast('You reach level 23, congrats!', {
            icon: '🆙',
          });
        }
        if (data.rps.totalGames > 699 && data.rps.totalGames < 750 && data.level < 24) {
          updateDoc(doc(db, "clubUsers", discordId), {
            level: 24
          })
          toast('You reach level 24, congrats!', {
            icon: '🆙',
          });
        }
        if (data.rps.totalGames > 749 && data.level < 25) {
          updateDoc(doc(db, "clubUsers", discordId), {
            level: 25
          })
          toast('You reach level 25, congrats!', {
            icon: '🆙',
          });
        }
      }
    } else {
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
          }
          setDoc(doc(db, "anonUsers", account), arrayData).then(loadUserGame())
        }
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
            137: "https://polygon-mainnet.infura.io/v3/90d296c660054ac58664fde980846688",
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
            host: "https://polygon-mainnet.infura.io/v3/90d296c660054ac58664fde980846688",
            chainId: 137,
            networkId: 137,
            blockExplorer: "https://polygonscan.com/",
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
          network: "matic",
        },
      },
      walletlink: {
        display: {
          description: " ",
        },
        package: WalletLink,
        options: {
          appName: "RPS",
          rpc: "https://polygon-mainnet.infura.io/v3/90d296c660054ac58664fde980846688",
          chainId: 137,
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
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0].toLowerCase())
      ethereum.on('accountsChanged', () => {
        window.location.reload()
      });
      web3.eth.getBalance(accounts[0])
        .then(b => {
          setBalance(b)
          setWalletBalance(b)
        })
        .catch(err => console.log(err))
      const chainId = await web3.eth.getChainId();
      setNetwork(chainId)
      if (chainId === 137) {
        const polygonSwap = new web3.eth.Contract(swapV2.abi, polygonSwapContract)
        setSwapPolygon(polygonSwap)
        const rpsgame = new web3.eth.Contract(RpsGamePolygon.abi, rpsGamePolygonContract)
        setRpsgame(rpsgame)
      }
      // if (chainId === 80001) {
      //   const rpsgame = new web3.eth.Contract(RpsGame.abi, rpsGameContract)
      //   setRpsgame(rpsgame)
      // }
      ethereum.on('chainChanged', () => {
        window.location.reload()
      });
      if (chainId !== 137) {
        try {
          await ethereum.sendAsync({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: "0x89",
              chainName: "Polygon Mainnet",
              rpcUrls: ["https://polygon-rpc.com/"],
              iconUrls: [""],
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
              },
              blockExplorerUrls: ["https://explorer.matic.network/"],
            }],
          });
        } catch (error) {

        }
      }
    } catch (e) {

    }
  }

  const disconnectWallet = () => {
    web3ModalInfo.clearCachedProvider();
    setActive(false)
    setAccount('0x000000000000000000000000000000000000dEaD')
  }

  const openGame = () => {
    if (network === 137) {
      setActive(true)
    } else {
      toast.error("Select a valid network")
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
    if (document.getElementById('rock').checked || document.getElementById('paper').checked || document.getElementById('scissors').checked) {
      setUserhand(usergame.hand)
    } else {
      toast.error("Select the betting hand")
      setDoubleOrNothingStatus(false)
      return false
    }
    if (document.getElementById('amount1').checked || document.getElementById('amount2').checked || document.getElementById('amount3').checked || document.getElementById('amount4').checked || document.getElementById('amount5').checked || document.getElementById('amount6').checked) {
      setUseramount(usergame.amount)
    } else {
      toast.error("Select the bet amount")
      setDoubleOrNothingStatus(false)
      return false
    }

    var time = unixTimeStamp
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    setDoubleOrNothingStatus(true)
    setPlaying(true)
    setAnimation(true)

    let myEvents = []
    let actuallBlock = 0
    let dayBlock = 0
    let maticPrice = 0
    let profit = 0
    let calculateValue = 0
    let usdAmount = 0
    let options = {}
    const inputAmount = web3.utils.toWei(usergame.amount.toString(), "ether")
    try {
      actuallBlock = await web3.eth.getBlockNumber()
      calculateValue = await rpsgame.methods.calculateValue(inputAmount).call()
      maticPrice = await swapPolygon.methods.getAmountsOut(decimal.toString(), [maticContract, usdcContract]).call()
      usdAmount = (parseInt(maticPrice[1] / 10000) / 100) * usergame.amount
      dayBlock = actuallBlock - 43200
      options = {
        filter: {
          _to: account
        },
        fromBlock: actuallBlock,
        toBlock: 'latest'
      };
      rpsgame.methods
        .play(inputAmount)
        .send({
          from: account,
          value: calculateValue,
          gasPrice: '40000000000'
        })
        .catch((err) => {
          if (err.code === 4001) {
            toast.error("User denied transaction signature")
            myEvents[0] = false
            setDoubleOrNothingStatus(false)
            setPlaying(false)
            setAnimation(false)
            return false
          } else {
            toast.warning("Pending transaction")
          }
        });
    } catch (e) {

    }

    do {
      try {
        myEvents = await rpsgame.getPastEvents('Play', options)
      } catch (e) {

      }
      await sleep(1000)
    } while (myEvents[0] === undefined);

    if (discordId !== '') {
      const q = doc(db, "clubUsers", discordId)
      const d = await getDoc(q)
      let playerDocument = d.data()
      if (playerDocument.rps.lastGameBlock < actuallBlock) {
        if (myEvents[0]) {
          if (myEvents[0].blockNumber > playerDocument.rps.lastGameBlock) {
            updateDoc(doc(db, "clubUsers", discordId), {
              "rps.totalGames": playerDocument.rps.totalGames + 1,
              "rps.totalAmount": playerDocument.rps.totalAmount + usdAmount,
              "rps.lastGameBlock": myEvents[0].blockNumber
            })
            if (myEvents[0].returnValues[3] === true) {
              updateDoc(doc(db, "clubUsers", discordId), {
                "rps.gameWon": playerDocument.rps.gameWon + 1,
                "rps.amountWon": playerDocument.rps.amountWon + usdAmount
              })
              profit = (playerDocument.rps.amountWon - playerDocument.rps.amountLoss) + usdAmount
            }
            if (myEvents[0].returnValues[3] === false) {
              updateDoc(doc(db, "clubUsers", discordId), {
                "rps.gameLoss": playerDocument.rps.gameLoss + 1,
                "rps.amountLoss": playerDocument.rps.amountLoss + usdAmount
              })
              profit = (playerDocument.rps.amountWon - playerDocument.rps.amountLoss) - usdAmount
            }
            if (myEvents[0].returnValues[2] > playerDocument.rps.dayWinStreak || dayBlock > playerDocument.rps.winStreakTime) {
              updateDoc(doc(db, "clubUsers", discordId), {
                "rps.dayWinStreak": parseInt(myEvents[0].returnValues[2]),
                "rps.winStreakTime": serverTimestamp()
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
              createdAt: time,
              uid: playerDocument.uid,
              block: myEvents[0].blockNumber,
              name: playerDocument.name,
              photo: playerDocument.photo,
              account: myEvents[0].returnValues[0].toLowerCase(),
              amount: usdAmount,
              maticAmount: parseInt(usergame.amount),
              streak: parseInt(myEvents[0].returnValues[2]),
              result: myEvents[0].returnValues[3],
              game: 'RPS',
              profit: profit
            })
            mixpanel.track(
              "rps",
              {
                "account": myEvents[0].returnValues[0].toLowerCase(),
                "result": myEvents[0].returnValues[3],
                "streak": parseInt(myEvents[0].returnValues[2])
              }
            );
            setUserGameResult(myEvents[0].returnValues[3])
            setUserGameStreak(myEvents[0].returnValues[2])
            setShowGameResult(true)
            setDoubleOrNothingStatus(false)
          }
        }
      } else {
        toast.error("Wait some seconds to play again")
        setDoubleOrNothingStatus(false)
        setPlaying(false)
        setAnimation(false)
        return false
      }
    } else {
      const anonQ = doc(db, "anonUsers", account)
      const anonD = await getDoc(anonQ)
      let anonymousDocument = anonD.data()
      if (myEvents[0] && anonymousDocument) {
        addDoc(collection(db, "allGames"), {
          createdAt: time,
          uid: anonymousDocument.uid,
          block: myEvents[0].blockNumber,
          name: anonymousDocument.name,
          photo: anonymousDocument.photo,
          account: myEvents[0].returnValues[0].toLowerCase(),
          amount: usdAmount,
          maticAmount: parseInt(usergame.amount),
          streak: parseInt(myEvents[0].returnValues[2]),
          result: myEvents[0].returnValues[3],
          game: 'RPS',
        })
        mixpanel.track(
          "rps",
          {
            "account": myEvents[0].returnValues[0].toLowerCase(),
            "result": myEvents[0].returnValues[3],
            "streak": parseInt(myEvents[0].returnValues[2])
          }
        );
        setUserGameResult(myEvents[0].returnValues[3])
        setUserGameStreak(myEvents[0].returnValues[2])
        setShowGameResult(true)
        setDoubleOrNothingStatus(false)
      }
    }
  }

  const showResult = () => {
    if (userGameResult) {
      toast.success("You doubled your money, congrats!")
    }
    web3.eth.getBalance(account)
      .then(b => {
        setBalance(b)
        setWalletBalance(b)
      })
      .catch(err => console.log(err))
    loadUserGame()
    setAnimation(false)
    setShowGameResult(false)
    setGameResult(true)
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
        <div className="d-flex flex-row justify-content-start gap-1">
          {account !== '0x000000000000000000000000000000000000dEaD' ?
            <>
              <HistoryGames
                isMobileResolution={isMobileResolution}
                unixTimeStamp={unixTimeStamp}
              />
              <WinStreakLeaderboard
                isMobileResolution={isMobileResolution}
                unixTimeStamp={unixTimeStamp}
              />
              <ConnectWallet
                decimal={decimal}
                web3={web3}
                account={account}
                walletBalance={walletBalance}
                disconnectWallet={disconnectWallet}
                userData={userData}
                user={discordId}
                toast={toast}
              />
            </>
            :
            ""
          }
        </div>
        :
        <div className="d-flex flex-row justify-content-between mt-3">
          {account !== '0x000000000000000000000000000000000000dEaD' ?
            <>
              <div className="d-flex flex-row gap-3">
                <HistoryGames
                  isMobileResolution={isMobileResolution}
                  unixTimeStamp={unixTimeStamp}
                />
                <WinStreakLeaderboard
                  isMobileResolution={isMobileResolution}
                  unixTimeStamp={unixTimeStamp}
                />
                <ConnectWallet
                  decimal={decimal}
                  web3={web3}
                  account={account}
                  walletBalance={walletBalance}
                  disconnectWallet={disconnectWallet}
                  userData={userData}
                  user={discordId}
                  toast={toast}
                />
              </div>
            </>
            :
            ""
          }
        </div>
      }
      <article>
        {active ?
          <>
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
                  {gameResult === true &&
                    <>
                      {userGameStreak > 1 &&
                        <div className="mb-5">
                          <h3>Congrats!</h3>
                          <h3>{"You're on a " + userGameStreak + " win streak"}</h3>
                        </div>
                      }
                      {userhand === 'ROCK' && userGameResult === true &&
                        <div className="d-flex justify-content-center mt-4">
                          <img className="result-rps-image" src={RockWin} alt="Rock Wins" />
                        </div>
                      }
                      {userhand === 'PAPER' && userGameResult === true &&
                        <div className="d-flex justify-content-center mt-4">
                          <img className="result-rps-image" src={PaperWin} alt="Paper Wins" />
                        </div>
                      }
                      {userhand === 'SCISSORS' && userGameResult === true &&
                        <div className="d-flex justify-content-center mt-4">
                          <img className="result-rps-image" src={ScissorsWin} alt="Scissors Wins" />
                        </div>
                      }
                      {userhand === 'ROCK' && userGameResult === false &&
                        <div className="d-flex justify-content-center mt-4">
                          <img className="result-rps-image" src={RockLose} alt="Rock Loses" />
                        </div>
                      }
                      {userhand === 'PAPER' && userGameResult === false &&
                        <div className="d-flex justify-content-center mt-4">
                          <img className="result-rps-image" src={PaperLose} alt="Paper Loses" />
                        </div>
                      }
                      {userhand === 'SCISSORS' && userGameResult === false &&
                        <div className="d-flex justify-content-center mt-4">
                          <img className="result-rps-image" src={ScissorsLose} alt="Scissors Loses" />
                        </div>
                      }
                      <div className="d-flex flex-column flex-md-row justify-content-between w-50 mx-auto mt-4">
                        <div className="d-flex flex-column justify-content-center">
                          <span className="rps-result-title">{userGameResult === true ? " YOU WON " : ""}{userGameResult === false ? " YOU LOST " : ""}</span>
                          <span className="rps-result-amount" style={{ color: userGameResult ? "mediumseagreen" : "crimson" }}>
                            {userGameResult === true ? useramount * 2 : ""}{userGameResult === false ? useramount : ""}{" MATIC"}
                          </span>
                        </div>
                        <div className="d-flex justify-content-center">
                          {userGameResult === true ?
                            <button className="btn-hover btn-green" onClick={backGame}>CLAIM REWARD</button>
                            :
                            <div className="d-flex flex-column align-items-center">
                              <span className="rps-result-title">TRY AGAIN?</span>
                              <button className="btn-hover btn-start" onClick={backGame}>DOUBLE OR NOTHING</button>
                            </div>
                          }
                        </div>
                      </div>
                    </>
                  }
                </div>
                :
                <div>
                  <div className="d-flex justify-content-center">
                    <label>
                      <input type="radio" name="hand" id="rock" onChange={handleInputChange} value="ROCK"></input>
                      <div className="rps-img rock-img"></div>
                      <i className="fa-regular fa-circle-check fa-2xl fa-beat selected-option"></i>
                    </label>
                    <label>
                      <input type="radio" name="hand" id="paper" onChange={handleInputChange} value="PAPER"></input>
                      <div className="rps-img paper-img"></div>
                      <i className="fa-regular fa-circle-check fa-2xl fa-beat selected-option"></i>
                    </label>
                    <label>
                      <input type="radio" name="hand" id="scissors" onChange={handleInputChange} value="SCISSORS"></input>
                      <div className="rps-img scissors-img"></div>
                      <i className="fa-regular fa-circle-check fa-2xl fa-beat selected-option"></i>
                    </label>
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
                  <button onClick={doubleOrNothing} className="btn-hover btn-green" disabled={doubleOrNothingStatus}>DOUBLE OR NOTHING</button>
                </div>
              }
            </div>
          </>
          :
          <>
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
                <div className="text-center">
                  <button className="btn-hover btn-start" onClick={openGame}>DOUBLE OR NOTHING</button>
                </div>
                <ReadAllGames isMobileResolution={isMobileResolution} />
              </>
              :
              <>
                <ConnectWallet toast={toast} connectWeb3Modal={connectWeb3Modal} decimal={decimal} web3={web3} account={account} />
              </>
            }
          </>
        }
      </article >
    </>
  );
}