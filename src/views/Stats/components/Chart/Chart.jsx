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

      const profit = orderGames.map((user) => {
        let created = parseInt(user.createdAt);
        let date = new Date(created * 1000);

        let year = date.getFullYear().toString();
        let month = (date.getMonth() + 1).toString();
        if (month.length === 1) {
          month = `0${date.getMonth() + 1}`;
        }
        let day = date.getDate().toString();
        if (day.length === 1) {
          day = `0${date.getDate()}`;
        }

        let time = year + "-" + month + "-" + day;
        let profit = parseFloat(user.profit.toFixed(2));

        times.push(time);

        let value = [time, profit];

        return value;
      });

      setData({ time: times, profit: profit });
    }
  }, [userGames]);

  return clubData && data && <DataChart data={data} />;
};

export default Chart;
