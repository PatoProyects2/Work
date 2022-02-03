import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavbarDesktop = ({ theme, handleThemeChange, handleFaqModal, handleHtpModal }) => {
    
    return (
        <nav className={`navbar fixed-top navbar-expand-lg ${ theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light' }`}>
            <div className="container-fluid">
                <div className="d-flex justify-content-center align-center">
                    <button 
                        type="button" 
                        className={`btn ${ theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'}`}
                        title={ theme === 'light' ? 'Dark Theme' : 'Light Theme'} 
                        onClick={ handleThemeChange }>
                            { theme === "light" ? "DARK " : "LIGHT "}<i className={`${ theme === "light" ? "fa-solid fa-moon" : "fa-solid fa-sun" }` }></i>
                    </button>                    
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                        <NavLink className={ ({ isActive }) => "nav-item nav-link " + (isActive ? 'active' : '')} to="/" >HOME</NavLink>
                        <NavLink className={ ({ isActive }) => "nav-item nav-link " + (isActive ? 'active' : '')} to="/about" >ABOUT</NavLink>
                        <li className="nav-item">
                            <button onClick={()=> handleHtpModal(true) } className="nav-link btn btn-transparent">HOW TO PLAY</button>
                        </li>
                        <li className="nav-item">
                            <button onClick={()=> handleFaqModal(true) } className="nav-link btn btn-transparent">FAQ</button>
                        </li>    
                    </ul>                    
                </div>
                <NavLink className="btn btn-outline-info" to="/leaderboard" >LEADERBOARD</NavLink>
            </div>
        </nav>
    );
};
