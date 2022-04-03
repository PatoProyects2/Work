import React, { useState, useEffect } from 'react';
import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from '../../../../firebase/firesbaseConfig'
import DataChart from './DataChart'
export default function Chart({ userData }) {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    var unixTimeStamp = Math.round((new Date()).getTime() / 1000);
    var lastDay = unixTimeStamp - 86400
    if (userData.account) {
      const q = query(collection(db, "allGames"), where("createdAt", ">", lastDay), where("account", "==", userData.account))
      getDocs(q)
        .then(document => {
          const documents = document._snapshot.docChanges
          let array = documents.map(document => {
            const data = document.doc.data.value.mapValue.fields
            const created = parseInt(data.createdAt.integerValue)
            const profit = parseInt(data.profit.stringValue)
            let top = {
              profit: profit,
              time: created
            }
            return top
          })
          setData(array)
        })
    }
  }, [])

  return (
    <>
      {userData.rps.totalGames > 0 && <DataChart data={data} />}
    </>
  )
}