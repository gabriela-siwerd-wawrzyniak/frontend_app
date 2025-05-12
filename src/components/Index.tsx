import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginPath } from '../constants/routes';
import styles from '../styles/Index.module.scss';

const Index = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles['header']}>
        <h1>Login App</h1>
      </div>
      <div className={styles['content']}>
        <button onClick={() => navigate(loginPath)}>Go to login page</button>
      </div>
    </>
  );
};

export default Index;
