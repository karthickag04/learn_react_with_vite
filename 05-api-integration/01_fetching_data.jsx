// ============================================================
// 12-1 - FETCHING DATA IN REACT
// ============================================================

/*
LEARNING OBJECTIVES:
1. Fetch data from APIs in React
2. Handle loading states
3. Handle errors
4. Display fetched data
*/

import { useState, useEffect } from 'react';

// ============================================================
// 1. BASIC DATA FETCHING
// ============================================================

function BasicFetch() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Using fetch API
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []); // Empty dependency = fetch on mount

    // Conditional rendering based on state
    if (loading) {
        return <div style={styles.loading}>Loading users...</div>;
    }

    if (error) {
        return <div style={styles.error}>Error: {error}</div>;
    }

    return (
        <div style={styles.container}>
            <h3>1. Basic Fetch (Promise .then)</h3>
            <div style={styles.grid}>
                {users.slice(0, 4).map(user => (
                    <div key={user.id} style={styles.card}>
                        <h4>{user.name}</h4>
                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}


// ============================================================
// 2. ASYNC/AWAIT PATTERN
// ============================================================

function AsyncAwaitFetch() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Define async function inside useEffect
        async function fetchPosts() {
            try {
                setLoading(true);
                
                const response = await fetch(
                    'https://jsonplaceholder.typicode.com/posts?_limit=5'
                );
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setPosts(data);
                
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    return (
        <div style={styles.container}>
            <h3>2. Async/Await Pattern</h3>
            
            {loading && <div style={styles.loading}>Loading posts...</div>}
            {error && <div style={styles.error}>Error: {error}</div>}
            
            {!loading && !error && (
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            <strong>{post.title.substring(0, 40)}...</strong>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}


// ============================================================
// 3. FETCH WITH PARAMETERS
// ============================================================

function FetchWithParams() {
    const [userId, setUserId] = useState(1);
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchTodos() {
            setLoading(true);
            
            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/todos?userId=${userId}&_limit=5`
                );
                const data = await response.json();
                setTodos(data);
            } catch (err) {
                console.error('Failed to fetch todos:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchTodos();
    }, [userId]); // Re-fetch when userId changes

    return (
        <div style={styles.container}>
            <h3>3. Fetch with Parameters</h3>
            
            <div style={{ marginBottom: '15px' }}>
                <label>Select User: </label>
                <select 
                    value={userId} 
                    onChange={(e) => setUserId(Number(e.target.value))}
                >
                    {[1, 2, 3, 4, 5].map(id => (
                        <option key={id} value={id}>User {id}</option>
                    ))}
                </select>
            </div>
            
            {loading ? (
                <p>Loading todos for User {userId}...</p>
            ) : (
                <ul>
                    {todos.map(todo => (
                        <li key={todo.id} style={{
                            textDecoration: todo.completed ? 'line-through' : 'none',
                            color: todo.completed ? 'green' : 'inherit'
                        }}>
                            {todo.completed ? '✓' : '○'} {todo.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}


// ============================================================
// 4. SEARCH WITH DEBOUNCE
// ============================================================

function SearchAPI() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Don't search if query is empty
        if (!query.trim()) {
            setResults([]);
            return;
        }

        // Debounce - wait for user to stop typing
        const timeoutId = setTimeout(async () => {
            setLoading(true);
            
            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/posts?_limit=100`
                );
                const data = await response.json();
                
                // Filter client-side (in real app, API would filter)
                const filtered = data.filter(post =>
                    post.title.toLowerCase().includes(query.toLowerCase())
                );
                
                setResults(filtered.slice(0, 10));
            } catch (err) {
                console.error('Search failed:', err);
            } finally {
                setLoading(false);
            }
        }, 300); // Wait 300ms after user stops typing

        // Cleanup - cancel timeout if query changes
        return () => clearTimeout(timeoutId);
    }, [query]);

    return (
        <div style={styles.container}>
            <h3>4. Search with Debounce</h3>
            
            <input
                type="text"
                placeholder="Search posts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={styles.input}
            />
            
            {loading && <p>Searching...</p>}
            
            {!loading && results.length > 0 && (
                <ul>
                    {results.map(post => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            )}
            
            {!loading && query && results.length === 0 && (
                <p>No results found for "{query}"</p>
            )}
        </div>
    );
}


// ============================================================
// 5. FETCH ON BUTTON CLICK (NOT useEffect)
// ============================================================

function FetchOnClick() {
    const [joke, setJoke] = useState(null);
    const [loading, setLoading] = useState(false);

    // This is NOT in useEffect - triggered by user action
    async function fetchJoke() {
        setLoading(true);
        
        try {
            const response = await fetch(
                'https://official-joke-api.appspot.com/random_joke'
            );
            const data = await response.json();
            setJoke(data);
        } catch (err) {
            console.error('Failed to fetch joke:', err);
            setJoke({ setup: 'Error', punchline: 'Failed to fetch joke' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={styles.container}>
            <h3>5. Fetch on Button Click</h3>
            
            <button 
                onClick={fetchJoke}
                disabled={loading}
                style={styles.button}
            >
                {loading ? 'Loading...' : 'Get Random Joke'}
            </button>
            
            {joke && (
                <div style={styles.joke}>
                    <p><strong>{joke.setup}</strong></p>
                    <p>{joke.punchline}</p>
                </div>
            )}
        </div>
    );
}


// ============================================================
// STYLES
// ============================================================

const styles = {
    container: {
        padding: '20px',
        border: '1px solid #ddd',
        margin: '10px',
        borderRadius: '8px'
    },
    loading: {
        padding: '20px',
        textAlign: 'center',
        color: '#666'
    },
    error: {
        padding: '20px',
        color: 'white',
        background: '#f44336',
        borderRadius: '4px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px'
    },
    card: {
        padding: '15px',
        background: '#f5f5f5',
        borderRadius: '8px'
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '4px'
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        background: '#4caf50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    joke: {
        marginTop: '15px',
        padding: '15px',
        background: '#fff9c4',
        borderRadius: '8px'
    }
};


// ============================================================
// MAIN COMPONENT
// ============================================================

export default function FetchingData() {
    return (
        <div>
            <h2>API Integration - Fetching Data</h2>
            
            <div style={{
                background: '#e8f5e9',
                padding: '15px',
                marginBottom: '20px',
                borderRadius: '8px'
            }}>
                <h4>📚 Key Concepts:</h4>
                <ul>
                    <li>Use useEffect for fetching on mount or when deps change</li>
                    <li>Always handle loading, error, and success states</li>
                    <li>Use async/await for cleaner code</li>
                    <li>Debounce user input before API calls</li>
                    <li>User-triggered fetches don't need useEffect</li>
                </ul>
            </div>
            
            <BasicFetch />
            <AsyncAwaitFetch />
            <FetchWithParams />
            <SearchAPI />
            <FetchOnClick />
        </div>
    );
}
