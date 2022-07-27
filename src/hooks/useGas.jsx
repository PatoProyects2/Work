import { useState, useEffect } from "react";

export const useGas = () => {
  const [gasTrack, setGasTrack] = useState(false);
  const [gas, setGas] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      getGas();
    }, 2000);
    return () => {
      clearInterval(timer);
      setGasTrack(false);
    };
  }, []);

  const gasStorage = window.localStorage.getItem("gas");

  useEffect(() => {
    if (gasStorage !== null && gasTrack) {
      if (gasStorage === "standard") {
        setGas(parseInt(gasTrack.safeLow.maxFee));
      }
      if (gasStorage === "fast") {
        setGas(parseInt(gasTrack.standard.maxFee));
      }
      if (gasStorage === "instant") {
        setGas(parseInt(gasTrack.fast.maxFee));
      }
    }
  }, [gasStorage, gasTrack]);

  const getGas = async () => {
    const response = await fetch("https://gasstation-mainnet.matic.network/v2");
    const gwei = await response.json();
    setGasTrack(gwei);
  };

  return {gas};
};
