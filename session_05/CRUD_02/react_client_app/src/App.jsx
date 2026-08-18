import { useState } from 'react';
import './App.css';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {currentUser ? (
        <Dashboard
          currentUser={currentUser}
          onLogout={() => setCurrentUser(null)}
        />
      ) : (
        <div style={{ maxWidth: "450px", margin: "40px auto", padding: "20px" }}>
          {/* Navigation bar between Register & Login */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "25px", gap: "10px" }}>
            <button
              onClick={() => setActiveTab('login')}
              style={{
                flex: 1,
                padding: "10px 15px",
                backgroundColor: activeTab === 'login' ? '#0969da' : '#f6f8fa',
                color: activeTab === 'login' ? 'white' : '#24292f',
                border: "1px solid #d0d7de",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('register')}
              style={{
                flex: 1,
                padding: "10px 15px",
                backgroundColor: activeTab === 'register' ? '#0969da' : '#f6f8fa',
                color: activeTab === 'register' ? 'white' : '#24292f',
                border: "1px solid #d0d7de",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              Register
            </button>
          </div>

          {activeTab === 'login' ? (
            <Login onLoginSuccess={(user) => setCurrentUser(user)} />
          ) : (
            <Register onRegisterSuccess={() => setActiveTab('login')} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
