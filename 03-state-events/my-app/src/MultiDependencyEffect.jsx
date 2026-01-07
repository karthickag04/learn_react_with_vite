import { useState, useEffect } from 'react';

function MultiDependencyEffect() {
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);
    const [area, setArea] = useState(0);

    // Runs when EITHER width OR height changes
    useEffect(() => {
        console.log('Calculating area...');
        const newArea = width * height;
        setArea(newArea);
    }, [width, height]); // Multiple dependencies

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
            <h3>4. Multiple Dependencies</h3>
            <div>
                <label>
                    Width: {width}
                    <input
                        type="range"
                        min="50"
                        max="200"
                        value={width}
                        onChange={(e) => setWidth(Number(e.target.value))}
                    />
                </label>
            </div>
            <div>
                <label>
                    Height: {height}
                    <input
                        type="range"
                        min="50"
                        max="200"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                    />
                </label>
            </div>
            <p>Area: {area} sq units</p>
            <div
                style={{
                    width: width,
                    height: height,
                    background: '#4caf50',
                    transition: 'all 0.3s'
                }}
            />
        </div>
    );
}

export default MultiDependencyEffect;
