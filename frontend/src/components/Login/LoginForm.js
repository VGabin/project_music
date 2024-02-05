import axios from 'axios';
import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const loginUser = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3001/users/login', {
                email: email,
                password: password
            });

            const token = response.data.token;
            localStorage.setItem('token', token);

            console.log(token);
            onLoginSuccess();
        } catch (error) {
            console.error('Erreur lors de la connexion :', error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(email, password);
    };

    return (
        <div className="login-form-container">
            <form onSubmit={handleSubmit}>
                <label>Email: <input type="text" value={email} onChange={handleEmailChange} /></label>
                <label>Password: <input type="password" value={password} onChange={handlePasswordChange} /></label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
