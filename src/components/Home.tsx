import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { rootPath } from '../constants/routes';
import styles from '../styles/Home.module.scss';

const Home = () => {
  const navigate = useNavigate();
  const { firstName, loginDate, clearAuth } = useAuthStore();

  const handleLogout = () => {
    localStorage.removeItem('token');
    clearAuth();
    navigate(rootPath);
  };

  return (
    <>
      <div className={styles['header']}>
        <h1>Home Page</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className={styles['home-container']}>
        <p>Welcome, {firstName}</p>
        <p>Last time you logged in was: {loginDate}</p>
      </div>
    </>
  );
};

export default Home;
