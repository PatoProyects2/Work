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
  const [leaderboard, setLeaderboard] = useState({});
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

      var unixTimeStamp = Math.round((new Date()).getTime() / 1000);

      var lastDay = unixTimeStamp - 86400
      var lastWeek = unixTimeStamp - 604800
      var lastMonth = unixTimeStamp - 2592000

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
      const array0 = await Promise.all(
        dayTop.map(async query => {
          return await getDocs(query)
        })
      )

      const arrWeek = [... new Set(weekGames.map(data => data))]
      var weekTop = arrWeek.map(account => query(collection(db, "allGames"), where("account", "==", account), where("createdAt", ">", lastWeek)))
      const array1 = await Promise.all(
        weekTop.map(async query => {
          return await getDocs(query)
        })
      )

      const arrMonth = [... new Set(monthGames.map(data => data))]
      var monthTop = arrMonth.map(account => query(collection(db, "allGames"), where("account", "==", account), where("createdAt", ">", lastMonth)))
      const array2 = await Promise.all(
        monthTop.map(async query => {
          return await getDocs(query)
        })
      )

      const arrGlobal = [... new Set(globalGames.map(data => data))]
      var globalTop = arrGlobal.map(account => query(collection(db, "allGames"), where("account", "==", account)))
      const array3 = await Promise.all(
        globalTop.map(async query => {
          return await getDocs(query)
        })
      )

      const arrayDay = [... new Set(array0.map(data => data._snapshot.docChanges))]
      const arrayWeek = [... new Set(array1.map(data => data._snapshot.docChanges))]
      const arrayMonth = [... new Set(array2.map(data => data._snapshot.docChanges))]
      const arrayGlobal = [... new Set(array3.map(data => data._snapshot.docChanges))]

      var data0 = arrayDay.map(users => {
        let amounts = users.map(amount => parseInt(amount.doc.data.value.mapValue.fields.maticAmount.integerValue))
        let amount = lodash.sum(amounts)
        let top = [
          users[0].doc.data.value.mapValue.fields.account.stringValue,
          users[0].doc.data.value.mapValue.fields.photo.stringValue,
          users[0].doc.data.value.mapValue.fields.name.stringValue,
          users.length,
          amount
        ]
        return top
      })
      var data1 = arrayWeek.map(users => {
        let amounts = users.map(amount => parseInt(amount.doc.data.value.mapValue.fields.maticAmount.integerValue))
        let amount = lodash.sum(amounts)
        let top = [
          users[0].doc.data.value.mapValue.fields.account.stringValue,
          users[0].doc.data.value.mapValue.fields.photo.stringValue,
          users[0].doc.data.value.mapValue.fields.name.stringValue,
          users.length,
          amount
        ]
        return top
      })
      var data2 = arrayMonth.map(users => {
        let amounts = users.map(amount => parseInt(amount.doc.data.value.mapValue.fields.maticAmount.integerValue))
        let amount = lodash.sum(amounts)
        let top = [
          users[0].doc.data.value.mapValue.fields.account.stringValue,
          users[0].doc.data.value.mapValue.fields.photo.stringValue,
          users[0].doc.data.value.mapValue.fields.name.stringValue,
          users.length,
          amount
        ]
        return top
      })
      var data3 = arrayGlobal.map(users => {
        let amounts = users.map(amount => parseInt(amount.doc.data.value.mapValue.fields.maticAmount.integerValue))
        let amount = lodash.sum(amounts)
        let top = [
          users[0].doc.data.value.mapValue.fields.account.stringValue,
          users[0].doc.data.value.mapValue.fields.photo.stringValue,
          users[0].doc.data.value.mapValue.fields.name.stringValue,
          users.length,
          amount
        ]
        return top
      })

      var leaderboard = {
        games: {},
        amount: {},
      }

      leaderboard.games.day = data0.sort(((a, b) => b[3] - a[3]))
      leaderboard.games.week = data1.sort(((a, b) => b[3] - a[3]))
      leaderboard.games.month = data2.sort(((a, b) => b[3] - a[3]))
      leaderboard.games.global = data3.sort(((a, b) => b[3] - a[3]))

      leaderboard.amount.day = data0.sort(((a, b) => b[4] - a[4]))
      leaderboard.amount.week = data1.sort(((a, b) => b[4] - a[4]))
      leaderboard.amount.month = data2.sort(((a, b) => b[4] - a[4]))
      leaderboard.amount.global = data3.sort(((a, b) => b[4] - a[4]))

      setLeaderboard(leaderboard)
    }
    readLeaderboard()

    return () => {
      setLeaderboard({});
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
          <div className='game-card rps col-md-6 col-12 mx-auto'>
            <NavLink to='/rps'>
              <div className='card-bg rps-bg'></div>
              <img src={RPSGameImg} width='400' />
            </NavLink>
          </div>
        </div>
        <div className='row text-center mb-2 mb-md-5'>
          <div className='game-card col-md-4 mx-auto'>
            <NavLink to='/'>
              <div className='card-bg soon-bg'></div>
              <img src={ComingSoonImg} width='400' />
            </NavLink>
          </div>
          <div className='game-card col-md-4 mx-auto'>
            <NavLink to='/nfts'>
              <div className='card-bg nfts-bg'></div>
              <img src={NFTImg} width='400' />
            </NavLink>
          </div>
          <div className='game-card last col-md-4 mx-auto'>
            <NavLink to='/fair-play'>
              <div className='card-bg fair-bg'></div>
              <img src={FairPlayImg} width='400' />
            </NavLink>
          </div>
        </div>
        <div className='row text-center mb-2'>
          <div className='social-card col-6 mx-auto'>
            <div className='card-bg twitter-bg'></div>
            <a href='https://twitter.com/RPSGameClub' target="_blank" rel="noreferrer"><img src={TwitterImg} width='400' /></a>
          </div>
          <div className='social-card col-6 mx-auto'>
            <div className='card-bg discord-bg'></div>
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

        {mostPlays && leaderboard.games &&
          <>
            {dailyGame &&
              <MostPlays leaderboard={leaderboard.games.day} />
            }
            {weeklyGame &&
              <MostPlays leaderboard={leaderboard.games.week} />
            }
            {monthlyGame &&
              <MostPlays leaderboard={leaderboard.games.month} />
            }
            {globalGame &&
              <MostPlays leaderboard={leaderboard.games.global} />
            }
          </>
        }
        {mostAmount && leaderboard.amount &&
          <>
            {dailyAmount &&
              <MostAmount leaderboard={leaderboard.amount.day} />
            }
            {weeklyAmount &&
              <MostAmount leaderboard={leaderboard.amount.week} />
            }
            {monthlyAmount &&
              <MostAmount leaderboard={leaderboard.amount.month} />
            }
            {globalAmount &&
              <MostAmount leaderboard={leaderboard.amount.global} />
            }
          </>
        }
      </div>
    </>
  );
}