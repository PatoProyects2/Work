import React from 'react'
import FAQ from '../FAQ';
import Roadmap from '../Roadmap';

import "react-step-progress-bar/styles.css";

export default function About() {

  return (
    <div className='container'>
      <div className='row pt-5'>
        <div className='col-md-8 col-sm-10 col-12 mx-auto my-auto'>
          <h1 className='heading-black text-capitalize'>Club Games</h1>
          <p className='lead py-3'>
            Our vision is to create a platform where all the games are random and fair, we don't want to became a casino. <br />
            Via the implementation of Smart Contracts and Oracles we can develop completely randomized games with 50% 50% chances 
            that allow gamers to have a real shot when playing. 
            Games Club's wallet receives <strong>3.5%</strong> of each transaction made in our platform, these funds will be used 
            to reward our NFT's holders (1.75%) and to develop/upgrade new services in our platform (1.75%). <br/>
            We are already working on new games for the future that are equally transparent and fair for all of our users.
          </p>

          <h3>MultiChain Development</h3>
          <p>
            Our main goal is to expand ourselves into many different BlockChains, this is a differentiating factor and creates an 
            unprecedented bridge between the main NFT communities.<br/>
            We will start our growth in the uprising Polygon Chain followed by the consolidated Solana Ecosystem.
          </p>
          <button className='btn btn-warning d-inline-flex flex-row align-items-center'>Get Started Now &nbsp;<i className='fa-solid fa-arrow-right'></i></button>
        </div>
      </div>

      <Roadmap />

      <FAQ />
    </div>
  );
}