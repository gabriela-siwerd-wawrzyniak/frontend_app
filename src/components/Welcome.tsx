import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Welcome = () => {
  const navigate = useNavigate();
  const { firstName, loginDate, clearAuth } = useAuthStore();

  const handleLogout = () => {
    localStorage.removeItem('token');
    clearAuth();
    navigate('/');
  };

  return (
    <div>
      <h1>Welcome, {firstName}</h1>
      <p>Last time you logged in was: {loginDate}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Welcome;