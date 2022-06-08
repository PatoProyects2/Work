import { useState, useEffect } from "react";

export const useTime = () => {
    const [unixTime, setUnixTime] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => { getUnixTime() }, 1000);
        return () => {
            clearInterval(timer);
            setUnixTime(0);
        }
    }, [])
    const getUnixTime = () => {
        setUnixTime(Math.round((new Date()).getTime() / 1000))
    }

    return unixTime
}