import { useState, useEffect } from "react";

export const useGasTracker = () => {

    const [gasTrack, setGasTrack] = useState({});

    useEffect(() => {
        const timer = setInterval(() => { getUnixTime() }, 1000);
        return () => {
            clearInterval(timer);
            setGasTrack({});
        }
    }, [])
    
    const getUnixTime = async () => {
        const response = await fetch("https://gasstation-mainnet.matic.network/");
        const movies = await response.json();
        setGasTrack(movies)
    }

    return gasTrack
}