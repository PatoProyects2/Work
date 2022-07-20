import { useContext, useEffect, useState, useRef } from "react";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useMixpanel } from "react-mixpanel-browser";
import toast from "react-hot-toast";
import winSound from "../../assets/audio/win_sound.mpeg";
import lose1 from "../../assets/imgs/Win_Lose_Screens/lose1.gif";
import lose2 from "../../assets/imgs/Win_Lose_Screens/lose2.png";
import win1 from "../../assets/imgs/Win_Lose_Screens/win1.gif";
import win2 from "../../assets/imgs/Win_Lose_Screens/win2.png";
import { db } from "../../config/firesbaseConfig";
import { Context } from "../../context/Context";
import { useTime } from "../../hooks/useTime";
import { useWeb3 } from "../../hooks/useWeb3";
import { GameLogo, GamePanel, ConnectPanel } from "./components/Modals/Modals";

const RPS = () => {
  const screen = useRef(null);
  
  const { discordId, balance, soundToggle, gas } = useContext(Context);
  const {
    web3,
    account,
    privateGamesClub,
    rpsgame,
    network,
    maticPrice,
    readBlockchainData,
    readBalance,
  } = useWeb3();

  const mixpanel = useMixpanel();
  const unixTime = useTime();

  const [usergame, setUsergame] = useState({ hand: "", amount: 0 });
  const [gameResult, setGameResult] = useState(undefined);
  const [gameLog, setGameLog] = useState("");
  const [randomItem, setRandomItem] = useState("");
  const [playing, setPlaying] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [gameId, setGameId] = useState(false);
  const [save, setSave] = useState(false);
  const [busyNetwork, setBusyNetwork] = useState(false);
  const [result, setResult] = useState(false);
  const [load, setLoad] = useState(false);
  const [playerDocument, setPlayerDocument] = useState(false);

  const music = new Audio(winSound);
  const token = window.localStorage.getItem("token");
  const age = window.localStorage.getItem("age");

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const scrollToBottom = () => {
    screen.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [load, account, playing]);

  useEffect(() => {
    mixpanel.init(process.env.REACT_APP_MIXPANEL_KEY, { debug: false });
    mixpanel.track("Sign up");

    if (token === null) {
      toast("Log in if you want to save your game stats and achievements", {
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
    setLoad(true);
  }, [token]);

  useEffect(() => {
    const arrayOptions = ["a", "b", "c", "d", "e", "f"];
    const randomArray = (Math.random() * arrayOptions.length) | 0;
    const result = arrayOptions[randomArray];
    setRandomItem(result);
  }, [playing]);

  useEffect(() => {
    const deadWallet = "0x000000000000000000000000000000000000dEaD";
    if (account !== undefined && account !== deadWallet) {
      const query =
        discordId !== ""
          ? doc(db, "clubUsers", discordId)
          : doc(db, "anonUsers", account);
      const unsub = onSnapshot(query, async (document) => {
        const profile = document.data();
        if (profile) {
          setPlayerDocument(profile);
          if (profile.account === "") {
            updateDoc(doc(db, "clubUsers", discordId), {
              account: account,
            });
          }
        } else {
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
          setDoc(doc(db, "anonUsers", account), arrayData);
        }
      });
      return () => unsub();
    }
  }, [account, discordId]);

  const handleInputChange = (event) => {
    setUsergame({
      ...usergame,
      [event.target.name]: event.target.value,
    });
  };

  const verifyGame = () => {
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
    if (age === "false" || age === null) {
      if (document.getElementById("age").checked === false) {
        toast.error("Confirm that you are at least 18 years old");
        return false;
      }
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

    rpsgame.methods
      .calculateValue(inputAmount)
      .call()
      .then((feeValue) => {
        doubleOrNothing(inputAmount, feeValue);
        setGameLog("WAITING FOR DEPOSIT");
        setPlaying(true);
        setAnimation(true);
      });
  };

  const doubleOrNothing = async (inputAmount, feeValue) => {
    const actuallBlock = await web3.eth.getBlockNumber();

    if (age === "false") {
      window.localStorage.setItem("age", true);
    }

    if (actuallBlock && playerDocument) {
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
          .on("receipt", async function (playEvent) {
            setGameLog("SAVING YOUR GAME");

            const gameId = parseInt(
              playEvent.events.BetPlaced.returnValues.betId
            );
            const gameBlock = playEvent.blockNumber;
            const txHash = playEvent.transactionHash;
            const usdAmount = parseInt(usergame.amount) * maticPrice;

            addDoc(collection(db, "allGames"), {
              game: "RPS",
              uid: playerDocument.uid,
              account: account,
              name: playerDocument.name,
              photo: playerDocument.photo,
              txHash: txHash,
              createdAt: unixTime,
              block: gameBlock,
              gameId: gameId,
              amount: usdAmount,
              hand: usergame.hand,
              maticAmount: parseInt(usergame.amount),
              state: "pending",
            });

            setGameId(gameId);

            var betGame = [false, false, false, false, false, false];
            while (!betGame[5]) {
              try {
                betGame = await privateGamesClub.methods.bets(gameId).call();
              } catch (err) {}
              await sleep(1000);
            }
            if (betGame[5]) {
              const userResult = parseInt(betGame[3]) > 0 ? true : false;
              setGameResult(userResult);
              setSave(true);
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
            if (!err.code) {
              toast.error("Transaction reverted");
              backGame();
              return false;
            }
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

  const showResult = async () => {
    setAnimation(false);
    setResult(true);

    readBalance();

    let arrayOptions = ["a", "b"];
    var randomArray = (Math.random() * arrayOptions.length) | 0;
    var result = arrayOptions[randomArray];

    const toastOptions = {
      duration: 5000,
      position: "bottom-left",
      style: {},
      className: "pop-up toast-modal",
      icon: (
        <img
          src={
            result === "a"
              ? gameResult
                ? win1
                : lose1
              : gameResult
              ? win2
              : lose2
          }
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

    if (gameResult) {
      if (soundToggle) {
        music.play();
      }
      toast(
        result === "a"
          ? "You doubled your money!!"
          : "You are doing some business here",
        toastOptions
      );
    } else {
      toast(
        result === "a" ? "Better luck next time" : "Wrong hand :P",
        toastOptions
      );
    }

    setSave(false);
  };

  const backGame = () => {
    setPlaying(false);
    setAnimation(false);
    setGameId(false);
    setResult(false);
    setGameResult(undefined);
    setUsergame({ hand: "", amount: 0 });
  };

  return (
    <>
      <GameLogo />
      <article>
        {account !== undefined &&
        account !== "0x000000000000000000000000000000000000dEaD" ? (
          <GamePanel
            age={age}
            playing={playing}
            verifyGame={verifyGame}
            animation={animation}
            result={result}
            randomItem={randomItem}
            save={save}
            gameLog={gameLog}
            gameId={gameId}
            usergame={usergame}
            busyNetwork={busyNetwork}
            gameResult={gameResult}
            showResult={showResult}
            backGame={backGame}
            handleInputChange={handleInputChange}
          />
        ) : (
          <ConnectPanel
            toast={toast}
            readBlockchainData={readBlockchainData}
            web3={web3}
            account={account}
          />
        )}
        <div ref={screen}></div>
      </article>
    </>
  );
};

export default RPS;
