import { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import DiscordLogo from "../../assets/imgs/Home_Page/discordIcon.png";
import EnergyLogo from "../../assets/imgs/Home_Page/energyIcon.png";
import TwitterLogo from "../../assets/imgs/Home_Page/twitterIcon.png";

const StyledMenu = styled.div`
  display: flex;
  margin-top: 80px;
  justify-content: center;

  .image-logo {
    width: 25px;
    height: 25px;
  }

  .item1 {
    margin-left: 20px;
    min-width: 210px;
    display: flex;
    align-items: center;
    background-color: #2f4471be;
    justify-content: center;
    height: 45px;
    border-radius: 10px;
    border: none;
  }

  .item1 p {
    color: #81d2ff;
    margin-left: 10px;
    margin-top: 1rem;
  }

  .item2 {
    margin-left: 20px;
    min-width: 210px;
    display: flex;
    align-items: center;
    background-color: #373878be;
    justify-content: center;
    height: 45px;
    border: none;
    border-radius: 10px;
  }

  .item2 p {
    color: #7d80e7;
    margin-left: 10px;
    margin-top: 1rem;
  }

  .item3 {
    margin-left: 20px;
    min-width: 210px;
    display: flex;
    align-items: center;
    background-color: #374842be;
    justify-content: center;
    height: 45px;
    border-radius: 10px;
    border: none;
  }

  .item3 p {
    color: #7ce66a;
    margin-left: 10px;
    margin-top: 1rem;
  }
`;

const SocialButtons = () => {
  let navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue(
      "--marquee-elements-displayed"
    );
    const marqueeContent = document.querySelector("ul.marquee-content");

    root.style.setProperty(
      "--marquee-elements",
      marqueeContent.children.length
    );

    for (let i = 0; i < marqueeElementsDisplayed; i++) {
      marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
    }
  }, []);

  return (
    <StyledMenu>
      <div className="marquee">
        <ul className="marquee-content">
          <li>
            <button
              className="item1"
              onClick={() =>
                window.open("https://twitter.com/RPSGamesClub", "_blank")
              }
            >
              <img className="image-logo" src={TwitterLogo} alt="" />
              <p>Join Us on Twitter</p>
            </button>
          </li>
          <li>
            <button
              className="item2"
              onClick={() =>
                window.open("https://discord.gg/XBHfrwfcrq", "_blank")
              }
            >
              <img className="image-logo" src={DiscordLogo} alt="" />
              <p>Join Us on Discord</p>
            </button>
          </li>
          <li>
            <button className="item3" onClick={() => navigate("/fair-play")}>
              <img className="image-logo" src={EnergyLogo} alt="" />
              <p>Provable Fairness</p>
            </button>
          </li>

          <li>
            <button
              className="item1"
              onClick={() =>
                window.open("https://twitter.com/RPSGamesClub", "_blank")
              }
            >
              <img className="image-logo" src={TwitterLogo} alt="" />
              <p>Join Us on Twitter</p>
            </button>
          </li>
          <li>
            <button
              className="item2"
              onClick={() =>
                window.open("https://discord.gg/XBHfrwfcrq", "_blank")
              }
            >
              <img className="image-logo" src={DiscordLogo} alt="" />
              <p>Join Us on Discord</p>
            </button>
          </li>
          <li>
            <button className="item3" onClick={() => navigate("/fair-play")}>
              <img className="image-logo" src={EnergyLogo} alt="" />
              <p>Provable Fairness</p>
            </button>
          </li>

          <li>
            <button
              className="item1"
              onClick={() =>
                window.open("https://twitter.com/RPSGamesClub", "_blank")
              }
            >
              <img className="image-logo" src={TwitterLogo} alt="" />
              <p>Join Us on Twitter</p>
            </button>
          </li>
          <li>
            <button
              className="item2"
              onClick={() =>
                window.open("https://discord.gg/XBHfrwfcrq", "_blank")
              }
            >
              <img className="image-logo" src={DiscordLogo} alt="" />
              <p>Join Us on Discord</p>
            </button>
          </li>
          <li>
            <button className="item3" onClick={() => navigate("/fair-play")}>
              <img className="image-logo" src={EnergyLogo} alt="" />
              <p>Provable Fairness</p>
            </button>
          </li>

          <li>
            <button
              className="item1"
              onClick={() =>
                window.open("https://twitter.com/RPSGamesClub", "_blank")
              }
            >
              <img className="image-logo" src={TwitterLogo} alt="" />
              <p>Join Us on Twitter</p>
            </button>
          </li>
          <li>
            <button
              className="item2"
              onClick={() =>
                window.open("https://discord.gg/XBHfrwfcrq", "_blank")
              }
            >
              <img className="image-logo" src={DiscordLogo} alt="" />
              <p>Join Us on Discord</p>
            </button>
          </li>
          <li>
            <button className="item3" onClick={() => navigate("/fair-play")}>
              <img className="image-logo" src={EnergyLogo} alt="" />
              <p>Provable Fairness</p>
            </button>
          </li>
        </ul>
      </div>
    </StyledMenu>
  );
};

export default SocialButtons;
