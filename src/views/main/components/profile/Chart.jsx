import React, { useState, useEffect } from 'react';
import { query, where, collection, getDocs } from "firebase/firestore";
import { Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap'
import { db } from '../../../../firebase/firesbaseConfig'
import DataChart from './DataChart'
export default function Chart({ userData }) {
  const [data, setData] = useState([]);
  const [data50, setData50] = useState(false);
  const [data100, setData100] = useState(false);
  const [data200, setData200] = useState(false);
  const [data400, setData400] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const toggleMenu = () => {
    setDropdown(!dropdown);
  }

  useEffect(() => {
    Number.prototype.toFixedNumber = function (digits, base) {
      var pow = Math.pow(base || 10, digits);
      return Math.round(this * pow) / pow;
    }
    if (userData) {
      const q = query(collection(db, "allGames"), where("createdAt", ">", 0), where("uid", "==", userData.uid))
      getDocs(q)
        .then(document => {
          const documents = document._snapshot.docChanges
          let array = documents.map(document => {
            const data = document.doc.data.value.mapValue.fields
            const created = parseInt(data.createdAt.integerValue)
            var date = new Date(created * 1000);
            let top = undefined
            if (data.uid.stringValue !== 'anonymous') {
              let profit = 0
              if (data.profit.doubleValue) {
                profit = data.profit.doubleValue.toFixedNumber(2)
              }
              var createdTime = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
              top = {
                profit: profit,
                time: createdTime,
                result: data.result.booleanValue ? 'Win' : 'Lose'
              }
            }
            return top
          })
          let newArray = array.filter(function (data) {
            return data != undefined
          });
          setData(newArray)
        })
    }
    return () => {
      setData([])
    }
  }, [userData])


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
    <>
      <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="md">
        {
          <DropdownToggle caret color='warning'>
            History Games
          </DropdownToggle>
        }
        <DropdownMenu>
          <DropdownItem onClick={last50Games}>Last 50 games</DropdownItem>
          <DropdownItem onClick={last100Games}>Last 100 games</DropdownItem>
          <DropdownItem onClick={last200Games}>Last 200 games</DropdownItem>
          <DropdownItem onClick={last400Games}>Last 400 games</DropdownItem>
          <DropdownItem onClick={allGames}>All games</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {userData &&
        <>
          {userData.rps.totalGames > 0 ?
            <>
              {data50 && <DataChart data={data50} />}
              {data100 && <DataChart data={data100} />}
              {data200 && <DataChart data={data200} />}
              {data400 && <DataChart data={data400} />}
              {!data50 && !data100 && !data200 && !data400 && <DataChart data={data} />}
            </>
            :
            <span>No games found</span>}
        </>
      }
    </>
  )
}