import { Spinner } from "react-bootstrap";
import { Table } from "reactstrap";
import { Fireworks } from "@fireworks-js/react";

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
  return (
    <>
      <div className="processing-game">
        <img
          className="card-selected"
          src={
            (props.userhand === "ROCK" && imageRockGIF) ||
            (props.userhand === "PAPER" && imagePaperGIF) ||
            (props.userhand === "SCISSORS" && imageScissorsGIF)
          }
        />
        <img className="vs" src={imageVS} />
        <img className="rotating-card" src={rotatingCard} />
      </div>
      <h3>
        <span className="text-playing">Playing {props.userhand} for</span>
        <br />
        <span className="valor-matic">{props.useramount + " MATIC"}</span>
      </h3>
      <div>
        {props.save ? (
          <button className="DoubleOrNothing" onClick={props.showResult}>
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
                    <td>{props.userhand}</td>
                    <td>{props.useramount}</td>
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
    if (props.userhand === "ROCK") {
      imageResult = RockWin;
    }
    if (props.userhand === "PAPER") {
      imageResult = PaperWin;
    }
    if (props.userhand === "SCISSORS") {
      imageResult = ScissorsWin;
    }
  } else {
    if (props.userhand === "ROCK") {
      imageResult = RockLose;
    }
    if (props.userhand === "PAPER") {
      imageResult = PaperLose;
    }
    if (props.userhand === "SCISSORS") {
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
              {props.gameResult ? props.useramount * 2 : props.useramount}
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

export const GameLogo = () => {
  return (
    <div className="left-content-rps">
      <img src={RPSGames} alt="" />
    </div>
  );
};

export const GamePanel = ({
  age,
  playing,
  animation,
  result,
  verifyGame,
  randomItem,
  save,
  gameLog,
  gameId,
  usergame,
  busyNetwork,
  gameResult,
  showResult,
  backGame,
  sound,
  handleInputChange,
}) => {
  return (
    <div className="game-container">
      {playing ? (
        <div className="game-playing-container">
          {animation && (
            <Play
              save={save}
              gameLog={gameLog}
              gameId={gameId}
              userhand={usergame.hand}
              useramount={usergame.amount}
              busyNetwork={busyNetwork}
              showResult={showResult}
            />
          )}
          {result && (
            <Result
              userhand={usergame.hand}
              useramount={usergame.amount}
              gameResult={gameResult}
              result={result}
              sound={sound}
              backGame={backGame}
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

          <button
            onClick={verifyGame}
            className="DoubleOrNothing"
            disabled={playing}
          >
            DOUBLE OR NOTHING
          </button>
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
