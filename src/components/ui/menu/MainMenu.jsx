import React from 'react';
import { NavLink } from 'react-router-dom';
export const MainMenu = ({ theme }) => {
    return (
        <>
            <nav className='menu'>
                <NavLink className={({ isActive }) => `${theme === "dark" ? "text-white" : ""} btn btn-transparent ${isActive ? 'active' : ''}`} to="/" >HOME</NavLink>
                <NavLink className={({ isActive }) => `${theme === "dark" ? "text-white" : ""} btn btn-transparent ${isActive ? 'active' : ''}`} to="/profile" >PROFILE</NavLink>
                <NavLink className={({ isActive }) => `${theme === "dark" ? "text-white" : ""} btn btn-transparent ${isActive ? 'active' : ''}`} to="/games" >GAMES</NavLink>
                <NavLink className={({ isActive }) => `${theme === "dark" ? "text-white" : ""} btn btn-transparent ${isActive ? 'active' : ''}`} to="/info" >ABOUT</NavLink>
            </nav>
        </>
    );
};