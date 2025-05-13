import React from 'react';
import { useNavigate } from 'react-router';
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

  const formattedDate = loginDate
    ? new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(loginDate))
    : 'unknown';

  return (
    <main>
      <header className={styles['header']}>
        <h1>Home Page</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <section className={styles['home-container']}>
        <div className={styles['home-text']}>Welcome, {firstName ?? 'Guest'}</div>
        <div className={styles['home-text']}>Last time you logged in was: {formattedDate}</div>
      </section>
    </main>
  );
};

export default Home;
