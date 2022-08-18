import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { Table } from "reactstrap";
import { Fireworks } from "@fireworks-js/react";

// Bet panel
import matic from "../../../../assets/imgs/Bet_Screen/matic.png";

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

const Rock = (props) => {
  return (
    <label>
      <input
        type="radio"
        name="hand"
        id="rock"
        onChange={props.handleInputChange}
        value="rock"
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
        value="paper"
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
        value="scissors"
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
        <div className={`rps-img ${props.userhand + "-animation"}`}></div>
        <div className="vs-img vs"></div>
        <div className="rps-img rotating-card-img"></div>
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
  const [image1, setImage1] = useState(false);

  useEffect(() => {
    if (image1) {
      const result1 = document.querySelector(".result-modal");

      if (result1) {
        result1.style.visibility = "visible";
      }
    }
  }, [image1]);

  var imageResult;

  if (props.gameResult) {
    if (props.userhand === "rock") {
      imageResult = RockWin;
    }
    if (props.userhand === "paper") {
      imageResult = PaperWin;
    }
    if (props.userhand === "scissors") {
      imageResult = ScissorsWin;
    }
  } else {
    if (props.userhand === "rock") {
      imageResult = RockLose;
    }
    if (props.userhand === "paper") {
      imageResult = PaperLose;
    }
    if (props.userhand === "scissors") {
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
        {imageResult && (
          <div className="anim-win-lose">
            <img
              className="result-rps-image"
              src={imageResult}
              onLoad={() => setImage1(true)}
            />
          </div>
        )}
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

export const GamePanel = ({
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
        </>
      )}
    </div>
  );
};
