import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from "firebase/firestore";
import { db } from '../../../../firebase/firesbaseConfig'
export default function Fairplay() {
  const [winGames, setWinGames] = useState(0);
  const [loseGames, setLoseGames] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  useEffect(() => {
    const readFairGames = async () => {
      const clubCollection = collection(db, "allGames")
      const queryGames = query(clubCollection)
      const documentGames = await getDocs(queryGames)
      const games = documentGames._snapshot.docChanges
      let array = games.map(games => games.doc.data.value.mapValue.fields.result.booleanValue)
      const win = array.filter(x => x)
      const lose = array.filter(x => !x)
      setWinGames(win.length)
      setLoseGames(lose.length)
      setTotalGames(win.length + lose.length)
    }
    readFairGames()
  }, [])
  return (
    <div className='container'>
      <div className='row pt-5'>
        <div className='col-md-8 col-sm-10 col-12 mx-auto my-auto'>
          <h1 className='heading-black text-capitalize'>Fair Play</h1>
          <p className='lead py-3'>
            In our RPS game there are two possible outcomes either you <u>win</u> or you <u>lose</u>. Our main principle is to
            build a fair and transparent system, where every game is completely randomized with <strong>50% 50% odds</strong>. <br />
            We are implementing ChainLink's oracle, this helps us to improve our security and has an audited randomness. <br />
            One of our main premises is to be as transparent as possible, therefore our house wallets will be of public access.
          </p>
        </div>
        {totalGames > 0 &&
          <>
            <span>{"TOTAL GAMES " + totalGames + " 100%"}</span>
            <span>{"WIN " + winGames + " " + ((winGames / totalGames) * 100).toFixed(2) + " %"}</span>
            <span>{"LOSE " + loseGames + " " + ((loseGames / totalGames) * 100).toFixed(2) + " %"}</span>
          </>
        }
      </div>
    </div>
  );
}