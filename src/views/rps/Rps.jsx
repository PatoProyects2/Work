import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMixpanel } from "react-mixpanel-browser";
import winSound from "../../assets/audio/win_sound.mpeg";
import lose1 from "../../assets/imgs/result/lose1.gif";
import lose2 from "../../assets/imgs/result/lose2.png";
import win1 from "../../assets/imgs/result/win1.gif";
import win2 from "../../assets/imgs/result/win2.png";
import ConnectWallet from "../../components/WalletButton/WalletButton";
import { db } from "../../config/firesbaseConfig";
import { Context } from "../../context/Context";
import Games from "../../components/Games/Games";
import { useLoad } from "../../hooks/useLoad";
import { useMatchMedia } from "../../hooks/useMatchMedia";
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
  const isMobileResolution = useMatchMedia("(max-width:650px)", false);

  const [userData, setUserData] = useState({});
  const [usergame, setUsergame] = useState({ hand: "", amount: 0 });
  const [gameResult, setGameResult] = useState({
    userResult: false,
    userStreak: 0,
    gameBlock: 0,
  });
  const [gameLog, setGameLog] = useState("");
  const [randomItem, setRandomItem] = useState("");
  const [userhand, setUserhand] = useState(0);
  const [useramount, setUseramount] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [save, setSave] = useState(false);
  const [busyNetwork, setBusyNetwork] = useState(false);
  const [result, setResult] = useState(false);

  const music = new Audio(winSound);
  const local = window.localStorage.getItem("token");

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  useEffect(() => {
    if (local === null) {
      toast("Log in if you want to save you game stats and ahievements", {
        duration: 10000,
        position: "top-right",
        // Styling
        style: {},
        className: "pop-up toast-modal",
        // Custom Icon
        icon: <i className="fa-solid fa-circle-info text-primary"></i>,
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
        // Aria
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
  }, [account, discordId, rpsgame]);

  const loadUserGame = async () => {
    mixpanel.init(process.env.REACT_APP_MIXPANEL_KEY, { debug: false });
    mixpanel.track("Sign up");
    if (discordId !== "") {
      const document = await getDoc(doc(db, "clubUsers", discordId));
      const data = document.data();
      if (data) {
        setUserData(data);
        if (
          data.account === "" &&
          account !== "0x000000000000000000000000000000000000dEaD"
        ) {
          updateDoc(doc(db, "clubUsers", discordId), {
            account: account,
          }).then(loadUserGame());
        }
      }
    } else {
      if (account !== undefined) {
        const anonDoc = await getDoc(doc(db, "anonUsers", account));
        const anonData = anonDoc.data();
        if (!anonData) {
          if (account !== "0x000000000000000000000000000000000000dEaD") {
            const arrayData = {
              uid: "anonymous",
              account: account,
              name: "",
              photo:
                "https://firebasestorage.googleapis.com/v0/b/games-club-dce4d.appspot.com/o/ClubLogo.png?alt=media&token=5dd64484-c99f-4ce9-a06b-0a3ee112b37b",
              level: 1,
              rps: {
                lastGameBlock: 0,
                winStreak: 0,
              },
            };
            setDoc(doc(db, "anonUsers", account), arrayData).then(
              loadUserGame()
            );
          }
        }
      }
    }
  };

  useEffect(() => {
    let arrayOptions = ["a", "b", "c", "d", "e", "f"];
    var randomArray = (Math.random() * arrayOptions.length) | 0;
    var result = arrayOptions[randomArray];
    setRandomItem(result);
  }, [account]);

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
    if (
      document.getElementById("rock").checked ||
      document.getElementById("paper").checked ||
      document.getElementById("scissors").checked
    ) {
      setUserhand(usergame.hand);
    } else {
      toast.error("Select a hand");
      return false;
    }
    if (
      document.getElementById("amount1").checked ||
      document.getElementById("amount2").checked ||
      document.getElementById("amount3").checked ||
      document.getElementById("amount4").checked ||
      document.getElementById("amount5").checked ||
      document.getElementById("amount6").checked
    ) {
      setUseramount(usergame.amount);
    } else {
      toast.error("Select an amount");
      return false;
    }
    if (network !== 137) {
      toast.error("Network not supported, please select Polygon network");
      return false;
    }
    if (balance === "") {
      toast.error(
        "We cannot connect to the polygon network, please try changing your network RPC in your wallet"
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
      let playerDocument = {};
      if (discordId !== "") {
        const q0 = doc(db, "clubUsers", discordId);
        let doc1 = await getDoc(q0);
        playerDocument = doc1.data();
      } else {
        const q1 = doc(db, "anonUsers", account);
        let doc2 = await getDoc(q1);
        playerDocument = doc2.data();
      }

      const lastGame = playerDocument.rps.lastGameBlock;

      if (actuallBlock > lastGame) {
        let myEvents = undefined;

        const playEvent = await rpsgame.methods
          .play(inputAmount)
          .send({
            from: account,
            value: feeValue,
            gasPrice: web3.utils.toWei(gas.value.toString(), "gwei"),
            gasLimit: 500000,
          })
          .on("pending", async (hash) => {
            setGameLog("PLAYING");
          })
          .on("success", async (hash) => {
            setGameLog("PLAYING");
          })
          .on("error", async (err) => {
            if (err.code === -32603) {
              toast.error("This transaction needs more gas to be executed");
              setPlaying(false);
              setAnimation(false);
              return false;
            }
            if (err.code === 4001) {
              toast.error("You denied transaction signature");
              setPlaying(false);
              setAnimation(false);
              return false;
            }
            if (err.code !== -32603 && err.code !== 4001) {
              setBusyNetwork(true);
              let playEvent = undefined;
              var warningBlockchain = toast.loading(
                "This transaction is taking too long because the network is busy, please check the status of your transaction in your wallet"
              );
              const options = {
                filter: {
                  _to: account,
                },
                fromBlock: actuallBlock,
                toBlock: "latest",
              };
              for (let i = 0; i < 1000; i++) {
                try {
                  playEvent = await rpsgame.getPastEvents("Play", options);
                } catch (err) { }
                await sleep(1000);
                if (playEvent[0]) break;
              }
              if (playEvent[0]) {
                let myEvent = playEvent[0].returnValues;
                let gameBlock = playEvent[0].blockNumber;

                setBusyNetwork(false);
                toast.dismiss(warningBlockchain);
              }
            }
          });
        if (playEvent) {
          const gameId = playEvent.events.BetPlaced.returnValues.betId;
          const gameBlock = playEvent.blockNumber;
          const txHash = playEvent.transactionHash;

          for (let i = 0; i < 1000; i++) {
            try {
              const betGame = await rpsgame.methods.bets(gameId).call();
              if (
                parseInt(betGame[0]) !== 0 &&
                parseInt(betGame[1]) === gameBlock
              ) {
                saveBlockchainEvents(betGame, playerDocument, txHash, gameId);
                break;
              }
            } catch (err) { }
            await sleep(1000);
          }
        }
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
    const userResult = parseInt(betGame[0]) > 50 ? true : false;
    const userStreak = userResult ? playerDocument.rps.winStreak + 1 : 0;
    const userBlock = parseInt(betGame[1]);
    const maticAmount = parseInt(
      web3.utils.fromWei(betGame[2].toString(), "ether")
    );
    const usdAmount = maticAmount * maticPrice;
    const account = betGame[4].toLowerCase();

    if (discordId !== "") {
      const level = playerDocument.level;
      const totalGames = playerDocument.rps.totalGames + 1;
      const totalAmount = playerDocument.rps.totalAmount + usdAmount;
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
          "rps.totalGames": totalGames,
          "rps.gameWon": userGame,
          "rps.totalAmount": totalAmount,
          "rps.amountWon": userAmount,
          "rps.lastGameBlock": userBlock,
          "rps.winStreak": userStreak,
          "rps.winStreakTime": unixTime,
        });
      } else {
        updateDoc(doc(db, "clubUsers", discordId), {
          "rps.totalGames": totalGames,
          "rps.gameLoss": userGame,
          "rps.totalAmount": totalAmount,
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
        gameId: parseInt(gameId),
      });
    } else {
      if (userResult) {
        updateDoc(doc(db, "anonUsers", account), {
          "rps.winStreak": playerDocument.rps.winStreak + 1,
          "rps.winStreakTime": unixTime,
          "rps.lastGameBlock": userBlock,
        });
      } else {
        updateDoc(doc(db, "anonUsers", account), {
          "rps.winStreak": 0,
          "rps.lastGameBlock": userBlock,
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
    setResult(false);
    setGameResult({});
  };

  return (
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
                userhand={userhand}
                useramount={useramount}
                busyNetwork={busyNetwork}
                dotLog={dotLog}
                showResult={showResult}
              />
              <Result
                result={result}
                userhand={userhand}
                useramount={useramount}
                gameResult={gameResult}
                save={save}
                dotLog={dotLog}
                backGame={backGame}
              />
            </div>
          ) : (
            <>
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
          <Games isMobileResolution={isMobileResolution} />
        </>
      )}
    </article>
  );
};

export default RPS;
