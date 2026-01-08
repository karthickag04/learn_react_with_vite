// ============================================================
// 13-1 - REACT ROUTER BASICS
// ============================================================

import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    NavLink,
    useParams,
    useNavigate,
    useLocation,
    Outlet
} from 'react-router-dom';

// ============================================================
// PAGE COMPONENTS
// ============================================================

// Home Page
function HomePage() {
    return (
        <div style={styles.page}>
            <h2>🏠 Home Page</h2>
            <p>Welcome to our React Router tutorial!</p>
            <p>Use the navigation above to explore different pages.</p>
        </div>
    );
}

// About Page
function AboutPage() {
    return (
        <div style={styles.page}>
            <h2>ℹ️ About Page</h2>
            <p>This is a demonstration of React Router v6.</p>
            <h3>Key Features:</h3>
            <ul>
                <li>Client-side routing (no page refresh)</li>
                <li>URL-based navigation</li>
                <li>Dynamic route parameters</li>
                <li>Nested routes</li>
                <li>Programmatic navigation</li>
            </ul>
        </div>
    );
}

// Contact Page
function ContactPage() {
    return (
        <div style={styles.page}>
            <h2>📧 Contact Page</h2>
            <p>Get in touch with us!</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
                <div style={styles.formGroup}>
                    <input type="text" placeholder="Your Name" style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                    <input type="email" placeholder="Your Email" style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                    <textarea placeholder="Message" rows={4} style={styles.input} />
                </div>
                <button type="submit" style={styles.button}>Send Message</button>
            </form>
        </div>
    );
}

// 404 Not Found Page
function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div style={{ ...styles.page, textAlign: 'center' }}>
            <h2>404 - Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/')} style={styles.button}>
                Go Home
            </button>
        </div>
    );
}


// ============================================================
// NAVIGATION COMPONENT
// ============================================================

function Navigation() {
    // NavLink adds 'active' class automatically
    const navLinkStyle = ({ isActive }) => ({
        ...styles.navLink,
        background: isActive ? '#4caf50' : 'transparent',
        color: isActive ? 'white' : '#333'
    });

    return (
        <nav style={styles.nav}>
            <NavLink to="/" style={navLinkStyle} end>
                Home
            </NavLink>
            <NavLink to="/about" style={navLinkStyle}>
                About
            </NavLink>
            <NavLink to="/products" style={navLinkStyle}>
                Products
            </NavLink>
            <NavLink to="/users" style={navLinkStyle}>
                Users
            </NavLink>
            <NavLink to="/contact" style={navLinkStyle}>
                Contact
            </NavLink>
        </nav>
    );
}


// ============================================================
// DYNAMIC ROUTES - PRODUCTS
// ============================================================

// Sample data
const products = [
    { id: 1, name: 'Laptop', price: 999, description: 'Powerful laptop for developers' },
    { id: 2, name: 'Phone', price: 699, description: 'Latest smartphone with great camera' },
    { id: 3, name: 'Tablet', price: 499, description: 'Perfect for reading and browsing' },
    { id: 4, name: 'Watch', price: 299, description: 'Smart watch with health tracking' },
];

// Products List Page
function ProductsPage() {
    return (
        <div style={styles.page}>
            <h2>🛍️ Products</h2>
            <div style={styles.grid}>
                {products.map(product => (
                    <div key={product.id} style={styles.card}>
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                        {/* Link to dynamic route */}
                        <Link to={`/products/${product.id}`} style={styles.link}>
                            View Details →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Single Product Page (Dynamic Route)
function ProductDetailPage() {
    // Get the 'id' parameter from URL
    const { id } = useParams();
    const navigate = useNavigate();

    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <div style={styles.page}>
                <h2>Product Not Found</h2>
                <button onClick={() => navigate('/products')} style={styles.button}>
                    Back to Products
                </button>
            </div>
        );
    }

    return (
        <div style={styles.page}>
            <button onClick={() => navigate(-1)} style={styles.backBtn}>
                ← Back
            </button>
            <h2>{product.name}</h2>
            <p style={styles.price}>${product.price}</p>
            <p>{product.description}</p>
            <button style={styles.button}>Add to Cart</button>
        </div>
    );
}


// ============================================================
// NESTED ROUTES - USERS
// ============================================================

const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'User' },
];

// Users Layout (Parent Route)
function UsersLayout() {
    return (
        <div style={styles.page}>
            <h2>👥 Users Section</h2>
            <div style={styles.usersLayout}>
                {/* Sidebar with user links */}
                <aside style={styles.sidebar}>
                    <h4>User List</h4>
                    {users.map(user => (
                        <NavLink
                            key={user.id}
                            to={`/users/${user.id}`}
                            style={({ isActive }) => ({
                                ...styles.sidebarLink,
                                background: isActive ? '#e3f2fd' : 'transparent'
                            })}
                        >
                            {user.name}
                        </NavLink>
                    ))}
                </aside>

                {/* Outlet renders nested route content */}
                <main style={styles.mainContent}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

// Users Index (default nested route)
function UsersIndex() {
    return (
        <div>
            <h3>Select a user from the list</h3>
            <p>Click on a user name to see their details.</p>
        </div>
    );
}

// User Detail (nested route)
function UserDetail() {
    const { id } = useParams();
    const user = users.find(u => u.id === parseInt(id));

    if (!user) {
        return <p>User not found</p>;
    }

    return (
        <div style={styles.userCard}>
            <h3>{user.name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
        </div>
    );
}


// ============================================================
// PROGRAMMATIC NAVIGATION DEMO
// ============================================================

function NavigationDemo() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div style={styles.demoBox}>
            <h4>Current Location:</h4>
            <code>{location.pathname}</code>

            <h4 style={{ marginTop: '15px' }}>Programmatic Navigation:</h4>
            <div style={styles.buttonGroup}>
                <button onClick={() => navigate('/')} style={styles.smallBtn}>
                    Go Home
                </button>
                <button onClick={() => navigate(-1)} style={styles.smallBtn}>
                    Go Back
                </button>
                <button onClick={() => navigate('/products/1')} style={styles.smallBtn}>
                    Go to Product 1
                </button>
            </div>
        </div>
    );
}


// ============================================================
// MAIN APP COMPONENT
// ============================================================

export default function RouterBasics() {
    return (
        <div style={styles.container}>
            <h1>React Router v6 Tutorial</h1>

            <Navigation />
            <NavigationDemo />

            {/* Route Definitions */}
            <Routes>
                {/* Basic Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* Dynamic Route */}
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />

                {/* Nested Routes */}
                <Route path="/users" element={<UsersLayout />}>
                    <Route index element={<UsersIndex />} />
                    <Route path=":id" element={<UserDetail />} />
                </Route>

                {/* 404 Catch-all Route */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>

            {/* Reference */}
            <div style={styles.reference}>
                <h4>📚 React Router Cheat Sheet:</h4>
                <pre>{`
// Setup
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Basic Route
<Route path="/about" element={<AboutPage />} />

// Dynamic Route
<Route path="/products/:id" element={<ProductPage />} />
// Access: const { id } = useParams();

// Nested Routes
<Route path="/users" element={<UsersLayout />}>
    <Route index element={<UsersIndex />} />
    <Route path=":id" element={<UserDetail />} />
</Route>
// Use <Outlet /> in parent to render children

// Navigation
<Link to="/about">About</Link>
<NavLink to="/about">About</NavLink> // adds active class

// Programmatic Navigation
const navigate = useNavigate();
navigate('/about');  // go to path
navigate(-1);        // go back
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
        maxWidth: '900px',
        margin: '0 auto',
        padding: '20px'
    },
    nav: {
        display: 'flex',
        gap: '5px',
        padding: '10px',
        background: '#f5f5f5',
        borderRadius: '8px',
        marginBottom: '20px'
    },
    navLink: {
        padding: '10px 15px',
        textDecoration: 'none',
        borderRadius: '4px',
        transition: 'all 0.3s'
    },
    page: {
        padding: '20px',
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #ddd',
        minHeight: '200px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '15px',
        marginTop: '15px'
    },
    card: {
        padding: '15px',
        background: '#f9f9f9',
        borderRadius: '8px',
        border: '1px solid #eee'
    },
    link: {
        color: '#4caf50',
        textDecoration: 'none'
    },
    button: {
        padding: '10px 20px',
        background: '#4caf50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    backBtn: {
        padding: '8px 15px',
        background: '#eee',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '15px'
    },
    price: {
        fontSize: '24px',
        color: '#4caf50',
        fontWeight: 'bold'
    },
    usersLayout: {
        display: 'flex',
        gap: '20px',
        marginTop: '15px'
    },
    sidebar: {
        width: '150px',
        background: '#f5f5f5',
        padding: '10px',
        borderRadius: '8px'
    },
    sidebarLink: {
        display: 'block',
        padding: '10px',
        textDecoration: 'none',
        color: '#333',
        borderRadius: '4px',
        marginBottom: '5px'
    },
    mainContent: {
        flex: 1,
        padding: '15px',
        background: '#fafafa',
        borderRadius: '8px'
    },
    userCard: {
        padding: '15px',
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #ddd'
    },
    demoBox: {
        padding: '15px',
        background: '#fff3e0',
        borderRadius: '8px',
        marginBottom: '20px'
    },
    buttonGroup: {
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap'
    },
    smallBtn: {
        padding: '8px 12px',
        background: '#2196f3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    formGroup: {
        marginBottom: '10px'
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px'
    },
    reference: {
        marginTop: '30px',
        padding: '15px',
        background: '#263238',
        color: '#fff',
        borderRadius: '8px',
        overflow: 'auto'
    }
};
