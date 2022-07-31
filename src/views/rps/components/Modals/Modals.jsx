import { useState, useContext, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { Table } from "reactstrap";
import { Fireworks } from "@fireworks-js/react";
import toast from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../config/firesbaseConfig";
import { useStatus } from "../../../../hooks/useStatus";
import { useRandomItem } from "../../../../hooks/useRandomItem";
import { Context } from "../../../../context/Context";

import winSound from "../../../../assets/audio/win_sound.mpeg";
import lose1 from "../../../../assets/imgs/Win_Lose_Screens/lose1.gif";
import lose2 from "../../../../assets/imgs/Win_Lose_Screens/lose2.png";
import win1 from "../../../../assets/imgs/Win_Lose_Screens/win1.gif";
import win2 from "../../../../assets/imgs/Win_Lose_Screens/win2.png";
// Game Logo
import RPSGames from "../../../../assets/imgs/Home_Page/RPS Games.png";

// Bet panel
import imageRock from "../../../../assets/imgs/Bet_Screen/imageRock.png";
import imagePaper from "../../../../assets/imgs/Bet_Screen/imagePaper.png";
import imageScissors from "../../../../assets/imgs/Bet_Screen/imageScissors.png";
import matic from "../../../../assets/imgs/Bet_Screen/matic.png";

// Play panel
import imageRockGIF from "../../../../assets/imgs/Bet_Screen/RockUnselectedGIF.gif";
import imagePaperGIF from "../../../../assets/imgs/Bet_Screen/PaperUnselectedGIF.gif";
import imageScissorsGIF from "../../../../assets/imgs/Bet_Screen/ScissorsUnselectedGIF.gif";

import imageVS from "../../../../assets/imgs/Bet_Screen/VStext.png";

import rotatingCard from "../../../../assets/imgs/Bet_Screen/RotatingCard.gif";

// Result panel

import RockWin from "../../../../assets/imgs/Win_Lose_Screens/RockWin.gif";
import RockLose from "../../../../assets/imgs/Win_Lose_Screens/RockLose.gif";

import PaperWin from "../../../../assets/imgs/Win_Lose_Screens/PaperWin.gif";
import PaperLose from "../../../../assets/imgs/Win_Lose_Screens/PaperLose.gif";

import ScissorsWin from "../../../../assets/imgs/Win_Lose_Screens/ScissorsWin.gif";
import ScissorsLose from "../../../../assets/imgs/Win_Lose_Screens/ScissorsLose.gif";

import bannerLose from "../../../../assets/imgs/Win_Lose_Screens/bannerLose.png";
import bannerWin from "../../../../assets/imgs/Win_Lose_Screens/bannerWin.png";

import Star from "../../../../assets/imgs/Win_Lose_Screens/star.png";

export const RpsImage = (props) => {
  return (
    <div className="gameAntes col-3 col-md-2">
      <img
        className="my-3 image-game"
        src={
          (props.image === "Rock" && imageRock) ||
          (props.image === "Paper" && imagePaper) ||
          (props.image === "Scissors" && imageScissors)
        }
        alt="Rock"
      />
    </div>
  );
};

const Rock = (props) => {
  return (
    <label>
      <input
        type="radio"
        name="hand"
        id="rock"
        onChange={props.handleInputChange}
        value="ROCK"
      ></input>
      <div className="rps-img rock-img"></div>
    </label>
  );
};

const Paper = (props) => {
  return (
    <label>
      <input
        type="radio"
        name="hand"
        id="paper"
        onChange={props.handleInputChange}
        value="PAPER"
      ></input>
      <div className="rps-img paper-img"></div>
    </label>
  );
};

const Scissors = (props) => {
  return (
    <label>
      <input
        type="radio"
        name="hand"
        id="scissors"
        onChange={props.handleInputChange}
        value="SCISSORS"
      ></input>
      <div className="rps-img scissors-img"></div>
    </label>
  );
};

const Amounts = (props) => {
  return (
    <>
      <label className="amount">
        <input
          type="radio"
          name="amount"
          onChange={props.handleInputChange}
          value={props.amount}
        />
        <p>{props.amount}</p>
      </label>
    </>
  );
};

const Play = (props) => {
  const { setBalance } = useContext(Context);

  const music = new Audio(winSound);

  const showResult = async () => {
    props.setAnimation(false);
    props.setResult(true);

    if (
      props.privateWeb3 &&
      props.account !== "0x000000000000000000000000000000000000dEaD"
    ) {
      props.privateWeb3.eth
        .getBalance(props.account)
        .then((myBalance) => {
          const userBalance = parseFloat(
            myBalance / 1000000000 / 1000000000
          ).toFixed(3);
          setBalance(userBalance);
        })
        .catch((err) => console.log(err));
    }

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
              ? props.gameResult
                ? win1
                : lose1
              : props.gameResult
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

    if (props.gameResult) {
      if (props.sound === "on") {
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

    props.setSave(false);
  };

  return (
    <>
      <div className="processing-game">
        <img
          className="card-selected"
          src={
            (props.userGame.hand === "ROCK" && imageRockGIF) ||
            (props.userGame.hand === "PAPER" && imagePaperGIF) ||
            (props.userGame.hand === "SCISSORS" && imageScissorsGIF)
          }
        />
        <img className="vs" src={imageVS} />
        <img className="rotating-card" src={rotatingCard} />
      </div>
      <h3>
        <span className="text-playing">Playing {props.userGame.hand} for</span>
        <br />
        <span className="valor-matic">{props.userGame.amount + " MATIC"}</span>
      </h3>
      <div>
        {props.save ? (
          <button className="DoubleOrNothing" onClick={showResult}>
            SHOW RESULT
          </button>
        ) : (
          <div className="playing">
            <button disabled>
              {props.gameLog}
              &nbsp;&nbsp;
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </button>
            <div>
              <Table className="tabla-pequena" bordeless="true" size="lg">
                <thead>
                  <tr>
                    <th className="text-yellow">ID</th>
                    <th className="text-yellow">Hand</th>
                    <th className="text-yellow">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{props.gameId ? props.gameId : "-"}</td>
                    <td>{props.userGame.hand}</td>
                    <td>{props.userGame.amount}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const Result = (props) => {
  var imageResult;

  if (props.gameResult) {
    if (props.userGame.hand === "ROCK") {
      imageResult = RockWin;
    }
    if (props.userGame.hand === "PAPER") {
      imageResult = PaperWin;
    }
    if (props.userGame.hand === "SCISSORS") {
      imageResult = ScissorsWin;
    }
  } else {
    if (props.userGame.hand === "ROCK") {
      imageResult = RockLose;
    }
    if (props.userGame.hand === "PAPER") {
      imageResult = PaperLose;
    }
    if (props.userGame.hand === "SCISSORS") {
      imageResult = ScissorsLose;
    }
  }
  return (
    <>
      <div className="relative-result-img">
        {props.result && props.gameResult && (
          <Fireworks
            options={{
              autoresize: true,
              opacity: 0.5,
              acceleration: 1.02,
              friction: 0.97,
              gravity: 1.5,
              particles: 50,
              traceSpeed: 10,
              explosion: 6,
              intensity: 30,
              flickering: 50,
              lineStyle: "round",
              hue: {
                min: 0,
                max: 360,
              },
              delay: {
                min: 30,
                max: 60,
              },
              rocketsPoint: {
                min: 50,
                max: 50,
              },
              lineWidth: {
                explosion: {
                  min: 1,
                  max: 4,
                },
                trace: {
                  min: 0.1,
                  max: 1,
                },
              },
              brightness: {
                min: 50,
                max: 80,
              },
              decay: {
                min: 0.001,
                max: 0.05,
              },
              mouse: {
                click: false,
                move: false,
                max: 1,
              },
              sound: {
                enabled: props.sound === "on" ? true : false,
                files: [
                  "https://fireworks.js.org/sounds/explosion0.mp3",
                  "https://fireworks.js.org/sounds/explosion1.mp3",
                  "https://fireworks.js.org/sounds/explosion2.mp3",
                ],
                volume: {
                  min: 4,
                  max: 8,
                },
              },
            }}
            style={{
              top: 20,
              left: 0,
              width: "100%",
              height: "100%",
              position: "fixed",
              background: "transparent",
            }}
          />
        )}
        <div className="anim-win-lose">
          <img className="result-rps-image" src={imageResult} />
        </div>
        <div>
          <img
            className="absolute-image"
            src={props.gameResult ? bannerWin : bannerLose}
          />
        </div>
      </div>
      <div className="d-flex flex-column justify-content-between mx-auto mt-4">
        <div className="d-flex flex-column justify-content-center">
          <span className="rps-result-title">
            <p className="text-result-game text-white">
              {props.gameResult ? "You won" : "You lost"}
            </p>
          </span>
          <div className="resultado-flex">
            {props.gameResult && <img src={Star} />}
            <span
              className="rps-result-amount"
              style={{
                color: props.gameResult ? "#f1cf61" : "#9845eb",
              }}
            >
              {props.gameResult
                ? props.userGame.amount * 2
                : props.userGame.amount}
              {" MATIC"}
            </span>
            {props.gameResult && <img src={Star} />}
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="d-flex flex-column align-items-center">
            {!props.gameResult && (
              <span className="processing-title text-white">TRY AGAIN?</span>
            )}
            <button className="DoubleOrNothing" onClick={props.backGame}>
              {props.gameResult ? "CLAIM REWARD" : "DOUBLE OR NOTHING"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const PlayButton = ({
  account,
  userGame,
  age,
  web3,
  privateGamesClub,
  rpsgame,
  network,
  maticPrice,
  setGameLog,
  setGameId,
  setPlaying,
  setAnimation,
  setGameResult,
  setSave,
  backGame,
  playing,
  gas,
}) => {
  const { playerDocument } = useContext(Context);

  const verifyGame = () => {
    if (userGame.hand === "") {
      toast.error("Select a hand");
      return false;
    }
    if (userGame.amount === 0) {
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

    const inputAmount = web3.utils.toWei(userGame.amount.toString(), "ether");

    privateGamesClub.methods
      .calculateValue(inputAmount)
      .call()
      .then((feeValue) => {
        doubleOrNothing(inputAmount, feeValue);
        setGameLog("WAITING FOR DEPOSIT");
        setPlaying(true);
        setAnimation(true);
      });
  };

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const doubleOrNothing = async (inputAmount, feeValue) => {
    if (age === "false") {
      window.localStorage.setItem("age", true);
    }
    rpsgame.methods
      .play(inputAmount)
      .send({
        from: account,
        value: feeValue,
        gasPrice: web3.utils.toWei(gas.toString(), "gwei"),
        gasLimit: 500000,
      })
      .on("transactionHash", function (hash) {
        setGameLog("SAVING YOUR GAME");
      })
      .on("receipt", async function (playEvent) {
        setGameLog("PLAYING");

        const gameId = parseInt(playEvent.events.BetPlaced.returnValues.betId);
        const gameBlock = playEvent.blockNumber;
        const txHash = playEvent.transactionHash;
        const usdAmount = parseInt(userGame.amount) * maticPrice;

        const gameData = {
          game: "RPS",
          uid: playerDocument.uid,
          account: account,
          name: playerDocument.name,
          photo: playerDocument.photo,
          txHash: txHash,
          createdAt: Math.round(new Date().getTime() / 1000),
          block: gameBlock,
          gameId: gameId,
          amount: usdAmount,
          hand: userGame.hand,
          maticAmount: parseInt(userGame.amount),
          state: "pending",
        };

        addDoc(collection(db, "allGames"), gameData)

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
  };

  return (
    <button onClick={verifyGame} className="DoubleOrNothing" disabled={playing}>
      DOUBLE OR NOTHING
    </button>
  );
};

export const GameLogo = () => {
  return (
    <div className="left-content-rps">
      <img src={RPSGames} alt="" />
    </div>
  );
};

export const GamePanel = ({
  web3,
  privateWeb3,
  privateGamesClub,
  rpsgame,
  network,
  maticPrice,
  screen,
  account,
  gas,
}) => {
  const [gameResult, setGameResult] = useState(undefined);
  const [gameLog, setGameLog] = useState("");
  const [playing, setPlaying] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [gameId, setGameId] = useState(false);
  const [save, setSave] = useState(false);
  const [busyNetwork, setBusyNetwork] = useState(false);
  const [result, setResult] = useState(false);
  const [userGame, setUserGame] = useState({ hand: "", amount: 0 });

  const { load } = useStatus();
  const { randomItem } = useRandomItem({ playing });

  const age = window.localStorage.getItem("age");
  const sound = window.localStorage.getItem("sound");

  const handleInputChange = (event) => {
    setUserGame({
      ...userGame,
      [event.target.name]: event.target.value,
    });
  };

  const backGame = () => {
    setPlaying(false);
    setAnimation(false);
    setGameId(false);
    setResult(false);
    setGameResult(undefined);
    setUserGame({ hand: "", amount: 0 });
  };

  const scrollToBottom = () => {
    screen.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [load, account, playing]);
  return (
    <div className="game-container">
      {playing ? (
        <div className="game-playing-container">
          {animation && (
            <Play
              account={account}
              privateWeb3={privateWeb3}
              save={save}
              gameLog={gameLog}
              gameId={gameId}
              userGame={userGame}
              busyNetwork={busyNetwork}
              animation={animation}
              result={result}
              gameResult={gameResult}
              privateGamesClub={privateGamesClub}
              setAnimation={setAnimation}
              setResult={setResult}
              setSave={setSave}
              sound={sound}
            />
          )}
          {result && (
            <Result
              userGame={userGame}
              gameResult={gameResult}
              result={result}
              backGame={backGame}
              sound={sound}
            />
          )}
        </div>
      ) : (
        <>
          <div className="text-container">
            <p>Select your bet:</p>
          </div>

          <div className="game-selection-hand">
            {randomItem === "a" && (
              <>
                <Rock handleInputChange={handleInputChange} />
                <Paper handleInputChange={handleInputChange} />
                <Scissors handleInputChange={handleInputChange} />
              </>
            )}
            {randomItem === "b" && (
              <>
                <Rock handleInputChange={handleInputChange} />
                <Scissors handleInputChange={handleInputChange} />
                <Paper handleInputChange={handleInputChange} />
              </>
            )}
            {randomItem === "c" && (
              <>
                <Paper handleInputChange={handleInputChange} />
                <Scissors handleInputChange={handleInputChange} />
                <Rock handleInputChange={handleInputChange} />
              </>
            )}
            {randomItem === "d" && (
              <>
                <Paper handleInputChange={handleInputChange} />
                <Rock handleInputChange={handleInputChange} />
                <Scissors handleInputChange={handleInputChange} />
              </>
            )}
            {randomItem === "e" && (
              <>
                <Scissors handleInputChange={handleInputChange} />
                <Rock handleInputChange={handleInputChange} />
                <Paper handleInputChange={handleInputChange} />
              </>
            )}
            {randomItem === "f" && (
              <>
                <Scissors handleInputChange={handleInputChange} />
                <Paper handleInputChange={handleInputChange} />
                <Rock handleInputChange={handleInputChange} />
              </>
            )}
          </div>

          <div className="text-container-amounts">
            <p>Select the amount to bet:</p>
          </div>
          <div className="MaticGeneral d-flex align-items-center justify-content-center">
            <img className="imgMatic" src={matic} alt="Matic" />
            <Amounts handleInputChange={handleInputChange} amount={1} />
            <Amounts handleInputChange={handleInputChange} amount={2} />
            <Amounts handleInputChange={handleInputChange} amount={5} />
            <Amounts handleInputChange={handleInputChange} amount={10} />
            <Amounts handleInputChange={handleInputChange} amount={25} />
            <Amounts handleInputChange={handleInputChange} amount={50} />
          </div>
          <PlayButton
            account={account}
            userGame={userGame}
            age={age}
            playing={playing}
            gas={gas}
            web3={web3}
            privateGamesClub={privateGamesClub}
            rpsgame={rpsgame}
            network={network}
            maticPrice={maticPrice}
            setGameLog={setGameLog}
            setGameId={setGameId}
            setPlaying={setPlaying}
            setAnimation={setAnimation}
            setGameResult={setGameResult}
            setSave={setSave}
            backGame={backGame}
          />
          {age === "false" && (
            <p className="text-center mb-3 mt-3">
              <label className="switch">
                <input id="age" type="checkbox"></input>
                &nbsp;
                <span className="slider round"></span>
              </label>
              &nbsp;&nbsp;&nbsp;
              <span className="text-white">I confirm that I am at least</span>
              <span style={{ color: "#ffdb5b" }}> 18 years old</span>
            </p>
          )}
        </>
      )}
    </div>
  );
};

export const ConnectPanel = ({ readBlockchainData }) => {
  return (
    <>
      <div className="game-gifs-wrapper">
        <RpsImage image="Rock" />
        <RpsImage image="Paper" />
        <RpsImage image="Scissors" />
      </div>
      <div className="center">
        <button className="DoubleOrNothing" onClick={readBlockchainData}>
          CONNECT WALLET
        </button>
      </div>
    </>
  );
};
