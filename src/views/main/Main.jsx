import React, { useState, useEffect } from 'react'
import { NavLink, useOutletContext } from 'react-router-dom'
import { collection, getDocs, query, limit, onSnapshot, orderBy } from "firebase/firestore";
import { db } from '../../firebase/firesbaseConfig'
import LiveBets from './components/LiveBets'
import MostPlays from './components/MostPlays'
import MostAmount from './components/MostAmount'
export default function Main() {
  const [theme, setTheme] = useOutletContext();
  const [historyPlays, setHistoryPlays] = useState({});
  const [leaderboardGames, setLeaderboardGames] = useState({});
  const [leaderboardAmount, setLeaderboardAmount] = useState({});
  const [globalGames, setGlobalGames] = useState(0);
  const [unixTimeStamp, setUnixTimeStamp] = useState(0);
  const [liveBets, setLiveBets] = useState(true);
  const [mostPlays, setMostPlays] = useState(false);
  const [mostAmount, setMostAmount] = useState(false);

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    readAllGameplays()
  }, []);

  useEffect(() => {
    const timer = setInterval(() => { getUnixTime(), readAllGameplays() }, 4000);
    return () => clearInterval(timer);
  }, [])

  useEffect(() => {
    const q = query(collection(db, "allGames"), orderBy("createdAt", "desc"), limit(10))
    const unsub = onSnapshot(q, (doc) => {
      const played = doc.docs.map(amountLeaderboard => amountLeaderboard.data())
      setHistoryPlays(played)
    });
    return unsub;
  }, [])

  useEffect(() => {
    const q = query(collection(db, "clubUsers"), orderBy("totalGames", "desc"), limit(10))
    const unsub = onSnapshot(q, (doc) => {
      const played = doc.docs.map(gamesLeaderboard => gamesLeaderboard.data())
      setLeaderboardGames(played)
    });
    return unsub;
  }, [])

  useEffect(() => {
    const q = query(collection(db, "clubUsers"), orderBy("totalMaticAmount", "desc"), limit(10))
    const unsub = onSnapshot(q, (doc) => {
      const played = doc.docs.map(amountLeaderboard => amountLeaderboard.data())
      setLeaderboardAmount(played)
    });
    return unsub;
  }, [])

  const getUnixTime = async () => {
    fetch('https://showcase.api.linx.twenty57.net/UnixTime/tounixtimestamp?datetime=now')
      .then(response =>
        response.json()
      )
      .then(data =>
        setUnixTimeStamp(data.UnixTimeStamp)
      );
  }

  const readAllGameplays = async () => {
    const allGames = collection(db, "allGames")
    const documentGameplays = await getDocs(allGames)
    const readArray = documentGameplays._snapshot.docChanges
    setGlobalGames(readArray.length)
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
      setMostAmount(false)
      setMostPlays(true)
    }
  }

  const leaderboardsModalAmount = () => {
    if (liveBets || mostPlays) {
      setLiveBets(false)
      setMostPlays(false)
      setMostAmount(true)
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
        <MostPlays
          leaderboardGames={leaderboardGames}
        />
        :
        ""
      }
      {mostAmount ?
        <MostAmount
          leaderboardAmount={leaderboardAmount}
        />
        :
        ""
      }
    </>
  );
}