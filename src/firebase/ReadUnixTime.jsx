import React, { useState, useEffect } from 'react'
export const ReadUnixTime = () => {
    const [unixTimeStamp, setUnixTimeStamp] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => { getUnixTime() }, 1000);
        return () => clearInterval(timer);
    }, [])

    const getUnixTime = async () => {
        fetch('https://showcase.api.linx.twenty57.net/UnixTime/tounixtimestamp?datetime=now')
            .then(response =>
                response.json()
            )
            .then(data =>
                setUnixTimeStamp(parseInt(data.UnixTimeStamp))
            );
    }

    return unixTimeStamp
}