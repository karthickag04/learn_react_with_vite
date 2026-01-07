import { useState, useEffect } from 'react';

function CleanupOrder() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(`Effect RAN with count: ${count}`);

        return () => {
            console.log(`Cleanup RAN for count: ${count}`);
        };
    }, [count]);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
            <h3>5. Cleanup Order Demo</h3>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <p><small>Watch console - cleanup runs BEFORE new effect</small></p>
        </div>
    );
}

export default CleanupOrder;
