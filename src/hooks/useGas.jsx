import { useState, useEffect } from "react";

export const useGas = () => {
    const [gasTrack, setGasTrack] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => { getGas() }, 500);
        return () => {
            clearInterval(timer);
            setGasTrack(false);
        }
    }, [])

    const getGas = async () => {
        const response = await fetch("https://gasstation-mainnet.matic.network/v2");
        const gwei = await response.json();
        setGasTrack(gwei)
    }

    return gasTrack
}