import { useState, useEffect } from "react";

export const useTopGames = ({ liveGames }) => {
  const [topLeaderboards, setTopLeaderboards] = useState(false);

  useEffect(() => {
    if (liveGames) {
      readLeaderboard();
    }
  }, [liveGames]);

  const readLeaderboard = () => {
    const unixTime = Math.round(new Date().getTime() / 1000);
    const lastDay = unixTime - 86400;
    const lastWeek = unixTime - 604800;
    const lastMonth = unixTime - 2592000;

    let dayGames = [];
    let weekGames = [];
    let monthGames = [];
    let globalGames = [];

    // Filtrar por preiodo de tiempo y usuarios registrados

    liveGames.forEach((data) => {
      if (data.uid !== "anonymous") {
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
        uid: user.uid,
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
        uid: user.uid,
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
        uid: user.uid,
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
        uid: user.uid,
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

  return topLeaderboards;
};
