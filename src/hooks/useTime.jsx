import { useState, useEffect } from "react";

export const useTime = () => {
  const [unixTime, setUnixTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setUnixTime(Math.round(new Date().getTime() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [unixTime]);

  return unixTime;
};
