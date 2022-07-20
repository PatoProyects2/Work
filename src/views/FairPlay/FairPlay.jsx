import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import RpsGamePolygon from '../../abis/GamesClubPolygon/Santaflip.json'
import { pRpsGameAddress } from '../../utils/Address'
import FairGame from './FairGame'

const FairPlay = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const readFairGames = async () => {
      const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_POLYGON))
      const rpsgame = new web3.eth.Contract(RpsGamePolygon.abi, pRpsGameAddress)
      const winGames = await rpsgame.methods.totalWins().call()
      const loseGames = await rpsgame.methods.totalLosses().call()
      const games = [
        {
          type: 'Win Games',
          value: parseInt(winGames),
        },
        {
          type: 'Lose Games',
          value: parseInt(loseGames)
        },
      ]
      setData(games)
    }
    readFairGames()
    return () => {
      setData([]);
    }
  }, [])

  return (
    <div className='fairplay-container'>
      <div className='text-justify fairplay-content'>
        <h1 className='heading-black text-capitalize'>Fair Play</h1>
        <p className='lead py-3'>
          RPS Games Club smart contract communicates with an off-chain service powered by ChainLink which ensures the randomness of the results and prevents the system from being exploited and hacked.The RPS Games Club smart contract will only accept the random number input if it has a valid cryptographic proof, and the cryptographic proof can only be generated if the VRF process is tamper-proof. This provides our users with automated and verifiable assurances directly on-chain that the randomness underlying RPS games is provably fair and was not tampered with by the oracle, outside entities, or the RPS team.
        </p>
        <p className='lead py-3'>
          After reviewing various solutions, we selected Chainlink VRF because it’s based on cutting-edge academic research, supported by a time-tested oracle network, and secured through the generation and on-chain verification of cryptographic proofs that prove the integrity of each random number supplied to smart contracts.
        </p>
        <p className='lead py-3'>
          In our RPS game there are two possible outcomes: either you win or you lose. Our main principle is to build a fair and transparent system, where every game is completely randomized with 50% 50% odds. In order to fulfill one of our main premises (to be as transparent as possible), our house wallets will be of public access.
        </p>
      </div>
      {data &&
        <div className='fairplay-stats'>
          <FairGame data={data} />
        </div>
      }
    </div>
  );
}

export default FairPlay;