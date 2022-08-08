import { useState, useEffect, useContext } from "react";
import { Context } from "../context/Context";

export const useGas = () => {
  const { setGas } = useContext(Context);
  const [gasTrack, setGasTrack] = useState(false);

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

  useEffect(() => {
    const timer = setInterval(() => {
      getGas();
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    getGas();
  }, []);

  const getGas = async () => {
    const response = await fetch("https://gasstation-mainnet.matic.network/v2");
    const gwei = await response.json();
    setGasTrack(gwei);
  };

  return;
};
