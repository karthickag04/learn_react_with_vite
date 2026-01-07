import { useState, useEffect } from 'react';

function DependencyEffect() {
    const [userId, setUserId] = useState(1);
    const [user, setUser] = useState(null);

    // Runs when 'userId' changes
    useEffect(() => {
        console.log('Fetching user:', userId);

        // Simulate API call
        setTimeout(() => {
            setUser({
                id: userId,
                name: `User ${userId}`,
                email: `user${userId}@example.com`
            });
        }, 500);

    }, [userId]); // Dependency array - runs when userId changes

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
            <h3>3. Effect with Dependency</h3>
            <div>
                <button onClick={() => setUserId(1)}>User 1</button>
                <button onClick={() => setUserId(2)}>User 2</button>
                <button onClick={() => setUserId(3)}>User 3</button>
            </div>
            {user && (
                <div style={{ marginTop: '10px' }}>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}
        </div>
    );
}

export default DependencyEffect;
