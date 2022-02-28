import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FAQ } from '../modals/FAQ';
import { HowToPlay } from '../modals/HowToPlay';
import { RPSResponsibly } from '../modals/RPSResponsibly';

export const RpsMenu = () => {

    const [faqModalShow, setFaqModalShow] = useState(false);
    const [htpModalShow, setHtpModalShow] = useState(false);
    const [rpsModalShow, setRpsModalShow] = useState(false);

    return (
        <>
            <nav className='menu'>
                <NavLink className={({ isActive }) => `btn btn-transparent ${isActive ? 'active' : ''}`} to="/rps" >RPS GAME</NavLink>
                <NavLink className={({ isActive }) => `btn btn-transparent ${isActive ? 'active' : ''}`} to="/rps/about" >ABOUT</NavLink>
                <button onClick={() => setHtpModalShow(true)} className="btn btn-transparent">HOW TO PLAY</button>
                <button onClick={() => setFaqModalShow(true)} className="btn btn-transparent">FAQ</button>
                <button onClick={() => setRpsModalShow(true)} className="btn btn-transparent">RPS RESPONSIBLY</button>
            </nav>

            <FAQ show={faqModalShow} onHide={() => setFaqModalShow(false)} />
            <HowToPlay show={htpModalShow} onHide={() => setHtpModalShow(false)} />
            <RPSResponsibly show={rpsModalShow} onHide={() => setRpsModalShow(false)} />
        </>
    );
};