import React from 'react';
import { useNavigate } from 'react-router-dom';
import { homePath } from '../constants/routes';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button onClick={() => navigate(homePath)}>Return to Home screen</button>
    </div>
  );
};

export default NotFound;