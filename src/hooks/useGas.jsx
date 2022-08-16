import { useState, useEffect } from "react";

export const useGas = () => {
  const [gasTrack, setGasTrack] = useState(false);
  const [gas, setGas] = useState(false);

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
    getGas();
  }, []);

  const getGas = () => {
    fetch("https://gasstation-mainnet.matic.network/v2")
      .then((response) => {
        response.json().then((data) => {
          setGasTrack(data);
        });
      })
      .catch((err) => {
        console.log(err);
        getGas();
      });
  };

  return gas;
};
