import React from 'react'

export default function Fairplay() {

  return (
    <div className='container'>
      <div className='row pt-5'>
        <div className='col-md-8 col-sm-10 col-12 mx-auto my-auto'>
          <h1 className='heading-black text-capitalize'>Fair Play</h1>
          <p className='lead py-3'>
            In our RPS game there are two possible outcomes either you <u>win</u> or you <u>lose</u>. Our main principle is to 
            build a fair and transparent system, where every game is completely randomized with <strong>50% 50% odds</strong>. <br/>
            We are implementing ChainLink's oracle, this helps us to improve our security and has an audited randomness. <br/>
            One of our main premises is to be as transparent as possible, therefore our house wallets will be of public access. 
          </p>
        </div>
      </div>
    </div>
  );
}