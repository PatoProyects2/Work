import { NavLink } from "react-router-dom";
import RPSLogo from "../../../assets/imgs/Nav_Bar/logo.png";
import MenuIcon from "../../../assets/imgs/Nav_Bar/menuIcon.png";
import CloseButton from "../../../assets/imgs/Nav_Bar/exitIcon.png";
import DiscordLogo from "../../../assets/imgs/Home_Page/discordIcon.png";
import TwitterLogo from "../../../assets/imgs/Home_Page/twitterIcon.png";
import {
  SVGHome,
  SVGRps,
  SVGNfts,
  SVGFairPlay,
  SVGStats,
  SVGDemo,
  SVGExternal,
} from "./Svgs";
import Profile from "./Profile/Profile";
import Balance from "./Balance/Balance";
import OnlineUsers from "./OnlineUsers/OnlineUsers";
import Settings from "./Settings/Settings";

const NavButton = ({ setShowOffCanvas, redirect, title, children }) => {
  return (
    <NavLink
      onClick={() => setShowOffCanvas(false)}
      className={({ isActive }) =>
        "nav-item nav-link nav-link-primary d-flex align-items-center" +
        (isActive && " active")
      }
      to={redirect}
    >
      {children}
      &nbsp;
      {title}
    </NavLink>
  );
};

const NavButton2 = ({ setShowOffCanvas, redirect, title }) => {
  return (
    <NavLink
      onClick={() => setShowOffCanvas(false)}
      className="nav-link-secondary"
      to={redirect}
    >
      {title}
    </NavLink>
  );
};

const NavA = ({ redirect, title, children }) => {
  return (
    <a
      href={redirect}
      target="_blank"
      className="nav-item nav-link nav-link-primary d-flex align-items-center c-pointer"
      rel="noopener noreferrer"
    >
      {children}
      &nbsp;
      {title}
    </a>
  );
};

export const NavLeft = ({
  showOffcanvas,
  setShowOffCanvas,
  isMobileResolution,
  onlineUsers,
}) => {
  return (
    <div className="Menu d-flex">
      <img
        role="button"
        onClick={() => setShowOffCanvas(!showOffcanvas)}
        className="ms-2 me-3"
        src={showOffcanvas ? CloseButton : MenuIcon}
        alt=""
        width={24}
      />
      <NavLink to="/" className="d-flex align-items-center">
        <img src={RPSLogo} width={isMobileResolution ? 35 : 40} alt="" />
        &nbsp;
        <h1
          className={isMobileResolution ? "fs-6 GamesText" : "fs-5 GamesText"}
        >
          Games Club
        </h1>
      </NavLink>
      {!isMobileResolution && <OnlineUsers onlineUsers={onlineUsers} />}
    </div>
  );
};

export const NavCenter = ({ isMobileResolution }) => {
  return (
    !isMobileResolution && <Balance isMobileResolution={isMobileResolution} />
  );
};

export const NavRight = ({ user, account, readBlockchainData }) => {
  return (
    <div className="d-flex align-items-center gap-2">
      <Settings />
      <Profile
        readBlockchainData={readBlockchainData}
        user={user}
        account={account}
      />
    </div>
  );
};

export const NavMenu = ({ setShowOffCanvas }) => {
  return (
    <>
      <NavButton setShowOffCanvas={setShowOffCanvas} redirect="/" title="Home">
        <SVGHome />
      </NavButton>
      <NavButton
        setShowOffCanvas={setShowOffCanvas}
        redirect="/rps"
        title="RPS Game"
      >
        <SVGRps />
      </NavButton>
      <NavButton
        setShowOffCanvas={setShowOffCanvas}
        redirect="/nfts"
        title="Nfts"
      >
        <SVGNfts />
      </NavButton>
      <NavButton
        setShowOffCanvas={setShowOffCanvas}
        redirect="/fair-play"
        title="Fair Play"
      >
        <SVGFairPlay />
      </NavButton>
      <NavA
        setShowOffCanvas={setShowOffCanvas}
        redirect="https://eu.mixpanel.com/p/KskavmfUxxoTotudH44Xmg"
        title="Stats"
      >
        <SVGStats />
      </NavA>
      <NavButton
        setShowOffCanvas={setShowOffCanvas}
        redirect="/demo"
        title="Demo"
      >
        <SVGDemo />
      </NavButton>
      <NavA
        setShowOffCanvas={setShowOffCanvas}
        redirect="https://rps-game.gitbook.io/rps-games-club/games/rock-paper-scissors-guide"
        title="FAQ"
      >
        <SVGExternal />
      </NavA>
      <NavA
        setShowOffCanvas={setShowOffCanvas}
        redirect="https://rps-game.gitbook.io/rps-games-club/info/disclaimer-and-responsability"
        title="RPS Responsibly"
      >
        <SVGExternal />
      </NavA>
      <NavA
        setShowOffCanvas={setShowOffCanvas}
        redirect="https://rps-game.gitbook.io/rps-games-club/roadmap"
        title="Roadmap"
      >
        <SVGExternal />
      </NavA>
    </>
  );
};

export const NavFooter = ({
  isMobileResolution,
  onlineUsers,
  setShowOffCanvas,
}) => {
  return (
    <>
      {isMobileResolution && (
        <>
          <div className="d-flex justify-content-center mt-3">
            <OnlineUsers onlineUsers={onlineUsers} />
          </div>
          <div className="d-flex justify-content-center mt-3">
            <Balance isMobileResolution={isMobileResolution} />
          </div>
        </>
      )}

      <div className="footer-nav-icons">
        <img src={DiscordLogo} alt="Discord Logo" width={30} height={30} />
        <img src={TwitterLogo} alt="Twitter Logo" width={30} height={30} />
      </div>

      <div className="footer-nav">
        <NavButton2
          redirect="/refund-policy"
          title="Refund Policy"
          setShowOffCanvas={setShowOffCanvas}
        />
        <NavButton2
          redirect="/terms"
          title="Terms & Conditions"
          setShowOffCanvas={setShowOffCanvas}
        />
      </div>
    </>
  );
};
