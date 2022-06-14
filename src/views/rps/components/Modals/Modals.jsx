import { Progress } from "reactstrap";
import PaperLose from "../../../../assets/imgs/animations/PaperLose.gif";
import PaperWin from "../../../../assets/imgs/animations/PaperWin.gif";
import RockLose from "../../../../assets/imgs/animations/RockLose.gif";
import RockWin from "../../../../assets/imgs/animations/RockWin.gif";
import ScissorsLose from "../../../../assets/imgs/animations/ScissorsLose.gif";
import ScissorsWin from "../../../../assets/imgs/animations/ScissorsWin.gif";
import imagePaper from "../../../../assets/imgs/Bet Screen/imagePaper.png";
import imageRock from "../../../../assets/imgs/Bet Screen/imageRock.png";
import imageScissors from "../../../../assets/imgs/Bet Screen/imageScissors.png";
import matic from "../../../../assets/imgs/Bet Screen/matic.png";
import rotatingCard from "../../../../assets/imgs/Bet Screen/RotatingCard.gif";
import imageVS from "../../../../assets/imgs/Bet Screen/VStext.png";

export const RpsImage = () => {
  return (
    <div className="game-gifs-wrapper">
      <div className="gameAntes col-3 col-md-2">
        <img className="my-3 img-fluid" src={imageRock} alt="Rock" />
      </div>
      <div className="gameAntes col-3 col-md-2">
        <img className="my-3 img-fluid" src={imagePaper} alt="Paper" />
      </div>
      <div className="gameAntes col-3 col-md-2">
        <img className="my-3 img-fluid" src={imageScissors} alt="Scissors" />
      </div>
    </div>
  );
};

export const Hands = (props) => {
  const RockModal = () => {
    return (
      <>
        <img
          className="imageOptions my-3 img-fluid"
          src={imageRock}
          alt="Rock"
        />
      </>
    );
  };

  const PaperModal = () => {
    return (
      <>
        <img
          className="imageOptions my-3 img-fluid"
          src={imagePaper}
          alt="Paper"
        />
      </>
    );
  };

  const ScissorsModal = () => {
    return (
      <>
        <img
          className="imageOptions my-3 img-fluid"
          src={imageScissors}
          alt="Scissors"
        />
      </>
    );
  };
  return (
    <div className="game-selection-hand">
      {props.randomItem === "a" && (
        <>
          <label className="labelImage">
            <input
              type="radio"
              name="hand"
              id="rock"
              onChange={props.handleInputChange}
              value="ROCK"
            ></input>
            <RockModal />
          </label>
          <label className="labelImage">
            <input
              type="radio"
              name="hand"
              id="paper"
              onChange={props.handleInputChange}
              value="PAPER"
            ></input>
            <PaperModal />
          </label>
          <label className="labelImage">
            <input
              type="radio"
              name="hand"
              id="scissors"
              onChange={props.handleInputChange}
              value="SCISSORS"
            ></input>
            <ScissorsModal />
          </label>
        </>
      )}
      {props.randomItem === "b" && (
        <>
          <label className="labelImage">
            <input
              type="radio"
              name="hand"
              id="scissors"
              onChange={props.handleInputChange}
              value="ROCK"
            ></input>
            <RockModal />
          </label>
          <label className="labelImage">
            <input
              type="radio"
              name="hand"
              id="paper"
              onChange={props.handleInputChange}
              value="SCISSORS"
            ></input>
            <ScissorsModal />
          </label>
          <label className="labelImage">
            <input
              type="radio"
              name="hand"
              id="rock"
              onChange={props.handleInputChange}
              value="PAPER"
            ></input>
            <PaperModal />
          </label>
        </>
      )}
      {props.randomItem === "c" && (
        <>
          <label className="labelImage">
            <input
              type="radio"
              name="hand"
              id="rock"
              onChange={props.handleInputChange}
              value="PAPER"
            ></input>
            <PaperModal />
          </label>
          <label className="labelImage">
            <input
              type="radio"
              name="hand"
              id="paper"
              onChange={props.handleInputChange}
              value="SCISSORS"
            ></input>
            <ScissorsModal />
          </label>
          <label className="labelImage">
            <input
              type="radio"
              name="hand"
              id="scissors"
              onChange={props.handleInputChange}
              value="ROCK"
            ></input>
            <RockModal />
          </label>
        </>
      )}
      {props.randomItem === "d" && (
        <>
          <label className="labelImage">
            <input
              type="radio"
              name="hand"
              id="rock"
              onChange={props.handleInputChange}
              value="PAPER"
            ></input>
            <PaperModal />
          </label>
          <label className="labelImage">
            <input
              type="radio"
              name="hand"
              id="scissors"
              onChange={props.handleInputChange}
              value="ROCK"
            ></input>
            <RockModal />
          </label>
          <label className="labelImage">
            <input
              type="radio"
              name="hand"
              id="paper"
              onChange={props.handleInputChange}
              value="SCISSORS"
            ></input>
            <ScissorsModal />
          </label>
        </>
      )}
      {props.randomItem === "e" && (
        <>
          <label className="labelImage">
            <input
              type="radio"
              name="hand"
              id="rock"
              onChange={props.handleInputChange}
              value="SCISSORS"
            ></input>
            <ScissorsModal />
          </label>
          <label className="labelImage">
            <input
              type="radio"
              name="hand"
              id="paper"
              onChange={props.handleInputChange}
              value="ROCK"
            ></input>
            <RockModal />
          </label>
          <label className="labelImage">
            <input
              type="radio"
              name="hand"
              id="scissors"
              onChange={props.handleInputChange}
              value="PAPER"
            ></input>
            <PaperModal />
          </label>
        </>
      )}
      {props.randomItem === "f" && (
        <>
          <label className="labelImage">
            <input
              type="radio"
              name="hand"
              id="paper"
              onChange={props.handleInputChange}
              value="SCISSORS"
            ></input>
            <ScissorsModal />
          </label>
          <label className="labelImage">
            <input
              type="radio"
              name="hand"
              id="rock"
              onChange={props.handleInputChange}
              value="PAPER"
            ></input>
            <PaperModal />
          </label>
          <label className="labelImage">
            <input
              type="radio"
              name="hand"
              id="scissors"
              onChange={props.handleInputChange}
              value="ROCK"
            ></input>
            <RockModal />
          </label>
        </>
      )}
    </div>
  );
};

export const Amounts = (props) => {
  return (
    <div className="MaticGeneral d-flex align-items-center justify-content-center">
      <img className="imgMatic" src={matic} alt="Matic" />
      <label className="amount">
        <input
          type="radio"
          name="amount"
          id="amount1"
          onChange={props.handleInputChange}
          value="1"
        />
        <p>1</p>
      </label>
      <label className="amount">
        <input
          type="radio"
          name="amount"
          id="amount2"
          onChange={props.handleInputChange}
          value="2"
        />
        <p>2</p>
      </label>
      <label className="amount">
        <input
          type="radio"
          name="amount"
          id="amount3"
          onChange={props.handleInputChange}
          value="5"
        />
        <p>5</p>
      </label>
      <label className="amount">
        <input
          type="radio"
          name="amount"
          id="amount4"
          onChange={props.handleInputChange}
          value="10"
        />
        <p>10</p>
      </label>
      <label className="amount">
        <input
          type="radio"
          name="amount"
          id="amount5"
          onChange={props.handleInputChange}
          value="25"
        />
        <p>25</p>
      </label>
      <label className="amount">
        <input
          type="radio"
          name="amount"
          id="amount6"
          onChange={props.handleInputChange}
          value="50"
        />
        <p>50</p>
      </label>
    </div>
  );
};

export const Play = (props) => {
  return (
    props.animation && (
      <>
        <div className="processing-game">
          {props.userhand === "ROCK" && (
            <img className="card-selected" src={imageRock} />
          )}

          {props.userhand === "SCISSORS" && (
            <img className="card-selected" src={imageScissors} />
          )}

          {props.userhand === "PAPER" && (
            <img className="card-selected" src={imagePaper} />
          )}

          <img className="vs" src={imageVS} />
          <img className="rotatingCard" src={rotatingCard} />
        </div>
        {props.save ? (
          <>
            <span className="processing-title">{props.gameLog}</span>
          </>
        ) : (
          <div className="processing-title">
            {props.gameLog}
            <span className="loading-dot">{props.dotLog}</span>
          </div>
        )}
        <h3>
          <span>Playing {props.userhand} for</span>
          <br />
          <span className="valor-matic">{props.useramount + " MATIC"}</span>
        </h3>
        {props.save && (
          <button className="DoubleOrNothing" onClick={props.showResult}>
            SHOW RESULT
          </button>
        )}
        {props.busyNetwork && (
          <>
            <div className="processing-title">
              SEARCHING YOUR GAME
              <span className="loading-dot">{props.dotLog}</span>
            </div>
            <h4 className="text-yellow">DON'T CLOSE THIS WINDOW!</h4>
          </>
        )}
      </>
    )
  );
};

export const Result = (props) => {
  return (
    props.result && (
      <>
        {props.gameResult.userStreak > 1 && (
          <div className="my-3">
            <h3>Congrats!</h3>
            <h3>
              {"You're on a " + props.gameResult.userStreak + " win streak"}
            </h3>
          </div>
        )}
        {props.userhand === "ROCK" && props.gameResult.userResult && (
          <div className="anim-win-lose">
            <img className="result-rps-image" src={RockWin} alt="Rock Wins" />
          </div>
        )}
        {props.userhand === "PAPER" && props.gameResult.userResulte && (
          <div className="anim-win-lose">
            <img className="result-rps-image" src={PaperWin} alt="Paper Wins" />
          </div>
        )}
        {props.userhand === "SCISSORS" && props.gameResult.userResult && (
          <div className="anim-win-lose">
            <img
              className="result-rps-image"
              src={ScissorsWin}
              alt="Scissors Wins"
            />
          </div>
        )}
        {props.userhand === "ROCK" && !props.gameResult.userResult && (
          <div className="anim-win-lose">
            <img className="result-rps-image" src={RockLose} alt="Rock Loses" />
          </div>
        )}
        {props.userhand === "PAPER" && !props.gameResult.userResult && (
          <div className="anim-win-lose">
            <img
              className="result-rps-image"
              src={PaperLose}
              alt="Paper Loses"
            />
          </div>
        )}
        {props.userhand === "SCISSORS" && !props.gameResult.userResult && (
          <div className="anim-win-lose">
            <img
              className="result-rps-image"
              src={ScissorsLose}
              alt="Scissors Loses"
            />
          </div>
        )}
        <div className="d-flex flex-column justify-content-between mx-auto mt-4">
          <div className="d-flex flex-column justify-content-center">
            <span className="rps-result-title">
              {props.gameResult.userResult ? " You Won " : " You Lost "}
            </span>
            <span
              className="rps-result-amount"
              style={{
                color: props.gameResult.userResult ? "#f1cf61" : "crimson",
              }}
            >
              {props.gameResult.userResult
                ? props.useramount * 2
                : props.useramount}{" "}
              MATIC
            </span>
          </div>
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-column align-items-center">
              {props.save ? (
                <>
                  <div className="processing-title">
                    POLYGON IS PROCESSING YOUR GAME
                    <span className="loading-dot">{props.dotLog}</span>
                  </div>
                  <button className="btn-hover btn-loading" disabled={true}>
                    PLEASE WAIT
                    <Progress
                      value={100}
                      animated={true}
                      color="dark"
                    ></Progress>
                  </button>
                </>
              ) : (
                <>
                  {props.gameResult.userResult ? (
                    <button
                      className="DoubleOrNothing"
                      onClick={props.backGame}
                    >
                      CLAIM REWARD
                    </button>
                  ) : (
                    <>
                      <span className="processing-title">TRY AGAIN?</span>
                      <button
                        className="DoubleOrNothing"
                        onClick={props.backGame}
                      >
                        DOUBLE OR NOTHING
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </>
    )
  );
};
