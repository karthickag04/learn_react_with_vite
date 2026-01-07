import { useState, useEffect } from 'react';

function TimerCleanup() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let intervalId;

        if (isRunning) {
            console.log('Timer started');

            intervalId = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);
        }

        // CLEANUP FUNCTION
        // Runs when:
        // 1. Component unmounts
        // 2. Before effect runs again (when deps change)
        return () => {
            console.log('Timer cleanup - clearing interval');
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning]); // Re-run when isRunning changes

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
            <h3>1. Timer with Cleanup</h3>
            <p>Seconds: {seconds}</p>
            <button onClick={() => setIsRunning(!isRunning)}>
                {isRunning ? 'Stop' : 'Start'}
            </button>
            <button onClick={() => setSeconds(0)} style={{ marginLeft: '10px' }}>
                Reset
            </button>
            <p><small>Check console - cleanup runs when stopping</small></p>
        </div>
    );
}

export default TimerCleanup;
