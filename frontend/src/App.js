// import logo from './logo.svg';
// import './App.css';
import React, { useState } from 'react';
import LoginForm from './components/Login/LoginForm';
import CreateSessionForm from './components/Session/CreateForm'
import GetMusics from './components/Music/GetMusics';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
        <CreateSessionForm />
        <GetMusics />
        </div>
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default App;
