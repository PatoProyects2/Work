import { useContext, useState } from "react";
import toast from "react-hot-toast";
import winSound from "../../assets/audio/win_sound.mpeg";
import lose1 from "../../assets/imgs/result/lose1.gif";
import lose2 from "../../assets/imgs/result/lose2.png";
import win1 from "../../assets/imgs/result/win1.gif";
import win2 from "../../assets/imgs/result/win2.png";
import { Context } from "../../context/Context";
import {
  Amounts,
  Hands,
  Play,
  Result,
  RpsImage,
} from "../RPS/components/Modals/Modals";

const RPSDemo = () => {
  const { soundToggle } = useContext(Context);
  const [usergame, setUsergame] = useState({});
  const [randomItem, setRandomItem] = useState("");
  const [gameResult, setGameResult] = useState({
    userResult: false,
    userStreak: 0,
    gameBlock: 0,
  });
  const [userhand, setUserhand] = useState(0);
  const [useramount, setUseramount] = useState(0);
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [result, setResult] = useState(false);
  const [save, setSave] = useState(false);
  const music = new Audio(winSound);

  const handleInputChange = (event) => {
    setUsergame({
      ...usergame,
      [event.target.name]: event.target.value,
    });
  };

  const openGame = () => {
    if (document.getElementById("age").checked === false) {
      toast.error("Confirm that your are at least 18 years old");
      return false;
    }
    let arrayOptions = ["a", "b", "c", "d", "e", "f"];
    var randomArray = (Math.random() * arrayOptions.length) | 0;
    var result = arrayOptions[randomArray];
    setRandomItem(result);
    setActive(true);
  };

  const doubleOrNothing = async () => {
    if (
      document.getElementById("rock").checked ||
      document.getElementById("paper").checked ||
      document.getElementById("scissors").checked
    ) {
      setUserhand(usergame.hand);
    } else {
      toast.error("Select your betting hand");
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
      toast.error("Select your betting amount");
      return false;
    }
    const userStreak = gameResult.userStreak + 1;
    const userBlock = 0;
    const userResult = true;
    setPlaying(true);
    setAnimation(true);
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
            src={gameResult ? win1 : lose1}
            width="25"
            height="25"
            alt=""
          ></img>
        ) : (
          <img
            src={gameResult ? win2 : lose2}
            width="25"
            height="25"
            alt=""
          ></img>
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
    setSave(false);
    setAnimation(false);
  };

  const backGame = () => {
    setPlaying(false);
    setAnimation(false);
    setResult(false);
  };

  return (
    <article>
      {active ? (
        <div className="game-container">
          {playing ? (
            <div className="game-playing-container">
              <Play
                save={save}
                animation={animation}
                userhand={userhand}
                useramount={useramount}
                showResult={showResult}
              />
              <Result
                save={save}
                result={result}
                userhand={userhand}
                useramount={useramount}
                gameResult={gameResult}
                backGame={backGame}
              />
            </div>
          ) : (
            <>
              <Hands
                handleInputChange={handleInputChange}
                randomItem={randomItem}
                userhand={usergame.hand}
              />
              <Amounts handleInputChange={handleInputChange} />
              <button
                onClick={doubleOrNothing}
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
          <p className="text-center mt-3">
            <label className="switch">
              <input id="age" type="checkbox"></input>&nbsp;
              <span className="slider round"></span>
            </label>
            &nbsp; I confirm that I am at least 18 years old
          </p>
          <div className="center">
            <button className="DoubleOrNothing" onClick={openGame}>
              DOUBLE OR NOTHING
            </button>
          </div>
        </>
      )}
    </article>
  );
};

export default RPSDemo;
