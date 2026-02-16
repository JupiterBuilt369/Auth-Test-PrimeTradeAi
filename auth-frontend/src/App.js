import React, { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './Dashboard';
import './App.css';

function App() {
    const [token, setToken] = useState(localStorage.getItem('accessToken'));
    const [view, setView] = useState('login');

    if (token) {
        return <Dashboard setToken={setToken} />;
    }

    return (
        <div className="App">
            {view === 'login' ? (
                <Login setToken={setToken} switchToSignup={() => setView('signup')} />
            ) : (
                <Signup switchToLogin={() => setView('login')} />
            )}
        </div>
    );
}

export default App;