import React, { useState, useEffect } from 'react'
import { NavLink, useOutletContext } from 'react-router-dom'
import { collection, getDocs, query, limit, onSnapshot, orderBy, where } from "firebase/firestore";
import { db } from '../../firebase/firesbaseConfig'
import LiveBets from './components/LiveBets'
import MostPlays from './components/MostPlays'
import MostAmount from './components/MostAmount'
export default function Main() {
  const [theme, setTheme] = useOutletContext();
  const [historyPlays, setHistoryPlays] = useState({});
  const [leaderboard, setLeaderboard] = useState({});
  const [globalGames, setGlobalGames] = useState(0);
  const [unixTimeStamp, setUnixTimeStamp] = useState(1000000000000000000);
  const [liveBets, setLiveBets] = useState(true);
  const [mostPlays, setMostPlays] = useState(false);
  const [dailyGame, setDailyGame] = useState(false);
  const [weeklyGame, setWeeklyGame] = useState(false);
  const [monthlyGame, setMonthlyGame] = useState(false);
  const [globalGame, setGlobalGame] = useState(false);
  const [mostAmount, setMostAmount] = useState(false);
  const [dailyAmount, setDailyAmount] = useState(false);
  const [weeklyAmount, setWeeklyAmount] = useState(false);
  const [monthlyAmount, setMonthlyAmount] = useState(false);
  const [globalAmount, setGlobalAmount] = useState(false);

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const timer = setInterval(() => { getUnixTime() }, 4000);
    return () => clearInterval(timer);
  }, [])

  useEffect(() => {
    const q = query(collection(db, "allGames"), orderBy("createdAt", "desc"), limit(10))
    const unsub = onSnapshot(q, (doc) => {
      const played = doc.docs.map(amountLeaderboard => amountLeaderboard.data())
      setHistoryPlays(played)
      setGlobalGames(played.length)
    });
    return unsub;
  }, [])

  useEffect(() => {
    const readLeaderboard = async (unixTimeStamp) => {
      const unixSeconds = parseInt(unixTimeStamp)
      const clubCollection = collection(db, "clubUsers")

      const lastDay = unixSeconds - 86400
      const lastWeek = unixSeconds - 604800
      const lastMonth = unixSeconds - 259200
      const queryGames = query(clubCollection, orderBy("rps.totalGames", "desc"))
      const documentGames = await getDocs(queryGames)
      let topGames = {}
      let dayGames = []
      let weekGames = []
      let monthGames = []
      let globalGames = []
      documentGames.forEach((doc) => {
        if (doc.data().rps.lastGame > lastDay) {
          dayGames.push([doc.data().account, doc.data().photo, doc.data().name, doc.data().rps.totalGames])
        }
        if (doc.data().rps.lastGame > lastWeek) {
          weekGames.push([doc.data().account, doc.data().photo, doc.data().name, doc.data().rps.totalGames])
        }
        if (doc.data().rps.lastGame > lastMonth) {
          monthGames.push([doc.data().account, doc.data().photo, doc.data().name, doc.data().rps.totalGames])
        }
        globalGames.push([doc.data().account, doc.data().photo, doc.data().name, doc.data().rps.totalGames])
      });
      topGames.dayGames = dayGames
      topGames.weekGames = weekGames
      topGames.monthGames = monthGames
      topGames.globalGames = globalGames

      const queryAmount = query(clubCollection, orderBy("rps.totalMaticAmount", "desc"))
      const documentAmount = await getDocs(queryAmount)
      let topAmount = {}
      let dayAmount = []
      let weekAmount = []
      let monthAmount = []
      let globalAmount = []
      documentAmount.forEach((doc) => {
        if (doc.data().rps.lastGame > lastDay) {
          dayAmount.push([doc.data().account, doc.data().photo, doc.data().name, doc.data().rps.totalMaticAmount])
        }
        if (doc.data().rps.lastGame > lastWeek) {
          weekAmount.push([doc.data().account, doc.data().photo, doc.data().name, doc.data().rps.totalMaticAmount])
        }
        if (doc.data().rps.lastGame > lastMonth) {
          monthAmount.push([doc.data().account, doc.data().photo, doc.data().name, doc.data().rps.totalMaticAmount])
        }
        globalAmount.push([doc.data().account, doc.data().photo, doc.data().name, doc.data().rps.totalMaticAmount])
      });
      topAmount.dayAmount = dayAmount
      topAmount.weekAmount = weekAmount
      topAmount.monthAmount = monthAmount
      topAmount.globalAmount = globalAmount

      let leaderboard = {}
      leaderboard.topGames = topGames
      leaderboard.topAmount = topAmount
      setLeaderboard(leaderboard)
    }
    readLeaderboard(unixTimeStamp)
  }, [unixTimeStamp])

  const getUnixTime = async () => {
    fetch('https://showcase.api.linx.twenty57.net/UnixTime/tounixtimestamp?datetime=now')
      .then(response =>
        response.json()
      ).then(data =>
        setUnixTimeStamp(data.UnixTimeStamp)
      );
  }

  const liveBetsModal = () => {
    if (!liveBets) {
      setMostPlays(false)
      setMostAmount(false)
      setLiveBets(true)
    }
  }

  const leaderboardsModalPlays = () => {
    if (liveBets || mostAmount) {
      setLiveBets(false)
      setMostPlays(true)
      setMostAmount(false)

      setDailyGame(true)
      setWeeklyGame(false)
      setMonthlyGame(false)
      setGlobalGame(false)

      setDailyAmount(false)
      setWeeklyAmount(false)
      setMonthlyAmount(false)
      setGlobalAmount(false)
    }
  }

  const leaderboardsModalAmount = () => {
    if (liveBets || mostPlays) {
      setLiveBets(false)
      setMostPlays(false)
      setMostAmount(true)

      setDailyAmount(true)
      setWeeklyAmount(false)
      setMonthlyAmount(false)
      setGlobalAmount(false)

      setDailyGame(false)
      setWeeklyGame(false)
      setMonthlyGame(false)
      setGlobalGame(false)
    }
  }

  const day = () => {
    if (mostPlays) {
      setDailyGame(true)
      setWeeklyGame(false)
      setMonthlyGame(false)
      setGlobalGame(false)
    }
    if (mostAmount) {
      setDailyAmount(true)
      setWeeklyAmount(false)
      setMonthlyAmount(false)
      setGlobalAmount(false)
    }
  }

  const week = () => {
    if (mostPlays) {
      setDailyGame(false)
      setWeeklyGame(true)
      setMonthlyGame(false)
      setGlobalGame(false)
    }
    if (mostAmount) {
      setDailyAmount(false)
      setWeeklyAmount(true)
      setMonthlyAmount(false)
      setGlobalAmount(false)
    }
  }

  const month = () => {
    if (mostPlays) {
      setDailyGame(false)
      setWeeklyGame(false)
      setMonthlyGame(true)
      setGlobalGame(false)
    }
    if (mostAmount) {
      setDailyAmount(false)
      setWeeklyAmount(false)
      setMonthlyAmount(true)
      setGlobalAmount(false)
    }
  }

  const all = () => {
    if (mostPlays) {
      setDailyGame(false)
      setWeeklyGame(false)
      setMonthlyGame(false)
      setGlobalGame(true)
    }
    if (mostAmount) {
      setDailyAmount(false)
      setWeeklyAmount(false)
      setMonthlyAmount(false)
      setGlobalAmount(true)
    }
  }

  return (
    <>
      <button
        type="button"
        className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'}`}
        title={theme === 'light' ? 'Dark Theme' : 'Light Theme'}
        onClick={handleThemeChange}>
        {theme === "light" ? "DARK " : "LIGHT "}<i className={`${theme === "light" ? "fa-solid fa-moon" : "fa-solid fa-sun"}`}></i>
      </button>
      <h1>Games</h1>
      <NavLink to="/rps" >RPS</NavLink>
      <br></br>
      <button onClick={liveBetsModal}>Live Bets</button>
      <button onClick={leaderboardsModalPlays}>Most Plays</button>
      <button onClick={leaderboardsModalAmount}>Most Amount</button>
      {liveBets ?
        <>
          {globalGames + " Total bets"}
          <LiveBets
            theme={theme}
            historyPlays={historyPlays}
            unixTimeStamp={unixTimeStamp}
          />
        </>
        : ""}
      {mostPlays ?
        <>
          <button onClick={day}>Daily</button>
          <button onClick={week}>Weekly</button>
          <button onClick={month}>Monthly</button>
          <button onClick={all}>Global</button>
          {dailyGame ?
            < MostPlays
              leaderboard={leaderboard.topGames.dayGames}
            />
            : ""}
          {weeklyGame ?
            < MostPlays
              leaderboard={leaderboard.topGames.weekGames}
            />
            : ""}
          {monthlyGame ?
            < MostPlays
              leaderboard={leaderboard.topGames.monthGames}
            />
            : ""}
          {globalGame ?
            < MostPlays
              leaderboard={leaderboard.topGames.globalGames}
            />
            : ""}
        </>
        :
        ""
      }
      {mostAmount ?
        <>
          <button onClick={day}>Daily</button>
          <button onClick={week}>Weekly</button>
          <button onClick={month}>Monthly</button>
          <button onClick={all}>Global</button>
          {dailyAmount ?
            < MostAmount
              leaderboard={leaderboard.topAmount.dayAmount}
            />
            : ""}
          {weeklyAmount ?
            < MostAmount
              leaderboard={leaderboard.topAmount.weekAmount}
            />
            : ""}
          {monthlyAmount ?
            < MostAmount
              leaderboard={leaderboard.topAmount.monthAmount}
            />
            : ""}
          {globalAmount ?
            < MostAmount
              leaderboard={leaderboard.topAmount.globalAmount}
            />
            : ""}
        </>
        :
        ""
      }
    </>
  );
}