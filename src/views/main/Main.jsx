import { useContext, useEffect, useState } from "react";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db } from "../../config/firesbaseConfig";
import { Context } from "../../context/Context";
import { useMatchMedia } from "../../hooks/useMatchMedia";
import { StyledMain, StyledMenu, SocialButtons, BannerCards, TableButtons, Tables } from "./components/Modals/Modals";

const Main = () => {
  const { discordId } = useContext(Context);
  const [topLeaderboards, setTopLeaderboards] = useState(false);
  const [liveBets, setLiveBets] = useState(true);
  const [mostPlays, setMostPlays] = useState(false);
  const [mostAmount, setMostAmount] = useState(false);
  const [daily, setDaily] = useState(true);
  const [weekly, setWeekly] = useState(false);
  const [monthly, setMonthly] = useState(false);
  const [global, setGlobal] = useState(false);
  const isMobileResolution = useMatchMedia("(max-width:700px)", false);
  const isTabletResolution = useMatchMedia("(max-width:1000px)", false);

  useEffect(() => {
    const unixTime = Math.round(new Date().getTime() / 1000);
    if (discordId !== "" && unixTime > 0) {
      setDoc(doc(db, "status", discordId), {
        state: "online",
        time: unixTime,
      });
    }
  }, [discordId]);

  useEffect(() => {
    const readLeaderboard = async () => {
      const unixTime = Math.round(new Date().getTime() / 1000);
      const lastDay = unixTime - 86400;
      const lastWeek = unixTime - 604800;
      const lastMonth = unixTime - 2592000;

      let dayGames = [];
      let weekGames = [];
      let monthGames = [];
      let globalGames = [];

      const q = query(collection(db, "allGames"));
      const document = await getDocs(q);

      // Filtrar por preiodo de tiempo y usuarios registrados

      document.forEach((doc) => {
        let data = doc.data();

        if (data.uid !== 'anonymous') {
          let created = data.createdAt;
          
          if (created > lastDay) {
            const array = {
              photo: data.photo,
              name: data.name,
              amount: data.amount,
              uid: data.uid,
            };
            dayGames = dayGames.concat(array);
          }

          if (created > lastWeek) {
            const array = {
              photo: data.photo,
              name: data.name,
              amount: data.amount,
              uid: data.uid,
            };
            weekGames = weekGames.concat(array);
          }

          if (created > lastMonth) {
            const array = {
              photo: data.photo,
              name: data.name,
              amount: data.amount,
              uid: data.uid,
            };
            monthGames = monthGames.concat(array);
          }

          const array = {
            photo: data.photo,
            name: data.name,
            amount: data.amount,
            uid: data.uid,
          };
          globalGames = globalGames.concat(array);
        }

      });

      // Agrupar por usuario

      let dayObject = [];
      dayGames.forEach((x) => {
        if (!dayObject.hasOwnProperty(x.uid)) {
          dayObject[x.uid] = [];
        }
        dayObject[x.uid].push({ ...x });
      });

      let weekObject = [];
      weekGames.forEach((x) => {
        if (!weekObject.hasOwnProperty(x.uid)) {
          weekObject[x.uid] = [];
        }
        weekObject[x.uid].push({ ...x });
      });

      let monthObject = [];
      monthGames.forEach((x) => {
        if (!monthObject.hasOwnProperty(x.uid)) {
          monthObject[x.uid] = [];
        }
        monthObject[x.uid].push({ ...x });
      });

      let globalObject = [];
      globalGames.forEach((x) => {
        if (!globalObject.hasOwnProperty(x.uid)) {
          globalObject[x.uid] = [];
        }
        globalObject[x.uid].push({ ...x });
      });

      // Suma total de partidas y cantidad de dinero jugado por usuario

      const day = Object.values(dayObject).map((users) => {
        const amounts = users.map((amount) => amount.amount);
        const amount = amounts.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue;
        }, 0);
        const user = users[users.length - 1];
        const top = {
          photo: user.photo,
          name: user.name,
          game: users.length,
          amount: amount,
        };
        return top;
      });

      const week = Object.values(weekObject).map((users) => {
        const amounts = users.map((amount) => amount.amount);
        const amount = amounts.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue;
        }, 0);
        const user = users[users.length - 1];
        const top = {
          photo: user.photo,
          name: user.name,
          game: users.length,
          amount: amount,
        };
        return top;
      });

      const month = Object.values(monthObject).map((users) => {
        const amounts = users.map((amount) => amount.amount);
        const amount = amounts.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue;
        }, 0);
        const user = users[users.length - 1];
        const top = {
          photo: user.photo,
          name: user.name,
          game: users.length,
          amount: amount,
        };
        return top;
      });

      const global = Object.values(globalObject).map((users) => {
        const amounts = users.map((amount) => amount.amount);
        const amount = amounts.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue;
        }, 0);
        const user = users[users.length - 1];
        const top = {
          photo: user.photo,
          name: user.name,
          game: users.length,
          amount: amount,
        };
        return top;
      });

      var games = {};
      games.day = [...day].sort((a, b) => b.game - a.game);
      games.week = [...week].sort((a, b) => b.game - a.game);
      games.month = [...month].sort((a, b) => b.game - a.game);
      games.global = [...global].sort((a, b) => b.game - a.game);

      var amount = {};
      amount.day = [...day].sort((a, b) => b.amount - a.amount);
      amount.week = [...week].sort((a, b) => b.amount - a.amount);
      amount.month = [...month].sort((a, b) => b.amount - a.amount);
      amount.global = [...global].sort((a, b) => b.amount - a.amount);

      var leaderboard = {};
      leaderboard.games = games;
      leaderboard.amount = amount;

      setTopLeaderboards(leaderboard);
    };
    readLeaderboard();
    return () => {
      setTopLeaderboards(false);
    };
  }, [discordId]);

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
  }

  const activeTopGames = () => {
    setLiveBets(false);
    setMostPlays(true);
    setMostAmount(false);
    day()
  }

  const activeTopAmount = () => {
    setLiveBets(false);
    setMostPlays(false);
    setMostAmount(true);
    day()
  }

  return (
    <StyledMain>

      <StyledMenu>
        <SocialButtons
          isMobileResolution={isMobileResolution}
        />
      </StyledMenu>

      <BannerCards
        isTabletResolution={isTabletResolution}
      />

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