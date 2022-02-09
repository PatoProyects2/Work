import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Offcanvas, Nav, NavbarBrand, OffcanvasHeader, OffcanvasBody, Button } from 'reactstrap';

export const NavbarMobile = ({ theme, handleThemeChange, handleFaqModal, handleHtpModal }) => {

    const [showOffcanvas, setShowOffCanvas] = useState(false);

    const handleModal = (modal) => {
        setShowOffCanvas(false);
        if (modal === "faq") {
            handleFaqModal(true);
        } else {
            handleHtpModal(true);
        }
    }

    return (

        <Navbar className={theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}>
            <div className="d-flex justify-content-center align-center">
                <button
                    type="button"
                    className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'}`}
                    title={theme === 'light' ? 'Dark Theme' : 'Light Theme'}
                    onClick={handleThemeChange}>
                    {theme === "light" ? "DARK " : "LIGHT "}<i className={`${theme === "light" ? "fa-solid fa-moon" : "fa-solid fa-sun"}`}></i>
                </button>
            </div>
            <NavbarBrand href='/'>
                RPS Game
            </NavbarBrand>

            <Button
                onClick={() => setShowOffCanvas(true)}
                color={theme === "dark" ? "light" : "dark"}
                className='me-2'>
                <i class="fas fa-bars"></i>
            </Button>

            <Offcanvas
                direction="end"
                isOpen={showOffcanvas}
                className={theme}
                toggle={() => setShowOffCanvas(false)}>

                <OffcanvasHeader
                    toggle={() => setShowOffCanvas(false)}>
                    RPS Game
                </OffcanvasHeader>

                <OffcanvasBody className={theme}>
                    <Nav className="justify-content-center flex-column flex-grow-1 pe-3">
                        <NavLink
                            onClick={() => setShowOffCanvas(false)}
                            style={{ margin: 'auto' }}
                            className={({ isActive }) => "nav-item nav-link " + (theme === "dark" ? "text-white" : "text-black") + (isActive ? ' active' : '')} to="/">
                            HOME
                        </NavLink>
                        <NavLink
                            onClick={() => setShowOffCanvas(false)}
                            style={{ margin: 'auto' }}
                            className={({ isActive }) => "nav-item nav-link " + (theme === "dark" ? "text-white" : "text-black") + (isActive ? ' active' : '')} to="/about">
                            ABOUT
                        </NavLink>
                        <NavLink
                            onClick={() => setShowOffCanvas(false)}
                            style={{ margin: 'auto' }}
                            className={({ isActive }) => "nav-item nav-link " + (theme === "dark" ? "text-white" : "text-black") + (isActive ? ' active' : '')} to="/leaderboard">
                            LEADERBOARD
                        </NavLink>
                        <li className="nav-item">
                            <Button
                                color='transparent'
                                className={`w-100 ${theme === "dark" ? "text-white" : ""}`}
                                onClick={() => handleModal('htp')}>
                                HOW TO PLAY
                            </Button>
                        </li>
                        <li className="nav-item">
                            <Button
                                color='transparent'
                                className={`w-100 ${theme === "dark" ? "text-white" : ""}`}
                                onClick={() => handleModal('faq')}>
                                FAQ
                            </Button>
                        </li>
                    </Nav>
                    <div className="d-flex flex-row gap-2 justify-content-center mt-3">                       
                        <a href="https://www.google.com" className="twitter-icon" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-2x fa-twitter"></i>
                        </a>
                        <a href="https://www.google.com" className="discord-icon" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-2x fa-discord"></i>
                        </a>
                    </div>
                </OffcanvasBody>
            </Offcanvas>
        </Navbar>
    );
}