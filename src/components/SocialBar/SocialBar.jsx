import { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import DiscordLogo from "../../assets/imgs/Home_Page/discordIcon.png";
import EnergyLogo from "../../assets/imgs/Home_Page/energyIcon.png";
import TwitterLogo from "../../assets/imgs/Home_Page/twitterIcon.png";

const StyledMenu = styled.div`
  display: flex;
  margin-top: 70px;
  justify-content: center;

  .image-logo {
    width: 25px;
    height: 25px;
  }

  .item1 {
    min-width: 230px;
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
    margin-left: 15px;
    margin-top: 1rem;
  }

  .item2 {
    min-width: 230px;
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
    margin-left: 15px;
    margin-top: 1rem;
  }

  .item3 {
    min-width: 230px;
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
    margin-left: 15px;
    margin-top: 1rem;
  }
`;

const SocialButton = ({ label, redirect, item, image }) => {
  return (
    <li>
      <button className={item} onClick={() => window.open(redirect, "_blank")}>
        <img className="image-logo" src={image} alt="" />
        <p>{label}</p>
      </button>
    </li>
  );
};

const SocialNav = ({ label, redirect, item, image }) => {
  let navigate = useNavigate();
  return (
    <li>
      <button className={item} onClick={() => navigate(redirect)}>
        <img className="image-logo" src={image} alt="" />
        <p>{label}</p>
      </button>
    </li>
  );
};

const SocialGroup = () => {
  return (
    <>
      <SocialButton
        item="item1"
        image={TwitterLogo}
        label="Join Us on Twitter"
        redirect="https://twitter.com/RPSGamesClub"
      />
      <SocialButton
        item="item2"
        image={DiscordLogo}
        label="Join Us on Discord"
        redirect="https://discord.gg/XBHfrwfcrq"
      />
      <SocialNav
        item="item3"
        label="Provable Fairness"
        redirect="/fair-play"
        image={EnergyLogo}
      />
    </>
  );
};

const SocialBar = () => {
  useEffect(() => {
    const root = document.documentElement;
    const marqueeContent = document.querySelector("ul.marquee-content");
    root.style.setProperty(
      "--marquee-elements",
      marqueeContent.children.length - 6
    );
  }, []);

  return (
    <StyledMenu>
      <div className="marquee">
        <ul className="marquee-content">
          <SocialGroup />
          <SocialGroup />
          <SocialGroup />
          <SocialGroup />
        </ul>
      </div>
    </StyledMenu>
  );
};

export default SocialBar;
