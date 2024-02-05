import axios from 'axios';
import React, { useState } from 'react';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const loginUser = async (email, password) => {
        axios.post('http://localhost:3001/users/login', {
            email: email,
            password: password
        })
        .then(function(response) {
            const token = response.data.token;
            localStorage.setItem('token', token);

            console.log(token);
        })
        .catch(function(error) {
            console.error('Erreur lors de la connexion :', error.message);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Appel de la fonction pour envoyer les données à l'API
        loginUser(email, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Email: <input type="text" value={email} onChange={handleEmailChange} /></label>
            <label>Password: <input type="password" value={password} onChange={handlePasswordChange} /></label>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;