import { useState, useEffect } from 'react';

function OnlineStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        function handleOnline() {
            setIsOnline(true);
        }

        function handleOffline() {
            setIsOnline(false);
        }

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <div style={{
            padding: '20px',
            border: '1px solid #ccc',
            margin: '10px',
            background: isOnline ? '#e8f5e9' : '#ffebee'
        }}>
            <h3>6. Online/Offline Status</h3>
            <p>
                Status:
                <strong style={{ color: isOnline ? 'green' : 'red' }}>
                    {isOnline ? ' 🟢 Online' : ' 🔴 Offline'}
                </strong>
            </p>
            <p><small>Try disconnecting your network</small></p>
        </div>
    );
}

export default OnlineStatus;
