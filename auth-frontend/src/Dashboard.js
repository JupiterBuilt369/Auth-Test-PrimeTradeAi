import React, { useState, useEffect } from 'react';
import api from './api/axios';

const Dashboard = ({ setToken }) => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        // Load a new random wallpaper on every refresh
        setImageUrl(`https://picsum.photos/1920/1080?random=${Date.now()}`);
    }, []);

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error("Logout failed", error);
        }
        localStorage.removeItem('accessToken');
        setToken(null);
    };

    return (
        <div className="wallpaper-container" style={{ backgroundImage: `url(${imageUrl})` }}>
            <div className="wallpaper-content">
                <h1>Welcome Back</h1>
                <button className="logout-btn" onClick={logout}>Sign Out</button>
            </div>
        </div>
    );
};

export default Dashboard;