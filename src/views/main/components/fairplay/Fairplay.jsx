import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from "firebase/firestore";
import { db } from '../../../../firebase/firesbaseConfig'
import FairGame from './FairGame'
export default function Fairplay() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const readFairGames = async () => {
      const clubCollection = collection(db, "allGames")
      const queryGames = query(clubCollection)
      const documentGames = await getDocs(queryGames)
      const games = documentGames._snapshot.docChanges
      let array = games.map(games => games.doc.data.value.mapValue.fields.result.booleanValue)
      const win = array.filter(x => x)
      const lose = array.filter(x => !x)
      let object = [
        {
          type: 'Win Games',
          value: win.length,
        },
        {
          type: 'Lose Games',
          value: lose.length
        },
      ]
      setData(object)
    }
    readFairGames()
    return () => {
      setData([]);
    }
  }, [])
  return (
    <div className='container'>
      <div className='row pt-5'>
        <div className='col-md-8 col-sm-10 col-12 mx-auto my-auto'>
          <h1 className='heading-black text-capitalize'>Fair Play</h1>
          <p className='lead py-3'>
            In our RPS game there are two possible outcomes either you <u>win</u> or you <u>lose</u>. Our main principle is to
            build a fair and transparent system, where every game is completely randomized with <strong>50% 50% odds</strong>.</p>
          <p className='lead py-3'>
            RPS Games Club smart contract communicates with an off-chain service powered by Chainlink which ensures the randomness of the results and prevents the system from being exploited and hacked.The RPS Games Club smart contract will only accept the random number input if it has a valid cryptographic proof, and the cryptographic proof can only be generated if the VRF process is tamper-proof. This provides our users with automated and verifiable assurances directly on-chain that the randomness underlying RPS games is provably fair and was not tampered with by the oracle, outside entities, or the RPS team.
          </p>
          <p className='lead py-3'>
            One of our main premises is to be as transparent as possible, therefore our house wallets will be of public access.
          </p>
        </div>
        {data[0] &&
          <div className='fair-game-stats'>
            <FairGame data={data} />
          </div>
        }
      </div>
    </div>
  );
}