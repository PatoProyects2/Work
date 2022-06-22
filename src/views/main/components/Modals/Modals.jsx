import { NavLink } from "react-router-dom";
import styled from "styled-components";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";

import DiscordLogo from "../../../../assets/imgs/Home Page/discordIcon.png";
import EnergyLogo from "../../../../assets/imgs/Home Page/energyIcon.png";
import TwitterLogo from "../../../../assets/imgs/Home Page/twitterIcon.png";
import AwesomeSliderStyles from "../../../../config/react-awesome-slider/src/styles";

import CoinFlipMobile from "../../../../assets/imgs/Home Page/coin flip banner mobile.png";
import FairPlayMobile from "../../../../assets/imgs/Home Page/fair play banner mobile.png";
import NFTMobile from "../../../../assets/imgs/Home Page/nft banner mobile.png";
import RPSGameMobile from "../../../../assets/imgs/Home Page/RPS_banner_mobile.png";
import ComingSoonMobile from "../../../../assets/imgs/Home Page/wip banner mobile.png";

import CoinflipImg from "../../../../assets/imgs/Home Page/imageCoinflip.png";
import ComingSoonImg from "../../../../assets/imgs/Home Page/imageComingSoon.png";
import FairPlayImg from "../../../../assets/imgs/Home Page/imageFairplay.png";
import NFTImg from "../../../../assets/imgs/Home Page/imageNFT.png";
import RPSGameImg from "../../../../assets/imgs/Home Page/imageRPSgame.png";

import Games from "../../../../components/Games/Games";
import MostAmount from "../LeaderBoards/MostAmount";
import MostPlays from "../LeaderBoards/MostPlays";

export const StyledMain = styled.div`
      .slider-wrapper {
        width: 100%;
        height: 100px;
      }
    
      .ParteImg {
        position: relative;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
      }

      .ParteImg img {
        width: 202%;
        display: flex;
          @media (max-width: 1320px) {
              width: 202%;
          }
      }

      .ParteImgAbajo {
        position: relative;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
      }

      .ParteImgAbajo img {
        width: 100%;
        display: flex;
      }

      .Games {
          font-weight: bold;
          display: flex;
          justify-content: flex-start;
          color: #f1cf61;
          text-shadow:
              1px 4px black;
              0px 2px black,
              2px 3px black, 
              1px 4px black;
          text-shadow: 3px 0 0 black, 
                      2px 4px 0 black, 
                      0 2px 0 black, 
                      0 -2px 0 black, 
                      1px 1px black, 
                      -1px -1px 0 black, 
                      1px -1px 0 black, 
                      -1px 1px 0 black;    
          letter-spacing: -2px;
      }

      .Tabla {
        width: 100%;
        margin-top: 10px;
        gap: 1rem;
        padding-bottom: 40px;
      }

      .table-title {
        height: 50px;
        display: flex;
        align-items: center;
        color: white;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        font-size: 20px;
        justify-content: center;
        background-color: #554c77;
      }

      .table-title p{
        margin-top: 1rem;
      }
 
      .table-section {
        border: 1px solid #554c77;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
      }

      table {
        width: 100%;        
      }

      thead th {
          cursor: pointer;
          color: #60597a;
          top: 0;
          font-weight: 400;
          font-size: 17px;
      }

      thead button{
          cursor: pointer;
          border: none;
          color: #60597a;
          top: 0;
          font-weight: 400;
          font-size: 17px;
          height: 48px;
          background-color: #2c2640;
          width: 100%;
      }

      thead button:active{
          cursor: pointer;
          border: none;
          color: #60597a;
          top: 0;
          font-weight: 400;
          font-size: 17px;
          height: 48px;
          background-color: #eece5d;
      }

      .FlexTh {
        display: flex;
      }

      .FlexTh button{
        border: 1px solid #554c77;
        padding: 10px;
        margin-top: -1px;
        margin-left: -2px;
        margin-right: -2px;
      }
  `;

export const StyledMenu = styled.div`
  display: flex;
  margin-top: 25px;
  justify-content: center;
  margin-bottom: 20px;

  .item2 {
    margin-left: 20px;
    min-width: 200px;
    display: flex;
    align-items: center;
    background-color: #2f4471;
    justify-content: center;
    height: 50px;
    border-radius: 10px;
  }

  .item2 img {
    width: 25px;
    height: 25px;
  }

  .item2 p {
    color: #81d2ff;
    margin-left: 10px;
    margin-top: 1rem;
  }

  .item3 {
    margin-left: 20px;
    min-width: 200px;
    display: flex;
    align-items: center;
    background-color: #373878;
    justify-content: center;
    height: 50px;
    border-radius: 10px;
  }

  .item3 img {
    width: 25px;
    height: 25px;
  }

  .item3 p {
    color: #7d80e7;
    margin-left: 10px;
    margin-top: 1rem;
  }

  .item4 {
    margin-left: 20px;
    min-width: 200px;
    display: flex;
    align-items: center;
    background-color: #374842;
    justify-content: center;
    height: 50px;
    border-radius: 10px;
  }

  .item4 img {
    width: 25px;
    height: 25px;
  }

  .item4 p {
    color: #7ce66a;
    margin-left: 10px;
    margin-top: 1rem;
  }
`;

const AutoplaySlider = withAutoplay(AwesomeSlider);

export const SocialButtons = (props) => {
    return (
        props.isMobileResolution ?
            <AutoplaySlider
                cssModule={AwesomeSliderStyles}
                play={true}
                cancelOnInteraction={false} // should stop playing on user interaction
                interval={3000}
                className="slider-wrapper"
            >
                <div className="item2">
                    <img src={TwitterLogo} alt="" />
                    <p>Join Us on Twitter</p>
                </div>

                <div className="item3">
                    <img src={DiscordLogo} alt="" />
                    <p>Join Us on Discord</p>
                </div>

                <div className="item4">
                    <img src={EnergyLogo} alt="" />
                    <p>Provable Fairness</p>
                </div>
            </AutoplaySlider>
            :
            <>
                <div className="item2">
                    <img src={TwitterLogo} alt="" />
                    <p>Join Us on Twitter</p>
                </div>

                <div className="item3">
                    <img src={DiscordLogo} alt="" />
                    <p>Join Us on Discord</p>
                </div>

                <div className="item4">
                    <img src={EnergyLogo} alt="" />
                    <p>Provable Fairness</p>
                </div>
            </>
    )
}

export const BannerCards = (props) => {
    return (
        <div className="cards-container">
            <h1 className="Games">GAMES</h1>
            <div className="game-card mx-auto">
                <NavLink to="/rps">
                    <div className="ParteImg">
                        <img src={props.isTabletResolution ? RPSGameMobile : RPSGameImg} />
                    </div>
                </NavLink>
            </div>
            <div className="d-flex responsive-card">
                <div className="game-card mx-auto">
                    <NavLink to="/comingsoon">
                        <div className="ParteImgAbajo">
                            <img src={props.isTabletResolution ? ComingSoonMobile : ComingSoonImg} />
                        </div>
                    </NavLink>
                </div>
                <div className="game-card mx-auto">
                    <NavLink to="/nfts">
                        <div className="ParteImgAbajo">
                            <img src={props.isTabletResolution ? NFTMobile : NFTImg} />
                        </div>
                    </NavLink>
                </div>
            </div>
            <div className="d-flex responsive-card">
                <div className="game-card mx-auto">
                    <NavLink to="/coinflip">
                        <div className="ParteImgAbajo">
                            <img src={props.isTabletResolution ? CoinFlipMobile : CoinflipImg} />
                        </div>
                    </NavLink>
                </div>
                <div className="game-card mx-auto">
                    <NavLink to="/fair-play">
                        <div className="ParteImgAbajo">
                            <img src={props.isTabletResolution ? FairPlayMobile : FairPlayImg} />
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export const TableButtons = (props) => {
    return (
        <div className="botones-tabla">
            <div className="botones-tipos">
                <button
                    onClick={props.activeLiveBets}
                    disabled={props.liveBets}
                    className={props.liveBets ? "active btn-rango-left" : "btn-rango-left"}
                >
                    Live Bets
                </button>
                <button
                    onClick={props.activeTopGames}
                    disabled={props.mostPlays}
                    className={props.mostPlays ? "active btn-rango-center" : "btn-rango-center"}
                >
                    Most Plays
                </button>
                <button
                    onClick={props.activeTopAmount}
                    disabled={props.mostAmount}
                    className={props.mostAmount ? "active btn-rango-right" : "btn-rango-right"}
                >
                    Most Amount
                </button>
            </div>

            {!props.liveBets && (
                <div className="botones-times">
                    <button
                        onClick={props.day}
                        disabled={props.daily}
                        className={props.daily ? "active btn-time" : "btn-time"}
                    >
                        Daily
                    </button>
                    <button
                        onClick={props.week}
                        disabled={props.weekly}
                        className={props.weekly ? "active btn-time" : "btn-time"}
                    >
                        Weekly
                    </button>
                    <button
                        onClick={props.month}
                        disabled={props.monthly}
                        className={props.monthly ? "active btn-time" : "btn-time"}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={props.all}
                        disabled={props.global}
                        className={props.global ? "active btn-time" : "btn-time"}
                    >
                        Global
                    </button>
                </div>
            )}
        </div>
    );
};

export const Tables = (props) => {
    return (
        <div className="Tabla">
            <div className="table-title">
                <p>
                    {props.liveBets && 'Live Bets'}
                    {props.mostPlays && 'Most Plays'}
                    {props.mostAmount && 'Most Amount'}
                </p>
            </div>
            <div className="table-section">
                {props.liveBets && <Games isMobileResolution={props.isMobileResolution} />}
                {props.mostPlays && props.topLeaderboards && (
                    <MostPlays
                        leaderboard={
                            (props.daily && props.topLeaderboards.games.day) ||
                            (props.weekly && props.topLeaderboards.games.week) ||
                            (props.monthly && props.topLeaderboards.games.month) ||
                            (props.global && props.topLeaderboards.games.global)
                        }
                        isMobileResolution={props.isMobileResolution}
                    />
                )}
                {props.mostAmount && props.topLeaderboards && (
                    <MostAmount
                        leaderboard={
                            (props.daily && props.topLeaderboards.amount.day) ||
                            (props.weekly && props.topLeaderboards.amount.week) ||
                            (props.monthly && props.topLeaderboards.amount.month) ||
                            (props.global && props.topLeaderboards.amount.global)
                        }
                        isMobileResolution={props.isMobileResolution}
                    />
                )}
            </div>
        </div>
    )
}