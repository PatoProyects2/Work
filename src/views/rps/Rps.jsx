import { useContext, useEffect, useState, useRef } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { useMixpanel } from "react-mixpanel-browser";
import winSound from "../../assets/audio/win_sound.mpeg";
import RPSGames from "../../assets/imgs/Home Page/RPS Games.png";
import lose1 from "../../assets/imgs/result/lose1.gif";
import lose2 from "../../assets/imgs/result/lose2.png";
import win1 from "../../assets/imgs/result/win1.gif";
import win2 from "../../assets/imgs/result/win2.png";
import ConnectWallet from "../../components/WalletButton/WalletButton";
import { db } from "../../config/firesbaseConfig";
import { Context } from "../../context/Context";
import { useLoad } from "../../hooks/useLoad";
import { useStats } from "../../hooks/useStats";
import { useTime } from "../../hooks/useTime";
import { useWeb3 } from "../../hooks/useWeb3";
import {
  Amounts,
  Hands,
  Play,
  Result,
  RpsImage,
} from "./components/Modals/Modals";

const RPS = () => {
  const screen = useRef(null);
  const { discordId, balance, soundToggle, gas } = useContext(Context);
  const {
    web3,
    rpsgame,
    network,
    account,
    maticPrice,
    readBlockchainData,
    disconnectWallet,
  } = useWeb3();
  const mixpanel = useMixpanel();
  const unixTime = useTime();
  const dotLog = useLoad();

  const [userData, setUserData] = useState({});
  const [usergame, setUsergame] = useState({ hand: "", amount: 0 });
  const [gameResult, setGameResult] = useState({
    userResult: false,
    userStreak: 0,
    gameBlock: 0,
  });
  const [gameLog, setGameLog] = useState("");
  const [randomItem, setRandomItem] = useState("");
  const [playing, setPlaying] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [gameId, setGameId] = useState(false);
  const [save, setSave] = useState(false);
  const [busyNetwork, setBusyNetwork] = useState(false);
  const [result, setResult] = useState(false);
  const [load, setLoad] = useState(false);

  const music = new Audio(winSound);
  const local = window.localStorage.getItem("token");

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const scrollToBottom = () => {
    screen.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [load, account, playing]);

  useEffect(() => {
    setLoad(true);
    if (local === null) {
      toast("Log in if you want to save you game stats and ahievements", {
        duration: 10000,
        position: "top-right",
        style: {},
        className: "pop-up toast-modal",
        icon: <i className="fa-solid fa-circle-info text-primary"></i>,
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    }
  }, [local]);

  useEffect(() => {
    loadUserGame();
    return () => {
      setUserData({});
    };
  }, [account, discordId]);

  const loadUserGame = async () => {
    mixpanel.init(process.env.REACT_APP_MIXPANEL_KEY, { debug: false });
    mixpanel.track("Sign up");
    const deadWallet = "0x000000000000000000000000000000000000dEaD";
    if (account !== undefined && account !== deadWallet) {
      if (discordId !== "") {
        const document = await getDoc(doc(db, "clubUsers", discordId));
        const data = document.data();
        if (data) {
          setUserData(data);
          if (data.account === "") {
            updateDoc(doc(db, "clubUsers", discordId), {
              account: account,
            }).then(loadUserGame());
          }
        }
      } else {
        const anonDoc = await getDoc(doc(db, "anonUsers", account));
        const anonData = anonDoc.data();
        if (!anonData) {
          const arrayData = {
            uid: "anonymous",
            account: account,
            name: "",
            photo:
              "https://firebasestorage.googleapis.com/v0/b/games-club-dce4d.appspot.com/o/ClubLogo.png?alt=media&token=5dd64484-c99f-4ce9-a06b-0a3ee112b37b",
            level: 1,
            rps: {
              lastGameBlock: 0,
            },
          };
          setDoc(doc(db, "anonUsers", account), arrayData).then(loadUserGame());
        }
      }
    }
  };

  useEffect(() => {
    let arrayOptions = ["a", "b", "c", "d", "e", "f"];
    var randomArray = (Math.random() * arrayOptions.length) | 0;
    var result = arrayOptions[randomArray];
    setRandomItem(result);
  }, []);

  const handleInputChange = (event) => {
    setUsergame({
      ...usergame,
      [event.target.name]: event.target.value,
    });
  };

  const verifyGame = async () => {
    if (account === "") {
      toast.error("We cannot detect your wallet, please reload the website");
      return false;
    }
    if (usergame.hand === "") {
      toast.error("Select a hand");
      return false;
    }
    if (usergame.amount === 0) {
      toast.error("Select an amount");
      return false;
    }
    if (document.getElementById("age").checked === false) {
      toast.error("Confirm that you are at least 18 years old");
      return false;
    }
    if (network !== 137) {
      toast.error("Network not supported, please select Polygon network");
      return false;
    }
    if (balance === "") {
      toast.error(
        "We cannot connect to Polygon network, please try changing your network RPC in your wallet"
      );
      return false;
    }

    const inputAmount = web3.utils.toWei(usergame.amount.toString(), "ether");

    const feeValue = await rpsgame.methods.calculateValue(inputAmount).call();

    doubleOrNothing(inputAmount, feeValue);
    setGameLog("WAITING FOR DEPOSIT");
    setPlaying(true);
    setAnimation(true);
  };

  const doubleOrNothing = async (inputAmount, feeValue) => {
    const actuallBlock = await web3.eth.getBlockNumber();

    if (actuallBlock) {
      const query =
        discordId !== ""
          ? doc(db, "clubUsers", discordId)
          : doc(db, "anonUsers", account);
      const document = await getDoc(query);
      const playerDocument = document.data();

      const lastGame = playerDocument.rps.lastGameBlock;

      if (actuallBlock > lastGame) {
        rpsgame.methods
          .play(inputAmount)
          .send({
            from: account,
            value: feeValue,
            gasPrice: web3.utils.toWei(gas.value.toString(), "gwei"),
            gasLimit: 500000,
          })
          .on("transactionHash", function (hash) {
            setGameLog("PLAYING");
          })
          // .on("confirmation", function (confirmationNumber, receipt) {})
          .on("receipt", async function (playEvent) {
            const gameId = parseInt(
              playEvent.events.BetPlaced.returnValues.betId
            );
            setGameLog("SAVING YOUR GAME");
            setGameId(gameId);
            // const gameBlock = playEvent.blockNumber;
            const txHash = playEvent.transactionHash;
            var betGame = [false, false, false, false, false, false];
            while (!betGame[5]) {
              try {
                betGame = await rpsgame.methods.bets(gameId).call();
              } catch (err) {}
              await sleep(1000);
            }
            if (betGame[5]) {
              setGameLog("GAME SAVED");
              saveBlockchainEvents(betGame, playerDocument, txHash, gameId);
            }
          })
          .on("error", async function (err, receipt) {
            if (err.code === -32603) {
              toast.error("This transaction needs more gas to be executed");
              backGame();
              return false;
            }
            if (err.code === 4001) {
              toast.error("You denied transaction signature");
              backGame();
              return false;
            }
            console.log({ err, receipt });
            // if (err.code !== -32603 && err.code !== 4001) {
            //   setBusyNetwork(true);
            //   let playEvent = undefined;
            //   var warningBlockchain = toast.loading(
            //     "This transaction is taking too long because the network is busy, please check the status of your transaction in your wallet"
            //   );
            //   setGameLog("BE PATIENT NETWORK IS BUSY");
            //   const gameId = parseInt(
            //     playEvent.events.BetPlaced.returnValues.betId
            //   );
            //   const gameBlock = playEvent.blockNumber;
            //   const txHash = playEvent.transactionHash;

            //   for (let i = 0; i < 1000; i++) {
            //     try {
            //       const betGame = await rpsgame.methods.bets(gameId).call();
            //       if (
            //         parseInt(betGame[0]) !== 0 &&
            //         parseInt(betGame[1]) === gameBlock
            //       ) {
            //         saveBlockchainEvents(
            //           betGame,
            //           playerDocument,
            //           txHash,
            //           gameId
            //         );
            //         setBusyNetwork(false);
            //         break;
            //       }
            //     } catch (err) {}
            //     await sleep(1000);
            //   }
            //   toast.dismiss(warningBlockchain);
            // }
          });
      } else {
        toast.error(
          "We have an issue reading the blockchain or you are playing too fast, please try again in a few seconds"
        );
        setPlaying(false);
        setAnimation(false);
        return false;
      }
    }
  };

  const saveBlockchainEvents = async (
    betGame,
    playerDocument,
    txHash,
    gameId
  ) => {
    const userResult = parseInt(betGame[3]) > 0 ? true : false;
    const userStreak = userResult ? playerDocument.rps.winStreak + 1 : 0;
    const userBlock = parseInt(betGame[1]);
    const maticAmount = parseInt(
      web3.utils.fromWei(betGame[2].toString(), "ether")
    );
    const usdAmount = maticAmount * maticPrice;
    const account = betGame[4].toLowerCase();

    if (discordId !== "") {
      const level = playerDocument.level;
      const totalGames =
        playerDocument.rps.gameWon + playerDocument.rps.gameLoss + 1;
      const userGame = userResult
        ? playerDocument.rps.gameWon + 1
        : playerDocument.rps.gameLoss + 1;
      const userAmount = userResult
        ? playerDocument.rps.amountWon + usdAmount
        : playerDocument.rps.amountLoss + usdAmount;
      const profit =
        playerDocument.rps.amountWon - playerDocument.rps.amountLoss;
      const userProfit = userResult ? profit + usdAmount : profit - usdAmount;
      const rockHand = usergame.hand === "ROCK" && playerDocument.rps.rock + 1;
      const paperHand =
        usergame.hand === "PAPER" && playerDocument.rps.paper + 1;
      const scissorsHand =
        usergame.hand === "SCISSORS" && playerDocument.rps.scissors + 1;

      useStats({ level, totalGames, discordId });

      if (userResult) {
        updateDoc(doc(db, "clubUsers", discordId), {
          "rps.gameWon": userGame,
          "rps.amountWon": userAmount,
          "rps.lastGameBlock": userBlock,
          "rps.winStreak": userStreak,
          "rps.winStreakTime": unixTime,
        });
      } else {
        updateDoc(doc(db, "clubUsers", discordId), {
          "rps.gameLoss": userGame,
          "rps.amountLoss": userAmount,
          "rps.lastGameBlock": userBlock,
          "rps.winStreak": userStreak,
        });
      }
      if (userStreak > playerDocument.rps.topWinStreak) {
        updateDoc(doc(db, "clubUsers", discordId), {
          "rps.topWinStreak": userStreak,
        });
      }
      if (usergame.hand === "ROCK") {
        updateDoc(doc(db, "clubUsers", discordId), {
          "rps.rock": rockHand,
        });
      }
      if (usergame.hand === "PAPER") {
        updateDoc(doc(db, "clubUsers", discordId), {
          "rps.paper": paperHand,
        });
      }
      if (usergame.hand === "SCISSORS") {
        updateDoc(doc(db, "clubUsers", discordId), {
          "rps.scissors": scissorsHand,
        });
      }

      addDoc(collection(db, "allGames"), {
        createdAt: unixTime,
        uid: playerDocument.uid,
        block: userBlock,
        name: playerDocument.name,
        photo: playerDocument.photo,
        account: account,
        amount: usdAmount,
        maticAmount: maticAmount,
        streak: userStreak,
        result: userResult,
        game: "RPS",
        profit: userProfit,
        txHash: txHash,
        gameId: gameId,
      });
    } else {
      updateDoc(doc(db, "anonUsers", account), {
        "rps.lastGameBlock": userBlock,
      });

      addDoc(collection(db, "allGames"), {
        createdAt: unixTime,
        uid: playerDocument.uid,
        block: userBlock,
        name: playerDocument.name,
        photo: playerDocument.photo,
        account: account,
        amount: usdAmount,
        maticAmount: maticAmount,
        streak: 0,
        result: userResult,
        game: "RPS",
        profit: 0,
        txHash: txHash,
        gameId: gameId,
      });
    }

    mixpanel.track("rps", {
      account: account,
      streak: userStreak,
      result: userResult,
    });

    setGameResult({ userResult, userStreak, userBlock });
    setSave(true);
  };

  const showResult = async () => {
    setAnimation(false);
    setResult(true);

    let arrayOptions = ["a", "b"];
    var randomArray = (Math.random() * arrayOptions.length) | 0;
    var result = arrayOptions[randomArray];

    const toastOptions = {
      duration: 5000,
      position: "bottom-left",
      style: {},
      className: "pop-up toast-modal",
      icon:
        result === "a" ? (
          <img
            src={gameResult.userResult ? win1 : lose1}
            width="25"
            height="25"
            alt=""
          />
        ) : (
          <img
            src={gameResult.userResult ? win2 : lose2}
            width="25"
            height="25"
            alt=""
          />
        ),
      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    };

    if (gameResult.userResult) {
      if (soundToggle) {
        music.play();
      }
      if (result === "a") {
        toast("You doubled your money!!", toastOptions);
      }
      if (result === "b") {
        toast("You are doing some business here", toastOptions);
      }
    } else {
      if (result === "a") {
        toast("Better luck next time.", toastOptions);
      }
      if (result === "b") {
        toast("Wrong hand :P", toastOptions);
      }
    }

    for (let i = 0; i < 1000; i++) {
      let actuallBlock = await web3.eth.getBlockNumber();
      if (actuallBlock > gameResult.userBlock) {
        setSave(false);
        break;
      }
      await sleep(1000);
    }
  };

  const backGame = () => {
    setPlaying(false);
    setAnimation(false);
    setGameId(false);
    setResult(false);
    setGameResult({});
    setUsergame({ hand: "", amount: 0 });
  };

  return (
    <>
      {/* <SocialButtons /> */}
      <div className="left-content-rps">
        <img src={RPSGames} alt="" />
      </div>
      <article>
        {account !== undefined &&
        account !== "0x000000000000000000000000000000000000dEaD" ? (
          <div className="game-container">
            <div className="g-btn-historygames">
              <ConnectWallet
                web3={web3}
                account={account}
                balance={balance}
                disconnectWallet={disconnectWallet}
                userData={userData}
                user={discordId}
                toast={toast}
              />
            </div>
            {playing ? (
              <div className="game-playing-container">
                <Play
                  animation={animation}
                  save={save}
                  gameLog={gameLog}
                  gameId={gameId}
                  userhand={usergame.hand}
                  useramount={usergame.amount}
                  busyNetwork={busyNetwork}
                  dotLog={dotLog}
                  showResult={showResult}
                />
                <Result
                  result={result}
                  userhand={usergame.hand}
                  useramount={usergame.amount}
                  gameResult={gameResult}
                  save={save}
                  dotLog={dotLog}
                  backGame={backGame}
                />
              </div>
            ) : (
              <>
                <div className="text-container">
                  <p>Select your bet:</p>
                </div>
                <Hands
                  handleInputChange={handleInputChange}
                  randomItem={randomItem}
                />

                <Amounts handleInputChange={handleInputChange} />
                <button
                  onClick={verifyGame}
                  className="DoubleOrNothing"
                  disabled={playing}
                >
                  DOUBLE OR NOTHING
                </button>
                <p className="text-center mb-3 mt-3">
                  <label className="switch">
                    <input id="age" type="checkbox"></input>&nbsp;
                    <span className="slider round"></span>
                  </label>
                  &nbsp; I confirm that I am at least 18 years old
                </p>
              </>
            )}
          </div>
        ) : (
          <>
            <RpsImage />
            <ConnectWallet
              toast={toast}
              readBlockchainData={readBlockchainData}
              web3={web3}
              account={account}
            />
          </>
        )}
        <div ref={screen}></div>
      </article>
    </>
  );
};

export default RPS;
