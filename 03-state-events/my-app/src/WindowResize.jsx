import { useState, useEffect } from 'react';

function WindowResize() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        // Handler function
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        // Add event listener
        console.log('Adding resize listener');
        window.addEventListener('resize', handleResize);

        // CLEANUP - Remove event listener
        return () => {
            console.log('Removing resize listener');
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty array = add once, cleanup on unmount

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
            <h3>2. Window Resize Tracker</h3>
            <p>Width: {windowSize.width}px</p>
            <p>Height: {windowSize.height}px</p>
            <p><small>Resize window to see updates</small></p>
        </div>
    );
}

export default WindowResize;
