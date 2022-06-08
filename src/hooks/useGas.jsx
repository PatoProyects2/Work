import { useState, useEffect } from "react";
import { Context } from "../context/Context";

export const useGas = () => {
    const [gasTrack, setGasTrack] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => { getUnixTime() }, 2000);
        return () => {
            clearInterval(timer);
            setGasTrack(false);
        }
    }, [])

    const getUnixTime = async () => {
        const response = await fetch("https://gasstation-mainnet.matic.network/v2");
        const gwei = await response.json();
        setGasTrack(gwei)
    }

    return gasTrack
}