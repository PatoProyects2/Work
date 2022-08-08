import React, { useState, useEffect } from "react";
import DataChart from "./DataChart";

const Chart = ({ clubUser, userGames }) => {
  const [data, setData] = useState(false);

  useEffect(() => {
    var times = [];
    var usdAmounts = [];
    var coinAmounts = [];
    var coins = [];
    var accounts = [];

    const profit = userGames.map((game, index) => {
      times.push(game.gameId);
      usdAmounts.push(parseFloat(game.amount.toFixed(2)));
      coins.push(game.coin);
      coinAmounts.push(game.coinAmount)
      accounts.push(game.account);

      return parseFloat(game.profit.toFixed(2));
    });

    setData({
      profit: profit,
      time: times,
      usdAmounts: usdAmounts,
      coinAmounts: coinAmounts,
      coins: coins,
      accounts: accounts,
    });
  }, [clubUser, userGames]);

  return data && <DataChart data={data} />;
};

export default Chart;
