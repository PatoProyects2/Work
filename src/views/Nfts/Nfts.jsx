import React from 'react'
import { NavLink } from 'react-router-dom';
import RoadMap from './components/RoadMap/RoadMap';

const Nfts = () => {

  return (
    <div className='container'>
      <h1 className='text-center heading-black text-capitalize mt-5'>NFTs</h1>
      <RoadMap />

      <div className='d-flex justify-content-center'>
        <NavLink to="/rps" className="btn-hover btn-green">DOUBLE OR NOTHING</NavLink>
      </div>

    </div>
  );
}

export default Nfts;