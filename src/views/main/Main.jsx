import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import lodash from 'lodash'
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { Button, ButtonGroup } from 'reactstrap';
import { useAuthState } from 'react-firebase-hooks/auth'
import { db, auth } from '../../firebase/firesbaseConfig'
import MostPlays from './components/MostPlays'
import MostAmount from './components/MostAmount'
import ReadAllGames from '../../firebase/ReadAllGames'
import RPSGameImg from '../../assets/imgs/rps_card.png'
import ComingSoonImg from '../../assets/imgs/coming_soon_hover_card.png'
import DiscordImg from '../../assets/imgs/discord_card.png'
import TwitterImg from '../../assets/imgs/twitter_card.png'
import FairPlayImg from '../../assets/imgs/fair_play_hover_card.png'
import NFTImg from '../../assets/imgs/nft_hover_card.png'
import ChatRoom from './components/chat/ChatRoom'

export default function Main() {
  const [user] = useAuthState(auth)
  const [topDay, setTopDay] = useState({});
  const [topWeek, setTopWeek] = useState({});
  const [topMonth, setTopMonth] = useState({});
  const [topGlobal, setTopGlobal] = useState({});
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
    const readLeaderboard = async () => {
      const response = await fetch('https://showcase.api.linx.twenty57.net/UnixTime/tounixtimestamp?datetime=now');
      const time = await response.json();
      var unixTimeStamp = parseInt(time.UnixTimeStamp)

      var lastDay = unixTimeStamp - 86400
      var lastWeek = unixTimeStamp - 604800
      var lastMonth = unixTimeStamp - 259200

      var dayGames = []
      var weekGames = []
      var monthGames = []
      var globalGames = []

      const clubCollection = collection(db, "allGames")
      const queryGames = query(clubCollection, orderBy("createdAt", "desc"))
      const documentGames = await getDocs(queryGames)
      documentGames.forEach(doc => {
        let created = doc.data().createdAt
        if (created > lastDay) {
          dayGames = dayGames.concat([doc.data().account])
        }
        if (created > lastWeek) {
          weekGames = weekGames.concat([doc.data().account])
        }
        if (created > lastMonth) {
          monthGames = monthGames.concat([doc.data().account])
        }
        globalGames = globalGames.concat([doc.data().account])
      });

      const arrDay = [... new Set(dayGames.map(data => data))]
      var dayTop = arrDay.map(account => query(collection(db, "allGames"), where("account", "==", account), where("createdAt", ">", lastDay)))
      dayTop.forEach(async query => {
        let leaderboard = {}
        let data = []
        let top = []
        const d = await getDocs(query)
        data = data.concat([d._snapshot.docChanges])
        data.forEach(users => {
          let amounts = users.map(amount => parseInt(amount.doc.data.value.mapValue.fields.maticAmount.integerValue))
          let amount = lodash.sum(amounts)
          top = top.concat([[
            users[0].doc.data.value.mapValue.fields.account.stringValue,
            users[0].doc.data.value.mapValue.fields.photo.stringValue,
            users[0].doc.data.value.mapValue.fields.name.stringValue,
            users.length,
            amount
          ]])
        })
        leaderboard.games = top.sort(((a, b) => b[3] - a[3]))
        leaderboard.amount = top.sort(((a, b) => b[4] - a[4]))
        setTopDay(leaderboard)
      })

      const arrWeek = [... new Set(weekGames.map(data => data))]
      var weekTop = arrWeek.map(account => query(collection(db, "allGames"), where("account", "==", account), where("createdAt", ">", lastWeek)))
      weekTop.forEach(async query => {
        let leaderboard = {}
        let data = []
        let top = []
        const d = await getDocs(query)
        data = data.concat([d._snapshot.docChanges])
        data.forEach(users => {
          let amounts = users.map(amount => parseInt(amount.doc.data.value.mapValue.fields.maticAmount.integerValue))
          let amount = lodash.sum(amounts)
          top = top.concat([[
            users[0].doc.data.value.mapValue.fields.account.stringValue,
            users[0].doc.data.value.mapValue.fields.photo.stringValue,
            users[0].doc.data.value.mapValue.fields.name.stringValue,
            users.length,
            amount
          ]])
        })
        leaderboard.games = top.sort(((a, b) => b[3] - a[3]))
        leaderboard.amount = top.sort(((a, b) => b[4] - a[4]))
        setTopWeek(leaderboard)
      })

      const arrMonth = [... new Set(monthGames.map(data => data))]
      var monthTop = arrMonth.map(account => query(collection(db, "allGames"), where("account", "==", account), where("createdAt", ">", lastMonth)))
      monthTop.forEach(async query => {
        let leaderboard = {}
        let data = []
        let top = []
        const d = await getDocs(query)
        data = data.concat([d._snapshot.docChanges])
        data.forEach(users => {
          let amounts = users.map(amount => parseInt(amount.doc.data.value.mapValue.fields.maticAmount.integerValue))
          let amount = lodash.sum(amounts)
          top = top.concat([[
            users[0].doc.data.value.mapValue.fields.account.stringValue,
            users[0].doc.data.value.mapValue.fields.photo.stringValue,
            users[0].doc.data.value.mapValue.fields.name.stringValue,
            users.length,
            amount
          ]])
        })
        leaderboard.games = top.sort(((a, b) => b[3] - a[3]))
        leaderboard.amount = top.sort(((a, b) => b[4] - a[4]))
        setTopMonth(leaderboard)
      })

      const arrGlobal = [... new Set(globalGames.map(data => data))]
      var globalTop = arrGlobal.map(account => query(collection(db, "allGames"), where("account", "==", account)))
      globalTop.forEach(async query => {
        let leaderboard = {}
        let data = []
        let top = []
        const d = await getDocs(query)
        data = data.concat([d._snapshot.docChanges])
        data.forEach(users => {
          let amounts = users.map(amount => parseInt(amount.doc.data.value.mapValue.fields.maticAmount.integerValue))
          let amount = lodash.sum(amounts)
          top = top.concat([[
            users[0].doc.data.value.mapValue.fields.account.stringValue,
            users[0].doc.data.value.mapValue.fields.photo.stringValue,
            users[0].doc.data.value.mapValue.fields.name.stringValue,
            users.length,
            amount
          ]])
        })
        leaderboard.games = top.sort(((a, b) => b[3] - a[3]))
        leaderboard.amount = top.sort(((a, b) => b[4] - a[4]))
        setTopGlobal(leaderboard)
      })
    }
    readLeaderboard()
    return () => {
      setTopDay({});
      setTopWeek({});
      setTopMonth({});
      setTopGlobal({});
    };
  }, [])

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
      <ChatRoom
        user={user}
      />
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
              {/* <div className='card-bg rps-bg'></div> */}
              <img src={ComingSoonImg} width='400' />
            </NavLink>
          </div>
          <div className='game-card col-md-4 mx-auto'>
            <NavLink to='/nfts'>
              {/* <div className='card-bg rps-bg'></div> */}
              <img src={NFTImg} width='400' />
            </NavLink>
          </div>
          <div className='game-card last col-md-4 mx-auto'>
            <NavLink to='/fair-play'>
              {/* <div className='card-bg rps-bg'></div> */}
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
        <div className='d-flex justify-content-between flex-wrap'>
          <ButtonGroup>
            <Button onClick={liveBetsModal} className={liveBets ? 'active btn-rank' : 'btn-rank'}>Live Bets</Button>
            <Button onClick={leaderboardsModalPlays} className={mostPlays ? 'active btn-rank' : 'btn-rank'}>Most Plays</Button>
            <Button onClick={leaderboardsModalAmount} className={mostAmount ? 'active btn-rank' : 'btn-rank'}>Most Amount</Button>
          </ButtonGroup>


          {liveBets &&
            <>
              <ReadAllGames />
            </>
          }
          {mostPlays &&
            <ButtonGroup>
              <Button onClick={day} className={`btn-recurrence ${dailyGame ? 'active' : ''}`}>Daily</Button>
              <Button onClick={week} className={`btn-recurrence ${weeklyGame ? 'active' : ''}`}>Weekly</Button>
              <Button onClick={month} className={`btn-recurrence ${monthlyGame ? 'active' : ''}`}>Monthly</Button>
              <Button onClick={all} className={`btn-recurrence ${globalGame ? 'active' : ''}`}>Global</Button>
            </ButtonGroup>
          }
          {mostAmount &&
            <ButtonGroup>
              <Button onClick={day} className={`btn-recurrence ${dailyAmount ? 'active' : ''}`}>Daily</Button>
              <Button onClick={week} className={`btn-recurrence ${weeklyAmount ? 'active' : ''}`}>Weekly</Button>
              <Button onClick={month} className={`btn-recurrence ${monthlyAmount ? 'active' : ''}`}>Monthly</Button>
              <Button onClick={all} className={`btn-recurrence ${globalAmount ? 'active' : ''}`}>Global</Button>
            </ButtonGroup>
          }
        </div>

        {mostPlays &&
          <>
            {dailyGame &&
              <MostPlays leaderboard={topDay.games} />
            }
            {weeklyGame &&
              <MostPlays leaderboard={topWeek.games} />
            }
            {monthlyGame &&
              <MostPlays leaderboard={topMonth.games} />
            }
            {globalGame &&
              <MostPlays leaderboard={topGlobal.games} />
            }
          </>
        }
        {mostAmount &&
          <>
            {dailyAmount &&
              <MostAmount leaderboard={topDay.amount} />
            }
            {weeklyAmount &&
              <MostAmount leaderboard={topWeek.amount} />
            }
            {monthlyAmount &&
              <MostAmount leaderboard={topMonth.amount} />
            }
            {globalAmount &&
              <MostAmount leaderboard={topGlobal.amount} />
            }
          </>
        }
      </div>
    </>
  );
}