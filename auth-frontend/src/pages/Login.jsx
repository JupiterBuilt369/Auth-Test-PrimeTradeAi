import React, { useState } from 'react';
import api from '../api/axios';
import './Auth.css';

const Login = ({ setToken, switchToSignup }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('/auth/login', formData);
            const { accessToken } = response.data;
            
            localStorage.setItem('accessToken', accessToken);
            setToken(accessToken); // Update App state to switch to Dashboard
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Welcome Back</h2>
                <p className="auth-subtitle">Enter your credentials to access your account</p>
                {error && <div className="error-message">{error}</div>}
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email Address" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <button type="submit" className="auth-btn">Log In</button>
                </form>
                <div className="auth-link">
                    Don't have an account? <button className="link-btn" onClick={switchToSignup}>Sign Up</button>
                </div>
            </div>
        </div>
    );
};

export default Login;