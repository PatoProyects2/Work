import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import lodash from "lodash";
import { ButtonGroup, Button } from "reactstrap";
import DiscordLogo from "../../assets/imgs/Home Page/discordIcon.png";
import EnergyLogo from "../../assets/imgs/Home Page/energyIcon.png";
import CoinflipImg from "../../assets/imgs/Home Page/imageCoinflip.png";
import ComingSoonImg from "../../assets/imgs/Home Page/imageComingSoon.png";
import FairPlayImg from "../../assets/imgs/Home Page/imageFairplay.png";
import NFTImg from "../../assets/imgs/Home Page/imageNFT.png";
import RPSGameImg from "../../assets/imgs/Home Page/imageRPSgame.png";
import TwitterLogo from "../../assets/imgs/Home Page/twitterIcon.png";
import { Context } from "../../context/Context";
import { db } from "../../config/firesbaseConfig";
import Games from "../../firebase/Games";
import { useMatchMedia } from "../../hooks/useMatchMedia";
import MostAmount from "./components/LeaderBoards/MostAmount";
import MostPlays from "./components/LeaderBoards/MostPlays";

const StyledMain = styled.div`
    
      .ParteImg {
        position: relative;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
      }

      .ParteImg p {
        position: absolute;
        z-index: 10;
        bottom: 0%;
        left: -45%;
        font-size: 25px;
        color: white;
        font-weight: bold;
        text-shadow:
                1px 4px black;
                0px 2px black,
                15px 10px black;
            text-shadow: 3px 0 0 black, 
                        2px 4px 0 black, 
                        0 2px 0 black, 
                        0 -2px 0 black, 
                        1px 1px black, 
                        -1px -1px 0 black, 
                        1px -1px 0 black, 
                        -1px 1px 0 black;    
            letter-spacing: -2px;
              @media (max-width: 1320px) {
                left: 5%;
              }

      }

      .ParteImg img {
        width: 202%;
        display: flex;
          @media (max-width: 1320px) {
              width: 100%;
          }
      }

      .ParteImgAbajo {
        position: relative;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
      }

      .ParteImgAbajo p {
        position: absolute;
        z-index: 10;
        bottom: 0%;
        left: 5%;
        font-size: 25px;
        color: white;
        font-weight: bold;
        text-shadow:
                1px 4px black;
                0px 2px black,
                15px 10px black;
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

          @media (max-width: 1320px) {
            justify-content: center;
          }
      }

      .Tabla {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        
        margin-top: 50px;
        gap: 1rem;
        padding-bottom: 40px;
      }

      .TitleMostPlays {
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

      .TitleMostPlays p{
        margin-top: 1rem;
      }
 
      .table_section {
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

      .TitleMostAmount {
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

      .TitleMostAmount p{
          margin-top: 1rem;
      }

      .tableLiveBets {          
          @media (max-width: 1520px) {
            width: 100%;
          }
      }

      .TitleLiveBets {
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

      .TitleLiveBets p{
          margin-top: 1rem;
      }

      .FlexTh {
        display: flex;
      }

      .FlexTh button{
        border: 1px solid #554c77;
        padding: 10px;
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
  const [topLeaderboards, setTopLeaderboards] = useState({});
  const [liveBets, setLiveBets] = useState(false);
  const [mostPlays, setMostPlays] = useState(false);
  const [mostAmount, setMostAmount] = useState(false);
  const [dailyGame, setDailyGame] = useState(false);
  const [weeklyGame, setWeeklyGame] = useState(false);
  const [monthlyGame, setMonthlyGame] = useState(false);
  const [globalGame, setGlobalGame] = useState(false);
  const [dailyAmount, setDailyAmount] = useState(false);
  const [weeklyAmount, setWeeklyAmount] = useState(false);
  const [monthlyAmount, setMonthlyAmount] = useState(false);
  const [globalAmount, setGlobalAmount] = useState(false);
  const isMobileResolution = useMatchMedia("(max-width:650px)", false);

  useEffect(() => {
    if (isMobileResolution) {
      setLiveBets(true)
      setMostPlays(false)
      setMostAmount(false)

      setDailyGame(true)
      setWeeklyGame(false)
      setMonthlyGame(false)
      setGlobalGame(false)

      setDailyAmount(true)
      setWeeklyAmount(false)
      setMonthlyAmount(false)
      setGlobalAmount(false)
    } else {
      setLiveBets(true)
      setMostPlays(true)
      setMostAmount(true)

      setDailyGame(true)
      setWeeklyGame(false)
      setMonthlyGame(false)
      setGlobalGame(false)

      setDailyAmount(true)
      setWeeklyAmount(false)
      setMonthlyAmount(false)
      setGlobalAmount(false)
    }
  }, [isMobileResolution])

  useEffect(() => {
    const readLeaderboard = async () => {
      const unixTime = Math.round(new Date().getTime() / 1000);
      const lastDay = unixTime - 86400;
      const lastWeek = unixTime - 604800;
      const lastMonth = unixTime - 2592000;

      if (discordId !== "" && unixTime > 0) {
        setDoc(doc(db, "status", discordId), {
          state: "online",
          time: unixTime,
        });
      }

      let dayGames = [];
      let weekGames = [];
      let monthGames = [];
      let globalGames = [];

      const clubCollection = collection(db, "allGames");
      const queryGames = query(clubCollection, where("name", "!=", ""));
      const documentGames = await getDocs(queryGames);
      documentGames.forEach((doc) => {
        let data = doc.data();
        let created = doc.data().createdAt;
        if (created > lastDay) {
          let array0 = {
            account: data.account,
            photo: data.photo,
            name: data.name,
            amount: data.amount,
            uid: data.uid,
          };
          dayGames = dayGames.concat(array0);
        }
        if (created > lastWeek) {
          let array1 = {
            account: data.account,
            photo: data.photo,
            name: data.name,
            amount: data.amount,
            uid: data.uid,
          };
          weekGames = weekGames.concat(array1);
        }
        if (created > lastMonth) {
          let array2 = {
            account: data.account,
            photo: data.photo,
            name: data.name,
            amount: data.amount,
            uid: data.uid,
          };
          monthGames = monthGames.concat(array2);
        }
        let array3 = {
          account: data.account,
          photo: data.photo,
          name: data.name,
          amount: data.amount,
          uid: data.uid,
        };
        globalGames = globalGames.concat(array3);
      });

      let dayObject = [];
      dayGames.forEach((x) => {
        if (!dayObject.hasOwnProperty(x.uid)) {
          dayObject[x.uid] = [];
        }
        dayObject[x.uid].push({
          account: x.account,
          photo: x.photo,
          name: x.name,
          amount: x.amount,
        });
      });

      let weekObject = [];
      weekGames.forEach((x) => {
        if (!weekObject.hasOwnProperty(x.uid)) {
          weekObject[x.uid] = [];
        }
        weekObject[x.uid].push({
          account: x.account,
          photo: x.photo,
          name: x.name,
          amount: x.amount,
        });
      });

      let monthObject = [];
      monthGames.forEach((x) => {
        if (!monthObject.hasOwnProperty(x.uid)) {
          monthObject[x.uid] = [];
        }
        monthObject[x.uid].push({
          account: x.account,
          photo: x.photo,
          name: x.name,
          amount: x.amount,
        });
      });

      let globalObject = [];
      globalGames.forEach((x) => {
        if (!globalObject.hasOwnProperty(x.uid)) {
          globalObject[x.uid] = [];
        }
        globalObject[x.uid].push({
          account: x.account,
          photo: x.photo,
          name: x.name,
          amount: x.amount,
        });
      });

      let dayArray = [];
      Object.values(dayObject).forEach((val) => {
        dayArray = dayArray.concat([val]);
      });

      let weekArray = [];
      Object.values(weekObject).forEach((val) => {
        weekArray = weekArray.concat([val]);
      });

      let monthArray = [];
      Object.values(monthObject).forEach((val) => {
        monthArray = monthArray.concat([val]);
      });

      let globalArray = [];
      Object.values(globalObject).forEach((val) => {
        globalArray = globalArray.concat([val]);
      });

      let day = dayArray.map((users) => {
        let amounts = users.map((amount) => amount.amount);
        let amount = lodash.sum(amounts);
        let user = users[users.length - 1];
        let top = [user.account, user.photo, user.name, users.length, amount];
        return top;
      });

      let week = weekArray.map((users) => {
        let amounts = users.map((amount) => amount.amount);
        let amount = lodash.sum(amounts);
        let user = users[users.length - 1];
        let top = [user.account, user.photo, user.name, users.length, amount];
        return top;
      });

      let month = monthArray.map((users) => {
        let amounts = users.map((amount) => amount.amount);
        let amount = lodash.sum(amounts);
        let user = users[users.length - 1];
        let top = [user.account, user.photo, user.name, users.length, amount];
        return top;
      });

      let global = globalArray.map((users) => {
        let amounts = users.map((amount) => amount.amount);
        let amount = lodash.sum(amounts);
        let user = users[users.length - 1];
        let top = [user.account, user.photo, user.name, users.length, amount];
        return top;
      });

      var games = {};

      games.day = [...day].sort((a, b) => b[3] - a[3]);
      games.week = [...week].sort((a, b) => b[3] - a[3]);
      games.month = [...month].sort((a, b) => b[3] - a[3]);
      games.global = [...global].sort((a, b) => b[3] - a[3]);

      var amount = {};

      amount.day = [...day].sort((a, b) => b[4] - a[4]);
      amount.week = [...week].sort((a, b) => b[4] - a[4]);
      amount.month = [...month].sort((a, b) => b[4] - a[4]);
      amount.global = [...global].sort((a, b) => b[4] - a[4]);

      var leaderboard = {};
      leaderboard.games = games;
      leaderboard.amount = amount;

      setTopLeaderboards(leaderboard);
    };
    readLeaderboard();
    return () => {
      setTopLeaderboards({});
    };
  }, [discordId]);

  const day = () => {
    if (mostPlays) {
      setDailyGame(true);
      setWeeklyGame(false);
      setMonthlyGame(false);
      setGlobalGame(false);
    }
    if (mostAmount) {
      setDailyAmount(true);
      setWeeklyAmount(false);
      setMonthlyAmount(false);
      setGlobalAmount(false);
    }
  };

  const week = () => {
    if (mostPlays) {
      setDailyGame(false);
      setWeeklyGame(true);
      setMonthlyGame(false);
      setGlobalGame(false);
    }
    if (mostAmount) {
      setDailyAmount(false);
      setWeeklyAmount(true);
      setMonthlyAmount(false);
      setGlobalAmount(false);
    }
  };

  const month = () => {
    if (mostPlays) {
      setDailyGame(false);
      setWeeklyGame(false);
      setMonthlyGame(true);
      setGlobalGame(false);
    }
    if (mostAmount) {
      setDailyAmount(false);
      setWeeklyAmount(false);
      setMonthlyAmount(true);
      setGlobalAmount(false);
    }
  };

  const all = () => {
    if (mostPlays) {
      setDailyGame(false);
      setWeeklyGame(false);
      setMonthlyGame(false);
      setGlobalGame(true);
    }
    if (mostAmount) {
      setDailyAmount(false);
      setWeeklyAmount(false);
      setMonthlyAmount(false);
      setGlobalAmount(true);
    }
  };

  return (
    <StyledMain>
      <StyledMenu>
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
      </StyledMenu>

      <div className="cards-container">
        <h1 className="Games">GAMES</h1>
        <div className="game-card mx-auto">
          <NavLink to="/rps">
            <div className="ParteImg">
              <img src={RPSGameImg} width="400" />
              <p>RPS &nbsp; GAMES</p>
            </div>
          </NavLink>
        </div>
        <div className="d-flex responsive-card">
          <div className="game-card mx-auto">
            <NavLink to="/comingsoon">
              <div className="ParteImgAbajo">
                <img src={ComingSoonImg} width="400" />
                <p>Coming &nbsp; Soon</p>
              </div>
            </NavLink>
          </div>
          <div className="game-card mx-auto">
            <NavLink to="/nfts">
              <div className="ParteImgAbajo">
                <img src={NFTImg} width="400" />
                <p>NFT'S</p>
              </div>
            </NavLink>
          </div>
        </div>
        <div className="d-flex responsive-card">
          <div className="game-card mx-auto">
            <NavLink to="/coinflip">
              <div className="ParteImgAbajo">
                <img src={CoinflipImg} width="400" />
                <p>Coinflip</p>
              </div>
            </NavLink>
          </div>
          <div className="game-card mx-auto">
            <NavLink to="/fair-play">
              <div className="ParteImgAbajo">
                <img src={FairPlayImg} width="400" />
                <p>Fairplay</p>
              </div>
            </NavLink>
          </div>
        </div>
      </div>

      <br></br>

      {
        isMobileResolution
        &&
        <ButtonGroup>
          <Button onClick={() => !liveBets && (setLiveBets(true), setMostPlays(false), setMostAmount(false))} className={liveBets ? 'active btn-rank' : 'btn-rank'}>
            Live Bets
          </Button>
          <Button onClick={() => !mostPlays && (setLiveBets(false), setMostPlays(true), setMostAmount(false))} className={mostPlays ? 'active btn-rank' : 'btn-rank'}>
            Most Plays
          </Button>
          <Button onClick={() => !mostAmount && (setLiveBets(false), setMostPlays(false), setMostAmount(true))} className={mostAmount ? 'active btn-rank' : 'btn-rank'}>
            Most Amount
          </Button>
        </ButtonGroup>
      }

      <div className={isMobileResolution ? "" : "Tabla"}>
        {mostPlays && topLeaderboards.games &&
          <div className="tableMostPlays">
            <div className="TitleMostPlays">
              <p>Most Plays</p>
            </div>
            <div className="table_section">
              <table>
                <thead>
                  <tr>
                    <th className="FlexTh">
                      <button onClick={() => (setDailyGame(true), setWeeklyGame(false), setMonthlyGame(false), setGlobalGame(false))} className="button-recurrence">
                        Daily
                      </button>
                      <button onClick={() => (setDailyGame(false), setWeeklyGame(true), setMonthlyGame(false), setGlobalGame(false))} className="button-recurrence">
                        Weekly
                      </button>
                      <button onClick={() => (setDailyGame(false), setWeeklyGame(false), setMonthlyGame(true), setGlobalGame(false))} className="button-recurrence">
                        Monthly
                      </button>
                      <button onClick={() => (setDailyGame(false), setWeeklyGame(false), setMonthlyGame(false), setGlobalGame(true))} className="button-recurrence">
                        Global
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dailyGame &&
                    <MostPlays
                      leaderboard={topLeaderboards.games.day}
                      isMobileResolution={isMobileResolution}
                    />
                  }
                  {weeklyGame &&
                    <MostPlays
                      leaderboard={topLeaderboards.games.week}
                      isMobileResolution={isMobileResolution}
                    />
                  }
                  {monthlyGame &&
                    <MostPlays
                      leaderboard={topLeaderboards.games.month}
                      isMobileResolution={isMobileResolution}
                    />
                  }
                  {globalGame &&
                    <MostPlays
                      leaderboard={topLeaderboards.games.global}
                      isMobileResolution={isMobileResolution}
                    />
                  }
                </tbody>
              </table>
            </div>
          </div>
        }
        {liveBets &&
          <div className="tableLiveBets">
            <div className="TitleLiveBets">
              <p>Live Bets</p>
            </div>
            <table>
              <tbody>
                <Games isMobileResolution={isMobileResolution} />
              </tbody>
            </table>
          </div>
        }
        {mostAmount && topLeaderboards.amount &&
          <div className="tableMostAmount">
            <div className="TitleMostAmount">
              <p>Most Amount</p>
            </div>
            <div className="table_section">
              <table>
                <thead>
                  <tr>
                    <th className="FlexTh">
                      <button onClick={() => (setDailyAmount(true), setWeeklyAmount(false), setMonthlyAmount(false), setGlobalAmount(false))} className="button-recurrence">
                        Daily
                      </button>
                      <button onClick={() => (setDailyAmount(false), setWeeklyAmount(true), setMonthlyAmount(false), setGlobalAmount(false))} className="button-recurrence">
                        Weekly
                      </button>
                      <button onClick={() => (setDailyAmount(false), setWeeklyAmount(false), setMonthlyAmount(true), setGlobalAmount(false))} className="button-recurrence">
                        Monthly
                      </button>
                      <button onClick={() => (setDailyAmount(false), setWeeklyAmount(false), setMonthlyAmount(false), setGlobalAmount(true))} className="button-recurrence">
                        Global
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dailyAmount &&
                    <MostAmount
                      leaderboard={topLeaderboards.amount.day}
                      isMobileResolution={isMobileResolution}
                    />
                  }
                  {weeklyAmount &&
                    <MostAmount
                      leaderboard={topLeaderboards.amount.week}
                      isMobileResolution={isMobileResolution}
                    />
                  }
                  {monthlyAmount &&
                    <MostAmount
                      leaderboard={topLeaderboards.amount.month}
                      isMobileResolution={isMobileResolution}
                    />
                  }
                  {globalAmount &&
                    <MostAmount
                      leaderboard={topLeaderboards.amount.global}
                      isMobileResolution={isMobileResolution}
                    />
                  }
                </tbody>
              </table>
            </div>
          </div>
        }
      </div>
    </StyledMain >
  );
}

export default Main;