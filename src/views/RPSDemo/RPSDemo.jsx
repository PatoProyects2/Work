import { useContext, useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import winSound from "../../assets/audio/win_sound.mpeg";
import lose1 from "../../assets/imgs/Win_Lose_Screens/lose1.gif";
import lose2 from "../../assets/imgs/Win_Lose_Screens/lose2.png";
import win1 from "../../assets/imgs/Win_Lose_Screens/win1.gif";
import win2 from "../../assets/imgs/Win_Lose_Screens/win2.png";
import { Context } from "../../context/Context";
import { GameLogo, RpsImage, GamePanel } from "../RPS/components/Modals/Modals";

const RPSDemo = () => {
  const screen = useRef(null);
  const { soundToggle } = useContext(Context);
  const [usergame, setUsergame] = useState({});
  const [randomItem, setRandomItem] = useState("");
  const [gameResult, setGameResult] = useState({
    userResult: false,
    userStreak: 0,
    gameBlock: 0,
  });
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [result, setResult] = useState(false);
  const [save, setSave] = useState(false);
  const [load, setLoad] = useState(false);
  const music = new Audio(winSound);

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
    if (document.getElementById("age").checked === false) {
      toast.error("Confirm that you are at least 18 years old");
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

  const showResult = () => {
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
        <img
          src={
            result === "a"
              ? gameResult.userResult
                ? win1
                : lose1
              : gameResult.userResult
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

    if (gameResult.userResult) {
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
    setAnimation(false);
  };

  const backGame = () => {
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
