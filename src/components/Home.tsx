import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginPath } from "../constants/routes";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => navigate(loginPath)}>Go to login page</button>
    </div>
  );
};

export default Home;