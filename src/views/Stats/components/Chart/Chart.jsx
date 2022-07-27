import React, { useState, useEffect } from "react";
import DataChart from "./DataChart";
import { useUserGames } from "../../../../hooks/firebase/useUserGames";

const Chart = ({ clubData }) => {
  const userGames = useUserGames(clubData.uid);
  const [data, setData] = useState(false);

  useEffect(() => {
    if (userGames) {
      const orderGames = [...userGames].sort(
        (a, b) => a.createdAt - b.createdAt
      );

      var times = [];
      var usdAmounts = [];
      var maticAmounts = [];
      var accounts = [];

      const profit = orderGames.map((user, index) => {
        let time = user.gameId;
        let usd = parseFloat(user.amount.toFixed(2));
        let matic = user.maticAmount;
        let profit = parseFloat(user.profit.toFixed(2));

        times.push(time);
        usdAmounts.push(usd);
        maticAmounts.push(matic);
        accounts.push(user.account);

        return profit;
      });

      setData({
        time: times,
        profit: profit,
        usdAmounts: usdAmounts,
        maticAmounts: maticAmounts,
        accounts: accounts,
      });
    }
  }, [userGames]);

  return clubData && data && <DataChart data={data} />;
};

export default Chart;
