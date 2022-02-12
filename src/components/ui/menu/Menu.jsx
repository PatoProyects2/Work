import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FAQ } from '../modals/FAQ';
import { HowToPlay } from '../modals/HowToPlay';

export const Menu = ({theme}) => {

    const [faqModalShow, setFaqModalShow] = useState(false);
    const [htpModalShow, setHtpModalShow] = useState(false);

    return (
        <>
            <nav className='menu'>
                <NavLink className={({ isActive }) => `${ theme === "dark" ? "text-white" : "" } btn btn-transparent ${isActive ? 'active' : ''}`} to="/" >HOME</NavLink>
                <NavLink className={({ isActive }) => `${ theme === "dark" ? "text-white" : "" } btn btn-transparent ${isActive ? 'active' : ''}`} to="/about" >ABOUT</NavLink>
                <button onClick={()=> setHtpModalShow(true) } className={`btn btn-transparent ${ theme === "dark" ? "text-white" : ""}`}>HOW TO PLAY</button>
                <button onClick={()=> setFaqModalShow(true) } className={`btn btn-transparent ${ theme === "dark" ? "text-white" : ""}`}>FAQ</button>
            </nav>

            <FAQ theme={theme} show={faqModalShow} onHide={() => setFaqModalShow(false)} />
            <HowToPlay theme={theme} show={htpModalShow} onHide={() => setHtpModalShow(false)} />
        </>
    );
};