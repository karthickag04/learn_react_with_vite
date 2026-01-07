import { useState, useEffect } from 'react';

function FetchAbort() {
    const [userId, setUserId] = useState(1);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // AbortController to cancel fetch on cleanup
        const abortController = new AbortController();

        async function fetchUser() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${userId}`,
                    { signal: abortController.signal }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }

                const data = await response.json();
                setUser(data);
            } catch (err) {
                // Ignore abort errors
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchUser();

        // CLEANUP - Abort fetch if userId changes before completion
        return () => {
            console.log('Aborting fetch for user:', userId);
            abortController.abort();
        };
    }, [userId]);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
            <h3>4. Fetch with Abort Controller</h3>
            <div>
                {[1, 2, 3, 4, 5].map(id => (
                    <button
                        key={id}
                        onClick={() => setUserId(id)}
                        style={{
                            margin: '2px',
                            background: userId === id ? '#4caf50' : '#ddd'
                        }}
                    >
                        User {id}
                    </button>
                ))}
            </div>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {user && !loading && (
                <div style={{ marginTop: '10px' }}>
                    <p><strong>{user.name}</strong></p>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                </div>
            )}
            <p><small>Quickly click different users - previous fetches are aborted</small></p>
        </div>
    );
}

export default FetchAbort;
