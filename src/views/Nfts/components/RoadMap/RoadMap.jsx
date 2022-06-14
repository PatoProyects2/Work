import { useEffect } from "react";
import "./RoadMap.css";
import { roadMapData } from "./roadMapData";

const RoadMap = () => {
  const targetY = window.innerHeight * 0.8;
  let prevScrollY = window.scrollY;
  let up, down;
  let set = 0;
  let full = false;

  const scrollHandler = (roadmap, sections, line) => {
    const { scrollY } = window;
    const timelineRect = roadmap.getBoundingClientRect();
    const dist = targetY - timelineRect.top;

    up = scrollY < prevScrollY;
    down = !up;

    if (down && !full) {
      set = Math.max(set, dist);
      line.style.bottom = `calc(100% - ${set}px)`;
    }

    if (dist > roadmap.offsetHeight + 50 && !full) {
      full = true;
      line.style.bottom = `-50px`;
    }

    sections.forEach((item) => {
      const rect = item.getBoundingClientRect();

      if (rect.top + item.offsetHeight / 5 < targetY) {
        item.classList.add("nft-roadmap__show-me");
      }
    });

    prevScrollY = window.scrollY;
  };

  useEffect(() => {
    const sections = document.querySelectorAll(".nft-roadmap__section");
    const roadmapRef = document.querySelector(".nft-roadmap");
    const lineRef = document.querySelector(".nft-roadmap__line");
    lineRef.style.bottom = `calc(100% - 20px)`;

    scrollHandler(roadmapRef, sections, lineRef);

    lineRef.style.display = "block";

    window.addEventListener("scroll", () => {
      scrollHandler(roadmapRef, sections, lineRef);
    });
  }, []);

  return (
    <div className="nft-roadmap">
      <div className="nft-roadmap__line"></div>
      {roadMapData.map((data) => {
        return <RoadMapSection {...data} key={data.title} />;
      })}
    </div>
  );
};

const RoadMapSection = ({ title, text, img, imgStyles }) => {
  return (
    <div className="nft-roadmap__section">
      <div className="nft-roadmap__head"></div>
      <div className="nft-roadmap__content">
        <div className="nft-roadmap__text-content">
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="nft-roadmap__img-content">
          <img
            className={`${imgStyles ? imgStyles : ""}`}
            src={img[Object.keys(img)[0]]}
            alt={title}
          />
        </div>
      </div>
    </div>
  );
};

export default RoadMap;
