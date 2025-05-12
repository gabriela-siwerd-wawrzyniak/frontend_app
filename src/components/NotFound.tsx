import React from 'react';
import { useNavigate } from 'react-router-dom';
import { homePath } from '../constants/routes';
import styles from '../styles/Index.module.scss';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles['header']}>
        <h1>Page Not Found</h1>
        <button onClick={() => navigate(homePath)}>Home</button>
      </div>
      <h2>The page you are looking for does not exist.</h2>
    </div>
  );
};

export default NotFound;
