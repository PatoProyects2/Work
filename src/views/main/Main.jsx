import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { collection, getDocs, query, limit, onSnapshot, orderBy } from "firebase/firestore";
import { db } from '../../firebase/firesbaseConfig'
import LiveBets from './components/LiveBets'
import MostPlays from './components/MostPlays'
import MostAmount from './components/MostAmount'
import { Button, ButtonGroup } from 'reactstrap';
import RPSGameImg from '../../assets/imgs/rps_banner.png'
import ComingSoonImg from '../../assets/imgs/coming_soon.png'
import DiscordImg from '../../assets/imgs/discord.png'
import TwitterImg from '../../assets/imgs/twitter.png'
import FairPlayImg from '../../assets/imgs/fair_play.png'
import NFTImg from '../../assets/imgs/nft.png'

export default function Main() {
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
      let topGames = {}
      let dayGames = []
      let weekGames = []
      let monthGames = []
      let globalGames = []
      const unixSeconds = parseInt(unixTimeStamp)
      const lastDay = unixSeconds - 86400
      const lastWeek = unixSeconds - 604800
      const lastMonth = unixSeconds - 259200

      const clubCollection = collection(db, "clubUsers")
      const queryGames = query(clubCollection, orderBy("rps.totalGames", "desc"))
      const documentGames = await getDocs(queryGames)
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
        if (doc.data().rps.totalGames > 0) {
          globalGames.push([doc.data().account, doc.data().photo, doc.data().name, doc.data().rps.totalGames])
        }

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
        if (doc.data().rps.totalMaticAmount > 0) {
          globalAmount.push([doc.data().account, doc.data().photo, doc.data().name, doc.data().rps.totalMaticAmount])
        }
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
      <div className='cards-container'>
        <div className='row text-center mb-2 mb-md-5'>
          <div className='game-card col-md-6 col-12 mx-auto'>
            <NavLink to='/rps'>
              <div className='card-bg rps-bg'></div>
              <img src={RPSGameImg} width='400' />
            </NavLink>
          </div>
        </div>
        <div className='row text-center mb-2 mb-md-5'>
          <div className='game-card col-md-4 mx-auto'>
            <NavLink to='/'>
              <div className='card-bg rps-bg'></div>
              <img src={ComingSoonImg} width='400' />
            </NavLink>
          </div>
          <div className='game-card col-md-4 mx-auto'>
            <NavLink to='/nfts'>
              <div className='card-bg rps-bg'></div>
              <img src={NFTImg} width='400' />
            </NavLink>
          </div>
          <div className='game-card last col-md-4 mx-auto'>
            <NavLink to='/fair-play'>
              <div className='card-bg rps-bg'></div>
              <img src={FairPlayImg} width='400' />
            </NavLink>
          </div>
        </div>
        <div className='row text-center mb-2'>
          <div className='social-card col-6 mx-auto'>
            <a href='https://twitter.com/RPSGameClub' target="_blank" rel="noreferrer"><img src={TwitterImg} width='400' /></a>
          </div>
          <div className='social-card col-6 mx-auto'>
            <a href="https://discord.gg/Ygk58VR4" target="_blank" rel="noreferrer"><img src={DiscordImg} width='400' /></a>
          </div>
        </div>
      </div>

      <br></br>

      <div className="table-list-container">
        <ButtonGroup>
          <Button onClick={liveBetsModal} className={liveBets ? 'active btn-rank' : 'btn-rank'}>Live Bets</Button>
          <Button onClick={leaderboardsModalPlays} className={mostPlays ? 'active btn-rank' : 'btn-rank'}>Most Plays</Button>
          <Button onClick={leaderboardsModalAmount} className={mostAmount ? 'active btn-rank' : 'btn-rank'}>Most Amount</Button>
        </ButtonGroup>
        {liveBets ?
          <>
            <p className="d-flex justify-content-end mt-3 me-4">{globalGames + " Total Bets"}</p>
            <LiveBets
              historyPlays={historyPlays}
              unixTimeStamp={unixTimeStamp}
            />
          </>
          : ""}
        {mostPlays ?
          <>
            <ButtonGroup className='float-end'>
              <Button onClick={day} className={`btn-recurrence ${dailyGame ? 'active' : ''}`}>Daily</Button>
              <Button onClick={week} className={`btn-recurrence ${weeklyGame ? 'active' : ''}`}>Weekly</Button>
              <Button onClick={month} className={`btn-recurrence ${monthlyGame ? 'active' : ''}`}>Monthly</Button>
              <Button onClick={all} className={`btn-recurrence ${globalGame ? 'active' : ''}`}>Global</Button>
            </ButtonGroup>
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
            <ButtonGroup className='float-end'>
              <Button onClick={day} className={`btn-recurrence ${dailyAmount ? 'active' : ''}`}>Daily</Button>
              <Button onClick={week} className={`btn-recurrence ${weeklyAmount ? 'active' : ''}`}>Weekly</Button>
              <Button onClick={month} className={`btn-recurrence ${monthlyAmount ? 'active' : ''}`}>Monthly</Button>
              <Button onClick={all} className={`btn-recurrence ${globalAmount ? 'active' : ''}`}>Global</Button>
            </ButtonGroup>
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
      </div>
    </>
  );
}