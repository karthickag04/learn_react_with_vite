// ============================================================
// 12-2 - CRUD OPERATIONS IN REACT
// ============================================================

/*
LEARNING OBJECTIVES:
1. Create (POST) - Add new data
2. Read (GET) - Fetch data
3. Update (PUT/PATCH) - Modify data
4. Delete (DELETE) - Remove data
5. Handle all states properly
*/

import { useState, useEffect } from 'react';

// API Base URL (using JSONPlaceholder for demo)
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// ============================================================
// MAIN CRUD COMPONENT
// ============================================================

export default function CRUDOperations() {
    // State
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Form state
    const [formData, setFormData] = useState({ title: '', body: '' });
    const [editingId, setEditingId] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // ========================================================
    // READ - Fetch all posts on mount
    // ========================================================
    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}?_limit=5`);

            if (!response.ok) throw new Error('Failed to fetch');

            const data = await response.json();
            setPosts(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // ========================================================
    // CREATE - Add new post
    // ========================================================
    async function createPost(postData) {
        try {
            setSubmitting(true);

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...postData,
                    userId: 1
                }),
            });

            if (!response.ok) throw new Error('Failed to create post');

            const newPost = await response.json();

            // Add to local state (JSONPlaceholder returns fake ID)
            // In real app, use the ID from response
            setPosts([{ ...newPost, id: Date.now() }, ...posts]);

            showSuccess('Post created successfully!');
            resetForm();

        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    // ========================================================
    // UPDATE - Edit existing post
    // ========================================================
    async function updatePost(id, postData) {
        try {
            setSubmitting(true);

            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...postData,
                    userId: 1,
                    id: id
                }),
            });

            if (!response.ok) throw new Error('Failed to update post');

            const updatedPost = await response.json();

            // Update in local state
            setPosts(posts.map(post =>
                post.id === id ? { ...post, ...updatedPost } : post
            ));

            showSuccess('Post updated successfully!');
            resetForm();

        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    // ========================================================
    // DELETE - Remove post
    // ========================================================
    async function deletePost(id) {
        if (!window.confirm('Are you sure you want to delete this post?')) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete post');

            // Remove from local state
            setPosts(posts.filter(post => post.id !== id));

            showSuccess('Post deleted successfully!');

        } catch (err) {
            setError(err.message);
        }
    }

    // ========================================================
    // FORM HANDLERS
    // ========================================================
    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!formData.title.trim() || !formData.body.trim()) {
            setError('Please fill in all fields');
            return;
        }

        if (editingId) {
            updatePost(editingId, formData);
        } else {
            createPost(formData);
        }
    }

    function startEditing(post) {
        setEditingId(post.id);
        setFormData({
            title: post.title,
            body: post.body
        });
    }

    function resetForm() {
        setFormData({ title: '', body: '' });
        setEditingId(null);
    }

    function showSuccess(message) {
        setSuccess(message);
        setTimeout(() => setSuccess(null), 3000);
    }

    // ========================================================
    // RENDER
    // ========================================================
    return (
        <div style={styles.container}>
            <h2>CRUD Operations with API</h2>

            {/* Messages */}
            {error && (
                <div style={styles.error}>
                    {error}
                    <button onClick={() => setError(null)} style={styles.closeBtn}>×</button>
                </div>
            )}

            {success && (
                <div style={styles.success}>
                    {success}
                </div>
            )}

            {/* Form */}
            <div style={styles.formContainer}>
                <h3>{editingId ? 'Edit Post' : 'Create New Post'}</h3>

                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter post title"
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Body:</label>
                        <textarea
                            name="body"
                            value={formData.body}
                            onChange={handleInputChange}
                            placeholder="Enter post content"
                            rows={3}
                            style={styles.textarea}
                        />
                    </div>

                    <div style={styles.buttonGroup}>
                        <button
                            type="submit"
                            disabled={submitting}
                            style={styles.submitBtn}
                        >
                            {submitting
                                ? 'Saving...'
                                : editingId
                                    ? 'Update Post'
                                    : 'Create Post'
                            }
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                onClick={resetForm}
                                style={styles.cancelBtn}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Posts List */}
            <div style={styles.listContainer}>
                <h3>Posts ({posts.length})</h3>

                {loading && <p>Loading posts...</p>}

                {!loading && posts.length === 0 && (
                    <p>No posts yet. Create one!</p>
                )}

                {posts.map(post => (
                    <div
                        key={post.id}
                        style={{
                            ...styles.postCard,
                            ...(editingId === post.id ? styles.editing : {})
                        }}
                    >
                        <h4>{post.title}</h4>
                        <p>{post.body}</p>

                        <div style={styles.postActions}>
                            <button
                                onClick={() => startEditing(post)}
                                style={styles.editBtn}
                            >
                                ✏️ Edit
                            </button>
                            <button
                                onClick={() => deletePost(post.id)}
                                style={styles.deleteBtn}
                            >
                                🗑️ Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Code Reference */}
            <div style={styles.codeRef}>
                <h4>📚 HTTP Methods Reference:</h4>
                <pre>{`
// CREATE (POST)
fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})

// READ (GET)
fetch(url)

// UPDATE (PUT)
fetch(url + '/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})

// DELETE
fetch(url + '/' + id, {
    method: 'DELETE'
})
                `}</pre>
            </div>
        </div>
    );
}


// ============================================================
// STYLES
// ============================================================

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px'
    },
    error: {
        padding: '15px',
        background: '#ffebee',
        color: '#c62828',
        borderRadius: '4px',
        marginBottom: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    success: {
        padding: '15px',
        background: '#e8f5e9',
        color: '#2e7d32',
        borderRadius: '4px',
        marginBottom: '15px'
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer'
    },
    formContainer: {
        background: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
    },
    formGroup: {
        marginBottom: '15px'
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginTop: '5px'
    },
    textarea: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginTop: '5px',
        resize: 'vertical'
    },
    buttonGroup: {
        display: 'flex',
        gap: '10px'
    },
    submitBtn: {
        padding: '10px 20px',
        background: '#4caf50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer'
    },
    cancelBtn: {
        padding: '10px 20px',
        background: '#9e9e9e',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer'
    },
    listContainer: {
        marginTop: '20px'
    },
    postCard: {
        padding: '15px',
        background: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        marginBottom: '10px'
    },
    editing: {
        borderColor: '#4caf50',
        borderWidth: '2px'
    },
    postActions: {
        display: 'flex',
        gap: '10px',
        marginTop: '10px'
    },
    editBtn: {
        padding: '5px 10px',
        background: '#2196f3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    deleteBtn: {
        padding: '5px 10px',
        background: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    codeRef: {
        marginTop: '30px',
        padding: '15px',
        background: '#263238',
        color: '#fff',
        borderRadius: '8px'
    }
};
