// src/components/Timer.tsx

import React, { useState, useEffect } from 'react';

interface TimerProps {
    isRunning: boolean;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
}

const Timer: React.FC<TimerProps> = ({ isRunning, onStart, onPause, onReset }) => {
    const [timer, setTimer] = useState<number>(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isRunning) {
            const id = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1);
            }, 1000);
            setIntervalId(id);
        } else if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning, intervalId]);

    const handleStart = () => {
        onStart();
    };

    const handlePause = () => {
        onPause();
    };

    const handleReset = () => {
        onReset();
        setTimer(0);
    };

    return (
        <div style={{ position: 'absolute', top: 20, right: 50, fontSize: '18px' }}>
            Timer: {new Date(timer * 1000).toISOString().substr(11, 8)}
            <div>
                <button onClick={handleStart}>Start</button>
                <button onClick={handlePause} disabled={!isRunning}>Pause</button>
                <button onClick={handleReset}>Stop</button>
            </div>
        </div>
    );
};

export default Timer;
