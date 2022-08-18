import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import CoinFlipMobile from "../../../../assets/imgs/Home_Page/coin flip banner mobile.png";
import FairPlayMobile from "../../../../assets/imgs/Home_Page/fair play banner mobile.png";
import NFTMobile from "../../../../assets/imgs/Home_Page/nft banner mobile.png";
import RPSGameMobile from "../../../../assets/imgs/Home_Page/RPS_banner_mobile.png";
import ComingSoonMobile from "../../../../assets/imgs/Home_Page/wip banner mobile.png";

import CoinflipImg from "../../../../assets/imgs/Home_Page/imageCoinflip.png";
import ComingSoonImg from "../../../../assets/imgs/Home_Page/imageComingSoon.png";
import FairPlayImg from "../../../../assets/imgs/Home_Page/imageFairplay.png";
import NFTImg from "../../../../assets/imgs/Home_Page/imageNFT.png";
import RPSGameImg from "../../../../assets/imgs/Home_Page/imageRPSgame.png";

import Games from "../Games/Games";
import MostAmount from "../LeaderBoards/MostAmount";
import MostPlays from "../LeaderBoards/MostPlays";

import gamesLogo from "../../../../assets/imgs/Home_Page/gamesLogo.png";

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
  .Tabla {
    visibility: hidden;
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
  .table-title p {
    margin-top: 1rem;
  }
  .table-section {
    border: 1px solid #554c77;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: transparent;
  }
  .img-games {
    width: 150px;
    margin-bottom: 10px;
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
  thead button {
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
  thead button:active {
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
  .FlexTh button {
    border: 1px solid #554c77;
    padding: 10px;
    margin-top: -1px;
    margin-left: -2px;
    margin-right: -2px;
  }
`;

export const BannerCards = (props) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [image5, setImage5] = useState(false);

  useEffect(() => {
    if (image1 && image2 && image3 && image4 && image5) {
      const banners = document.querySelector(".cards-container");
      const botonesTabla = document.querySelector(".botones-tabla");
      const tabla = document.querySelector(".Tabla");
      if (banners && botonesTabla && tabla) {
        banners.style.visibility = "visible";
        botonesTabla.style.visibility = "visible";
        tabla.style.visibility = "visible";
      }
    }
  }, [image1, image2, image3, image4, image5]);

  return (
    <div className="cards-container">
      <img className="img-games" src={gamesLogo} alt="gamesLogo" />
      <div className="game-card mx-auto">
        <NavLink to="/rps">
          <div className="ParteImg">
            <img
              src={props.isTabletResolution ? RPSGameMobile : RPSGameImg}
              onLoad={() => setImage1(true)}
            />
          </div>
        </NavLink>
      </div>
      <div className="d-flex responsive-card">
        <div role="button" className="game-card mx-auto">
          <NavLink style={{ pointerEvents: "none" }} to="/comingsoon">
            <div className="ParteImgAbajo">
              <img
                src={
                  props.isTabletResolution ? ComingSoonMobile : ComingSoonImg
                }
                onLoad={() => setImage2(true)}
              />
            </div>
          </NavLink>
        </div>
        <div className="game-card mx-auto">
          <NavLink to="/nfts">
            <div className="ParteImgAbajo">
              <img
                src={props.isTabletResolution ? NFTMobile : NFTImg}
                onLoad={() => setImage3(true)}
              />
            </div>
          </NavLink>
        </div>
      </div>
      <div className="d-flex responsive-card">
        <div role="button" className="game-card mx-auto">
          <NavLink style={{ pointerEvents: "none" }} to="/coinflip">
            <div className="ParteImgAbajo">
              <img
                src={props.isTabletResolution ? CoinFlipMobile : CoinflipImg}
                onLoad={() => setImage4(true)}
              />
            </div>
          </NavLink>
        </div>
        <div className="game-card mx-auto">
          <NavLink to="/fair-play">
            <div className="ParteImgAbajo">
              <img
                src={props.isTabletResolution ? FairPlayMobile : FairPlayImg}
                onLoad={() => setImage5(true)}
              />
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export const TableButtons = (props) => {
  return (
    <div className="botones-tabla">
      <div className="botones-tipos">
        <button
          onClick={props.activeLiveBets}
          disabled={props.liveBets}
          className={
            props.liveBets ? "active btn-rango-left" : "btn-rango-left"
          }
        >
          Live Bets
        </button>
        <button
          onClick={props.activeTopGames}
          disabled={props.mostPlays}
          className={
            props.mostPlays ? "active btn-rango-center" : "btn-rango-center"
          }
        >
          Most Plays
        </button>
        <button
          onClick={props.activeTopAmount}
          disabled={props.mostAmount}
          className={
            props.mostAmount ? "active btn-rango-right" : "btn-rango-right"
          }
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
        {props.liveBets && (
          <div className="DivLiveBets">
            <div className="puntoLiveBets"></div>Live Bets
          </div>
        )}
        {props.mostPlays && "Most Plays"}
        {props.mostAmount && "Most Amount"}
      </div>
      <div className="table-section">
        {props.liveBets && (
          <Games
            isMobileResolution={props.isMobileResolution}
            allGames={props.allGames}
          />
        )}
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
  );
};
