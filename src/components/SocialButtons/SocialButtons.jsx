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
    height: 40px;
    border: none;
    border-radius: 10px;
  }

  .item2 {
    margin-left: 20px;
    min-width: 200px;
    display: flex;
    align-items: center;
    background-color: #2f4471;
    justify-content: center;
    height: 40px;
    border-radius: 10px;
    border: none;
  }

  .item4 {
    margin-left: 20px;
    min-width: 200px;
    display: flex;
    align-items: center;
    background-color: #374842;
    justify-content: center;
    height: 40px;
    border-radius: 10px;
    border: none;
  }

  .item3 p {
    color: #7d80e7;
    margin-left: 10px;
    margin-top: 1rem;
  }

  .item4 p {
    color: #7ce66a;
    margin-left: 10px;
    margin-top: 1rem;
  }
`;

const SocialButtons = () => {
  let navigate = useNavigate();

  useEffect(() => {
    const marqueeArr = document.querySelectorAll(".marquee");
    marqueeArr.forEach((marquee) => {
      const marqueeRow = marquee.querySelector(".marquee__row");
      const marqueeItem = marqueeRow.querySelector(".marquee__item");

      const cloneNum = Number(marqueeItem.getAttributeNode("data-clone").value);
      for (let i = 1; i < cloneNum; i++) {
        const clone = marqueeItem.cloneNode(true);
        marqueeRow.appendChild(clone);
      }
      for (let i = 0; i < 2; i++) {
        const clone = marqueeRow.cloneNode(true);
        marquee.appendChild(clone);
      }

      const marqueeMove = (dir) => {
        const rows = marquee.querySelectorAll(".marquee__row");
        rows.forEach((row) => {
          let rowWidth = row.getBoundingClientRect().width;
          let currentX = Number(
            getComputedStyle(row).getPropertyValue("--pos-x")
          );
          let newX = 0;
          switch (dir) {
            case "left":
              newX = currentX ? currentX - 1 : -rowWidth;
              newX < -2 * rowWidth && (newX = -rowWidth);
              break;
            default:
              newX = currentX ? currentX + 1 : -rowWidth;
              newX > 0 && (newX = -rowWidth);
          }
          row.style.setProperty("--pos-x", newX);
        });
      };

      let speed = Number(marquee.getAttributeNode("data-speed").value);
      let direction = "left";
      let marqueeInterval = setInterval(marqueeMove, speed, direction);

      //Mouse Events
      // marquee.onmouseenter = () => {
      //   clearInterval(marqueeInterval);
      // };
      // marquee.onmousemove = () => {
      //   clearInterval(marqueeInterval);
      // };
      // marquee.onmouseleave = () => {
      //   clearInterval(marqueeInterval);
      //   marqueeInterval = setInterval(marqueeMove, speed, direction);
      // };
    });

    const twitter = document.querySelectorAll(".item2");
    twitter.forEach((item2) => {
      item2.addEventListener("click", () => {
        window.open("https://twitter.com/RPSGamesClub", "_blank");
      });
    });

    const discord = document.querySelectorAll(".item3");
    discord.forEach((item2) => {
      item2.addEventListener("click", () => {
        window.open("https://discord.gg/XBHfrwfcrq", "_blank");
      });
    });

    const fairplay = document.querySelectorAll(".item4");
    fairplay.forEach((item2) => {
      item2.addEventListener("click", () => {
        navigate("/fair-play");
      });
    });
  }, []);

  return (
    <StyledMenu>
      <div className="marquee" data-speed="10">
        <div className="marquee__row marquee__row--nezuko">
          <div
            className="marquee__item marquee__item--nezuko d-flex"
            data-clone="3"
          >
            <button className="item2">
              <img className="image-logo" src={TwitterLogo} alt="" />
              <p>Join Us on Twitter</p>
            </button>
            <button className="item3">
              <img className="image-logo" src={DiscordLogo} alt="" />
              <p>Join Us on Discord</p>
            </button>
            <button className="item4">
              <img className="image-logo" src={EnergyLogo} alt="" />
              <p>Provable Fairness</p>
            </button>
          </div>
        </div>
      </div>
    </StyledMenu>
  );
};

export default SocialButtons;
