import React from 'react'
import FAQ from '../FAQ';
import Roadmap from '../Roadmap';

import "react-step-progress-bar/styles.css";

export default function About() {

  return (
    <div className='container'>
      <div className='row pt-5'>
        <div className='col-md-8 col-sm-10 col-12 mx-auto my-auto text-center'>
          <h1 className='heading-black text-capitalize'>Club Games</h1>
          <p className='lead py-3'>
            Our goal is to create a platform where all the games are random and fair, we don't want to became a casino.
          </p>
          <p className='lead'>
            Via the implementation of Smart Contracts and Oracles we can develop completely randomized games with 50% 50% chances that allow gamers to have a 
            real shot when playing. We are already working on new games for the future that are equally transparent and fair for all the players.
          </p>
          <button className='btn btn-warning d-inline-flex flex-row align-items-center'>Get Started Now &nbsp;<i className='fa-solid fa-arrow-right'></i></button>
        </div>
      </div>
            
      <Roadmap />
      
      <FAQ />
    </div>
  );
}