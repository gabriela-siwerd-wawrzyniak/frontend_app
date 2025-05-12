import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Welcome;