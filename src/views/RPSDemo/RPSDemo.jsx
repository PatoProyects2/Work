import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import winSound from "../../assets/audio/win_sound.mpeg";
import win1 from "../../assets/imgs/Win_Lose_Screens/win1.gif";
import win2 from "../../assets/imgs/Win_Lose_Screens/win2.png";
import { GameLogo, RpsImage, GamePanel } from "./components/Modals/Modals";

const RPSDemo = () => {
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

    if (age === "false" || age === null) {
      if (document.getElementById("age").checked === false) {
        toast.error("Confirm that you are at least 18 years old");
        return false;
      }
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
      <GameLogo />
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
            <div className="game-gifs-wrapper">
              <RpsImage image="Rock" />
              <RpsImage image="Paper" />
              <RpsImage image="Scissors" />
            </div>
            <div className="center">
              <button className="DoubleOrNothing" onClick={openGame}>
                DOUBLE OR NOTHING
              </button>
            </div>
          </>
        )}
        <div ref={screen}></div>
      </article>
    </>
  );
};

export default RPSDemo;
