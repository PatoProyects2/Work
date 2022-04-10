import React, { useState, useEffect } from 'react';
import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from '../../../../firebase/firesbaseConfig'
import DataChart from './DataChart'
export default function Chart({ userData }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    Number.prototype.toFixedNumber = function (digits, base) {
      var pow = Math.pow(base || 10, digits);
      return Math.round(this * pow) / pow;
    }
    if (userData) {
      const q = query(collection(db, "allGames"), where("createdAt", ">", 0), where("account", "==", userData.account))
      getDocs(q)
        .then(document => {
          const documents = document._snapshot.docChanges
          let array = documents.map(document => {
            const data = document.doc.data.value.mapValue.fields
            const created = parseInt(data.createdAt.integerValue)
            var date = new Date(created * 1000);
            let top = undefined
            if (data.uid.stringValue !== 'anonymous') {
              const profit = data.profit.doubleValue.toFixedNumber(2)
              var createdTime = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
              top = {
                profit: profit,
                time: createdTime
              }
            }
            return top
          })
          let newArray = array.filter(function (dato) {
            return dato != undefined
          });
          setData(newArray)
        })
    }
    return () => {
      setData([])
    }
  }, [userData])

  return (
    <>
      {userData &&
        <>
          {userData.rps.totalGames > 0 ?
            <DataChart data={data} />
            :
            <span>No games found</span>
          }
        </>
      }
    </>
  )
}