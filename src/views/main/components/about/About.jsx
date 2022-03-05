import React from 'react'
import FAQ from '../../FAQ';
import Roadmap from '../Roadmap';

import "react-step-progress-bar/styles.css";

export default function About() {

  return (
    <div className='container'>
      <div className='row pt-5'>
        <div className='col-md-8 col-sm-10 col-12 mx-auto my-auto text-center'>
          <h1 className='heading-black text-capitalize'>Club Games</h1>
          <p className='lead py-3'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, ipsa ab. Possimus, voluptates rerum et alias maxime corrupti repudiandae exercitationem distinctio maiores quae est non nam quod iusto, provident ipsam.
          </p>
          <button className='btn btn-warning d-inline-flex flex-row align-items-center'>Get Started Now &nbsp;<i className='fa-solid fa-arrow-right'></i></button>
        </div>
      </div>

      <div className="roadmap">      
        <Roadmap />
      </div>
      
      <FAQ />
    </div>
  );
}