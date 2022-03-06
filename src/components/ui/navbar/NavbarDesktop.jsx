import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Offcanvas, Nav, OffcanvasHeader, OffcanvasBody, Button } from 'reactstrap';
import Presence from '../../../firebase/ActiveUsers'
import AccountFirebase from '../../layout/Authentication';
import { ThemeSwitcher } from '../themeSwitcher/ThemeSwitcher';
import { useMatchMedia } from '../../../hooks/useMatchMedia';
import HomeIcon from '../../../assets/imgs/ic-home.png';
import RPSGameIcon from '../../../assets/imgs/ic-rps-game.png';
import NFTIcon from '../../../assets/imgs/ic-nfts.png';
import FairPlayIcon from '../../../assets/imgs/ic-fair-play.png';
import DemoIcon from '../../../assets/imgs/ic-demo.png';
import FAQIcon from '../../../assets/imgs/ic-faq.png';
import RewardsIcon from '../../../assets/imgs/ic-rewards.png';
import TwitterIcon from '../../../assets/imgs/ic-twitter.png';
import DiscordIcon from '../../../assets/imgs/ic-discord.png';

export const NavbarDesktop = ({ handleFaqModal, handleHtpModal, handleRpsModal, navType }) => {
    const [showOffcanvas, setShowOffCanvas] = useState(false);
    const isMobileResolution = useMatchMedia('(max-width:768px)', false);
    return (
        <>
            <Navbar className={`main-navbar ${!isMobileResolution ? 'fixed-top' : ''}`}>
                <div className="d-flex">
                    <Button
                        onClick={() => setShowOffCanvas(true)}
                        color='menu-bars'
                        className='mx-2'>
                        <i className="fas fa-bars"></i>
                    </Button>
                    <NavLink className='d-flex align-items-center' to='/'>CLUB GAMES</NavLink>
                </div>
                <Presence />
                <div className='d-flex align-items-center gap-2'>
                    <ThemeSwitcher />
                    {!isMobileResolution && <AccountFirebase />}
                </div>

                <Offcanvas
                    direction="start"
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
                                <img src={HomeIcon} width='24' height='24' className='ic-color me-2' alt="Home" /> Home
                            </NavLink>
                            <NavLink
                                onClick={() => setShowOffCanvas(false)}
                                style={{ margin: 'auto' }}
                                className={({ isActive }) => "nav-item nav-link nav-link-primary" + (isActive ? ' active' : '')} to="/rps">
                                <img src={RPSGameIcon} width='24' height='24' className='ic-color me-2' alt="RPS Game" /> RPS Game
                            </NavLink>
                            <NavLink
                                onClick={() => setShowOffCanvas(false)}
                                style={{ margin: 'auto' }}
                                className={({ isActive }) => "nav-item nav-link nav-link-primary" + (isActive ? ' active' : '')} to="/nfts">
                                <img src={NFTIcon} width='24' height='24' className='ic-color me-2' alt="NFTs" /> NFTs
                            </NavLink>
                            <NavLink
                                onClick={() => setShowOffCanvas(false)}
                                style={{ margin: 'auto' }}
                                className={({ isActive }) => "nav-item nav-link nav-link-primary" + (isActive ? ' active' : '')} to="/fair-play">
                                <img src={FairPlayIcon} width='24' height='24' className='ic-color me-2' alt="Fair Play" /> Fair Play
                            </NavLink>
                            {
                                navType === "main" && (
                                    <NavLink
                                        onClick={() => setShowOffCanvas(false)}
                                        style={{ margin: 'auto' }}
                                        className={({ isActive }) => "nav-item nav-link nav-link-primary" + (isActive ? ' active' : '')} to="/faq">
                                        <img src={FAQIcon} width='24' height='24' className='ic-color me-1' alt="FAQ" /> FAQ
                                    </NavLink>
                                )
                            }
                            {
                                navType === "rps" && (
                                    <>
                                        <NavLink
                                            onClick={() => setShowOffCanvas(false)}
                                            style={{ margin: 'auto' }}
                                            className={({ isActive }) => "nav-item nav-link nav-link-primary d-flex align-items-center" + (isActive ? ' active' : '')} to="/demo">
                                            <img src={DemoIcon} width='24' height='24' className='ic-color me-2' alt="RPS Demo" /> DEMO
                                        </NavLink>
                                        <button className="btn btn-transparent nav-item nav-link nav-link-primary mx-auto" style={{ width: "100px" }} onClick={handleFaqModal}><img src={FAQIcon} width='24' height='24' className='ic-color me-1' alt="FAQ" /> FAQ</button>
                                        <button className="btn btn-transparent nav-item nav-link nav-link-primary mx-auto" style={{ width: "150px" }} onClick={handleHtpModal}>How To Play</button>
                                        <button className="btn btn-transparent nav-item nav-link nav-link-primary mx-auto" style={{ width: "200px" }} onClick={handleRpsModal}>RPS Responsibly</button>
                                    </>
                                )
                            }
                            <NavLink
                                onClick={() => setShowOffCanvas(false)}
                                style={{ margin: 'auto' }}
                                className={({ isActive }) => "nav-item nav-link nav-link-primary" + (isActive ? ' active' : '')} to="/about">
                                About
                            </NavLink>
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
                                <img src={RewardsIcon} width='20' height='20' className='ic-color me-2' alt="Rewards" />Rewards
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
