import React from 'react'
import { NavLink } from 'react-router-dom';
import RoadMap from './roadmap/RoadMap';

export default function Nfts() { 

  return (
    <div className='container'>
      <div className='row pt-5 mb-5'>
        <div className='col-md-9 col-sm-10 col-12 mx-auto my-auto text-justify'>
          <h1 className='d-inline heading-black text-capitalize'>NFTs</h1>
          <p className='lead py-3'>
            Rock, Paper, Scissors is a <a className="content-link" href="https://en.wikipedia.org/wiki/Hand_game" target="_blank" rel="noreferrer noopener">traditional game</a> that thanks to the power of Web3 and BlockChain services, we have managed to develop a digitalized version via SmartContracts. <br />
            It is usually played between two opponents; each player simultaneosly selects one of three possible outcomes. These outcomes are "rock" ( a closed fist), "paper" (a flat hand), and "scissors" (a fist with the index and middle finger extended, forming a V).<br />
            Our NFTs represent the three factions, <strong>what side will you choose?</strong>
          </p>
          <h3>Advantages of being an NFT owner</h3>
          <p className='lead pb-3'>
            These NFTs grant you a percentage of all the transactions that take place in our RPS Game, more precisely 2.5% of each transaction. NFT holders will receive their rewards via incentivized staking. You will also have early access to new developments and sneak-peeks through our DAO's resources.
          </p>
          <h3>When will you be able to Mint?</h3>
          <p className='lead pb-3'>
            The final date is yet to be announced. These NFTs will be released in three waves with a very limited supply. They will be released in the following order: <strong>ROCK, PAPER and SCISSOR</strong>.
          </p>
          <div className='d-flex justify-content-center'>
            <NavLink to="/rps" className="btn-hover btn-green">DOUBLE OR NOTHING</NavLink>
          </div>
        </div>
      </div>  
      
      <RoadMap />

    </div>
  );
}