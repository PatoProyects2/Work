import { useState, useEffect } from "react";

export const useTime = () => {
  const [unixTime, setUnixTime] = useState(0);

  useEffect(() => {
    const time = setInterval(() => {
      getUnixTime();
    }, 30000);
    return () => {
      clearInterval(time);
    };
  }, []);

  const getUnixTime = () => {
    setUnixTime(Math.round(new Date().getTime() / 1000));
  };

  return { unixTime, getUnixTime };
};
