import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import lodash from 'lodash'
import { collection, getDocs, query, setDoc, doc, where } from "firebase/firestore"
import { Button, ButtonGroup } from 'reactstrap'
import { db } from '../../firebase/firesbaseConfig'
import MostPlays from './components/MostPlays'
import MostAmount from './components/MostAmount'
import ReadAllGames from '../../firebase/ReadAllGames'
import RPSGameImg from '../../assets/imgs/rps_card.png'
import ComingSoonImg from '../../assets/imgs/coming_soon_hover_card.png'
import DiscordImg from '../../assets/imgs/discord_card.png'
import TwitterImg from '../../assets/imgs/twitter_card.png'
import FairPlayImg from '../../assets/imgs/fair_play_hover_card.png'
import NFTImg from '../../assets/imgs/nft_hover_card.png'
import { Context } from '../../context/Context'
import { useMatchMedia } from '../../hooks/useMatchMedia'
export default function Main() {
  const { discordId } = useContext(Context);
  const { unixTime } = useContext(Context);
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
  const isMobileResolution = useMatchMedia('(max-width:650px)', false);

  useEffect(() => {
    const readLeaderboard = async () => {
      if (discordId !== '') {
        setDoc(doc(db, "status", discordId), { state: 'online', time: unixTime })
      }
      var lastDay = unixTime - 86400
      var lastWeek = unixTime - 604800
      var lastMonth = unixTime - 2592000

      let dayGames = []
      let weekGames = []
      let monthGames = []
      let globalGames = []

      const clubCollection = collection(db, "allGames")
      const queryGames = query(clubCollection, where("name", "!=", ""))
      const documentGames = await getDocs(queryGames)
      documentGames.forEach(doc => {
        let data = doc.data()
        let created = doc.data().createdAt
        if (created > lastDay) {
          let array0 = {
            account: data.account,
            photo: data.photo,
            name: data.name,
            amount: data.amount,
            uid: data.uid
          }
          dayGames = dayGames.concat(array0)
        }
        if (created > lastWeek) {
          let array1 = {
            account: data.account,
            photo: data.photo,
            name: data.name,
            amount: data.amount,
            uid: data.uid

          }
          weekGames = weekGames.concat(array1)
        }
        if (created > lastMonth) {
          let array2 = {
            account: data.account,
            photo: data.photo,
            name: data.name,
            amount: data.amount,
            uid: data.uid
          }
          monthGames = monthGames.concat(array2)
        }
        let array3 = {
          account: data.account,
          photo: data.photo,
          name: data.name,
          amount: data.amount,
          uid: data.uid
        }
        globalGames = globalGames.concat(array3)
      });

      let dayObject = []
      dayGames.forEach(x => {
        if (!dayObject.hasOwnProperty(x.uid)) {
          dayObject[x.uid] = []
        }
        dayObject[x.uid].push({
          account: x.account,
          photo: x.photo,
          name: x.name,
          amount: x.amount
        })
      })

      let weekObject = []
      weekGames.forEach(x => {
        if (!weekObject.hasOwnProperty(x.uid)) {
          weekObject[x.uid] = []
        }
        weekObject[x.uid].push({
          account: x.account,
          photo: x.photo,
          name: x.name,
          amount: x.amount
        })
      })


      let monthObject = []
      monthGames.forEach(x => {
        if (!monthObject.hasOwnProperty(x.uid)) {
          monthObject[x.uid] = []
        }
        monthObject[x.uid].push({
          account: x.account,
          photo: x.photo,
          name: x.name,
          amount: x.amount
        })
      })

      let globalObject = []
      globalGames.forEach(x => {
        if (!globalObject.hasOwnProperty(x.uid)) {
          globalObject[x.uid] = []
        }
        globalObject[x.uid].push({
          account: x.account,
          photo: x.photo,
          name: x.name,
          amount: x.amount
        })
      })

      let dayArray = []
      Object.values(dayObject).forEach(val => {
        dayArray = dayArray.concat([val])
      });

      let weekArray = []
      Object.values(weekObject).forEach(val => {
        weekArray = weekArray.concat([val])
      });

      let monthArray = []
      Object.values(monthObject).forEach(val => {
        monthArray = monthArray.concat([val])
      });

      let globalArray = []
      Object.values(globalObject).forEach(val => {
        globalArray = globalArray.concat([val])
      });

      let day = dayArray.map(users => {
        let amounts = users.map(amount => amount.amount)
        let amount = lodash.sum(amounts)
        let user = users[users.length - 1]
        let top = [
          user.account,
          user.photo,
          user.name,
          users.length,
          amount
        ]
        return top
      })

      let week = weekArray.map(users => {
        let amounts = users.map(amount => amount.amount)
        let amount = lodash.sum(amounts)
        let user = users[users.length - 1]
        let top = [
          user.account,
          user.photo,
          user.name,
          users.length,
          amount
        ]
        return top
      })

      let month = monthArray.map(users => {
        let amounts = users.map(amount => amount.amount)
        let amount = lodash.sum(amounts)
        let user = users[users.length - 1]
        let top = [
          user.account,
          user.photo,
          user.name,
          users.length,
          amount
        ]
        return top
      })

      let global = globalArray.map(users => {
        let amounts = users.map(amount => amount.amount)
        let amount = lodash.sum(amounts)
        let user = users[users.length - 1]
        let top = [
          user.account,
          user.photo,
          user.name,
          users.length,
          amount
        ]
        return top
      })

      var leaderboard = {
        games: {},
        amount: {},
      }

      leaderboard.games.day = day.sort(((a, b) => b[3] - a[3]))
      leaderboard.amount.day = day.sort(((a, b) => b[4] - a[4]))

      leaderboard.games.week = week.sort(((a, b) => b[3] - a[3]))
      leaderboard.amount.week = week.sort(((a, b) => b[4] - a[4]))

      leaderboard.games.month = month.sort(((a, b) => b[3] - a[3]))
      leaderboard.amount.month = month.sort(((a, b) => b[4] - a[4]))

      leaderboard.games.global = global.sort(((a, b) => b[3] - a[3]))
      leaderboard.amount.global = global.sort(((a, b) => b[4] - a[4]))

      setLeaderboard(leaderboard)
    }
    readLeaderboard()
    return () => {
      setLeaderboard({});
    };
  }, [discordId])

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
            <a href='https://twitter.com/RPSGamesClub' target="_blank" rel="noreferrer">
              <div className='card-bg twitter-bg'></div>
              <img src={TwitterImg} width='400' />
            </a>
          </div>
          <div className='social-card col-6 mx-auto'>
            <a href="https://discord.gg/AM65VtvP2Q" target="_blank" rel="noreferrer">
              <div className='card-bg discord-bg'></div>
              <img src={DiscordImg} width='400' />
            </a>
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

        {liveBets && <ReadAllGames isMobileResolution={isMobileResolution} />}

        {isMobileResolution ?
          <>
            {mostPlays && leaderboard.games &&
              <>
                {dailyGame &&
                  <MostPlays leaderboard={leaderboard.games.day} isMobileResolution={isMobileResolution} />
                }
                {weeklyGame &&
                  <MostPlays leaderboard={leaderboard.games.week} isMobileResolution={isMobileResolution} />
                }
                {monthlyGame &&
                  <MostPlays leaderboard={leaderboard.games.month} isMobileResolution={isMobileResolution} />
                }
                {globalGame &&
                  <MostPlays leaderboard={leaderboard.games.global} isMobileResolution={isMobileResolution} />
                }
              </>
            }
            {mostAmount && leaderboard.amount &&
              <>
                {dailyAmount &&
                  <MostAmount leaderboard={leaderboard.amount.day} isMobileResolution={isMobileResolution} />
                }
                {weeklyAmount &&
                  <MostAmount leaderboard={leaderboard.amount.week} isMobileResolution={isMobileResolution} />
                }
                {monthlyAmount &&
                  <MostAmount leaderboard={leaderboard.amount.month} isMobileResolution={isMobileResolution} />
                }
                {globalAmount &&
                  <MostAmount leaderboard={leaderboard.amount.global} isMobileResolution={isMobileResolution} />
                }
              </>
            }
          </>
          :
          <>
            {mostPlays && leaderboard.games &&
              <>
                {dailyGame &&
                  <MostPlays leaderboard={leaderboard.games.day} isMobileResolution={isMobileResolution} />
                }
                {weeklyGame &&
                  <MostPlays leaderboard={leaderboard.games.week} isMobileResolution={isMobileResolution} />
                }
                {monthlyGame &&
                  <MostPlays leaderboard={leaderboard.games.month} isMobileResolution={isMobileResolution} />
                }
                {globalGame &&
                  <MostPlays leaderboard={leaderboard.games.global} isMobileResolution={isMobileResolution} />
                }
              </>
            }
            {mostAmount && leaderboard.amount &&
              <>
                {dailyAmount &&
                  <MostAmount leaderboard={leaderboard.amount.day} isMobileResolution={isMobileResolution} />
                }
                {weeklyAmount &&
                  <MostAmount leaderboard={leaderboard.amount.week} isMobileResolution={isMobileResolution} />
                }
                {monthlyAmount &&
                  <MostAmount leaderboard={leaderboard.amount.month} isMobileResolution={isMobileResolution} />
                }
                {globalAmount &&
                  <MostAmount leaderboard={leaderboard.amount.global} isMobileResolution={isMobileResolution} />
                }
              </>
            }
          </>
        }
      </div >
    </>
  );
}