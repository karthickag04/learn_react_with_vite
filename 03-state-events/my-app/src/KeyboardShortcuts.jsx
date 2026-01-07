import { useState, useEffect } from 'react';

function KeyboardShortcuts() {
    const [lastKey, setLastKey] = useState('');
    const [isCtrlPressed, setIsCtrlPressed] = useState(false);

    useEffect(() => {
        function handleKeyDown(e) {
            setLastKey(e.key);
            setIsCtrlPressed(e.ctrlKey);

            // Handle shortcuts
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                alert('Ctrl+S pressed! (Save action)');
            }
        }

        function handleKeyUp() {
            setIsCtrlPressed(false);
        }

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
            <h3>5. Keyboard Shortcuts</h3>
            <p>Last key pressed: <strong>{lastKey || 'None'}</strong></p>
            <p>Ctrl held: <strong>{isCtrlPressed ? 'Yes' : 'No'}</strong></p>
            <p><small>Try pressing Ctrl+S</small></p>
        </div>
    );
}

export default KeyboardShortcuts;
