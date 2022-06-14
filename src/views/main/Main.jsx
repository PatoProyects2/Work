import { useContext, useEffect, useState } from "react";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import AwesomeSliderStyles from "../../config/react-awesome-slider/src/styles";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import CoinFlipMobile from "../../assets/imgs/Home Page/coin flip banner mobile.png";
import DiscordLogo from "../../assets/imgs/Home Page/discordIcon.png";
import EnergyLogo from "../../assets/imgs/Home Page/energyIcon.png";
import FairPlayMobile from "../../assets/imgs/Home Page/fair play banner mobile.png";
import CoinflipImg from "../../assets/imgs/Home Page/imageCoinflip.png";
import ComingSoonImg from "../../assets/imgs/Home Page/imageComingSoon.png";
import FairPlayImg from "../../assets/imgs/Home Page/imageFairplay.png";
import NFTImg from "../../assets/imgs/Home Page/imageNFT.png";
import RPSGameImg from "../../assets/imgs/Home Page/imageRPSgame.png";
import NFTMobile from "../../assets/imgs/Home Page/nft banner mobile.png";
import RPSGameMobile from "../../assets/imgs/Home Page/RPS_banner_mobile.png";
import TwitterLogo from "../../assets/imgs/Home Page/twitterIcon.png";
import ComingSoonMobile from "../../assets/imgs/Home Page/wip banner mobile.png";
import { db } from "../../config/firesbaseConfig";
import { Context } from "../../context/Context";
import Games from "../../components/Games/Games";
import { useMatchMedia } from "../../hooks/useMatchMedia";
import MostAmount from "./components/LeaderBoards/MostAmount";
import MostPlays from "./components/LeaderBoards/MostPlays";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const StyledMain = styled.div`
      .slider-wrapper {
        width: 100%;
        height: 100px;
      }
    
      .ParteImg {
        position: relative;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
      }

      .ParteImg img {
        width: 202%;
        display: flex;
          @media (max-width: 1320px) {
              width: 202%;
          }
      }

      .ParteImgAbajo {
        position: relative;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
      }

      .ParteImgAbajo img {
        width: 100%;
        display: flex;
      }

      .Games {
          font-weight: bold;
          display: flex;
          justify-content: flex-start;
          color: #f1cf61;
          text-shadow:
              1px 4px black;
              0px 2px black,
              2px 3px black, 
              1px 4px black;
          text-shadow: 3px 0 0 black, 
                      2px 4px 0 black, 
                      0 2px 0 black, 
                      0 -2px 0 black, 
                      1px 1px black, 
                      -1px -1px 0 black, 
                      1px -1px 0 black, 
                      -1px 1px 0 black;    
          letter-spacing: -2px;
      }

      .Tabla {
        width: 100%;
        margin-top: 10px;
        gap: 1rem;
        padding-bottom: 40px;
      }

      .table-title {
        height: 50px;
        display: flex;
        align-items: center;
        color: white;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        font-size: 20px;
        justify-content: center;
        background-color: #554c77;
      }

      .table-title p{
        margin-top: 1rem;
      }
 
      .table-section {
        border: 1px solid #554c77;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
      }

      table {
        width: 100%;        
      }

      thead th {
          cursor: pointer;
          color: #60597a;
          top: 0;
          font-weight: 400;
          font-size: 17px;
      }

      thead button{
          cursor: pointer;
          border: none;
          color: #60597a;
          top: 0;
          font-weight: 400;
          font-size: 17px;
          height: 48px;
          background-color: #2c2640;
          width: 100%;
      }

      thead button:active{
          cursor: pointer;
          border: none;
          color: #60597a;
          top: 0;
          font-weight: 400;
          font-size: 17px;
          height: 48px;
          background-color: #eece5d;
      }

      .FlexTh {
        display: flex;
      }

      .FlexTh button{
        border: 1px solid #554c77;
        padding: 10px;
        margin-top: -1px;
        margin-left: -2px;
        margin-right: -2px;
      }
  `;

const StyledMenu = styled.div`
  display: flex;
  margin-top: 25px;
  justify-content: center;
  margin-bottom: 20px;

  .item2 {
    margin-left: 20px;
    min-width: 200px;
    display: flex;
    align-items: center;
    background-color: #2f4471;
    justify-content: center;
    height: 50px;
    border-radius: 10px;
  }

  .item2 img {
    width: 25px;
    height: 25px;
  }

  .item2 p {
    color: #81d2ff;
    margin-left: 10px;
    margin-top: 1rem;
  }

  .item3 {
    margin-left: 20px;
    min-width: 200px;
    display: flex;
    align-items: center;
    background-color: #373878;
    justify-content: center;
    height: 50px;
    border-radius: 10px;
  }

  .item3 img {
    width: 25px;
    height: 25px;
  }

  .item3 p {
    color: #7d80e7;
    margin-left: 10px;
    margin-top: 1rem;
  }

  .item4 {
    margin-left: 20px;
    min-width: 200px;
    display: flex;
    align-items: center;
    background-color: #374842;
    justify-content: center;
    height: 50px;
    border-radius: 10px;
  }

  .item4 img {
    width: 25px;
    height: 25px;
  }

  .item4 p {
    color: #7ce66a;
    margin-left: 10px;
    margin-top: 1rem;
  }
`;

const Main = () => {
  const { discordId } = useContext(Context);
  const [topLeaderboards, setTopLeaderboards] = useState(false);
  const [liveBets, setLiveBets] = useState(true);
  const [mostPlays, setMostPlays] = useState(false);
  const [mostAmount, setMostAmount] = useState(false);
  const [daily, setDaily] = useState(true);
  const [weekly, setWeekly] = useState(false);
  const [monthly, setMonthly] = useState(false);
  const [global, setGlobal] = useState(false);
  const isMobileResolution = useMatchMedia("(max-width:700px)", false);
  const isTabletResolution = useMatchMedia("(max-width:1000px)", false);

  useEffect(() => {
    const unixTime = Math.round(new Date().getTime() / 1000);
    if (discordId !== "" && unixTime > 0) {
      setDoc(doc(db, "status", discordId), {
        state: "online",
        time: unixTime,
      });
    }
  }, [discordId])

  useEffect(() => {
    const readLeaderboard = async () => {
      const unixTime = Math.round(new Date().getTime() / 1000);
      const lastDay = unixTime - 86400;
      const lastWeek = unixTime - 604800;
      const lastMonth = unixTime - 2592000;

      let dayGames = [];
      let weekGames = [];
      let monthGames = [];
      let globalGames = [];

      const q = query(collection(db, "allGames"));
      const document = await getDocs(q);

      // Filtrado por preiodo de tiempo

      document.forEach((doc) => {
        let data = doc.data();
        let created = data.createdAt;

        if (created > lastDay) {
          const array = {
            photo: data.photo,
            name: data.name,
            amount: data.amount,
            uid: data.uid,
          };
          dayGames = dayGames.concat(array);
        }

        if (created > lastWeek) {
          const array = {
            photo: data.photo,
            name: data.name,
            amount: data.amount,
            uid: data.uid,
          };
          weekGames = weekGames.concat(array);
        }

        if (created > lastMonth) {
          const array = {
            photo: data.photo,
            name: data.name,
            amount: data.amount,
            uid: data.uid,
          };
          monthGames = monthGames.concat(array);
        }

        const array = {
          photo: data.photo,
          name: data.name,
          amount: data.amount,
          uid: data.uid,
        };
        globalGames = globalGames.concat(array);
      });

      // Agrupacion por usuario

      let dayObject = [];
      dayGames.forEach((x) => {
        if (!dayObject.hasOwnProperty(x.uid)) {
          dayObject[x.uid] = [];
        }
        dayObject[x.uid].push({ ...x });
      });

      let weekObject = [];
      weekGames.forEach((x) => {
        if (!weekObject.hasOwnProperty(x.uid)) {
          weekObject[x.uid] = [];
        }
        weekObject[x.uid].push({ ...x });
      });

      let monthObject = [];
      monthGames.forEach((x) => {
        if (!monthObject.hasOwnProperty(x.uid)) {
          monthObject[x.uid] = [];
        }
        monthObject[x.uid].push({ ...x });
      });

      let globalObject = [];
      globalGames.forEach((x) => {
        if (!globalObject.hasOwnProperty(x.uid)) {
          globalObject[x.uid] = [];
        }
        globalObject[x.uid].push({ ...x });
      });

      // Suma total de partidas y cantidad de dinero jugado por usuario

      const day = Object.values(dayObject).map((users) => {
        const amounts = users.map((amount) => amount.amount);
        const amount = amounts.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue;
        }, 0);
        const user = users[users.length - 1];
        const top = {
          photo: user.photo,
          name: user.name,
          game: users.length,
          amount: amount
        };
        return top;
      });

      const week = Object.values(weekObject).map((users) => {
        const amounts = users.map((amount) => amount.amount);
        const amount = amounts.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue;
        }, 0);
        const user = users[users.length - 1];
        const top = {
          photo: user.photo,
          name: user.name,
          game: users.length,
          amount: amount
        };
        return top;
      });

      const month = Object.values(monthObject).map((users) => {
        const amounts = users.map((amount) => amount.amount);
        const amount = amounts.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue;
        }, 0);
        const user = users[users.length - 1];
        const top = {
          photo: user.photo,
          name: user.name,
          game: users.length,
          amount: amount
        };
        return top;
      });

      const global = Object.values(globalObject).map((users) => {
        const amounts = users.map((amount) => amount.amount);
        const amount = amounts.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue;
        }, 0);
        const user = users[users.length - 1];
        const top = {
          photo: user.photo,
          name: user.name,
          game: users.length,
          amount: amount
        };
        return top;
      });

      var games = {};
      games.day = [...day].sort((a, b) => b.game - a.game);
      games.week = [...week].sort((a, b) => b.game - a.game);
      games.month = [...month].sort((a, b) => b.game - a.game);
      games.global = [...global].sort((a, b) => b.game - a.game);

      var amount = {};
      amount.day = [...day].sort((a, b) => b.amount - a.amount);
      amount.week = [...week].sort((a, b) => b.amount - a.amount);
      amount.month = [...month].sort((a, b) => b.amount - a.amount);
      amount.global = [...global].sort((a, b) => b.amount - a.amount);

      var leaderboard = {};
      leaderboard.games = games;
      leaderboard.amount = amount;

      setTopLeaderboards(leaderboard);
    };
    readLeaderboard();
    return () => {
      setTopLeaderboards(false);
    };
  }, [discordId]);

  const day = () => {
    setDaily(true);
    setWeekly(false);
    setMonthly(false);
    setGlobal(false);
  };

  const week = () => {
    setDaily(false);
    setWeekly(true);
    setMonthly(false);
    setGlobal(false);
  };

  const month = () => {
    setDaily(false);
    setWeekly(false);
    setMonthly(true);
    setGlobal(false);
  };

  const all = () => {
    setDaily(false);
    setWeekly(false);
    setMonthly(false);
    setGlobal(true);
  };

  const Cards = () => {
    return (
      <div className="cards-container">
        <h1 className="Games">GAMES</h1>
        <div className="game-card mx-auto">
          <NavLink to="/rps">
            <div className="ParteImg">
              {isTabletResolution ? (
                <img src={RPSGameMobile} />
              ) : (
                <img src={RPSGameImg} />
              )}
            </div>
          </NavLink>
        </div>
        <div className="d-flex responsive-card">
          <div className="game-card mx-auto">
            <NavLink to="/comingsoon">
              <div className="ParteImgAbajo">
                {isTabletResolution ? (
                  <img src={ComingSoonMobile} />
                ) : (
                  <img src={ComingSoonImg} />
                )}
              </div>
            </NavLink>
          </div>
          <div className="game-card mx-auto">
            <NavLink to="/nfts">
              <div className="ParteImgAbajo">
                {isTabletResolution ? (
                  <img src={NFTMobile} />
                ) : (
                  <img src={NFTImg} />
                )}
              </div>
            </NavLink>
          </div>
        </div>
        <div className="d-flex responsive-card">
          <div className="game-card mx-auto">
            <NavLink to="/coinflip">
              <div className="ParteImgAbajo">
                {isTabletResolution ? (
                  <img src={CoinFlipMobile} />
                ) : (
                  <img src={CoinflipImg} />
                )}
              </div>
            </NavLink>
          </div>
          <div className="game-card mx-auto">
            <NavLink to="/fair-play">
              <div className="ParteImgAbajo">
                {isTabletResolution ? (
                  <img src={FairPlayMobile} />
                ) : (
                  <img src={FairPlayImg} />
                )}
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    );
  };

  const TableButtons = () => {
    return (
      <div className="botones-tabla">
        <div className="botones-tipos">
          <button
            onClick={() => (
              setLiveBets(true),
              setMostPlays(false),
              setMostAmount(false)
            )}
            disabled={liveBets}
            className={liveBets ? "active btn-rango-left" : "btn-rango-left"}
          >
            Live Bets
          </button>
          <button
            onClick={() => (
              setLiveBets(false),
              setMostPlays(true),
              setMostAmount(false),
              day()
            )}
            disabled={mostPlays}
            className={mostPlays ? "active btn-rango-center" : "btn-rango-center"}
          >
            Most Plays
          </button>
          <button
            onClick={() => (
              setLiveBets(false),
              setMostPlays(false),
              setMostAmount(true),
              day()
            )}
            disabled={mostAmount}
            className={mostAmount ? "active btn-rango-right" : "btn-rango-right"}
          >
            Most Amount
          </button>
        </div>
        {!liveBets && (
          <div className="botones-times">
            <button
              onClick={day}
              disabled={daily}
              className={daily ? "active btn-time" : "btn-time"}
            >
              Daily
            </button>
            <button
              onClick={week}
              disabled={weekly}
              className={weekly ? "active btn-time" : "btn-time"}
            >
              Weekly
            </button>
            <button
              onClick={month}
              disabled={monthly}
              className={monthly ? "active btn-time" : "btn-time"}
            >
              Monthly
            </button>
            <button
              onClick={all}
              disabled={global}
              className={global ? "active btn-time" : "btn-time"}
            >
              Global
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <StyledMain>
      <StyledMenu>
        {
          isMobileResolution
            ? (
              <AutoplaySlider
                cssModule={AwesomeSliderStyles}
                play={true}
                cancelOnInteraction={false} // should stop playing on user interaction
                interval={3000}
                className="slider-wrapper"
              >
                <div className="item2">
                  <img src={TwitterLogo} alt="" />
                  <p>Join Us on Twitter</p>
                </div>

                <div className="item3">
                  <img src={DiscordLogo} alt="" />
                  <p>Join Us on Discord</p>
                </div>

                <div className="item4">
                  <img src={EnergyLogo} alt="" />
                  <p>Provable Fairness</p>
                </div>
              </AutoplaySlider>
            ) : (
              <>
                <div className="item2">
                  <img src={TwitterLogo} alt="" />
                  <p>Join Us on Twitter</p>
                </div>

                <div className="item3">
                  <img src={DiscordLogo} alt="" />
                  <p>Join Us on Discord</p>
                </div>

                <div className="item4">
                  <img src={EnergyLogo} alt="" />
                  <p>Provable Fairness</p>
                </div>
              </>
            )
        }
      </StyledMenu>

      <Cards />

      <TableButtons />

      <div className="Tabla">
        <div className="table-title">
          {liveBets && <p>Live Bets</p>}
          {mostPlays && <p>Most Plays</p>}
          {mostAmount && <p>Most Amount</p>}
        </div>
        <div className="table-section">
          {
            liveBets
            &&
            <Games isMobileResolution={isMobileResolution} />
          }
          {
            mostPlays && topLeaderboards
            &&
            <MostPlays
              leaderboard={
                daily && topLeaderboards.games.day ||
                weekly && topLeaderboards.games.week ||
                monthly && topLeaderboards.games.month ||
                global && topLeaderboards.games.global
              }
              isMobileResolution={isMobileResolution}
            />
          }
          {
            mostAmount && topLeaderboards
            &&
            <MostAmount
              leaderboard={
                daily && topLeaderboards.amount.day ||
                weekly && topLeaderboards.amount.week ||
                monthly && topLeaderboards.amount.month ||
                global && topLeaderboards.amount.global
              }
              isMobileResolution={isMobileResolution}
            />
          }
        </div>
      </div>
    </StyledMain>
  );
};

export default Main;