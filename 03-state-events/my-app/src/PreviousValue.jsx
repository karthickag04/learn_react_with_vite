import { useState, useEffect, useRef } from 'react';

function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current; // Returns previous value
}

function PreviousValue() {
    const [count, setCount] = useState(0);
    const previousCount = usePrevious(count);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
            <h3>4. Previous Value Pattern</h3>
            <p>Current: {count}</p>
            <p>Previous: {previousCount}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)} style={{ marginLeft: '10px' }}>
                Decrement
            </button>
        </div>
    );
}

export default PreviousValue;
