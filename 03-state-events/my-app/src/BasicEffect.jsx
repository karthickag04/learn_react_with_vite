
import { useEffect, useState } from "react"

function BasicEffect() {
    const [count, setCount] = useState(0);
    const [count1, setCount1] = useState(0);

    // useEffect with NO dependency array
    // Runs after EVERY render (initial + updates)
    useEffect(() => {
        console.log('Effect ran! Count1 is:', count1);
        console.log('Effect ran! Count is:', count);
        document.title = `Count: ${count}`;
    });
    // ⚠️ WARNING: This runs on EVERY render - use carefully!

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
            <h3>1. Basic Effect (No Dependencies)</h3>
            <p>Count: {count}</p>
            {/* <button onClick={() => setCount(count + 1) && setCount1(count1 + 1)}>Increment</button> */}
            <button onClick={() => {
                setCount(count + 1);
                setCount1(count1 + 1);
            }}>
                Increment
            </button>
            <p><small>Check the page title - it updates!</small></p>
        </div>
    );
}


export default BasicEffect
