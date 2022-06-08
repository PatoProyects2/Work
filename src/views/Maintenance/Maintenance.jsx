import React from 'react'
import RPSAnimation from '../../assets/imgs/animation.gif'
export default function Mintenance() {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
      <img src={RPSAnimation} width="240" height="240" alt="Rock-Paper-Scissors" />
      <p className='text-center text-white h3'>Sorry, we're down for</p>
      <p className='text-center text-white h3'>scheduled maintenance right now</p>
    </div>
  );
}
