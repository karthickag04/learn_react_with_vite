import { useState, useEffect } from 'react';

function MouseTracker() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isTracking, setIsTracking] = useState(false);

    useEffect(() => {
        if (!isTracking) return; // Early return if not tracking

        const handleMouseMove = (event) => {
            setPosition({
                x: event.clientX,
                y: event.clientY
            });
        };

        console.log('Mouse tracking ON');
        document.addEventListener('mousemove', handleMouseMove);

        // Cleanup when tracking stops or component unmounts
        return () => {
            console.log('Mouse tracking OFF');
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isTracking]);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
            <h3>3. Mouse Position Tracker</h3>
            <button onClick={() => setIsTracking(!isTracking)}>
                {isTracking ? 'Stop Tracking' : 'Start Tracking'}
            </button>
            {isTracking && (
                <p>
                    Position: X={position.x}, Y={position.y}
                </p>
            )}
        </div>
    );
}

export default MouseTracker;
