import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { collection, getDocs, query, limit, onSnapshot, orderBy, where } from "firebase/firestore";
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

  const getUnixTime = async () => {
    fetch('https://showcase.api.linx.twenty57.net/UnixTime/tounixtimestamp?datetime=now')
      .then(response =>
        response.json()
      )
      .then(data =>
        setUnixTimeStamp(parseInt(data.UnixTimeStamp))
      );
  }

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
    const readLeaderboard = async () => {
      let unixTime = 0
      let lastDay = 0
      let lastWeek = 0
      let lastMonth = 0
      fetch('https://showcase.api.linx.twenty57.net/UnixTime/tounixtimestamp?datetime=now')
        .then(response =>
          response.json()
        )
        .then(data => {
          unixTime = parseInt(data.UnixTimeStamp)
          lastDay = parseInt(data.UnixTimeStamp) - 86400
          lastWeek = parseInt(data.UnixTimeStamp) - 604800
          lastMonth = parseInt(data.UnixTimeStamp) - 259200
          setUnixTimeStamp(parseInt(data.UnixTimeStamp))
        }
        );
      let leaderboard = []
      let dayGames = []
      let weekGames = []
      let monthGames = []
      let globalGames = []

      let aD = []
      let bD = []
      let cD = []
      let dD = []
      let eD = []
      let fD = []
      let gD = []
      let hD = []
      let iD = []
      let jD = []

      let aW = []
      let bW = []
      let cW = []
      let dW = []
      let eW = []
      let fW = []
      let gW = []
      let hW = []
      let iW = []
      let jW = []

      let aM = []
      let bM = []
      let cM = []
      let dM = []
      let eM = []
      let fM = []
      let gM = []
      let hM = []
      let iM = []
      let jM = []

      let aA = []
      let bA = []
      let cA = []
      let dA = []
      let eA = []
      let fA = []
      let gA = []
      let hA = []
      let iA = []
      let jA = []

      const clubCollection = collection(db, "allGames")
      const queryGames = query(clubCollection, orderBy("createdAt", "desc"))
      const documentGames = await getDocs(queryGames)
      documentGames.forEach((doc) => {
        if (doc.data().createdAt > lastDay) {
          dayGames.push([doc.data().account])
        }
        if (doc.data().createdAt > lastWeek) {
          weekGames.push([doc.data().account])
        }
        if (doc.data().createdAt > lastMonth) {
          monthGames.push([doc.data().account])
        }
        globalGames.push([doc.data().account])
      });
      // ---------------------------------------------------------------------------------------------------------------------------------------
      const arrDay = [... new Set(dayGames.map(data => data[0]))]
      try {
        const q0 = query(collection(db, "allGames"), where("account", "==", arrDay[0]), where("createdAt", ">", lastDay))
        const d0 = await getDocs(q0)
        const data0 = d0._snapshot.docChanges
        data0.forEach((data) => {
          aD.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q1 = query(collection(db, "allGames"), where("account", "==", arrDay[1]), where("createdAt", ">", lastDay))
        const d1 = await getDocs(q1)
        const data1 = d1._snapshot.docChanges
        data1.forEach((data) => {
          bD.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q2 = query(collection(db, "allGames"), where("account", "==", arrDay[2]), where("createdAt", ">", lastDay))
        const d2 = await getDocs(q2)
        const data2 = d2._snapshot.docChanges
        data2.forEach((data) => {
          cD.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q3 = query(collection(db, "allGames"), where("account", "==", arrDay[3]), where("createdAt", ">", lastDay))
        const d3 = await getDocs(q3)
        const data3 = d3._snapshot.docChanges
        data3.forEach((data) => {
          dD.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q4 = query(collection(db, "allGames"), where("account", "==", arrDay[4]), where("createdAt", ">", lastDay))
        const d4 = await getDocs(q4)
        const data4 = d4._snapshot.docChanges
        data4.forEach((data) => {
          eD.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q5 = query(collection(db, "allGames"), where("account", "==", arrDay[5]), where("createdAt", ">", lastDay))
        const d5 = await getDocs(q5)
        const data5 = d5._snapshot.docChanges
        data5.forEach((data) => {
          fD.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q6 = query(collection(db, "allGames"), where("account", "==", arrDay[6]), where("createdAt", ">", lastDay))
        const d6 = await getDocs(q6)
        const data6 = d6._snapshot.docChanges
        data6.forEach((data) => {
          gD.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q7 = query(collection(db, "allGames"), where("account", "==", arrDay[7]), where("createdAt", ">", lastDay))
        const d7 = await getDocs(q7)
        const data7 = d7._snapshot.docChanges
        data7.forEach((data) => {
          hD.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q8 = query(collection(db, "allGames"), where("account", "==", arrDay[8]), where("createdAt", ">", lastDay))
        const d8 = await getDocs(q8)
        const data8 = d8._snapshot.docChanges
        data8.forEach((data) => {
          iD.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q9 = query(collection(db, "allGames"), where("account", "==", arrDay[9]), where("createdAt", ">", lastDay))
        const d9 = await getDocs(q9)
        const data9 = d9._snapshot.docChanges
        data9.forEach((data) => {
          jD.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      // ------------------------------------------------------------------------------------------------------------
      const arrWeek = [... new Set(weekGames.map(data => data[0]))]
      try {
        const q0 = query(collection(db, "allGames"), where("account", "==", arrWeek[0]), where("createdAt", ">", lastWeek))
        const d0 = await getDocs(q0)
        const data0 = d0._snapshot.docChanges
        data0.forEach((data) => {
          aW.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q1 = query(collection(db, "allGames"), where("account", "==", arrWeek[1]), where("createdAt", ">", lastWeek))
        const d1 = await getDocs(q1)
        const data1 = d1._snapshot.docChanges
        data1.forEach((data) => {
          bW.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q2 = query(collection(db, "allGames"), where("account", "==", arrWeek[2]), where("createdAt", ">", lastWeek))
        const d2 = await getDocs(q2)
        const data2 = d2._snapshot.docChanges
        data2.forEach((data) => {
          cW.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q3 = query(collection(db, "allGames"), where("account", "==", arrWeek[3]), where("createdAt", ">", lastWeek))
        const d3 = await getDocs(q3)
        const data3 = d3._snapshot.docChanges
        data3.forEach((data) => {
          dW.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q4 = query(collection(db, "allGames"), where("account", "==", arrWeek[4]), where("createdAt", ">", lastWeek))
        const d4 = await getDocs(q4)
        const data4 = d4._snapshot.docChanges
        data4.forEach((data) => {
          eW.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q5 = query(collection(db, "allGames"), where("account", "==", arrWeek[5]), where("createdAt", ">", lastWeek))
        const d5 = await getDocs(q5)
        const data5 = d5._snapshot.docChanges
        data5.forEach((data) => {
          fW.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q6 = query(collection(db, "allGames"), where("account", "==", arrWeek[6]), where("createdAt", ">", lastWeek))
        const d6 = await getDocs(q6)
        const data6 = d6._snapshot.docChanges
        data6.forEach((data) => {
          gW.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q7 = query(collection(db, "allGames"), where("account", "==", arrWeek[7]), where("createdAt", ">", lastWeek))
        const d7 = await getDocs(q7)
        const data7 = d7._snapshot.docChanges
        data7.forEach((data) => {
          hW.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q8 = query(collection(db, "allGames"), where("account", "==", arrWeek[8]), where("createdAt", ">", lastWeek))
        const d8 = await getDocs(q8)
        const data8 = d8._snapshot.docChanges
        data8.forEach((data) => {
          iW.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q9 = query(collection(db, "allGames"), where("account", "==", arrWeek[9]), where("createdAt", ">", lastWeek))
        const d9 = await getDocs(q9)
        const data9 = d9._snapshot.docChanges
        data9.forEach((data) => {
          jW.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      // ------------------------------------------------------------------------------------------------------------
      const arrMonth = [... new Set(monthGames.map(data => data[0]))]
      try {
        const q0 = query(collection(db, "allGames"), where("account", "==", arrMonth[0]), where("createdAt", ">", lastMonth))
        const d0 = await getDocs(q0)
        const data0 = d0._snapshot.docChanges
        data0.forEach((data) => {
          aM.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q1 = query(collection(db, "allGames"), where("account", "==", arrMonth[1]), where("createdAt", ">", lastMonth))
        const d1 = await getDocs(q1)
        const data1 = d1._snapshot.docChanges
        data1.forEach((data) => {
          bM.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q2 = query(collection(db, "allGames"), where("account", "==", arrMonth[2]), where("createdAt", ">", lastMonth))
        const d2 = await getDocs(q2)
        const data2 = d2._snapshot.docChanges
        data2.forEach((data) => {
          cM.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q3 = query(collection(db, "allGames"), where("account", "==", arrMonth[3]), where("createdAt", ">", lastMonth))
        const d3 = await getDocs(q3)
        const data3 = d3._snapshot.docChanges
        data3.forEach((data) => {
          dM.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q4 = query(collection(db, "allGames"), where("account", "==", arrMonth[4]), where("createdAt", ">", lastMonth))
        const d4 = await getDocs(q4)
        const data4 = d4._snapshot.docChanges
        data4.forEach((data) => {
          eM.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q5 = query(collection(db, "allGames"), where("account", "==", arrMonth[5]), where("createdAt", ">", lastMonth))
        const d5 = await getDocs(q5)
        const data5 = d5._snapshot.docChanges
        data5.forEach((data) => {
          fM.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q6 = query(collection(db, "allGames"), where("account", "==", arrMonth[6]), where("createdAt", ">", lastMonth))
        const d6 = await getDocs(q6)
        const data6 = d6._snapshot.docChanges
        data6.forEach((data) => {
          gM.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q7 = query(collection(db, "allGames"), where("account", "==", arrMonth[7]), where("createdAt", ">", lastMonth))
        const d7 = await getDocs(q7)
        const data7 = d7._snapshot.docChanges
        data7.forEach((data) => {
          hM.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q8 = query(collection(db, "allGames"), where("account", "==", arrMonth[8]), where("createdAt", ">", lastMonth))
        const d8 = await getDocs(q8)
        const data8 = d8._snapshot.docChanges
        data8.forEach((data) => {
          iM.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q9 = query(collection(db, "allGames"), where("account", "==", arrMonth[9]), where("createdAt", ">", lastMonth))
        const d9 = await getDocs(q9)
        const data9 = d9._snapshot.docChanges
        data9.forEach((data) => {
          jM.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      // ------------------------------------------------------------------------------------------------------------
      const arrAll = [... new Set(globalGames.map(data => data[0]))]
      try {
        const q0 = query(collection(db, "allGames"), where("account", "==", arrAll[0]))
        const d0 = await getDocs(q0)
        const data0 = d0._snapshot.docChanges
        data0.forEach((data) => {
          aA.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q1 = query(collection(db, "allGames"), where("account", "==", arrAll[1]))
        const d1 = await getDocs(q1)
        const data1 = d1._snapshot.docChanges
        data1.forEach((data) => {
          bA.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q2 = query(collection(db, "allGames"), where("account", "==", arrAll[2]))
        const d2 = await getDocs(q2)
        const data2 = d2._snapshot.docChanges
        data2.forEach((data) => {
          cA.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q3 = query(collection(db, "allGames"), where("account", "==", arrAll[3]))
        const d3 = await getDocs(q3)
        const data3 = d3._snapshot.docChanges
        data3.forEach((data) => {
          dA.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q4 = query(collection(db, "allGames"), where("account", "==", arrAll[4]))
        const d4 = await getDocs(q4)
        const data4 = d4._snapshot.docChanges
        data4.forEach((data) => {
          eA.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q5 = query(collection(db, "allGames"), where("account", "==", arrAll[5]))
        const d5 = await getDocs(q5)
        const data5 = d5._snapshot.docChanges
        data5.forEach((data) => {
          fA.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q6 = query(collection(db, "allGames"), where("account", "==", arrAll[6]))
        const d6 = await getDocs(q6)
        const data6 = d6._snapshot.docChanges
        data6.forEach((data) => {
          gA.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q7 = query(collection(db, "allGames"), where("account", "==", arrAll[7]))
        const d7 = await getDocs(q7)
        const data7 = d7._snapshot.docChanges
        data7.forEach((data) => {
          hA.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q8 = query(collection(db, "allGames"), where("account", "==", arrAll[8]))
        const d8 = await getDocs(q8)
        const data8 = d8._snapshot.docChanges
        data8.forEach((data) => {
          iA.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      try {
        const q9 = query(collection(db, "allGames"), where("account", "==", arrAll[9]))
        const d9 = await getDocs(q9)
        const data9 = d9._snapshot.docChanges
        data9.forEach((data) => {
          jA.push([data.doc.data.value.mapValue.fields.account, data.doc.data.value.mapValue.fields.photo, data.doc.data.value.mapValue.fields.name, data.doc.data.value.mapValue.fields.maticAmount])
        })
      } catch (e) {

      }
      leaderboard.push([aD, bD, cD, dD, eD, fD, gD, hD, iD, jD])
      leaderboard.push([aW, bW, cW, dW, eW, fW, gW, hW, iW, jW])
      leaderboard.push([aM, bM, cM, dM, eM, fM, gM, hM, iM, jM])
      leaderboard.push([aA, bA, cA, dA, eA, fA, gA, hA, iA, jA])
      // ---------------------------------------------------------------------------------------------------------------------------------------
      let topGames = {}
      let dayTopGames = []
      let weekTopGames = []
      let monthTopGames = []
      let globalTopGames = []
      try {
        dayTopGames.push([leaderboard[0][0][0][0].stringValue, leaderboard[0][0][0][1].stringValue, leaderboard[0][0][0][2].stringValue, leaderboard[0][0].length])
        dayTopGames.push([leaderboard[0][1][0][0].stringValue, leaderboard[0][1][0][1].stringValue, leaderboard[0][1][0][2].stringValue, leaderboard[0][1].length])
        dayTopGames.push([leaderboard[0][2][0][0].stringValue, leaderboard[0][2][0][1].stringValue, leaderboard[0][2][0][2].stringValue, leaderboard[0][2].length])
        dayTopGames.push([leaderboard[0][3][0][0].stringValue, leaderboard[0][3][0][1].stringValue, leaderboard[0][3][0][2].stringValue, leaderboard[0][3].length])
        dayTopGames.push([leaderboard[0][4][0][0].stringValue, leaderboard[0][4][0][1].stringValue, leaderboard[0][4][0][2].stringValue, leaderboard[0][4].length])
        dayTopGames.push([leaderboard[0][5][0][0].stringValue, leaderboard[0][5][0][1].stringValue, leaderboard[0][5][0][2].stringValue, leaderboard[0][5].length])
        dayTopGames.push([leaderboard[0][6][0][0].stringValue, leaderboard[0][6][0][1].stringValue, leaderboard[0][6][0][2].stringValue, leaderboard[0][6].length])
        dayTopGames.push([leaderboard[0][7][0][0].stringValue, leaderboard[0][7][0][1].stringValue, leaderboard[0][7][0][2].stringValue, leaderboard[0][7].length])
        dayTopGames.push([leaderboard[0][8][0][0].stringValue, leaderboard[0][8][0][1].stringValue, leaderboard[0][8][0][2].stringValue, leaderboard[0][8].length])
        dayTopGames.push([leaderboard[0][9][0][0].stringValue, leaderboard[0][9][0][1].stringValue, leaderboard[0][9][0][2].stringValue, leaderboard[0][9].length])
      } catch (e) {

      }
      try {
        weekTopGames.push([leaderboard[1][0][0][0].stringValue, leaderboard[1][0][0][1].stringValue, leaderboard[1][0][0][2].stringValue, leaderboard[1][0].length])
        weekTopGames.push([leaderboard[1][1][0][0].stringValue, leaderboard[1][1][0][1].stringValue, leaderboard[1][1][0][2].stringValue, leaderboard[1][1].length])
        weekTopGames.push([leaderboard[1][2][0][0].stringValue, leaderboard[1][2][0][1].stringValue, leaderboard[1][2][0][2].stringValue, leaderboard[1][2].length])
        weekTopGames.push([leaderboard[1][3][0][0].stringValue, leaderboard[1][3][0][1].stringValue, leaderboard[1][3][0][2].stringValue, leaderboard[1][3].length])
        weekTopGames.push([leaderboard[1][4][0][0].stringValue, leaderboard[1][4][0][1].stringValue, leaderboard[1][4][0][2].stringValue, leaderboard[1][4].length])
        weekTopGames.push([leaderboard[1][5][0][0].stringValue, leaderboard[1][5][0][1].stringValue, leaderboard[1][5][0][2].stringValue, leaderboard[1][5].length])
        weekTopGames.push([leaderboard[1][6][0][0].stringValue, leaderboard[1][6][0][1].stringValue, leaderboard[1][6][0][2].stringValue, leaderboard[1][6].length])
        weekTopGames.push([leaderboard[1][7][0][0].stringValue, leaderboard[1][7][0][1].stringValue, leaderboard[1][7][0][2].stringValue, leaderboard[1][7].length])
        weekTopGames.push([leaderboard[1][8][0][0].stringValue, leaderboard[1][8][0][1].stringValue, leaderboard[1][8][0][2].stringValue, leaderboard[1][8].length])
        weekTopGames.push([leaderboard[1][9][0][0].stringValue, leaderboard[1][9][0][1].stringValue, leaderboard[1][9][0][2].stringValue, leaderboard[1][9].length])
      } catch (e) {

      }
      try {
        monthTopGames.push([leaderboard[2][0][0][0].stringValue, leaderboard[2][0][0][1].stringValue, leaderboard[2][0][0][2].stringValue, leaderboard[2][0].length])
        monthTopGames.push([leaderboard[2][1][0][0].stringValue, leaderboard[2][1][0][1].stringValue, leaderboard[2][1][0][2].stringValue, leaderboard[2][1].length])
        monthTopGames.push([leaderboard[2][2][0][0].stringValue, leaderboard[2][2][0][1].stringValue, leaderboard[2][2][0][2].stringValue, leaderboard[2][2].length])
        monthTopGames.push([leaderboard[2][3][0][0].stringValue, leaderboard[2][3][0][1].stringValue, leaderboard[2][3][0][2].stringValue, leaderboard[2][3].length])
        monthTopGames.push([leaderboard[2][4][0][0].stringValue, leaderboard[2][4][0][1].stringValue, leaderboard[2][4][0][2].stringValue, leaderboard[2][4].length])
        monthTopGames.push([leaderboard[2][5][0][0].stringValue, leaderboard[2][5][0][1].stringValue, leaderboard[2][5][0][2].stringValue, leaderboard[2][5].length])
        monthTopGames.push([leaderboard[2][6][0][0].stringValue, leaderboard[2][6][0][1].stringValue, leaderboard[2][6][0][2].stringValue, leaderboard[2][6].length])
        monthTopGames.push([leaderboard[2][7][0][0].stringValue, leaderboard[2][7][0][1].stringValue, leaderboard[2][7][0][2].stringValue, leaderboard[2][7].length])
        monthTopGames.push([leaderboard[2][8][0][0].stringValue, leaderboard[2][8][0][1].stringValue, leaderboard[2][8][0][2].stringValue, leaderboard[2][8].length])
        monthTopGames.push([leaderboard[2][9][0][0].stringValue, leaderboard[2][9][0][1].stringValue, leaderboard[2][9][0][2].stringValue, leaderboard[2][9].length])
      } catch (e) {

      }
      try {
        globalTopGames.push([leaderboard[3][0][0][0].stringValue, leaderboard[3][0][0][1].stringValue, leaderboard[3][0][0][2].stringValue, leaderboard[3][0].length])
        globalTopGames.push([leaderboard[3][1][0][0].stringValue, leaderboard[3][1][0][1].stringValue, leaderboard[3][1][0][2].stringValue, leaderboard[3][1].length])
        globalTopGames.push([leaderboard[3][2][0][0].stringValue, leaderboard[3][2][0][1].stringValue, leaderboard[3][2][0][2].stringValue, leaderboard[3][2].length])
        globalTopGames.push([leaderboard[3][3][0][0].stringValue, leaderboard[3][3][0][1].stringValue, leaderboard[3][3][0][2].stringValue, leaderboard[3][3].length])
        globalTopGames.push([leaderboard[3][4][0][0].stringValue, leaderboard[3][4][0][1].stringValue, leaderboard[3][4][0][2].stringValue, leaderboard[3][4].length])
        globalTopGames.push([leaderboard[3][5][0][0].stringValue, leaderboard[3][5][0][1].stringValue, leaderboard[3][5][0][2].stringValue, leaderboard[3][5].length])
        globalTopGames.push([leaderboard[3][6][0][0].stringValue, leaderboard[3][6][0][1].stringValue, leaderboard[3][6][0][2].stringValue, leaderboard[3][6].length])
        globalTopGames.push([leaderboard[3][7][0][0].stringValue, leaderboard[3][7][0][1].stringValue, leaderboard[3][7][0][2].stringValue, leaderboard[3][7].length])
        globalTopGames.push([leaderboard[3][8][0][0].stringValue, leaderboard[3][8][0][1].stringValue, leaderboard[3][8][0][2].stringValue, leaderboard[3][8].length])
        globalTopGames.push([leaderboard[3][9][0][0].stringValue, leaderboard[3][9][0][1].stringValue, leaderboard[3][9][0][2].stringValue, leaderboard[3][9].length])
      } catch (e) {

      }
      topGames.day = dayTopGames.sort(((a, b) => b[2] - a[2]));
      topGames.week = weekTopGames.sort(((a, b) => b[2] - a[2]))
      topGames.month = monthTopGames.sort(((a, b) => b[2] - a[2]))
      topGames.global = globalTopGames.sort(((a, b) => b[2] - a[2]))

      let topAmount = {}
      let dayTopAmount = []
      let weekTopAmount = []
      let monthTopAmount = []
      let globalTopAmount = []

      let arrD0 = []
      let arrD1 = []
      let arrD2 = []
      let arrD3 = []
      let arrD4 = []
      let arrD5 = []
      let arrD6 = []
      let arrD7 = []
      let arrD8 = []
      let arrD9 = []

      let sumD0 = 0
      let sumD1 = 0
      let sumD2 = 0
      let sumD3 = 0
      let sumD4 = 0
      let sumD5 = 0
      let sumD6 = 0
      let sumD7 = 0
      let sumD8 = 0
      let sumD9 = 0

      try {
        leaderboard[0][0].forEach((amount) => {
          arrD0.push(parseInt(amount[3].integerValue))
        })
        for (let a = 0; a < arrD0.length; a++) {
          sumD0 += arrD0[a];
        }
      } catch (e) {

      }
      try {
        leaderboard[0][1].forEach((amount) => {
          arrD1.push(parseInt(amount[3].integerValue))
        })
        for (let b = 0; b < arrD1.length; b++) {
          sumD1 += arrD1[b];
        }
      } catch (e) {

      }
      try {
        leaderboard[0][2].forEach((amount) => {
          arrD2.push(parseInt(amount[3].integerValue))
        })
        for (let c = 0; c < arrD2.length; c++) {
          sumD2 += arrD2[c];
        }
      } catch (e) {

      }
      try {
        leaderboard[0][3].forEach((amount) => {
          arrD3.push(parseInt(amount[3].integerValue))
        })
        for (let d = 0; d < arrD3.length; d++) {
          sumD3 += arrD3[d];
        }
      } catch (e) {

      }
      try {
        leaderboard[0][4].forEach((amount) => {
          arrD4.push(parseInt(amount[3].integerValue))
        })
        for (let e = 0; e < arrD4.length; e++) {
          sumD4 += arrD4[e];
        }
      } catch (e) {

      }
      try {
        leaderboard[0][5].forEach((amount) => {
          arrD5.push(parseInt(amount[3].integerValue))
        })
        for (let f = 0; f < arrD5.length; f++) {
          sumD5 += arrD5[f];
        }
      } catch (e) {

      }
      try {
        leaderboard[0][6].forEach((amount) => {
          arrD6.push(parseInt(amount[3].integerValue))
        })
        for (let g = 0; g < arrD6.length; g++) {
          sumD6 += arrD6[g];
        }
      } catch (e) {

      }
      try {
        leaderboard[0][7].forEach((amount) => {
          arrD7.push(parseInt(amount[3].integerValue))
        })
        for (let h = 0; h < arrD7.length; h++) {
          sumD7 += arrD7[h];
        }
      } catch (e) {

      }
      try {
        leaderboard[0][8].forEach((amount) => {
          arrD8.push(parseInt(amount[3].integerValue))
        })
        for (let i = 0; i < arrD8.length; i++) {
          sumD8 += arrD8[i];
        }
      } catch (e) {

      }
      try {
        leaderboard[0][9].forEach((amount) => {
          arrD9.push(parseInt(amount[3].integerValue))
        })
        for (let j = 0; j < arrD9.length; j++) {
          sumD9 += arrD9[j];
        }
      } catch (e) {

      }

      let arrW0 = []
      let arrW1 = []
      let arrW2 = []
      let arrW3 = []
      let arrW4 = []
      let arrW5 = []
      let arrW6 = []
      let arrW7 = []
      let arrW8 = []
      let arrW9 = []

      let sumW0 = 0
      let sumW1 = 0
      let sumW2 = 0
      let sumW3 = 0
      let sumW4 = 0
      let sumW5 = 0
      let sumW6 = 0
      let sumW7 = 0
      let sumW8 = 0
      let sumW9 = 0

      try {
        leaderboard[1][0].forEach((amount) => {
          arrW0.push(parseInt(amount[3].integerValue))
        })
        for (let a = 0; a < arrW0.length; a++) {
          sumW0 += arrW0[a];
        }
      } catch (e) {

      }
      try {
        leaderboard[1][1].forEach((amount) => {
          arrW1.push(parseInt(amount[3].integerValue))
        })
        for (let b = 0; b < arrW1.length; b++) {
          sumW1 += arrW1[b];
        }
      } catch (e) {

      }
      try {
        leaderboard[1][2].forEach((amount) => {
          arrW2.push(parseInt(amount[3].integerValue))
        })
        for (let c = 0; c < arrW2.length; c++) {
          sumW2 += arrW2[c];
        }
      } catch (e) {

      }
      try {
        leaderboard[1][3].forEach((amount) => {
          arrW3.push(parseInt(amount[3].integerValue))
        })
        for (let d = 0; d < arrW3.length; d++) {
          sumW3 += arrW3[d];
        }
      } catch (e) {

      }
      try {
        leaderboard[1][4].forEach((amount) => {
          arrW4.push(parseInt(amount[3].integerValue))
        })
        for (let e = 0; e < arrW4.length; e++) {
          sumW4 += arrW4[e];
        }
      } catch (e) {

      }
      try {
        leaderboard[1][5].forEach((amount) => {
          arrW5.push(parseInt(amount[3].integerValue))
        })
        for (let f = 0; f < arrW5.length; f++) {
          sumW5 += arrW5[f];
        }
      } catch (e) {

      }
      try {
        leaderboard[1][6].forEach((amount) => {
          arrW6.push(parseInt(amount[3].integerValue))
        })
        for (let g = 0; g < arrW6.length; g++) {
          sumW6 += arrW6[g];
        }
      } catch (e) {

      }
      try {
        leaderboard[1][7].forEach((amount) => {
          arrW7.push(parseInt(amount[3].integerValue))
        })
        for (let h = 0; h < arrW7.length; h++) {
          sumW7 += arrW7[h];
        }
      } catch (e) {

      }
      try {
        leaderboard[1][8].forEach((amount) => {
          arrW8.push(parseInt(amount[3].integerValue))
        })
        for (let i = 0; i < arrW8.length; i++) {
          sumW8 += arrW8[i];
        }
      } catch (e) {

      }
      try {
        leaderboard[1][9].forEach((amount) => {
          arrW9.push(parseInt(amount[3].integerValue))
        })
        for (let j = 0; j < arrW9.length; j++) {
          sumW9 += arrW9[j];
        }
      } catch (e) {

      }

      let arrM0 = []
      let arrM1 = []
      let arrM2 = []
      let arrM3 = []
      let arrM4 = []
      let arrM5 = []
      let arrM6 = []
      let arrM7 = []
      let arrM8 = []
      let arrM9 = []

      let sumM0 = 0
      let sumM1 = 0
      let sumM2 = 0
      let sumM3 = 0
      let sumM4 = 0
      let sumM5 = 0
      let sumM6 = 0
      let sumM7 = 0
      let sumM8 = 0
      let sumM9 = 0

      try {
        leaderboard[2][0].forEach((amount) => {
          arrM0.push(parseInt(amount[3].integerValue))
        })
        for (let a = 0; a < arrM0.length; a++) {
          sumM0 += arrM0[a];
        }
      } catch (e) {

      }
      try {
        leaderboard[2][1].forEach((amount) => {
          arrM1.push(parseInt(amount[3].integerValue))
        })
        for (let b = 0; b < arrM1.length; b++) {
          sumM1 += arrM1[b];
        }
      } catch (e) {

      }
      try {
        leaderboard[2][2].forEach((amount) => {
          arrM2.push(parseInt(amount[3].integerValue))
        })
        for (let c = 0; c < arrM2.length; c++) {
          sumM2 += arrM2[c];
        }
      } catch (e) {

      }
      try {
        leaderboard[2][3].forEach((amount) => {
          arrM3.push(parseInt(amount[3].integerValue))
        })
        for (let d = 0; d < arrM3.length; d++) {
          sumM3 += arrM3[d];
        }
      } catch (e) {

      }
      try {
        leaderboard[2][4].forEach((amount) => {
          arrM4.push(parseInt(amount[3].integerValue))
        })
        for (let e = 0; e < arrM4.length; e++) {
          sumM4 += arrM4[e];
        }
      } catch (e) {

      }
      try {
        leaderboard[2][5].forEach((amount) => {
          arrM5.push(parseInt(amount[3].integerValue))
        })
        for (let f = 0; f < arrM5.length; f++) {
          sumM5 += arrM5[f];
        }
      } catch (e) {

      }
      try {
        leaderboard[2][6].forEach((amount) => {
          arrM6.push(parseInt(amount[3].integerValue))
        })
        for (let g = 0; g < arrM6.length; g++) {
          sumM6 += arrM6[g];
        }
      } catch (e) {

      }
      try {
        leaderboard[2][7].forEach((amount) => {
          arrM7.push(parseInt(amount[3].integerValue))
        })
        for (let h = 0; h < arrM7.length; h++) {
          sumM7 += arrM7[h];
        }
      } catch (e) {

      }
      try {
        leaderboard[2][8].forEach((amount) => {
          arrM8.push(parseInt(amount[3].integerValue))
        })
        for (let i = 0; i < arrM8.length; i++) {
          sumM8 += arrM8[i];
        }
      } catch (e) {

      }
      try {
        leaderboard[2][9].forEach((amount) => {
          arrM9.push(parseInt(amount[3].integerValue))
        })
        for (let j = 0; j < arrM9.length; j++) {
          sumM9 += arrM9[j];
        }
      } catch (e) {

      }

      let arrG0 = []
      let arrG1 = []
      let arrG2 = []
      let arrG3 = []
      let arrG4 = []
      let arrG5 = []
      let arrG6 = []
      let arrG7 = []
      let arrG8 = []
      let arrG9 = []

      let sumG0 = 0
      let sumG1 = 0
      let sumG2 = 0
      let sumG3 = 0
      let sumG4 = 0
      let sumG5 = 0
      let sumG6 = 0
      let sumG7 = 0
      let sumG8 = 0
      let sumG9 = 0

      try {
        leaderboard[3][0].forEach((amount) => {
          arrG0.push(parseInt(amount[3].integerValue))
        })
        for (let a = 0; a < arrG0.length; a++) {
          sumG0 += arrG0[a];
        }
      } catch (e) {

      }
      try {
        leaderboard[3][1].forEach((amount) => {
          arrG1.push(parseInt(amount[3].integerValue))
        })
        for (let b = 0; b < arrG1.length; b++) {
          sumG1 += arrG1[b];
        }
      } catch (e) {

      }
      try {
        leaderboard[3][2].forEach((amount) => {
          arrG2.push(parseInt(amount[3].integerValue))
        })
        for (let c = 0; c < arrG2.length; c++) {
          sumG2 += arrG2[c];
        }
      } catch (e) {

      }
      try {
        leaderboard[3][3].forEach((amount) => {
          arrG3.push(parseInt(amount[3].integerValue))
        })
        for (let d = 0; d < arrG3.length; d++) {
          sumG3 += arrG3[d];
        }
      } catch (e) {

      }
      try {
        leaderboard[3][4].forEach((amount) => {
          arrG4.push(parseInt(amount[3].integerValue))
        })
        for (let e = 0; e < arrG4.length; e++) {
          sumG4 += arrG4[e];
        }
      } catch (e) {

      }
      try {
        leaderboard[3][5].forEach((amount) => {
          arrG5.push(parseInt(amount[3].integerValue))
        })
        for (let f = 0; f < arrG5.length; f++) {
          sumG5 += arrG5[f];
        }
      } catch (e) {

      }
      try {
        leaderboard[3][6].forEach((amount) => {
          arrG6.push(parseInt(amount[3].integerValue))
        })
        for (let g = 0; g < arrG6.length; g++) {
          sumG6 += arrG6[g];
        }
      } catch (e) {

      }
      try {
        leaderboard[3][7].forEach((amount) => {
          arrG7.push(parseInt(amount[3].integerValue))
        })
        for (let h = 0; h < arrG7.length; h++) {
          sumG7 += arrG7[h];
        }
      } catch (e) {

      }
      try {
        leaderboard[3][8].forEach((amount) => {
          arrG8.push(parseInt(amount[3].integerValue))
        })
        for (let i = 0; i < arrG8.length; i++) {
          sumG8 += arrG8[i];
        }
      } catch (e) {

      }
      try {
        leaderboard[3][9].forEach((amount) => {
          arrG9.push(parseInt(amount[3].integerValue))
        })
        for (let j = 0; j < arrG9.length; j++) {
          sumG9 += arrG9[j];
        }
      } catch (e) {

      }

      try {
        dayTopAmount.push([leaderboard[0][0][0][0].stringValue, leaderboard[0][0][0][1].stringValue, leaderboard[0][0][0][2].stringValue, sumD0])
        dayTopAmount.push([leaderboard[0][1][0][0].stringValue, leaderboard[0][1][0][1].stringValue, leaderboard[0][1][0][2].stringValue, sumD1])
        dayTopAmount.push([leaderboard[0][2][0][0].stringValue, leaderboard[0][2][0][1].stringValue, leaderboard[0][2][0][2].stringValue, sumD2])
        dayTopAmount.push([leaderboard[0][3][0][0].stringValue, leaderboard[0][3][0][1].stringValue, leaderboard[0][3][0][2].stringValue, sumD3])
        dayTopAmount.push([leaderboard[0][4][0][0].stringValue, leaderboard[0][4][0][1].stringValue, leaderboard[0][4][0][2].stringValue, sumD4])
        dayTopAmount.push([leaderboard[0][5][0][0].stringValue, leaderboard[0][5][0][1].stringValue, leaderboard[0][5][0][2].stringValue, sumD5])
        dayTopAmount.push([leaderboard[0][6][0][0].stringValue, leaderboard[0][6][0][1].stringValue, leaderboard[0][6][0][2].stringValue, sumD6])
        dayTopAmount.push([leaderboard[0][7][0][0].stringValue, leaderboard[0][7][0][1].stringValue, leaderboard[0][7][0][2].stringValue, sumD7])
        dayTopAmount.push([leaderboard[0][8][0][0].stringValue, leaderboard[0][8][0][1].stringValue, leaderboard[0][8][0][2].stringValue, sumD8])
        dayTopAmount.push([leaderboard[0][9][0][0].stringValue, leaderboard[0][9][0][1].stringValue, leaderboard[0][9][0][2].stringValue, sumD9])
      } catch (e) {

      }
      try {
        weekTopAmount.push([leaderboard[1][0][0][0].stringValue, leaderboard[1][0][0][1].stringValue, leaderboard[1][0][0][2].stringValue, sumW0])
        weekTopAmount.push([leaderboard[1][1][0][0].stringValue, leaderboard[1][1][0][1].stringValue, leaderboard[1][1][0][2].stringValue, sumW1])
        weekTopAmount.push([leaderboard[1][2][0][0].stringValue, leaderboard[1][2][0][1].stringValue, leaderboard[1][2][0][2].stringValue, sumW2])
        weekTopAmount.push([leaderboard[1][3][0][0].stringValue, leaderboard[1][3][0][1].stringValue, leaderboard[1][3][0][2].stringValue, sumW3])
        weekTopAmount.push([leaderboard[1][4][0][0].stringValue, leaderboard[1][4][0][1].stringValue, leaderboard[1][4][0][2].stringValue, sumW4])
        weekTopAmount.push([leaderboard[1][5][0][0].stringValue, leaderboard[1][5][0][1].stringValue, leaderboard[1][5][0][2].stringValue, sumW5])
        weekTopAmount.push([leaderboard[1][6][0][0].stringValue, leaderboard[1][6][0][1].stringValue, leaderboard[1][6][0][2].stringValue, sumW6])
        weekTopAmount.push([leaderboard[1][7][0][0].stringValue, leaderboard[1][7][0][1].stringValue, leaderboard[1][7][0][2].stringValue, sumW7])
        weekTopAmount.push([leaderboard[1][8][0][0].stringValue, leaderboard[1][8][0][1].stringValue, leaderboard[1][8][0][2].stringValue, sumW8])
        weekTopAmount.push([leaderboard[1][9][0][0].stringValue, leaderboard[1][9][0][1].stringValue, leaderboard[1][9][0][2].stringValue, sumW9])
      } catch (e) {

      }
      try {
        monthTopAmount.push([leaderboard[2][0][0][0].stringValue, leaderboard[2][0][0][1].stringValue, leaderboard[2][0][0][2].stringValue, sumM0])
        monthTopAmount.push([leaderboard[2][1][0][0].stringValue, leaderboard[2][1][0][1].stringValue, leaderboard[2][1][0][2].stringValue, sumM1])
        monthTopAmount.push([leaderboard[2][2][0][0].stringValue, leaderboard[2][2][0][1].stringValue, leaderboard[2][2][0][2].stringValue, sumM2])
        monthTopAmount.push([leaderboard[2][3][0][0].stringValue, leaderboard[2][3][0][1].stringValue, leaderboard[2][3][0][2].stringValue, sumM3])
        monthTopAmount.push([leaderboard[2][4][0][0].stringValue, leaderboard[2][4][0][1].stringValue, leaderboard[2][4][0][2].stringValue, sumM4])
        monthTopAmount.push([leaderboard[2][5][0][0].stringValue, leaderboard[2][5][0][1].stringValue, leaderboard[2][5][0][2].stringValue, sumM5])
        monthTopAmount.push([leaderboard[2][6][0][0].stringValue, leaderboard[2][6][0][1].stringValue, leaderboard[2][6][0][2].stringValue, sumM6])
        monthTopAmount.push([leaderboard[2][7][0][0].stringValue, leaderboard[2][7][0][1].stringValue, leaderboard[2][7][0][2].stringValue, sumM7])
        monthTopAmount.push([leaderboard[2][8][0][0].stringValue, leaderboard[2][8][0][1].stringValue, leaderboard[2][8][0][2].stringValue, sumM8])
        monthTopAmount.push([leaderboard[2][9][0][0].stringValue, leaderboard[2][9][0][1].stringValue, leaderboard[2][9][0][2].stringValue, sumM9])
      } catch (e) {

      }
      try {
        globalTopAmount.push([leaderboard[3][0][0][0].stringValue, leaderboard[3][0][0][1].stringValue, leaderboard[3][0][0][2].stringValue, sumG0])
        globalTopAmount.push([leaderboard[3][1][0][0].stringValue, leaderboard[3][1][0][1].stringValue, leaderboard[3][1][0][2].stringValue, sumG1])
        globalTopAmount.push([leaderboard[3][2][0][0].stringValue, leaderboard[3][2][0][1].stringValue, leaderboard[3][2][0][2].stringValue, sumG2])
        globalTopAmount.push([leaderboard[3][3][0][0].stringValue, leaderboard[3][3][0][1].stringValue, leaderboard[3][3][0][2].stringValue, sumG3])
        globalTopAmount.push([leaderboard[3][4][0][0].stringValue, leaderboard[3][4][0][1].stringValue, leaderboard[3][4][0][2].stringValue, sumG4])
        globalTopAmount.push([leaderboard[3][5][0][0].stringValue, leaderboard[3][5][0][1].stringValue, leaderboard[3][5][0][2].stringValue, sumG5])
        globalTopAmount.push([leaderboard[3][6][0][0].stringValue, leaderboard[3][6][0][1].stringValue, leaderboard[3][6][0][2].stringValue, sumG6])
        globalTopAmount.push([leaderboard[3][7][0][0].stringValue, leaderboard[3][7][0][1].stringValue, leaderboard[3][7][0][2].stringValue, sumG7])
        globalTopAmount.push([leaderboard[3][8][0][0].stringValue, leaderboard[3][8][0][1].stringValue, leaderboard[3][8][0][2].stringValue, sumG8])
        globalTopAmount.push([leaderboard[3][9][0][0].stringValue, leaderboard[3][9][0][1].stringValue, leaderboard[3][9][0][2].stringValue, sumG9])
      } catch (e) {

      }
      topAmount.day = dayTopAmount.sort(((a, b) => b[2] - a[2]));
      topAmount.week = weekTopAmount.sort(((a, b) => b[2] - a[2]));
      topAmount.month = monthTopAmount.sort(((a, b) => b[2] - a[2]));
      topAmount.global = globalTopAmount.sort(((a, b) => b[2] - a[2]));

      let gameTops = {}
      gameTops.game = topGames
      gameTops.amount = topAmount
      setLeaderboard(gameTops)
    }

    readLeaderboard()
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
            {dailyGame && leaderboard.game ?
              < MostPlays
                leaderboard={leaderboard.game.day}
              />
              : ""}
            {weeklyGame ?
              < MostPlays
                leaderboard={leaderboard.game.week}
              />
              : ""}
            {monthlyGame ?
              < MostPlays
                leaderboard={leaderboard.game.month}
              />
              : ""}
            {globalGame ?
              < MostPlays
                leaderboard={leaderboard.game.global}
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
            {dailyAmount && leaderboard.amount?
              < MostAmount
                leaderboard={leaderboard.amount.day}
              />
              : ""}
            {weeklyAmount ?
              < MostAmount
                leaderboard={leaderboard.amount.week}
              />
              : ""}
            {monthlyAmount ?
              < MostAmount
                leaderboard={leaderboard.amount.month}
              />
              : ""}
            {globalAmount ?
              < MostAmount
                leaderboard={leaderboard.amount.global}
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