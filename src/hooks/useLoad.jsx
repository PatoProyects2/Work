import { useState, useEffect } from "react";

export const useLoad = () => {
    const [dotLog, setDotLog] = useState('');
    useEffect(() => {
        const timer = setInterval(() => { createSuspenseDot(dotLog) }, 1000);
        return () => {
            clearInterval(timer);
        }
    }, [dotLog])

    const createSuspenseDot = (dotLog) => {
        if (dotLog.length === 0) {
            setDotLog('.')
        }
        if (dotLog.length === 1) {
            setDotLog('..')
        }
        if (dotLog.length === 2) {
            setDotLog('...')
        }
        if (dotLog.length === 3) {
            setDotLog('')
        }
    }

    return dotLog
}