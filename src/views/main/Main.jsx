import React, { useState, useEffect } from 'react'
import { NavLink, useOutletContext } from 'react-router-dom'
import { doc, getDoc, setDoc, updateDoc, collection, getDocs, where, query, limit, addDoc, serverTimestamp, onSnapshot, orderBy } from "firebase/firestore";
import { db } from '../../firebase/firesbaseConfig'
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
    const timer = setInterval(() => { getUnixTime() }, 2000);
    return () => clearInterval(timer);
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

  const readAllGameplays = async () => {
    const allGames = collection(db, "allGames")
    const documentGameplays = await getDocs(allGames)
    const readArray = documentGameplays._snapshot.docChanges
    setGlobalGames(readArray.length)
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

  const liveBetsModal = () => {
    if (!liveBets) {
      setMostPlays(false)
      setMostAmount(false)
      setLiveBets(true)
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
          <div className="container">
            <div className="play-list">
              <ul className="list-group">
                {historyPlays[0] !== undefined && historyPlays[0].createdAt ?
                  <>
                    {(unixTimeStamp - historyPlays[0].createdAt.seconds) < 60 ?
                      <>
                        <li className={`d-flex list-group-item list-group-item-action ${theme === 'dark' ? 'dark-list-item' : ''}`}>
                          <div className="title mb-auto ms-2">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${historyPlays[0].photo}`} />
                            {historyPlays[0].name !== '' ? historyPlays[0].name : historyPlays[0].account.substring(0, 5).toLowerCase()}
                            {" played " + historyPlays[0].maticAmount + " MATIC and"}
                            <span style={{ color: historyPlays[0].result ? "mediumseagreen" : "crimson" }}>
                              {historyPlays[0].result === false ? " lost all " : ""}{historyPlays[0].result === true ? " doubled " : ""}
                            </span>
                            {historyPlays[0].streak > 1 ? historyPlays[0].streak + " times " : ""}
                          </div>
                          <small className="ms-auto mt-auto time-in-row">
                            {(unixTimeStamp - historyPlays[0].createdAt.seconds) <= 0 ?
                              " now" : (unixTimeStamp - historyPlays[0].createdAt.seconds) + " seconds ago"}
                          </small>
                        </li>
                      </>
                      :
                      ""
                    }
                  </>
                  : ""}
                {historyPlays[1] !== undefined && historyPlays[1].createdAt ?
                  <>
                    {(unixTimeStamp - historyPlays[1].createdAt.seconds) < 60 ?
                      <>
                        <li className={`d-flex list-group-item list-group-item-action ${theme === 'dark' ? 'dark-list-item' : ''}`}>
                          <div className="title mb-auto ms-2">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${historyPlays[1].photo}`} />
                            {historyPlays[1].name !== '' ? historyPlays[1].name : historyPlays[1].account.substring(0, 5).toLowerCase()}
                            {" played " + historyPlays[1].maticAmount + " MATIC and"}
                            <span style={{ color: historyPlays[1].result ? "mediumseagreen" : "crimson" }}>
                              {historyPlays[1].result === false ? " lost all " : ""}{historyPlays[1].result === true ? " doubled " : ""}
                            </span>
                            {historyPlays[1].streak > 1 ? historyPlays[1].streak + " times " : ""}
                          </div>
                          <small className="ms-auto mt-auto time-in-row">
                            {(unixTimeStamp - historyPlays[1].createdAt.seconds) <= 0 ?
                              " now" : (unixTimeStamp - historyPlays[1].createdAt.seconds) + " seconds ago"}
                          </small>
                        </li>
                      </>
                      :
                      ""
                    }
                  </>
                  : ""}
                {historyPlays[2] !== undefined && historyPlays[2].createdAt ?
                  <>
                    {(unixTimeStamp - historyPlays[2].createdAt.seconds) < 60 ?
                      <>
                        <li className={`d-flex list-group-item list-group-item-action ${theme === 'dark' ? 'dark-list-item' : ''}`}>
                          <div className="title mb-auto ms-2">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${historyPlays[2].photo}`} />
                            {historyPlays[2].name !== '' ? historyPlays[2].name : historyPlays[2].account.substring(0, 5).toLowerCase()}
                            {" played " + historyPlays[2].maticAmount + " MATIC and"}
                            <span style={{ color: historyPlays[2].result ? "mediumseagreen" : "crimson" }}>
                              {historyPlays[2].result === false ? " lost all " : ""}{historyPlays[2].result === true ? " doubled " : ""}
                            </span>
                            {historyPlays[2].streak > 1 ? historyPlays[2].streak + " times " : ""}
                          </div>
                          <small className="ms-auto mt-auto time-in-row">
                            {(unixTimeStamp - historyPlays[2].createdAt.seconds) <= 0 ?
                              " now" : (unixTimeStamp - historyPlays[2].createdAt.seconds) + " seconds ago"}
                          </small>
                        </li>
                      </>
                      :
                      ""
                    }
                  </>
                  : ""}
                {historyPlays[3] !== undefined && historyPlays[3].createdAt ?
                  <>
                    {(unixTimeStamp - historyPlays[3].createdAt.seconds) < 60 ?
                      <>
                        <li className={`d-flex list-group-item list-group-item-action ${theme === 'dark' ? 'dark-list-item' : ''}`}>
                          <div className="title mb-auto ms-2">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${historyPlays[3].photo}`} />
                            {historyPlays[3].name !== '' ? historyPlays[3].name : historyPlays[3].account.substring(0, 5).toLowerCase()}
                            {" played " + historyPlays[3].maticAmount + " MATIC and"}
                            <span style={{ color: historyPlays[3].result ? "mediumseagreen" : "crimson" }}>
                              {historyPlays[3].result === false ? " lost all " : ""}{historyPlays[3].result === true ? " doubled " : ""}
                            </span>
                            {historyPlays[3].streak > 1 ? historyPlays[3].streak + " times " : ""}
                          </div>
                          <small className="ms-auto mt-auto time-in-row">
                            {(unixTimeStamp - historyPlays[3].createdAt.seconds) <= 0 ?
                              " now" : (unixTimeStamp - historyPlays[3].createdAt.seconds) + " seconds ago"}
                          </small>
                        </li>
                      </>
                      :
                      ""
                    }
                  </>
                  : ""}
                {historyPlays[4] !== undefined && historyPlays[4].createdAt ?
                  <>
                    {(unixTimeStamp - historyPlays[4].createdAt.seconds) < 60 ?
                      <>
                        <li className={`d-flex list-group-item list-group-item-action ${theme === 'dark' ? 'dark-list-item' : ''}`}>
                          <div className="title mb-auto ms-2">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${historyPlays[4].photo}`} />
                            {historyPlays[4].name !== '' ? historyPlays[4].name : historyPlays[4].account.substring(0, 5).toLowerCase()}
                            {" played " + historyPlays[4].maticAmount + " MATIC and"}
                            <span style={{ color: historyPlays[4].result ? "mediumseagreen" : "crimson" }}>
                              {historyPlays[4].result === false ? " lost all " : ""}{historyPlays[4].result === true ? " doubled " : ""}
                            </span>
                            {historyPlays[4].streak > 1 ? historyPlays[4].streak + " times " : ""}
                          </div>
                          <small className="ms-auto mt-auto time-in-row">
                            {(unixTimeStamp - historyPlays[4].createdAt.seconds) <= 0 ?
                              " now" : (unixTimeStamp - historyPlays[4].createdAt.seconds) + " seconds ago"}
                          </small>
                        </li>
                      </>
                      :
                      ""
                    }
                  </>
                  : ""}
                {historyPlays[5] !== undefined && historyPlays[5].createdAt ?
                  <>
                    {(unixTimeStamp - historyPlays[5].createdAt.seconds) < 60 ?
                      <>
                        <li className={`d-flex list-group-item list-group-item-action ${theme === 'dark' ? 'dark-list-item' : ''}`}>
                          <div className="title mb-auto ms-2">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${historyPlays[5].photo}`} />
                            {historyPlays[5].name !== '' ? historyPlays[5].name : historyPlays[5].account.substring(0, 5).toLowerCase()}
                            {" played " + historyPlays[5].maticAmount + " MATIC and"}
                            <span style={{ color: historyPlays[5].result ? "mediumseagreen" : "crimson" }}>
                              {historyPlays[5].result === false ? " lost all " : ""}{historyPlays[5].result === true ? " doubled " : ""}
                            </span>
                            {historyPlays[5].streak > 1 ? historyPlays[5].streak + " times " : ""}
                          </div>
                          <small className="ms-auto mt-auto time-in-row">
                            {(unixTimeStamp - historyPlays[5].createdAt.seconds) <= 0 ?
                              " now" : (unixTimeStamp - historyPlays[5].createdAt.seconds) + " seconds ago"}
                          </small>
                        </li>
                      </>
                      :
                      ""
                    }
                  </>
                  : ""}
                {historyPlays[6] !== undefined && historyPlays[6].createdAt ?
                  <>
                    {(unixTimeStamp - historyPlays[6].createdAt.seconds) < 60 ?
                      <>
                        <li className={`d-flex list-group-item list-group-item-action ${theme === 'dark' ? 'dark-list-item' : ''}`}>
                          <div className="title mb-auto ms-2">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${historyPlays[6].photo}`} />
                            {historyPlays[6].name !== '' ? historyPlays[6].name : historyPlays[6].account.substring(0, 5).toLowerCase()}
                            {" played " + historyPlays[6].maticAmount + " MATIC and"}
                            <span style={{ color: historyPlays[6].result ? "mediumseagreen" : "crimson" }}>
                              {historyPlays[6].result === false ? " lost all " : ""}{historyPlays[6].result === true ? " doubled " : ""}
                            </span>
                            {historyPlays[6].streak > 1 ? historyPlays[6].streak + " times " : ""}
                          </div>
                          <small className="ms-auto mt-auto time-in-row">
                            {(unixTimeStamp - historyPlays[6].createdAt.seconds) <= 0 ?
                              " now" : (unixTimeStamp - historyPlays[6].createdAt.seconds) + " seconds ago"}
                          </small>
                        </li>
                      </>
                      :
                      ""
                    }
                  </>
                  : ""}
                {historyPlays[7] !== undefined && historyPlays[7].createdAt ?
                  <>
                    {(unixTimeStamp - historyPlays[7].createdAt.seconds) < 60 ?
                      <>
                        <li className={`d-flex list-group-item list-group-item-action ${theme === 'dark' ? 'dark-list-item' : ''}`}>
                          <div className="title mb-auto ms-2">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${historyPlays[7].photo}`} />
                            {historyPlays[7].name !== '' ? historyPlays[7].name : historyPlays[7].account.substring(0, 5).toLowerCase()}
                            {" played " + historyPlays[7].maticAmount + " MATIC and"}
                            <span style={{ color: historyPlays[7].result ? "mediumseagreen" : "crimson" }}>
                              {historyPlays[7].result === false ? " lost all " : ""}{historyPlays[7].result === true ? " doubled " : ""}
                            </span>
                            {historyPlays[7].streak > 1 ? historyPlays[7].streak + " times " : ""}
                          </div>
                          <small className="ms-auto mt-auto time-in-row">
                            {(unixTimeStamp - historyPlays[7].createdAt.seconds) <= 0 ?
                              " now" : (unixTimeStamp - historyPlays[7].createdAt.seconds) + " seconds ago"}
                          </small>
                        </li>
                      </>
                      :
                      ""
                    }
                  </>
                  : ""}
                {historyPlays[8] !== undefined && historyPlays[8].createdAt ?
                  <>
                    {(unixTimeStamp - historyPlays[8].createdAt.seconds) < 60 ?
                      <>
                        <li className={`d-flex list-group-item list-group-item-action ${theme === 'dark' ? 'dark-list-item' : ''}`}>
                          <div className="title mb-auto ms-2">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${historyPlays[8].photo}`} />
                            {historyPlays[8].name !== '' ? historyPlays[8].name : historyPlays[8].account.substring(0, 5).toLowerCase()}
                            {" played " + historyPlays[8].maticAmount + " MATIC and"}
                            <span style={{ color: historyPlays[8].result ? "mediumseagreen" : "crimson" }}>
                              {historyPlays[8].result === false ? " lost all " : ""}{historyPlays[8].result === true ? " doubled " : ""}
                            </span>
                            {historyPlays[8].streak > 1 ? historyPlays[8].streak + " times " : ""}
                          </div>
                          <small className="ms-auto mt-auto time-in-row">
                            {(unixTimeStamp - historyPlays[8].createdAt.seconds) <= 0 ?
                              " now" : (unixTimeStamp - historyPlays[8].createdAt.seconds) + " seconds ago"}
                          </small>
                        </li>
                      </>
                      :
                      ""
                    }
                  </>
                  : ""}
                {historyPlays[9] !== undefined && historyPlays[9].createdAt ?
                  <>
                    {(unixTimeStamp - historyPlays[9].createdAt.seconds) < 60 ?
                      <>
                        <li className={`d-flex list-group-item list-group-item-action ${theme === 'dark' ? 'dark-list-item' : ''}`}>
                          <div className="title mb-auto ms-2">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${historyPlays[9].photo}`} />
                            {historyPlays[9].name !== '' ? historyPlays[9].name : historyPlays[9].account.substring(0, 5).toLowerCase()}
                            {" played " + historyPlays[9].maticAmount + " MATIC and"}
                            <span style={{ color: historyPlays[9].result ? "mediumseagreen" : "crimson" }}>
                              {historyPlays[9].result === false ? " lost all " : ""}{historyPlays[9].result === true ? " doubled " : ""}
                            </span>
                            {historyPlays[9].streak > 1 ? historyPlays[9].streak + " times " : ""}
                          </div>
                          <small className="ms-auto mt-auto time-in-row">
                            {(unixTimeStamp - historyPlays[9].createdAt.seconds) <= 0 ?
                              " now" : (unixTimeStamp - historyPlays[9].createdAt.seconds) + " seconds ago"}
                          </small>
                        </li>
                      </>
                      :
                      ""
                    }
                  </>
                  : ""}
                {historyPlays[10] !== undefined && historyPlays[10].createdAt ?
                  <>
                    {(unixTimeStamp - historyPlays[10].createdAt.seconds) < 60 ?
                      <>
                        <li className={`d-flex list-group-item list-group-item-action ${theme === 'dark' ? 'dark-list-item' : ''}`}>
                          <div className="title mb-auto ms-2">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${historyPlays[10].photo}`} />
                            {historyPlays[10].name !== '' ? historyPlays[10].name : historyPlays[10].account.substring(0, 5).toLowerCase()}
                            {" played " + historyPlays[10].maticAmount + " MATIC and"}
                            <span style={{ color: historyPlays[10].result ? "mediumseagreen" : "crimson" }}>
                              {historyPlays[10].result === false ? " lost all " : ""}{historyPlays[10].result === true ? " doubled " : ""}
                            </span>
                            {historyPlays[10].streak > 1 ? historyPlays[10].streak + " times " : ""}
                          </div>
                          <small className="ms-auto mt-auto time-in-row">
                            {(unixTimeStamp - historyPlays[10].createdAt.seconds) <= 0 ?
                              " now" : (unixTimeStamp - historyPlays[10].createdAt.seconds) + " seconds ago"}
                          </small>
                        </li>
                      </>
                      :
                      ""
                    }
                  </>
                  : ""}
                {historyPlays[11] !== undefined && historyPlays[11].createdAt ?
                  <>
                    {(unixTimeStamp - historyPlays[11].createdAt.seconds) < 60 ?
                      <>
                        <li className={`d-flex list-group-item list-group-item-action ${theme === 'dark' ? 'dark-list-item' : ''}`}>
                          <div className="title mb-auto ms-2">
                            <img width="35" height="35" className="rounded-circle" alt="" src={`${historyPlays[11].photo}`} />
                            {historyPlays[11].name !== '' ? historyPlays[11].name : historyPlays[11].account.substring(0, 5).toLowerCase()}
                            {" played " + historyPlays[11].maticAmount + " MATIC and"}
                            <span style={{ color: historyPlays[11].result ? "mediumseagreen" : "crimson" }}>
                              {historyPlays[11].result === false ? " lost all " : ""}{historyPlays[11].result === true ? " doubled " : ""}
                            </span>
                            {historyPlays[11].streak > 1 ? historyPlays[11].streak + " times " : ""}
                          </div>
                          <small className="ms-auto mt-auto time-in-row">
                            {(unixTimeStamp - historyPlays[11].createdAt.seconds) <= 0 ?
                              " now" : (unixTimeStamp - historyPlays[11].createdAt.seconds) + " seconds ago"}
                          </small>
                        </li>
                      </>
                      :
                      ""
                    }
                  </>
                  : ""}
              </ul>
            </div>
          </div>
        </>
        : ""}
      {mostPlays ?
        <table>
          <thead>
            <tr>
              <td>
                No #
              </td>
              <td>
                User
              </td>
              <td>
                Most games played
              </td>
            </tr>
          </thead>
          <tbody>
            {leaderboardGames[0] ?
              <tr>
                <td>
                  1
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${leaderboardGames[0].pic}`} />
                  {" " + leaderboardGames[0].name}
                </td>
                <td>
                  {leaderboardGames[0].totalGames}
                </td>
              </tr>
              :
              ""}
            {leaderboardGames[1] ?
              <tr>
                <td>
                  2
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${leaderboardGames[1].pic}`} />
                  {" " + leaderboardGames[1].name}
                </td>
                <td>
                  {leaderboardGames[1].totalGames}
                </td>
              </tr>
              :
              ""}
            {leaderboardGames[2] ?
              <tr>
                <td>
                  3
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${leaderboardGames[2].pic}`} />
                  {" " + leaderboardGames[2].name}
                </td>
                <td>
                  {leaderboardGames[2].totalGames}
                </td>
              </tr>
              :
              ""}
            {leaderboardGames[3] ?
              <tr>
                <td>
                  4
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${leaderboardGames[3].pic}`} />
                  {" " + leaderboardGames[3].name}
                </td>
                <td>
                  {leaderboardGames[3].totalGames}
                </td>
              </tr>
              :
              ""}
            {leaderboardGames[4] ?
              <tr>
                <td>
                  5
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${leaderboardGames[4].pic}`} />
                  {" " + leaderboardGames[4].name}
                </td>
                <td>
                  {leaderboardGames[4].totalGames}
                </td>
              </tr>
              :
              ""}
            {leaderboardGames[5] ?
              <tr>
                <td>
                  6
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${leaderboardGames[5].pic}`} />
                  {" " + leaderboardGames[5].name}
                </td>
                <td>
                  {leaderboardGames[5].totalGames}
                </td>
              </tr>
              :
              ""}
            {leaderboardGames[6] ?
              <tr>
                <td>
                  7
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${leaderboardGames[6].pic}`} />
                  {" " + leaderboardGames[6].name}
                </td>
                <td>
                  {leaderboardGames[6].totalGames}
                </td>
              </tr>
              :
              ""}
            {leaderboardGames[7] ?
              <tr>
                <td>
                  8
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${leaderboardGames[7].pic}`} />
                  {" " + leaderboardGames[7].name}
                </td>
                <td>
                  {leaderboardGames[7].totalGames}
                </td>
              </tr>
              :
              ""}
            {leaderboardGames[8] ?
              <tr>
                <td>
                  9
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${leaderboardGames[8].pic}`} />
                  {" " + leaderboardGames[8].name}
                </td>
                <td>
                  {leaderboardGames[8].totalGames}
                </td>
              </tr>
              :
              ""}
            {leaderboardGames[9] ?
              <tr>
                <td>
                  10
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${leaderboardGames[9].pic}`} />
                  {" " + leaderboardGames[9].name}
                </td>
                <td>
                  {leaderboardGames[9].totalGames}
                </td>
              </tr>
              :
              ""}
          </tbody>
        </table>
        :
        ""
      }
      {mostAmount ?
        <table>
          <thead>
            <tr>
              <td>
                No #
              </td>
              <td>
                User
              </td>
              <td>
                Most amount played
              </td>
            </tr>
          </thead>
          <tbody>
            {leaderboardAmount[0] ?
              <tr>
                <td>
                  1
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${leaderboardAmount[0].pic}`} />
                  {" " + leaderboardAmount[0].name}
                </td>
                <td>
                  {leaderboardAmount[0].totalMaticAmount}
                </td>
              </tr>
              :
              ""}
            {leaderboardAmount[1] ?
              <tr>
                <td>
                  2
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${leaderboardAmount[1].pic}`} />
                  {" " + leaderboardAmount[1].name}
                </td>
                <td>
                  {leaderboardAmount[1].totalMaticAmount}
                </td>
              </tr>
              :
              ""}
            {leaderboardAmount[2] ?
              <tr>
                <td>
                  3
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${leaderboardAmount[2].pic}`} />
                  {" " + leaderboardAmount[2].name}
                </td>
                <td>
                  {leaderboardAmount[2].totalMaticAmount}
                </td>
              </tr>
              :
              ""}
            {leaderboardAmount[3] ?
              <tr>
                <td>
                  4
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${leaderboardAmount[3].pic}`} />
                  {" " + leaderboardAmount[3].name}
                </td>
                <td>
                  {leaderboardAmount[3].totalMaticAmount}
                </td>
              </tr>
              :
              ""}
            {leaderboardAmount[4] ?
              <tr>
                <td>
                  5
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${leaderboardAmount[4].pic}`} />
                  {" " + leaderboardAmount[4].name}
                </td>
                <td>
                  {leaderboardAmount[4].totalMaticAmount}
                </td>
              </tr>
              :
              ""}
            {leaderboardAmount[5] ?
              <tr>
                <td>
                  6
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${leaderboardAmount[5].pic}`} />
                  {" " + leaderboardAmount[5].name}
                </td>
                <td>
                  {leaderboardAmount[5].totalMaticAmount}
                </td>
              </tr>
              :
              ""}
            {leaderboardAmount[6] ?
              <tr>
                <td>
                  7
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${leaderboardAmount[6].pic}`} />
                  {" " + leaderboardAmount[6].name}
                </td>
                <td>
                  {leaderboardAmount[6].totalMaticAmount}
                </td>
              </tr>
              :
              ""}
            {leaderboardAmount[7] ?
              <tr>
                <td>
                  8
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${leaderboardAmount[7].pic}`} />
                  {" " + leaderboardAmount[7].name}
                </td>
                <td>
                  {leaderboardAmount[7].totalMaticAmount}
                </td>
              </tr>
              :
              ""}
            {leaderboardAmount[8] ?
              <tr>
                <td>
                  9
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${leaderboardAmount[8].pic}`} />
                  {" " + leaderboardAmount[8].name}
                </td>
                <td>
                  {leaderboardAmount[8].totalMaticAmount}
                </td>
              </tr>
              :
              ""}
            {leaderboardAmount[9] ?
              <tr>
                <td>
                  10
                </td>
                <td>
                  <img width="35" height="35" className="rounded-circle" alt="" src={`${leaderboardAmount[9].pic}`} />
                  {" " + leaderboardAmount[9].name}
                </td>
                <td>
                  {leaderboardAmount[9].totalMaticAmount}
                </td>
              </tr>
              :
              ""}
          </tbody>
        </table>
        :
        ""
      }


















    </>
  );
}