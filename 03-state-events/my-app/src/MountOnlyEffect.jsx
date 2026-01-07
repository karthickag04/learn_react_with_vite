import { useState, useEffect } from 'react';

function MountOnlyEffect() {
    const [message, setMessage] = useState('Loading...');

    // Empty dependency array [] means:
    // Run ONLY ONCE when component MOUNTS
    useEffect(() => {
        console.log('Component mounted!');

        // Simulate initial data fetch
        setTimeout(() => {
            setMessage('Data loaded successfully!');
        }, 1500);

    }, []); // Empty array = run once on mount

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
            <h3>2. Mount Only Effect (Empty [])</h3>
            <p>Message: {message}</p>
            <p><small>This effect runs only once on mount</small></p>
        </div>
    );
}

export default MountOnlyEffect;
