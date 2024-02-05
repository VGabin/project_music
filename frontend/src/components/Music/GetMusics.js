import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetMusics = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [musics, setMusics] = useState([]);
  const [newMusicTitle, setNewMusicTitle] = useState('');
  const [newMusicLink, setNewMusicLink] = useState('');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/sessions');
        setSessions(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des sessions :', error.message);
      }
    };

    fetchSessions();
  }, []); 

  useEffect(() => {
    const fetchMusics = async () => {
      try {
        if (selectedSession) {
          const response = await axios.get(`http://localhost:3001/sessions/${selectedSession}/musics`);
          setMusics(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des musiques :', error.message);
      }
    };

    fetchMusics();
  }, [selectedSession]);

  const handleSessionChange = (e) => {
    setSelectedSession(e.target.value);
  };

  const handleAddMusic = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      if (selectedSession && newMusicTitle && newMusicLink) {
        const response = await axios.post(
          `http://localhost:3001/sessions/${selectedSession}/musics`,
          {
            title: newMusicTitle,
            link: newMusicLink,
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        setMusics((prevMusics) => [...prevMusics, response.data]);

        setNewMusicTitle('');
        setNewMusicLink('');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la musique :', error.message);
    }
  };

  return (
    <div>
      <h2>Choisir une session</h2>
      <select onChange={handleSessionChange} value={selectedSession}>
        <option value="">Sélectionnez une session</option>
        {sessions.map((session) => (
          <option key={session._id} value={session._id}>
            {session.name}
          </option>
        ))}
      </select>

      {selectedSession && (
        <div>
          <h3>Ajouter une nouvelle musique</h3>
          <form onSubmit={handleAddMusic}>
            <label>Title:</label>
            <input type="text" value={newMusicTitle} onChange={(e) => setNewMusicTitle(e.target.value)} />

            <label>Link:</label>
            <input type="text" value={newMusicLink} onChange={(e) => setNewMusicLink(e.target.value)} />

            <button type="submit">Ajouter la musique</button>
          </form>
        </div>
      )}

      {selectedSession && (
        <div>
          <h3>Musiques de la session sélectionnée</h3>
          <table>
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
            {musics.map((music) => (
                <tr key={music._id}>
                    <td>
                    <img src={music.cover} alt={music.title} style={{ width: '50px', height: '50px' }} />
                    </td>
                    <td>
                    <a href={music.link} target="_blank" rel="noopener noreferrer">
                        {music.title}
                    </a>
                    </td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetMusics;