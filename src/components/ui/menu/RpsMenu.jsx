import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FAQ } from '../modals/FAQ';
import { HowToPlay } from '../modals/HowToPlay';
import { RPSResponsibly } from '../modals/RPSResponsibly';

export const RpsMenu = ({ theme }) => {

    const [faqModalShow, setFaqModalShow] = useState(false);
    const [htpModalShow, setHtpModalShow] = useState(false);
    const [rpsModalShow, setRpsModalShow] = useState(false);

    return (
        <>
            <nav className='menu'>
                <NavLink className={({ isActive }) => `${theme === "dark" ? "text-white" : ""} btn btn-transparent ${isActive ? 'active' : ''}`} to="/rps" >HOME</NavLink>
                <NavLink className={({ isActive }) => `${theme === "dark" ? "text-white" : ""} btn btn-transparent ${isActive ? 'active' : ''}`} to="/rps/about" >ABOUT</NavLink>
                <button onClick={() => setHtpModalShow(true)} className={`btn btn-transparent ${theme === "dark" ? "text-white" : ""}`}>HOW TO PLAY</button>
                <button onClick={() => setFaqModalShow(true)} className={`btn btn-transparent ${theme === "dark" ? "text-white" : ""}`}>FAQ</button>
                <button onClick={() => setRpsModalShow(true)} className={`btn btn-transparent ${theme === "dark" ? "text-white" : ""}`}>RPS RESPONSIBLY</button>
            </nav>

            <FAQ theme={theme} show={faqModalShow} onHide={() => setFaqModalShow(false)} />
            <HowToPlay theme={theme} show={htpModalShow} onHide={() => setHtpModalShow(false)} />
            <RPSResponsibly theme={theme} show={rpsModalShow} onHide={() => setRpsModalShow(false)} />
        </>
    );
};