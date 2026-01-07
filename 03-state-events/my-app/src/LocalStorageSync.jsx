import { useState, useEffect } from 'react';

function LocalStorageSync() {
    // Initialize state from localStorage
    const [name, setName] = useState(() => {
        const saved = localStorage.getItem('userName');
        return saved || '';
    });

    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved || 'light';
    });

    // Sync name to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('userName', name);
        console.log('Saved name to localStorage:', name);
    }, [name]);

    // Sync theme to localStorage
    useEffect(() => {
        localStorage.setItem('theme', theme);
        console.log('Saved theme to localStorage:', theme);
    }, [theme]);

    return (
        <div style={{
            padding: '20px',
            border: '1px solid #ccc',
            margin: '10px',
            background: theme === 'dark' ? '#333' : '#fff',
            color: theme === 'dark' ? '#fff' : '#333'
        }}>
            <h3>2. LocalStorage Sync</h3>
            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ marginLeft: '10px' }}
                    />
                </label>
            </div>
            <div style={{ marginTop: '10px' }}>
                <label>
                    Theme:
                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        style={{ marginLeft: '10px' }}
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </label>
            </div>
            <p><small>Data persists on page refresh!</small></p>
        </div>
    );
}

export default LocalStorageSync;
