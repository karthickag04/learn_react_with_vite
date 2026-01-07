import { useState, useEffect } from 'react';

function DataFetching() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Flag to prevent state update on unmounted component
        let isMounted = true;

        async function fetchPosts() {
            try {
                setLoading(true);

                const response = await fetch(
                    'https://jsonplaceholder.typicode.com/posts?_limit=5'
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }

                const data = await response.json();

                // Only update state if component is still mounted
                if (isMounted) {
                    setPosts(data);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchPosts();

        // Cleanup - set flag to prevent state updates
        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
            <h3>1. Data Fetching Pattern</h3>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title.substring(0, 40)}...</li>
                ))}
            </ul>
        </div>
    );
}

export default DataFetching;
