import { loginPath } from 'constants/routes';

import { useNavigate } from 'react-router';

import styles from 'styles/Index.module.scss';

const Index = () => {
  const navigate = useNavigate();

  return (
    <main>
      <header className={styles['header']}>
        <h1>Login App</h1>
      </header>
      <section className={styles['content']}>
        <button onClick={() => navigate(loginPath)}>Go to login page</button>
      </section>
    </main>
  );
};

export default Index;
