import { useState, useEffect } from 'react';

function DebouncedSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Debounce the search term
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 500); // Wait 500ms after user stops typing

        return () => {
            clearTimeout(timerId);
        };
    }, [searchTerm]);

    useEffect(() => {
        if (!debouncedTerm) {
            setResults([]);
            return;
        }

        async function search() {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?q=${debouncedTerm}`
                );
                const data = await response.json();
                // Filter locally for demo
                const filtered = data.filter(user =>
                    user.name.toLowerCase().includes(debouncedTerm.toLowerCase())
                );
                setResults(filtered);
            } catch (err) {
                console.error('Search error:', err);
            } finally {
                setLoading(false);
            }
        }

        search();
    }, [debouncedTerm]);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
            <h3>3. Debounced Search</h3>
            <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '8px' }}
            />
            <p><small>Typing: "{searchTerm}" | Searching: "{debouncedTerm}"</small></p>

            {loading && <p>Searching...</p>}
            {results.length > 0 && (
                <ul>
                    {results.map(user => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DebouncedSearch;
