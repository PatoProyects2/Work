import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import winSound from "../../assets/audio/win_sound.mpeg";
import win1 from "../../assets/imgs/Win_Lose_Screens/win1.gif";
import win2 from "../../assets/imgs/Win_Lose_Screens/win2.png";
import RPSGames from "../../assets/imgs/Home_Page/RPS Games.png";
import { GamePanel } from "./components/Modals/Modals";

export default function RPSDemo() {
  const screen = useRef(null);
  const [usergame, setUsergame] = useState({ hand: "", amount: 0 });
  const [randomItem, setRandomItem] = useState("");
  const [gameResult, setGameResult] = useState(false);
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [result, setResult] = useState(false);
  const [save, setSave] = useState(false);
  const [load, setLoad] = useState(false);

  const music = new Audio(winSound);

  const age = window.localStorage.getItem("age");
  const sound = window.localStorage.getItem("sound");

  useEffect(() => {
    setLoad(true);
  }, []);

  const handleInputChange = (event) => {
    setUsergame({
      ...usergame,
      [event.target.name]: event.target.value,
    });
  };

  const scrollToBottom = () => {
    screen.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [load, active, playing]);

  const openGame = () => {
    if (document.getElementById("age").checked === false) {
      toast.error("Confirm that you are at least 18 years old");
      return false;
    }
    let arrayOptions = ["a", "b", "c", "d", "e", "f"];
    var randomArray = (Math.random() * arrayOptions.length) | 0;
    var result = arrayOptions[randomArray];
    setRandomItem(result);
    setActive(true);
  };

  const doubleOrNothing = () => {
    if (usergame.hand === "") {
      toast.error("Select a hand");
      return false;
    }
    if (usergame.amount === 0) {
      toast.error("Select an amount");
      return false;
    }

    setPlaying(true);
    setAnimation(true);
    setSave(true);
  };

  const showResult = () => {
    setGameResult(true);
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
      icon: (
        <img src={result === "a" ? win1 : win2} width="25" height="25" alt="" />
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

    if (sound === "on") {
      music.play();
    }
    toast(
      gameResult === "a"
        ? "You doubled your money!!"
        : "You are doing some business here",
      toastOptions
    );

    setSave(false);
    setAnimation(false);
  };

  const backGame = () => {
    setUsergame({ hand: "", amount: 0 });
    setGameResult(false);
    setPlaying(false);
    setAnimation(false);
    setResult(false);
  };

  return (
    <>
      <div className="left-content-rps">
        <img src={RPSGames} alt="" />
      </div>
      <article>
        {active ? (
          <GamePanel
            age={age}
            playing={playing}
            animation={animation}
            result={result}
            randomItem={randomItem}
            save={save}
            usergame={usergame}
            gameResult={gameResult}
            verifyGame={doubleOrNothing}
            showResult={showResult}
            backGame={backGame}
            handleInputChange={handleInputChange}
            sound={sound}
          />
        ) : (
          <>
            <div className="game-container">
              <div className="game-selection-hand">
                <div className="rps-img rock"></div>
                <div className="rps-img paper"></div>
                <div className="rps-img scissors"></div>
              </div>
            </div>
            <div className="center">
              <button className="DoubleOrNothing" onClick={openGame}>
                DOUBLE OR NOTHING
              </button>
            </div>
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
          </>
        )}
        <div ref={screen}></div>
      </article>
    </>
  );
}
