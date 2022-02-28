import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AccountFirebase from '../../layout/Authentication';
import { Navbar, Offcanvas, Nav, NavbarBrand, OffcanvasHeader, OffcanvasBody, Button } from 'reactstrap';
import { ThemeSwitcher } from '../themeSwitcher/ThemeSwitcher';
import { useMatchMedia } from '../../../hooks/useMatchMedia';

export const NavbarDesktop = ({ handleFaqModal, handleHtpModal, navType }) => {

    const [showOffcanvas, setShowOffCanvas] = useState(false);

    const isMobileResolution = useMatchMedia('(max-width:768px)', false);

    return (
        <>
            <Navbar className={`main-navbar ${!isMobileResolution ? 'fixed-top' : ''}`}>
                <div className='d-flex align-items-center'>
                    <NavbarBrand href='/'>
                        CLUB GAMES
                    </NavbarBrand>
                    {!isMobileResolution && <AccountFirebase />}
                </div>

                <div className="d-flex">
                    <ThemeSwitcher />
                    <Button
                        onClick={() => setShowOffCanvas(true)}
                        color='menu-bars'
                        className='mx-2'>
                        <i className="fas fa-bars"></i>
                    </Button>
                </div>

                <Offcanvas
                    direction="end"
                    isOpen={showOffcanvas}
                    className='oc-menu'
                    toggle={() => setShowOffCanvas(false)}>

                    <OffcanvasHeader
                        className='oc-header'
                        toggle={() => setShowOffCanvas(false)}>
                        CLUB GAMES
                    </OffcanvasHeader>

                    <OffcanvasBody className='oc-body'>
                        <Nav className="oc-nav justify-content-center flex-column flex-grow-1 pe-3">
                            <NavLink
                                onClick={() => setShowOffCanvas(false)}
                                style={{ margin: 'auto' }}
                                className={({ isActive }) => "nav-item nav-link nav-link-primary" + (isActive ? ' active' : '')} to="/">
                                Home
                            </NavLink>
                            <NavLink
                                onClick={() => setShowOffCanvas(false)}
                                style={{ margin: 'auto' }}
                                className={({ isActive }) => "nav-item nav-link nav-link-primary" + (isActive ? ' active' : '')} to="/rps">
                                Rps Game
                            </NavLink>
                            <NavLink
                                onClick={() => setShowOffCanvas(false)}
                                style={{ margin: 'auto' }}
                                className={({ isActive }) => "nav-item nav-link nav-link-primary" + (isActive ? ' active' : '')} to="/nfts">
                                NFTs
                            </NavLink>
                            <NavLink
                                onClick={() => setShowOffCanvas(false)}
                                style={{ margin: 'auto' }}
                                className={({ isActive }) => "nav-item nav-link nav-link-primary" + (isActive ? ' active' : '')} to="/fair-play">
                                Fair Play
                            </NavLink>
                            <NavLink
                                onClick={() => setShowOffCanvas(false)}
                                style={{ margin: 'auto' }}
                                className={({ isActive }) => "nav-item nav-link nav-link-primary" + (isActive ? ' active' : '')} to="/about">
                                About
                            </NavLink>
                            <NavLink
                                onClick={() => setShowOffCanvas(false)}
                                style={{ margin: 'auto' }}
                                className={({ isActive }) => "nav-item nav-link nav-link-primary" + (isActive ? ' active' : '')} to="/demo">
                                DEMO
                            </NavLink>
                            {
                                navType === "main" ? (
                                    <NavLink
                                        onClick={() => setShowOffCanvas(false)}
                                        style={{ margin: 'auto' }}
                                        className={({ isActive }) => "nav-item nav-link nav-link-primary" + (isActive ? ' active' : '')} to="/faq">
                                        FAQ
                                    </NavLink>
                                )
                                :
                                (
                                    <button className="btn btn-transparent" onClick={ handleFaqModal }>FAQ</button>
                                )
                            }
                            {
                                navType === "rps" && (
                                    <button className="btn btn-transparent" onClick={ handleHtpModal }>FAQ</button>
                                )
                            }
                            
                            <NavLink
                                onClick={() => setShowOffCanvas(false)}
                                style={{ margin: 'auto' }}
                                className={({ isActive }) => "nav-item nav-link nav-link-secondary" + (isActive ? ' active' : '')} to="/affiliates">
                                Affiliates
                            </NavLink>
                            <NavLink
                                onClick={() => setShowOffCanvas(false)}
                                style={{ margin: 'auto' }}
                                className={({ isActive }) => "nav-item nav-link nav-link-secondary" + (isActive ? ' active' : '')} to="/rewards">
                                Rewards
                            </NavLink>
                        </Nav>
                        <div className="d-flex flex-row gap-2 justify-content-center mt-3">
                            <a href="https://twitter.com/RPSGameClub" className="twitter-icon" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-2x fa-twitter"></i>
                            </a>
                            <a href="https://discord.gg/Ygk58VR4" className="discord-icon" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-2x fa-discord"></i>
                            </a>
                        </div>
                        {isMobileResolution && <div className="d-flex justify-content-center mt-3"><AccountFirebase /></div>}
                    </OffcanvasBody>
                </Offcanvas>
            </Navbar>            
        </>
    );
};
