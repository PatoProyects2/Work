import React, { useState, useEffect } from 'react';
import DataChart from './DataChart'
import { useUserGames } from '../../../../hooks/firebase/useUserGames';

const Chart = ({ clubData }) => {
  const userGames = useUserGames(clubData.uid);
  const [data, setData] = useState(false);
  const [data50, setData50] = useState(false);
  const [data100, setData100] = useState(false);
  const [data200, setData200] = useState(false);
  const [data400, setData400] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const toggleMenu = () => {
    setDropdown(!dropdown);
  }

  useEffect(() => {
    if (userGames) {
      let games = userGames.map(user => {
        const created = parseInt(user.createdAt)
        const date = new Date(created * 1000);
        const time = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        const profit = parseFloat(user.profit.toFixed(2))
        const top = {
          profit: profit,
          time: time,
          result: user.result ? 'Win' : 'Lose'
        }
        return top;
      })
      let gameData = games.filter(function (data) {
        return data != undefined
      });
      setData(gameData)
    }
  }, [userGames])


  const last50Games = () => {
    setData100(false)
    setData200(false)
    setData400(false)
    if (data.length > 50) {
      let lastGames = data.slice(data.length - 50)
      setData50(lastGames)
    }
  }

  const last100Games = () => {
    setData50(false)
    setData200(false)
    setData400(false)
    if (data.length > 100) {
      let lastGames = data.slice(data.length - 100)
      setData100(lastGames)
    }
  }

  const last200Games = () => {
    setData50(false)
    setData100(false)
    setData400(false)
    if (data.length > 200) {
      let lastGames = data.slice(data.length - 200)
      setData200(lastGames)
    }
  }

  const last400Games = () => {
    setData50(false)
    setData100(false)
    setData200(false)
    if (data.length > 400) {
      let lastGames = data.slice(data.length - 400)
      setData400(lastGames)
    }
  }

  const allGames = () => {
    setData50(false)
    setData100(false)
    setData200(false)
    setData400(false)
  }

  return (
    clubData && data
    &&
    <>
      {data50 && <DataChart data={data50} />}
      {data100 && <DataChart data={data100} />}
      {data200 && <DataChart data={data200} />}
      {data400 && <DataChart data={data400} />}
      {!data50 && !data100 && !data200 && !data400 && <DataChart data={data} />}
    </>
  )
}

export default Chart;