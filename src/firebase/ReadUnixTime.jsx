import React, { useState, useEffect } from 'react'
export const ReadUnixTime = () => {
    const [unixTimeStamp, setUnixTimeStamp] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => { getUnixTime() }, 1000);
        return () => {
            clearInterval(timer);
            setUnixTimeStamp(0);
        }
    }, [])
    const getUnixTime = async () => {
        setUnixTimeStamp(Math.round((new Date()).getTime() / 1000))
    }
    return unixTimeStamp
}