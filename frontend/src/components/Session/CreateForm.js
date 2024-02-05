import React, { useState } from 'react';
import axios from 'axios';
import './CreateForm.css';

const CreateForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleNameChange = (e) => setName(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);

    const handleCreateSession = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            const response = await axios.post(
                'http://localhost:3001/sessions',
                {
                    name: name,
                    description: description,
                },
                {
                    headers: {
                    Authorization: `${token}`,
                    },
                }
            );

            console.log('Session créée avec succès:', response.data);

        } catch (error) {
            console.error('Erreur lors de la création de la session :', error.message);
        }
    };

    return (
        <div className="create-form-container">
            <h2>Créer une nouvelle session</h2>
            <form onSubmit={handleCreateSession}>
                <label>Nom de la session:</label>
                <input type="text" value={name} onChange={handleNameChange} />

                <label>Description de la session:</label>
                <textarea value={description} onChange={handleDescriptionChange} />

                <button type="submit">Créer la session</button>
            </form>
        </div>
    );
};

export default CreateForm;
