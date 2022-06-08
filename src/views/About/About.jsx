import React from 'react'
import "react-step-progress-bar/styles.css";
import RoadMap from './components/RoadMap/RoadMap';
// import FAQ from './components/FAQ/FAQ';

const About = () => {

  return (
    <div className='container'>
      <div className='row pt-5'>
        <div className='col-md-8 col-sm-10 col-12 mx-auto my-auto'>
          <h1 className='heading-black text-capitalize'>Games Club</h1>
          <p className='lead py-3'>
            Our vision is to create a platform where all the games are random and fair, we don't want to became a casino. <br />
            Via the implementation of Smart Contracts and Oracles we can develop completely randomized games with 50% 50% chances
            that allow gamers to have a real shot when playing.
            Games Club's wallet receives <strong>3.5%</strong> of each transaction made in our platform, these funds will be used
            to reward our NFT's holders (2.5%) and to develop/upgrade new services in our platform (1%). <br />
            We are already working on new games for the future that are equally transparent and fair for all of our users.
          </p>

          <h2>MultiChain Development</h2>
          <p className='lead'>
            Our main goal is to expand ourselves into many different BlockChains, this is a differentiating factor and creates an
            unprecedented bridge between the main NFT communities.<br />
            We will start our growth in the uprising Polygon Chain followed by the consolidated Solana Ecosystem.
          </p>
        </div>
      </div>

      <RoadMap />

      {/* <FAQ /> */}
    </div>
  );
}

export default About;