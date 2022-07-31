import { useState, useContext } from "react";
import { Context } from "../../context/Context";
import { useMatchMedia } from "../../hooks/useMatchMedia";
import {
  BannerCards,
  StyledMain,
  TableButtons,
  Tables,
} from "./components/Modals/Modals";
import { useTopGames } from "../../hooks/useTopGames";

const Main = () => {
  const { liveGames } = useContext(Context);
  const [liveBets, setLiveBets] = useState(true);
  const [mostPlays, setMostPlays] = useState(false);
  const [mostAmount, setMostAmount] = useState(false);
  const [daily, setDaily] = useState(true);
  const [weekly, setWeekly] = useState(false);
  const [monthly, setMonthly] = useState(false);
  const [global, setGlobal] = useState(false);
  const isMobileResolution = useMatchMedia("(max-width:750px)", false);
  const isTabletResolution = useMatchMedia("(max-width:1000px)", false);

  const topLeaderboards = useTopGames({ liveGames });

  const day = () => {
    setDaily(true);
    setWeekly(false);
    setMonthly(false);
    setGlobal(false);
  };

  const week = () => {
    setDaily(false);
    setWeekly(true);
    setMonthly(false);
    setGlobal(false);
  };

  const month = () => {
    setDaily(false);
    setWeekly(false);
    setMonthly(true);
    setGlobal(false);
  };

  const all = () => {
    setDaily(false);
    setWeekly(false);
    setMonthly(false);
    setGlobal(true);
  };

  const activeLiveBets = () => {
    setLiveBets(true);
    setMostPlays(false);
    setMostAmount(false);
  };

  const activeTopGames = () => {
    setLiveBets(false);
    setMostPlays(true);
    setMostAmount(false);
    day();
  };

  const activeTopAmount = () => {
    setLiveBets(false);
    setMostPlays(false);
    setMostAmount(true);
    day();
  };

  return (
    <StyledMain>
      <BannerCards isTabletResolution={isTabletResolution} />

      <TableButtons
        activeLiveBets={activeLiveBets}
        activeTopGames={activeTopGames}
        activeTopAmount={activeTopAmount}
        liveBets={liveBets}
        mostPlays={mostPlays}
        mostAmount={mostAmount}
        day={day}
        week={week}
        month={month}
        all={all}
        daily={daily}
        weekly={weekly}
        monthly={monthly}
        global={global}
      />

      <Tables
        liveGames={liveGames}
        topLeaderboards={topLeaderboards}
        isMobileResolution={isMobileResolution}
        liveBets={liveBets}
        mostPlays={mostPlays}
        mostAmount={mostAmount}
        daily={daily}
        weekly={weekly}
        monthly={monthly}
        global={global}
      />
    </StyledMain>
  );
};

export default Main;
